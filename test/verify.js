// Hot 100 AI 刷题工具 · 自动化校验脚本
// 用法: node test/verify.js  （需要 playwright，见 README）
// 原理: 1) 自行拉起 server.js（专用端口+临时状态文件，不碰真实 hot100.state.json）
//       2) Playwright 拦截 /chat/completions 返回 mock 响应，无需真实 API Key
//       覆盖：JSON 文件持久化(Key/进度/代码)、防抖合并、换行快触发、偏题波浪线、两关判定、重判重绑。
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const PORT = 15500; // 避开本机 Windows 保留端口段
const BASE = 'http://127.0.0.1:' + PORT;
const PAGE_URL = BASE + '/';
const STATE_FILE = path.join(os.tmpdir(), 'hot100.state.test.json');
const MOCK_BASE = 'https://mock-llm.test/v1';

let passCount = 0, failCount = 0;
function check(name, cond, detail) {
  if (cond) { passCount++; console.log('  PASS ' + name); return; }
  failCount++;
  console.log('  FAIL ' + name + (detail ? ' | ' + detail : ''));
}

// 计数器：区分快/强模型调用次数，供防抖与回归断言
const counter = { fast: 0, strong: 0 };

/* ---------- 本地服务器管理 ---------- */
let serverProc = null;

async function startServer() {
  try { fs.unlinkSync(STATE_FILE); } catch (e) { /* 不存在即忽略 */ }
  serverProc = spawn(process.execPath, [path.join(__dirname, '..', 'server.js')], {
    env: Object.assign({}, process.env, { PORT: String(PORT), STATE_FILE: STATE_FILE }),
    stdio: 'ignore'
  });
  // 轮询就绪，最多 5 秒
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(BASE + '/api/state');
      if (r.ok) { return; }
    } catch (e) { /* 未就绪 */ }
    await new Promise(r => setTimeout(r, 100));
  }
  throw new Error('server.js 5 秒内未就绪，检查端口 ' + PORT);
}

function stopServer() {
  if (serverProc) { serverProc.kill(); serverProc = null; }
  try { fs.unlinkSync(STATE_FILE); } catch (e) { /* 忽略 */ }
}

async function seedState(state) {
  const r = await fetch(BASE + '/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  });
  if (!r.ok) { throw new Error('预写入状态失败: HTTP ' + r.status); }
}

async function readServerState() {
  return (await fetch(BASE + '/api/state')).json();
}

function mockSettingsState() {
  return {
    settings: {
      fast: { baseURL: MOCK_BASE, model: 'qwen-flash', key: 'mock-key' },
      strong: { baseURL: MOCK_BASE, model: 'deepseek-v4-flash', key: 'mock-key' }
    },
    progress: {}, code: {}, curProb: null
  };
}

/* ---------- LLM mock ---------- */
async function setupMockRoute(page) {
  await page.route('**/chat/completions', async route => {
    const req = route.request();
    // 预检请求直接放行 CORS
    if (req.method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: corsHeaders() });
      return;
    }
    const body = JSON.parse(req.postData() || '{}');
    const userContent = (body.messages || []).map(m => m.content).join('\n');
    const isFast = /qwen/.test(body.model || '');
    let content;
    if (isFast) {
      counter.fast++;
      // 代码里出现 FORLOOP_BAD 时模拟"思路偏了"，且故意用代码围栏包 JSON，验证兜底解析
      content = userContent.includes('FORLOOP_BAD')
        ? '```json\n{"on_track": false, "issues": [{"start_line": 1, "end_line": 1, "severity": "warning", "hint": "题解用哈希表，你在写别的，回到板子上"}], "summary": "思路偏离题解"}\n```'
        : '{"on_track": true, "issues": [], "summary": "在正轨上"}';
    }
    if (!isFast) {
      counter.strong++;
      // 代码里出现 FAILME 时模拟边界关不过
      content = userContent.includes('FAILME')
        ? '{"idea": {"pass": true, "reason": "思路与题解一致"}, "boundary": {"pass": false, "reason": "未处理空输入"}, "comment": "补上空输入判断"}'
        : '{"idea": {"pass": true, "reason": "思路与题解一致"}, "boundary": {"pass": true, "reason": "边界覆盖完整"}, "comment": "很好"}';
    }
    await route.fulfill({
      status: 200,
      headers: corsHeaders(),
      contentType: 'application/json',
      body: JSON.stringify({ choices: [{ message: { role: 'assistant', content: content } }] })
    });
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
}

/* ---------- 诊断与通用操作 ---------- */
function attachDiagnostics(page, tag) {
  page.on('pageerror', e => console.log('  [' + tag + ' pageerror]', String(e.message).slice(0, 150)));
  page.on('requestfailed', r => {
    // /api/state 之外的失败请求才值得看（CDN 抖动定位）
    if (!r.url().includes('/api/state')) {
      console.log('  [' + tag + ' reqfail]', r.url().slice(0, 100), '->', r.failure() && r.failure().errorText);
    }
  });
}

async function waitMonaco(page) {
  await page.waitForSelector('.monaco-editor', { timeout: 60000 });
  await page.waitForFunction(() => window.monaco && monaco.editor.getModels().length > 0, { timeout: 15000 });
}

async function typeInEditor(page, text) {
  await page.click('.monaco-editor');
  await page.keyboard.press('Control+End');
  await page.keyboard.type(text, { delay: 40 });
}

// 等待防抖(300ms)后的落盘完成
const PERSIST_WAIT = 700;

(async () => {
  await startServer();
  const browser = await chromium.launch();

  /* ========== 场景 A：未配置 Key ========== */
  console.log('[A] 未配置 Key 时的降级行为');
  {
    await seedState({});
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    attachDiagnostics(page, 'A');
    await setupMockRoute(page);
    const before = counter.fast;
    await page.goto(PAGE_URL);
    await waitMonaco(page);
    await typeInEditor(page, 'int a;');
    await page.waitForTimeout(1300);
    check('A1 无 Key 不发任何 AI 请求', counter.fast === before, 'fast=' + (counter.fast - before));
    const status = (await page.textContent('#aiStatusText')).trim();
    check('A2 状态栏提示未配置 Key', status.includes('未配置'), status);
    await page.waitForTimeout(PERSIST_WAIT);
    const stateA = await readServerState();
    check('A3 输入代码后状态落盘到 JSON 文件', stateA.code && Object.values(stateA.code).some(c => String(c).includes('int a;')), JSON.stringify(stateA).slice(0, 120));
    await ctx.close();
  }

  /* ========== 场景 B：AI 全链路 + JSON 持久化（mock） ========== */
  console.log('[B] 配置 Key 后的 AI 全链路与持久化');
  await seedState(mockSettingsState());
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  attachDiagnostics(page, 'B');
  await setupMockRoute(page);
  await page.goto(PAGE_URL);
  await waitMonaco(page);

  // B0 题库构建产物加载：全量 Hot 100 且首题是两数之和（题单顺序）
  const probStat = await page.evaluate(() => ({
    n: (window.HOT100_PROBLEMS || []).length,
    first: (window.HOT100_PROBLEMS || [{}])[0].title || ''
  }));
  check('B0 题库加载全量 100 题(首题=两数之和)', probStat.n === 100 && probStat.first.includes('两数之和'), JSON.stringify(probStat));

  // B1 回归：页面加载(程序性 setValue)不应发请求；同时确认配置已从 JSON 文件读回
  await page.waitForTimeout(1200);
  check('B1 页面加载不触发 AI 请求(回归 bug1)', counter.fast === 0, 'fast=' + counter.fast);
  check('B2 配置从 JSON 文件读回(状态栏不再提示未配置)', !((await page.textContent('#aiStatusText')) || '').includes('未配置'));

  // B3 回归：切题也不应发请求
  await page.click('#btnNext');
  await page.waitForTimeout(1200);
  check('B3 切题不触发 AI 请求(回归 bug1)', counter.fast === 0, 'fast=' + counter.fast);

  // B4 防抖：连续输入合并为一次调用
  await typeInEditor(page, 'abc');
  await page.waitForTimeout(1600);
  check('B4 连续输入防抖合并为 1 次调用', counter.fast === 1, 'fast=' + counter.fast);
  check('B5 正轨状态渲染', ((await page.textContent('#aiStatusText')) || '').includes('正轨'));

  // B6 换行快触发
  await page.keyboard.press('Enter');
  await page.waitForTimeout(700);
  check('B6 换行触发快检查', counter.fast === 2, 'fast=' + counter.fast);

  // B7/B8 偏题：围栏 JSON 兜底解析 + 波浪线 marker + 反馈提示
  await typeInEditor(page, ' FORLOOP_BAD');
  await page.waitForTimeout(1600);
  const markerCount = await page.evaluate(() => monaco.editor.getModelMarkers({ owner: 'ai-lint' }).length);
  check('B7 偏题时打出波浪线 marker(含围栏 JSON 兜底)', markerCount > 0, 'markers=' + markerCount);
  const fbText = await page.textContent('#fbBody');
  check('B8 反馈区显示偏题提示', fbText.includes('思路偏了') || fbText.includes('回到板子'));

  // B9/B10 提交通过：Accepted + 进度落 JSON 文件
  await page.click('.monaco-editor');
  await page.keyboard.press('Control+KeyA');
  await page.keyboard.type('class Solution { void moveZeroes() { swap; } };', { delay: 10 });
  await page.click('#btnSubmit');
  await page.waitForSelector('#verdictLine', { timeout: 8000 });
  const verdict = await page.textContent('#verdictLine');
  check('B9 两关全过判 Accepted', verdict.includes('Accepted'), verdict.trim());
  await page.waitForTimeout(PERSIST_WAIT);
  const stateAC = await readServerState();
  check('B10 AC 后进度落 JSON 文件', Object.values(stateAC.progress || {}).includes('solved'), JSON.stringify(stateAC.progress));

  // B11-B13 提交失败 + 重判按钮切 tab 后仍可用（回归 bug2）
  await page.click('#btnNext');
  await page.click('.monaco-editor');
  await page.keyboard.press('Control+KeyA');
  await page.keyboard.type('FAILME code', { delay: 10 });
  await page.click('#btnSubmit');
  await page.waitForSelector('#verdictLine', { timeout: 8000 });
  const verdict2 = await page.textContent('#verdictLine');
  check('B11 边界关不过判未通过', verdict2.includes('未通过'), verdict2.trim());
  check('B12 未通过时显示重判按钮', await page.locator('#btnRejudge').count() > 0);
  await page.click('#fbTabs .tab[data-tab="watch"]');
  await page.click('#fbTabs .tab[data-tab="submit"]');
  const strongBefore = counter.strong;
  await page.click('#btnRejudge');
  await page.waitForTimeout(1500);
  check('B13 切 tab 后重判按钮仍生效(回归 bug2)', counter.strong === strongBefore + 1, 'strong=' + counter.strong);

  // B14 设置弹窗改 Key → 保存 → Key 落 JSON 文件（API Key 持久化主路径）
  await page.click('#btnSettings');
  await page.fill('#fastKey', 'ui-changed-key');
  await page.click('#btnCfgSave');
  await page.waitForTimeout(PERSIST_WAIT);
  const stateKey = await readServerState();
  check('B14 设置保存后 Key 落 JSON 文件', stateKey.settings && stateKey.settings.fast && stateKey.settings.fast.key === 'ui-changed-key', JSON.stringify(stateKey.settings && stateKey.settings.fast));

  // B15 代码与当前题目持久化：刷新后恢复（经服务器 JSON，非 localStorage）
  const probBefore = await page.textContent('#probTitle');
  await page.click('.monaco-editor');
  await page.keyboard.press('Control+End');
  await page.keyboard.type(' PERSIST_MARK', { delay: 10 });
  await page.waitForTimeout(PERSIST_WAIT);
  await page.reload();
  await waitMonaco(page);
  const restored = await page.evaluate(() => monaco.editor.getModels()[0].getValue());
  check('B15 刷新后代码从 JSON 文件恢复', restored.includes('PERSIST_MARK'));
  const probAfter = await page.textContent('#probTitle');
  check('B16 刷新后停留在同一题(curProb 持久化)', probBefore.trim() === probAfter.trim(), probBefore.trim() + ' vs ' + probAfter.trim());

  // B17 完整题解默认展开即视为已看 → 进度标 viewed 并落盘（当前 UI：题解置顶默认展开）
  await page.waitForTimeout(PERSIST_WAIT);
  const prog = await readServerState();
  check('B17 看完整题解标记 viewed 并落盘', Object.values(prog.progress || {}).includes('viewed'), JSON.stringify(prog.progress));

  // B18 提示面板结构：顶层=完整题解+3 级提示，题解内嵌"代码"折叠面板
  const topCnt = await page.locator('#hintsBox > details').count();
  const codeCnt = await page.locator('#fullSolution details').count();
  check('B18 提示面板结构(4 顶层+1 内嵌代码)', topCnt === 4 && codeCnt === 1, 'top=' + topCnt + ' nested=' + codeCnt);

  // B19 服务器拒绝坏 JSON，状态文件不被写坏
  const badResp = await fetch(BASE + '/api/state', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{broken' });
  check('B19 坏 JSON 被服务器拒绝(400)', badResp.status === 400, 'status=' + badResp.status);
  const stillValid = await readServerState();
  check('B20 坏写入后状态文件仍是合法 JSON', stillValid && typeof stillValid === 'object');

  await ctx.close();
  await browser.close();

  console.log('\n========== 结果: PASS=' + passCount + ' FAIL=' + failCount + ' ==========');
  stopServer();
  process.exit(failCount > 0 ? 1 : 0);
})().catch(e => {
  console.error('校验脚本异常:', e);
  stopServer();
  process.exit(2);
});

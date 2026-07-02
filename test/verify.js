// Hot 100 AI 刷题工具 · 自动化校验脚本
// 用法: node test/verify.js  （需要 playwright，见 README）
// 原理: Playwright 拦截 /chat/completions 返回 mock 响应，无需真实 API Key 即可
//       覆盖 AI 全链路：防抖合并、换行快触发、偏题波浪线、两关判定、重判重绑、持久化。
const { chromium } = require('playwright');
const path = require('path');

const PAGE_URL = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
const MOCK_BASE = 'https://mock-llm.test/v1';

let passCount = 0, failCount = 0;
function check(name, cond, detail) {
  if (cond) { passCount++; console.log('  PASS ' + name); return; }
  failCount++;
  console.log('  FAIL ' + name + (detail ? ' | ' + detail : ''));
}

// 计数器：区分快/强模型调用次数，供防抖与回归断言
const counter = { fast: 0, strong: 0 };

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

// 把 mock 模型配置写进 localStorage（页面加载前注入）
function injectSettings(page) {
  return page.addInitScript(([base]) => {
    localStorage.setItem('hot100.settings', JSON.stringify({
      fast: { baseURL: base, model: 'qwen-flash', key: 'mock-key' },
      strong: { baseURL: base, model: 'deepseek-v4-flash', key: 'mock-key' }
    }));
  }, [MOCK_BASE]);
}

// 诊断辅助：CDN 抖动时能从日志看到具体哪个请求挂了
function attachDiagnostics(page, tag) {
  page.on('pageerror', e => console.log('  [' + tag + ' pageerror]', String(e.message).slice(0, 150)));
  page.on('requestfailed', r => console.log('  [' + tag + ' reqfail]', r.url().slice(0, 100), '->', r.failure() && r.failure().errorText));
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

(async () => {
  const browser = await chromium.launch();

  /* ========== 场景 A：未配置 Key ========== */
  console.log('[A] 未配置 Key 时的降级行为');
  {
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
    await ctx.close();
  }

  /* ========== 场景 B：AI 全链路（mock） ========== */
  console.log('[B] 配置 Key 后的 AI 全链路');
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  attachDiagnostics(page, 'B');
  await setupMockRoute(page);
  await injectSettings(page);
  await page.goto(PAGE_URL);
  await waitMonaco(page);

  // B1 回归：页面加载(程序性 setValue)不应发请求
  await page.waitForTimeout(1200);
  check('B1 页面加载不触发 AI 请求(回归 bug1)', counter.fast === 0, 'fast=' + counter.fast);

  // B2 回归：切题也不应发请求
  await page.click('#btnNext');
  await page.waitForTimeout(1200);
  check('B2 切题不触发 AI 请求(回归 bug1)', counter.fast === 0, 'fast=' + counter.fast);

  // B3 防抖：连续输入合并为一次调用
  await typeInEditor(page, 'abc');
  await page.waitForTimeout(1600);
  check('B3 连续输入防抖合并为 1 次调用', counter.fast === 1, 'fast=' + counter.fast);
  check('B4 正轨状态渲染', ((await page.textContent('#aiStatusText')) || '').includes('正轨'));

  // B5 换行快触发
  await page.keyboard.press('Enter');
  await page.waitForTimeout(700);
  check('B5 换行触发快检查', counter.fast === 2, 'fast=' + counter.fast);

  // B6/B7 偏题：围栏 JSON 兜底解析 + 波浪线 marker + 状态变红
  await typeInEditor(page, ' FORLOOP_BAD');
  await page.waitForTimeout(1600);
  const markerCount = await page.evaluate(() => monaco.editor.getModelMarkers({ owner: 'ai-lint' }).length);
  check('B6 偏题时打出波浪线 marker(含围栏 JSON 兜底)', markerCount > 0, 'markers=' + markerCount);
  const fbText = await page.textContent('#fbBody');
  check('B7 反馈区显示偏题提示', fbText.includes('思路偏了') || fbText.includes('回到板子'));

  // B8 提交通过：Accepted + 进度标绿
  // 先清掉 FORLOOP_BAD 避免干扰(选中全部重输)
  await page.click('.monaco-editor');
  await page.keyboard.press('Control+KeyA');
  await page.keyboard.type('class Solution { void moveZeroes() { swap; } };', { delay: 10 });
  await page.click('#btnSubmit');
  await page.waitForSelector('#verdictLine', { timeout: 8000 });
  const verdict = await page.textContent('#verdictLine');
  check('B8 两关全过判 Accepted', verdict.includes('Accepted'), verdict.trim());
  const solved = await page.evaluate(() => JSON.parse(localStorage.getItem('hot100.progress') || '{}'));
  check('B9 AC 后进度落 localStorage', Object.values(solved).includes('solved'), JSON.stringify(solved));

  // B10-B12 提交失败 + 重判按钮切 tab 后仍可用（回归 bug2）
  await page.click('#btnNext');
  await page.click('.monaco-editor');
  await page.keyboard.press('Control+KeyA');
  await page.keyboard.type('FAILME code', { delay: 10 });
  await page.click('#btnSubmit');
  await page.waitForSelector('#verdictLine', { timeout: 8000 });
  const verdict2 = await page.textContent('#verdictLine');
  check('B10 边界关不过判未通过', verdict2.includes('未通过'), verdict2.trim());
  check('B11 未通过时显示重判按钮', await page.locator('#btnRejudge').count() > 0);
  // 切走再切回，按钮必须仍然生效
  await page.click('#fbTabs .tab[data-tab="watch"]');
  await page.click('#fbTabs .tab[data-tab="submit"]');
  const strongBefore = counter.strong;
  await page.click('#btnRejudge');
  await page.waitForFunction(c => window.__x = true, {}, { timeout: 100 }).catch(() => {});
  await page.waitForTimeout(1500);
  check('B12 切 tab 后重判按钮仍生效(回归 bug2)', counter.strong === strongBefore + 1, 'strong=' + counter.strong);

  // B13 代码持久化：刷新后恢复
  await page.click('.monaco-editor');
  await page.keyboard.press('Control+End');
  await page.keyboard.type(' PERSIST_MARK', { delay: 10 });
  await page.waitForTimeout(300);
  await page.reload();
  await waitMonaco(page);
  const restored = await page.evaluate(() => monaco.editor.getModels()[0].getValue());
  check('B13 刷新后代码从 localStorage 恢复', restored.includes('PERSIST_MARK'));

  // B14 看完整题解 → 题目列表标橙(viewed)
  await page.click('#fullSolution summary');
  await page.waitForTimeout(200);
  const prog = await page.evaluate(() => JSON.parse(localStorage.getItem('hot100.progress') || '{}'));
  check('B14 看完整题解标记 viewed', Object.values(prog).includes('viewed'), JSON.stringify(prog));

  // B15 提示面板结构：3 级提示 + 1 完整题解
  const hintCnt = await page.locator('#hintsBox details').count();
  check('B15 四级提示面板齐全', hintCnt === 4, 'details=' + hintCnt);

  await ctx.close();
  await browser.close();

  console.log('\n========== 结果: PASS=' + passCount + ' FAIL=' + failCount + ' ==========');
  process.exit(failCount > 0 ? 1 : 0);
})().catch(e => { console.error('校验脚本异常:', e); process.exit(2); });

# 状态持久化改为本地 JSON 文件（Node 小服务器方案）

## Context

目前 Key / 做题进度 / 编辑器代码 / 当前题目 都存在浏览器 `localStorage` 里。用户想改成存到本地一个 JSON 文件，方便直接查看/编辑，且该文件不进 git（改完直接提交代码，文件本身通过 `.gitignore` 排除）。

浏览器 JS 不能凭空读写磁盘上固定路径的文件，只有两条路：File System Access API（每次新会话要手动弹窗选一次文件，体验不如 localStorage）或者一个小后端按固定路径读写。用户明确选择了后者，且要求"改动最小怎么来"。项目已经用 Node 跑测试（`playwright`），加一个零依赖的 Node 静态+API 服务器是最小代价的路径，正好也能替换掉临时起的 `python -m http.server`。

## 方案

新增一个零依赖的 `server.js`（只用 Node 内置 `http`/`fs`），职责：
1. `GET /` 或 `/index.html` → 返回 `index.html`
2. `GET /api/state` → 返回 `hot100.state.json` 的内容（文件不存在时返回 `{}`）
3. `POST /api/state` → 用请求体整体覆盖写入 `hot100.state.json`

`index.html` 里把所有 `localStorage` 相关代码换成一个内存对象 `appState` + 防抖持久化：

- 删除 `LS` 常量对象、`loadSettings()`、`loadProgress()`
- 新增 `appState = { settings, progress: {}, code: {}, curProb: null }`，`settings`/`progress` 仍然是原来的顶层变量，直接引用 `appState.settings`/`appState.progress`（避免改动后面所有引用 `settings.xxx`、`progress[id]` 的代码）
- 新增 `persistState()`：300ms 防抖，`fetch('/api/state', {method:'POST', body: JSON.stringify(appState, null, 2)})`
- 新增 `async function loadState()`：`fetch('/api/state')` 拉回内容，`Object.assign` 合并进 `settings`/`progress`/`appState.code`，读取失败（服务器没起）则静默用默认空状态
- 替换点（同原有触发时机，只是把 `localStorage.setItem/getItem` 换成 `appState.xxx` + `persistState()`）：
  - `saveProgress(p)`（`index.html:328`）→ 调 `persistState()`
  - `saveSettings()`（`index.html:727`）→ 把 `localStorage.setItem(LS.settings, ...)` 换成 `persistState()`
  - 编辑器 `onDidChangeModelContent`（`index.html:805-811`）里的代码落盘 → 写 `appState.code[prob.id]` 后 `persistState()`（防抖已经能合并高频按键触发的写入，不需要额外节流）
  - `renderProblem()` 里恢复代码（`index.html:668`）→ 从 `appState.code[prob.id]` 读
  - `renderProblem()` 里记当前题目（`index.html:643`）→ 写 `appState.curProb` 后 `persistState()`
- 启动流程改成 `async`：脚本末尾原来的 `setupSplit(); renderWatchTab(); bootMonaco();`（`index.html:874-876`）包一层 `(async () => { await loadState(); curIdx = ...; setupSplit(); renderWatchTab(); bootMonaco(); })()`，`curIdx` 的计算从依赖 `localStorage.getItem(LS.curProb)` 改成依赖 `appState.curProb`

其他改动：
- `.gitignore` 加一行 `hot100.state.json`
- `package.json` 加 `"start": "node server.js"` script
- README「使用」章节改一下：不再是"双击打开 index.html"，改成 `node server.js` 后访问 `http://127.0.0.1:5500`（顺带也是修复了之前 Monaco 在 `file://` 下加载失败的问题）

## 已知影响（不在本次改动范围内，先告知）

`test/verify.js` 目前是直接用 `file://` 打开页面 + `page.addInitScript` 注入 `localStorage.hot100.settings` 来 mock 配置。改成服务器 JSON 存储后，这套注入方式会失效（页面会去 fetch `/api/state`，而不是读 localStorage），测试会挂。这次先不动测试脚本，等你需要跑校验时再一起改（思路是：测试改成先启动 `server.js`、导航到 `http://127.0.0.1:PORT`，配置通过 `POST /api/state` 预写入，而不是 `addInitScript` 写 localStorage）。

## 验证

1. `node server.js` 启动服务器（替换掉之前手动起的 `python -m http.server`）
2. 浏览器打开 `http://127.0.0.1:5500`，设置里填 Key 保存，检查项目目录下生成/更新了 `hot100.state.json`，内容包含 `settings.fast.key` 等
3. 刷新页面，确认 Key、当前题目、编辑器代码都从文件恢复（不再依赖 localStorage）
4. 手动删掉/清空 `hot100.state.json` 后刷新，确认页面正常回退到默认空状态，不报错
5. 确认 `hot100.state.json` 不会被 `git status` 标记为待追踪文件

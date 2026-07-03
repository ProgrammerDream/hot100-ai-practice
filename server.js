// Hot 100 AI 刷题工具 · 本地小服务器（零依赖，只用 Node 内置模块）
// 职责：1) 提供 index.html  2) GET/POST /api/state 读写本地 JSON 状态文件
// 用法：node server.js  （可选环境变量 PORT、STATE_FILE）
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '5500', 10);
const STATE_FILE = process.env.STATE_FILE || path.join(__dirname, 'hot100.state.json');
const INDEX_FILE = path.join(__dirname, 'index.html');

function readState() {
  try { return fs.readFileSync(STATE_FILE, 'utf8'); } catch (e) { return '{}'; }
}

// 原子写：先写临时文件再改名，进程中断也不会留下半个 JSON
function writeState(text) {
  const tmp = STATE_FILE + '.tmp';
  fs.writeFileSync(tmp, text, 'utf8');
  fs.renameSync(tmp, STATE_FILE);
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (req.method === 'GET' && (url === '/' || url === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(INDEX_FILE));
    return;
  }
  // 题库构建产物；没构建过（文件不存在）时 404，前端自动兜底内嵌样例题
  if (req.method === 'GET' && url === '/problems.js') {
    let js = null;
    try { js = fs.readFileSync(path.join(__dirname, 'problems.js')); } catch (e) { /* 未构建 */ }
    if (js == null) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
    res.end(js);
    return;
  }
  if (req.method === 'GET' && url === '/api/state') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(readState());
    return;
  }
  if (req.method === 'POST' && url === '/api/state') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // 状态文件不该超过 10MB，超了直接掐断防滥用
      if (body.length > 10 * 1024 * 1024) { req.destroy(); }
    });
    req.on('end', () => {
      // 先校验再落盘，保证文件永远是合法 JSON
      try { JSON.parse(body); } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end('{"error":"invalid json"}');
        return;
      }
      writeState(body);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end('{"ok":true}');
    });
    return;
  }
  res.writeHead(404);
  res.end();
});

// 只绑本机回环：状态文件里有 API Key，不能暴露到局域网
server.listen(PORT, '127.0.0.1', () => {
  console.log('Hot100 刷题工具已启动: http://127.0.0.1:' + PORT);
  console.log('状态文件: ' + STATE_FILE);
});

server.on('error', e => {
  if (e.code === 'EADDRINUSE' || e.code === 'EACCES') {
    console.error('端口 ' + PORT + ' 不可用(' + e.code + ')，换端口重试，如: PORT=15500 node server.js');
    process.exit(1);
  }
  throw e;
});

'use strict';
/*
 * 合并 raw（题面/模板）与 curated（题解/提示）生成前端题库 problems.js：
 *   window.HOT100_PROBLEMS = [ { id, title, category, difficulty, diffText,
 *                                descHtml, hints, solutionCode, solutionText, starterCode }, ... ]
 * 顺序与分类严格跟随 top-100-liked 题单（raw/_list.json）。
 * 用法：node scripts/build-problems.js
 */
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, 'raw');
const CURATED_DIR = path.join(__dirname, 'curated');
const OUT_FILE = path.join(__dirname, '..', 'problems.js');

const DIFF_TEXT = { easy: '简单', medium: '中等', hard: '困难' };

// 题面 HTML 清理：去掉 leetcode 塞进来的 <meta> 标签；图片保留远程 URL（工具本身需联网调 AI）
function cleanDescHtml(html) {
  return html.replace(/<meta[^>]*>/gi, '').trim();
}

const list = JSON.parse(fs.readFileSync(path.join(RAW_DIR, '_list.json'), 'utf8'));
const problems = [];
const errors = [];

for (const item of list) {
  const name = item.id + '-' + item.slug + '.json';
  const raw = JSON.parse(fs.readFileSync(path.join(RAW_DIR, name), 'utf8'));
  const curatedFile = path.join(CURATED_DIR, name);
  if (!fs.existsSync(curatedFile)) { errors.push(name + ': 缺 curated 文件'); continue; }
  const cur = JSON.parse(fs.readFileSync(curatedFile, 'utf8'));

  // 逐题校验加工产物，宁可构建失败也不产出残缺题库
  if (!Array.isArray(cur.hints) || cur.hints.length !== 3 || cur.hints.some(h => !h || !h.trim())) {
    errors.push(name + ': hints 必须是 3 条非空');
  }
  if (!cur.solutionCode || !cur.solutionCode.trim()) { errors.push(name + ': solutionCode 为空'); }
  if (!cur.solutionText || !cur.solutionText.trim()) { errors.push(name + ': solutionText 为空'); }
  if (!raw.cppSnippet) { errors.push(name + ': 缺 cpp 起始模板'); }

  const difficulty = String(raw.difficulty || item.difficulty).toLowerCase();
  problems.push({
    id: item.id,
    title: item.id + '. ' + raw.translatedTitle,
    category: item.category,
    difficulty: difficulty,
    diffText: DIFF_TEXT[difficulty] || difficulty,
    descHtml: cleanDescHtml(raw.translatedContent),
    hints: cur.hints,
    solutionCode: cur.solutionCode,
    solutionText: cur.solutionText,
    starterCode: '#include <bits/stdc++.h>\nusing namespace std;\n\n' + raw.cppSnippet
  });
}

if (errors.length) {
  console.error('构建失败，共 ' + errors.length + ' 处问题：');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}

const banner = '/* 本文件由 scripts/build-problems.js 生成（数据源：leetcode.cn top-100-liked 题单 + 官方题解），勿手改。 */\n';
fs.writeFileSync(OUT_FILE, banner + 'window.HOT100_PROBLEMS = ' + JSON.stringify(problems, null, 1) + ';\n');
const kb = Math.round(fs.statSync(OUT_FILE).size / 1024);
console.log('生成 ' + OUT_FILE + '：' + problems.length + ' 题，' + kb + ' KB');
console.log('分类：' + [...new Set(problems.map(p => p.category))].join(' / '));

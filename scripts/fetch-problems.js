'use strict';
/*
 * 抓取 LeetCode 热题 100 原始数据（构建期运行，零依赖，Node 18+）：
 *   1. studyPlanV2Detail(top-100-liked) 拿题单顺序与分类（planSubGroups.name 即分类）
 *   2. 每题拿 translatedContent（中文题面 HTML）+ cpp 起始代码模板
 *   3. 每题拿官方题解文章（tag=official-solution 且 byLeetcode）markdown 全文
 * 产物：scripts/raw/<frontendId>-<slug>.json + scripts/raw/_list.json
 * 用法：node scripts/fetch-problems.js [--only slug1,slug2]（--only 用于单题重抓）
 */
const fs = require('fs');
const path = require('path');

const GRAPHQL = 'https://leetcode.cn/graphql/';
const RAW_DIR = path.join(__dirname, 'raw');
const HEADERS = {
  'Content-Type': 'application/json',
  'Origin': 'https://leetcode.cn',
  'Referer': 'https://leetcode.cn/studyplan/top-100-liked/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// 带重试的 GraphQL 请求：leetcode 偶发 5xx/限流，指数退避重试 3 次
async function gql(query, variables) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(GRAPHQL, {
        method: 'POST', headers: HEADERS,
        body: JSON.stringify({ query, variables })
      });
      if (!res.ok) { throw new Error('HTTP ' + res.status); }
      const json = await res.json();
      if (json.errors) { throw new Error('GraphQL: ' + JSON.stringify(json.errors).slice(0, 200)); }
      return json.data;
    } catch (e) {
      if (attempt === 3) { throw e; }
      const wait = 1000 * Math.pow(2, attempt);
      console.warn('  重试(' + (attempt + 1) + '): ' + e.message + '，等 ' + wait + 'ms');
      await sleep(wait);
    }
  }
}

async function fetchList() {
  const data = await gql(
    `query studyPlanV2Detail($planSlug: String!) {
       studyPlanV2Detail(planSlug: $planSlug) {
         name
         planSubGroups { name questions { questionFrontendId titleSlug translatedTitle difficulty } }
       }
     }`, { planSlug: 'top-100-liked' });
  const list = [];
  for (const g of data.studyPlanV2Detail.planSubGroups) {
    for (const q of g.questions) {
      list.push({
        id: Number(q.questionFrontendId),
        slug: q.titleSlug,
        translatedTitle: q.translatedTitle,
        difficulty: q.difficulty,
        category: g.name
      });
    }
  }
  return list;
}

async function fetchQuestion(slug) {
  const data = await gql(
    `query questionTranslations($titleSlug: String!) {
       question(titleSlug: $titleSlug) {
         questionFrontendId translatedTitle translatedContent difficulty
         codeSnippets { langSlug code }
       }
     }`, { titleSlug: slug });
  return data.question;
}

async function fetchOfficialSolution(slug) {
  const data = await gql(
    `query questionSolutionArticles($questionSlug: String!, $first: Int, $skip: Int, $orderBy: SolutionArticleOrderBy, $tagSlugs: [String!]) {
       questionSolutionArticles(questionSlug: $questionSlug, first: $first, skip: $skip, orderBy: $orderBy, tagSlugs: $tagSlugs) {
         edges { node { title slug byLeetcode content } }
       }
     }`, { questionSlug: slug, first: 5, skip: 0, orderBy: 'DEFAULT', tagSlugs: ['official-solution'] });
  const edges = (data.questionSolutionArticles && data.questionSolutionArticles.edges) || [];
  const official = edges.map(e => e.node).find(n => n.byLeetcode);
  return official || null;
}

(async () => {
  fs.mkdirSync(RAW_DIR, { recursive: true });

  const onlyArg = process.argv.indexOf('--only');
  const only = onlyArg > -1 ? process.argv[onlyArg + 1].split(',') : null;

  console.log('抓取题单 top-100-liked ...');
  const list = await fetchList();
  fs.writeFileSync(path.join(RAW_DIR, '_list.json'), JSON.stringify(list, null, 2));
  console.log('题单共 ' + list.length + ' 题，分类：' + [...new Set(list.map(x => x.category))].join('/'));

  const missing = [];
  for (const item of list) {
    if (only && !only.includes(item.slug)) { continue; }
    const file = path.join(RAW_DIR, item.id + '-' + item.slug + '.json');
    if (!only && fs.existsSync(file)) { console.log('跳过(已存在) ' + item.id + ' ' + item.slug); continue; }

    process.stdout.write('抓取 ' + item.id + ' ' + item.slug + ' ... ');
    const q = await fetchQuestion(item.slug);
    await sleep(250);
    const sol = await fetchOfficialSolution(item.slug);
    await sleep(250);

    const cpp = (q.codeSnippets || []).find(s => s.langSlug === 'cpp');
    if (!sol) { missing.push(item.slug); }
    fs.writeFileSync(file, JSON.stringify({
      id: item.id, slug: item.slug, category: item.category,
      translatedTitle: q.translatedTitle, difficulty: q.difficulty,
      translatedContent: q.translatedContent,
      cppSnippet: cpp ? cpp.code : null,
      officialTitle: sol ? sol.title : null,
      officialSlug: sol ? sol.slug : null,
      officialContent: sol ? sol.content : null
    }, null, 2));
    console.log(sol ? 'OK' : 'OK(无官方题解!)');
  }

  if (missing.length) { console.log('\n⚠ 以下题目没抓到官方题解，需要兜底：' + missing.join(', ')); }
  console.log('完成。raw 数据在 ' + RAW_DIR);
})().catch(e => { console.error('抓取失败：', e); process.exit(1); });

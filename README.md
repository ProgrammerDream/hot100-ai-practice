# Hot 100 AI 刷题工具

日抛型单 HTML 刷题工具：左边题面、右边编辑器，AI 拿参考题解当上下文**实时盯着你写**——思路一偏立刻波浪线提醒，不跑测试用例，只按「和题解一样不一样」判逻辑。目标：短期把 LeetCode Hot 100 刷成肌肉记忆。

## 使用

1. `node server.js` 启动本地小服务器（零依赖，仅 Node 内置模块），浏览器打开 `http://127.0.0.1:5500`。
   - Key / 做题进度 / 每题代码 / 当前题目 全部保存在项目目录的 `hot100.state.json`，可直接查看编辑，已被 `.gitignore` 排除。
   - 服务器只监听 127.0.0.1，状态文件不会暴露到局域网；直接双击 `index.html`（file://）也能用，但退化为不保存的纯内存模式。
2. 右上角「设置」填入模型 API Key：
   - 快模型（实时盯写）：默认阿里云百炼 `qwen-flash`
   - 强模型（提交终判）：默认 DeepSeek `deepseek-v4-flash`
   - 任何 OpenAI 兼容接口都能填（硅基流动免费模型可作零成本兜底）
3. 开始写代码。停顿 ~800ms 或换行时 AI 自动检查；写完点「提交」过两关判定（①思路与题解一致 ②边界覆盖），两关全绿 Accepted 撒花。

## 题库

- 全量 **LeetCode 热题 100**：题面与分类来自 leetcode.cn `top-100-liked` 题单（中文原文），参考题解代码取自 **leetcode.cn 官方题解**中最标准的方法（复杂度最优且写法主流，暴力与炫技解法不选），并统一为 4 空格缩进的格式化 C++。
- 题库是构建产物 `problems.js`，仓库自带、开箱即用。想重新生成：
  ```bash
  node scripts/fetch-problems.js   # 抓题单+题面+官方题解到 scripts/raw/（本地缓存，不入库）
  node scripts/build-problems.js   # 合并 raw + scripts/curated/（每题选定方法/思路/三级提示）生成 problems.js
  ```

## 核心设计

- **唯一正确性基准 = 参考题解**。AI 被明确禁止评价复杂度、禁止建议题解之外的解法，防止发散。
- 触发策略：停顿防抖 + 整行触发，新请求自动取消上一个未完成请求。
- Monaco Editor 走 CDN 多源回退（npmmirror → jsdelivr → cdnjs），国内网络友好。
- 完整设计与开源调研见 [设计方案总结](./设计方案总结_Hot100_AI刷题工具.md)。

## 自动化校验

无需真实 API Key——用 Playwright 拦截 `/chat/completions` 返回 mock 响应，覆盖题库加载与 AI 全链路（防抖合并、换行触发、偏题波浪线、两关判定、重判、持久化）共 24 项：

```bash
npm install
npm run verify
```

## 路线图

- [x] M1：单 HTML 骨架 + 3 道样例题 + 实时盯写 + 提交两关判定
- [x] M2：构建脚本抓取全量 Hot 100（leetcode.cn GraphQL 题单 + 官方题解，每题选定标准方法并配思路/三级提示）
- [ ] M3：AI 幽灵字补全、看提示计数标色等体验打磨
- 二期（明确推后）：断点调试、真实测试用例运行

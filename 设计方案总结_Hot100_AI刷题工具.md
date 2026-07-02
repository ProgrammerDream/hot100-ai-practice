# Hot 100 AI 刷题工具 · 设计方案总结

> 来源：2026-07 需求头脑风暴录音 + grill-me 追问定案 + GitHub 开源调研（三路并行，关键结论均经实测或官方文档验证）。
> 定位一句话：**"日抛型"单 HTML 刷题工具——左题面右编辑器，AI 拿题解当上下文实时盯着你写，思路一偏立刻纠正，不跑测试用例、只判逻辑，目标 10 天把 Hot 100 刷成肌肉记忆。**

---

## 一、项目定位与原则（来自录音共识）

| 原则 | 说明 |
|---|---|
| 只做 Hot 100 | 不扩题库、不定向大厂题，"一共就 100 道，已经很精辟了" |
| 只给最优解 | 不讲暴力解、不讲渐进优化，直接背最优板子；AI 检测到写暴力立刻拦 |
| 不做真判题 | 不跑测试用例、不对拍，AI 对比题解判"逻辑对不对"即可 |
| 速度压倒一切 | 校验反馈必须快，"写半天才发现错了累死人" |
| 日抛软件 | 只有自己人用，刷完即弃；一切设计向"零部署、发个文件就能跑"倾斜 |
| 二级需求推后 | Debug/断点调试、真实测试用例运行 → 全部二期再说，先把一级做出来 |

## 二、已拍板的七个关键决策（grill-me 定案）

| # | 问题 | 决策 |
|---|---|---|
| 1 | 部署形态 | **单 HTML 文件 + 用户自填 API Key**（存 localStorage）。零依赖，发文件就能跑；不做本地服务、不做共用中转 |
| 2 | 编辑器内核 | **Monaco Editor**（VS Code 同款，LeetCode 官方同选型） |
| 3 | 题解数据源 | **网络搜集 Hot 100 题号清单 + LeetCode 官方渠道（MCP/GraphQL）拉题面题解**；调研后补充：doocs/leetcode 作题解主源（见 §五） |
| 4 | AI 触发边界 | **停顿防抖（~800ms）+ 整行（回车）触发**，替代录音里"每 2 字符调一次"（500 字符 = 250 次调用，乱闪且烧钱；防抖+整行砍掉 95% 调用量，手感仍是"实时"） |
| 5 | 模型选型 | **双模型分工**：快模型逐次盯写，强模型提交后终判+讲解 |
| 6 | 判对标准 | **结构化两关判定**：①算法思路与题解一致 ②边界条件覆盖。两关全过才算 Accepted，每关给一句话理由。**明确不判复杂度**——判"最优复杂度"会让 AI 脱离题解自由发挥（如题解用 O(n) 数组，AI 却按 O(1) 临时变量的标准挑刺），一切以题解为唯一基准 |
| 7 | 开源复用度 | **只借库和 UI 参考，不 fork 整套**。代码层只引 Monaco 等成熟库；架构与 UI 参考开源项目设计；保住单文件零构建 |

## 三、总体架构

```
┌─────────────────── 构建期（一次性，本机跑脚本） ───────────────────┐
│  leetcode.cn GraphQL (studyPlanV2Detail: top-100-liked)          │
│    → Hot 100 题单（18 分类 × 题号/标题/难度，匿名可查，已实测）      │
│  doocs/leetcode (36k star, 每题一份中文 Markdown 题解)             │
│    → 按题号过滤出 100 篇最优题解                                   │
│  ══> 打包成 problems.json 内嵌进单 HTML                            │
│  ⚠️ leetcode.cn 不放行 CORS（已实测），运行时浏览器直调走不通，      │
│     所以题库必须构建期抓好打包，这是硬约束不是偏好                    │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────── 运行期（单 HTML，零后端） ──────────────────────┐
│  ┌─────────────┐  ┌──────────────────────────┐                   │
│  │ 左：题面区    │  │ 右上：Monaco 编辑器 (C++)  │                   │
│  │ · 题目描述   │  │  · CDN AMD 零构建集成      │                   │
│  │ · 分层 Hint  │  │  · 自定义补全 Provider     │                   │
│  │   (4级折叠)  │  ├──────────────────────────┤                   │
│  │ · 题目列表   │  │ 右下：AI 反馈区 + 提交结果  │                   │
│  └─────────────┘  └──────────────────────────┘                   │
│         │                    │                                    │
│         └── 题面+题解 塞 system prompt ──┐                         │
│                                        ▼                         │
│   浏览器 fetch 直调（三家均实测放行 CORS）：                          │
│   · 快模型：百炼 qwen-flash（126 t/s）→ 逐次偏离判定                │
│   · 强模型：DeepSeek v4-flash 思考模式 → 提交终判 + 深度讲解         │
│   · 兜底：硅基流动免费 Qwen3-8B（Key 用完时零成本降级）              │
└──────────────────────────────────────────────────────────────────┘
```

## 四、模块设计

### 4.1 编辑器层（Monaco）

- **集成方式**：jsdelivr CDN `monaco-editor@0.53.0/min/vs/loader.js`，官方 AMD 路线，单 `<script>` 零构建（锁版本号）。注意配 `self.MonacoEnvironment.getWorkerUrl` 用 blob 代理 worker，避免跨域降级。
- **C++ 能力边界**：内置 Monarch 高亮 + 括号匹配 + 词法级 `wordBasedSuggestions` 开箱可用；**放弃 clangd-WASM 语义补全**（需 SharedArrayBuffer/COOP+COEP 响应头 + 数十 MB WASM + 构建链，与单 HTML 硬冲突）。
- **自定义补全**（`registerCompletionItemProvider('cpp', ...)`，静态词表几十行代码搞定，正是录音要的效果）：
  - `triggerCharacters: ['#']` → 自动补 `#include <vector>` 等常用头文件清单；
  - snippet 模板补全：`un` → `unordered_map<$1,$2>`、`fo` → for 循环骨架、刷题模板头；
  - STL 常用符号硬编码词表（`push_back`、`lower_bound`…），性价比远高于 LSP。
- **AI 能力挂点**（三个 Monaco 官方 API，模式抄 monacopilot，实现走前端直连）：
  - 幽灵字补全：`registerInlineCompletionsProvider` + `inlineSuggest:{enabled:true}`；
  - 思路偏离波浪线：`monaco.editor.setModelMarkers(model, 'ai-lint', [...])`——AI 返回行号 JSON 直接渲染，悬停自动展示提示；
  - 选中讲解：`registerHoverProvider` 返回 Markdown。

### 4.2 AI 实时校验层（核心卖点）

- **触发**（决策 #4 落地）：停顿 ~800ms 防抖 **或** 回车整行，双条件触发一次全文校验；参考 Continue.dev 的请求生命周期管理——新请求发出前**取消上一个未完成请求**，光标回到已校验位置直接复用缓存（抄 monacopilot 的位置缓存）。
- **上下文组织**（抄 monacopilot + Continue 结论）：不发 diff，发**全文（≤100 行截断）**；题面 + 最优题解 + 判定规则固定放 system prompt（每题切换时重建会话）。
- **结构化返回**（抄 PR-Agent 的 reviewer schema，JSON mode 非流式）：

  ```json
  {
    "on_track": true,
    "issues": [
      { "start_line": 5, "end_line": 7, "severity": "warning",
        "hint": "题解这一步用的是 unordered_map 查找，你在写遍历查找，回到板子上" }
    ],
    "hint_level": 1
  }
  ```

  `issues` 直接映射成 `setModelMarkers` 波浪线；`on_track=false` 时右下反馈区亮红提示"思路偏了，回到板子上"。仅提交后的完整讲解用流式输出。
- **暴力解拦截**：system prompt 明确规则——检测到朝暴力/次优方向写（如该用哈希表却在写双重循环），立即 `on_track=false` 并给出最优方向提示，不等写完。

### 4.3 提交判定（决策 #6 落地）

提交 → 强模型按固定清单出结构化两关结果：

| 关 | 判什么 | 输出 |
|---|---|---|
| ① 思路 | 算法骨架与题解一致（变量名不同不算偏） | pass/fail + 一句话理由 |
| ② 边界 | 空输入/单元素/溢出/重复元素等覆盖 | pass/fail + 漏了哪条 |

**不判复杂度**：system prompt 明确禁止 AI 评价时间/空间复杂度是否"最优"。原因：复杂度判定会诱导 AI 发散——题解给的大数组是 O(n)，理论上临时变量可退化到 O(1)，AI 一旦按"最优"标准挑刺就偏离了题解基准；本项目的正确性定义只有一条：**和题解一样**。

两关全绿 → 绿色 **Accepted** + 撒花动画（confetti，抄 leetcode-clone-youtube）；任一红 → 对应关的具体理由 + 修改方向。状态色板抄青岛 OJ 语义：绿 AC / 红 WA / 橙 待优化。

### 4.4 UI 层（参考不 fork）

- **布局**：抄 burakorkmez/leetcode-clone-youtube 的三区结构——左题面 / 右上编辑器 / 右下 AI 反馈+提交结果，左右 50/50 可拖拽分栏（原生 CSS resize 或几十行 JS 实现 split，不引 React）。
- **分层 Hint**（左栏题面下方，原生 `<details>` 折叠面板即可）：四级递进——**Hint1 题型与策略 → Hint2 该用的算法/数据结构 → Hint3 关键洞察 → 完整题解**；记录"看提示数"，看得越多该题在列表里标色越深，复刷时优先。
- **题目列表**：按 Hot 100 官方 18 分类分组，标已过/未过/看过题解三态；顶栏左右箭头切题 + 随机抽题按钮（录音原话"随机出个题目"）。
- **主题**：深色单主题（LeetCode 夜间模式配色），不做明暗切换——日抛软件不过度设计。

### 4.5 数据层（决策 #3 落地 + 调研修正）

- **题单**：`POST leetcode.cn/graphql`，query `studyPlanV2Detail(planSlug:"top-100-liked")`，匿名 200（已实测），返回 18 分类 × 题号/中文标题/难度。
- **题面**：同 GraphQL `question(titleSlug){translatedContent}`，匿名可查。
- **题解主源**：**doocs/leetcode**（36k star，`solution/0000-0099/0001.Two Sum/README.md` 每题一份格式统一的中文 Markdown，含思路+代码）按 Hot 100 题号过滤抽取；比让 AI 现生成可靠，比纯人工整理快。
- **开发期辅助**：jinzcdev/leetcode-mcp-server（支持 cn 站，题面/题解查询免登录）用于抓取脚本开发与抽查校对；JacobLinCool/leetcode-query（内置限流 20 req/10s）可作抓取脚本底层。
- **产物**：`problems.json`（题号、分类、题面 HTML、hints[]、最优题解 Markdown；不含复杂度标注——判定不涉及复杂度，见 §4.3）→ 构建脚本内嵌进单 HTML。排除 alfa-leetcode-api（不支持 cn 站，拿不到中文）。

### 4.6 模型接入层（决策 #5 落地，CORS 均已实测）

| 角色 | 供应商/模型 | 依据 |
|---|---|---|
| 快模型（逐次盯写） | 阿里云百炼 `qwen-flash` | 126.7 t/s 实测最快，首字 0.96s，输入低至 ¥0.2/M，CORS ✅ |
| 强模型（终判+讲解） | DeepSeek `deepseek-v4-flash` 思考模式 | 输出 $0.28/M，CORS ✅（注意：deepseek-chat/reasoner 2026-07-24 起映射到 v4-flash） |
| 免费兜底 | 硅基流动 `Qwen3-8B` | 免费档 ¥0，53 t/s 慢但零成本，CORS ✅ |

- 三家全兼容 OpenAI Chat Completions 格式 → 统一一个 `callLLM(baseURL, key, model, messages)`。
- 设置页：两组（快/强）`baseURL + model + apiKey` 可配置，兼容任何 OpenAI 格式接口；Key 存 localStorage，页面明示"Key 只存本机浏览器"。
- 录音里点名的 gpt-oss 不写死：国内直连 Groq/OpenRouter 不稳，若某人有可用渠道，填自定义 baseURL 即可接入——配置化兜住了这个分歧。

## 五、开源项目借鉴清单（借什么 / 不借什么）

| 项目 | star 量级 | 借 | 不借 |
|---|---|---|---|
| microsoft/monaco-editor | ~40k | CDN AMD 零构建集成、cpp 高亮、三个 AI 挂点 API | ESM/bundler 路线 |
| arshad-yaseen/monacopilot | ~300 | onIdle 触发 + 光标缓存 + relatedFiles 塞题解的整套模式（有 CDN global 构建） | 强制自建后端 endpoint |
| zsodur/monaco-editor-copilot | ~100 | 前端直连 OpenAI 兼容接口（key+baseURL 进前端）的做法 | Ctrl+B 手动触发交互 |
| continuedev/continue | ~20k+ | 防抖/取消上一请求/位置复用的请求生命周期 | 整个 IDE 插件体系 |
| qodo-ai/pr-agent | ~7k+ | LLM 结构化输出 schema + 行号定位做法 | PR/diff 工作流 |
| burakorkmez/leetcode-clone-youtube | ~300 | 三区布局、可拖分栏、Accepted 撒花 | Next.js/Firebase 全家桶 |
| QingdaoU/OnlineJudge | ~6.5k | 判题状态色板语义（绿AC/红WA/橙TLE） | 整套后端/布局 |
| HimitZH/HOJ | ~900 | "自测→提交"两段式按钮交互 | SpringCloud 全栈 |
| doocs/leetcode | ~36k | 每题中文 Markdown 题解，直接作数据主源 | — |
| jinzcdev/leetcode-mcp-server | — | 开发期抓题面/题解 | 运行时依赖 |
| guyutongxue/clangd-in-browser | ~70 | 结论参考：证明可行但成本不匹配 | 整个方案（与单 HTML 冲突，弃） |
| IliaLarchenko/Interviewer | — | "只引导不给答案、分级提示"的面试官 prompt 人设 | 语音/整站 |

## 六、风险与硬约束

1. **leetcode.cn 无 CORS**（实测）→ 题库只能构建期打包，运行时不做任何 leetcode.cn 请求。题面若有版权顾虑：自用日抛，风险自担且极小。
2. **Monaco worker 跨域**：CDN 加载需 `getWorkerUrl` blob 代理，否则高亮 worker 降级（功能仍在，性能提示）。
3. **API Key 安全**：单 HTML 自填 Key 是拍板决策；Key 永不写进文件本体，只在 localStorage。发给别人的 HTML 干净无 Key。
4. **成本量级**：按防抖+整行触发，一道题约 20-40 次快模型调用 × 全文 ≤100 行上下文，qwen-flash 单题成本在分币级；100 道题刷三遍也在几十元内。若用硅基流动免费档则为零。
5. **AI 判定飘**：两关结构化 schema + 每关一句话理由，比自由心证稳；仍可能偶发误判，UI 上给"我不服，重判"按钮（重发一次强模型）兜底。
6. **弃用时间点**：DeepSeek chat/reasoner 端点 2026-07-24 映射到 v4-flash，方案里直接用新模型名。

## 七、里程碑

- **M1（先跑起来）**：单 HTML 骨架 = Monaco CDN 集成 + 内嵌 3 道样例题 + 快模型盯写（防抖+整行、波浪线）+ 提交两关判定。验收：本地双击打开、填 Key、完整刷一道两数之和。
- **M2（数据全量）**：构建脚本落地（GraphQL 题单 + doocs 题解 → problems.json 100 题全量内嵌）+ 分层 Hint + 题目列表三态 + 撒花。
- **M3（体验打磨）**：# 补 include、snippet 补全、幽灵字 AI 补全、随机抽题、看提示计数标色。
- **二期（明确推后，录音共识）**：断点调试、真实测试用例运行、对拍。

---
*决策快照：7 项定案见 §二；后续如推翻任何一项，改此文档而不是口头传。*

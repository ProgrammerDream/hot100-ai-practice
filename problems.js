/* 本文件由 scripts/build-problems.js 生成（数据源：leetcode.cn top-100-liked 题单 + 官方题解），勿手改。 */
window.HOT100_PROBLEMS = [
 {
  "id": 1,
  "title": "1. 两数之和",
  "category": "哈希",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给定一个整数数组 <code>nums</code>&nbsp;和一个整数目标值 <code>target</code>，请你在该数组中找出 <strong>和为目标值 </strong><em><code>target</code></em>&nbsp; 的那&nbsp;<strong>两个</strong>&nbsp;整数，并返回它们的数组下标。</p>\n\n<p>你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。</p>\n\n<p>你可以按任意顺序返回答案。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,7,11,15], target = 9\n<strong>输出：</strong>[0,1]\n<strong>解释：</strong>因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,2,4], target = 6\n<strong>输出：</strong>[1,2]\n</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,3], target = 6\n<strong>输出：</strong>[0,1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>只会存在一个有效答案</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以想出一个时间复杂度小于 <code>O(n<sup>2</sup>)</code> 的算法吗？</p>",
  "hints": [
   "题型是「查找配对」：一次遍历，边走边记住已经见过的数，问自己\"我需要的另一半出现过吗\"。",
   "用 unordered_map&lt;int,int&gt; 存「值 → 下标」，查询是 O(1)。",
   "遍历到 nums[i] 时，<strong>先</strong>查 target - nums[i] 是否已在表里：在就直接返回两个下标；不在再把 nums[i] 存进表。先查后存，天然避免用到自己。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> hashtable;\n        for (int i = 0; i < nums.size(); ++i) {\n            auto it = hashtable.find(target - nums[i]); // 先查：我需要的另一半是否已出现\n            if (it != hashtable.end()) {\n                return {it->second, i};\n            }\n            hashtable[nums[i]] = i; // 后存：保证不会用到自己\n        }\n        return {};\n    }\n};",
  "solutionText": "一次遍历 + 哈希表。遍历到每个数时先在表中查「target 减去它」是否出现过：出现过则答案就是表中记的下标和当前下标；没出现则把当前数和下标存入表。先查后存保证不会把同一个元素用两次，也天然处理了 [3,3] 这种重复值用例。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};"
 },
 {
  "id": 49,
  "title": "49. 字母异位词分组",
  "category": "哈希",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个字符串数组，请你将 <span data-keyword=\"anagram\">字母异位词</span> 组合在一起。可以按任意顺序返回结果列表。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入:</strong> strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]</p>\n\n<p><strong>输出: </strong>[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]</p>\n\n<p><strong>解释：</strong></p>\n\n<ul>\n\t<li>在 strs 中没有字符串可以通过重新排列来形成 <code>\"bat\"</code>。</li>\n\t<li>字符串 <code>\"nat\"</code> 和 <code>\"tan\"</code> 是字母异位词，因为它们可以重新排列以形成彼此。</li>\n\t<li>字符串 <code>\"ate\"</code>&nbsp;，<code>\"eat\"</code>&nbsp;和 <code>\"tea\"</code> 是字母异位词，因为它们可以重新排列以形成彼此。</li>\n</ul>\n</div>\n\n<p><strong>示例 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入:</strong> strs = [\"\"]</p>\n\n<p><strong>输出: </strong>[[\"\"]]</p>\n</div>\n\n<p><strong>示例 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入:</strong> strs = [\"a\"]</p>\n\n<p><strong>输出: </strong>[[\"a\"]]</p>\n</div>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= strs.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= strs[i].length &lt;= 100</code></li>\n\t<li><code>strs[i]</code>&nbsp;仅包含小写字母</li>\n</ul>",
  "hints": [
   "题型是「分组归类」：为每个字符串设计一个\"规范化签名\"，签名相同的天然是一组。",
   "用 unordered_map&lt;string, vector&lt;string&gt;&gt; 存「签名 → 该组所有原始字符串」。",
   "签名就是把字符串的<strong>副本</strong> sort 一遍；遍历 strs 做 mp[key].emplace_back(str)，最后把每个桶的 vector 收进答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> mp;\n        for (string& str: strs) {\n            string key = str;\n            sort(key.begin(), key.end()); // 排序后的副本作为分组的键，原串不动\n            mp[key].emplace_back(str);\n        }\n        vector<vector<string>> ans;\n        for (auto it = mp.begin(); it != mp.end(); ++it) {\n            ans.emplace_back(it->second);\n        }\n        return ans;\n    }\n};",
  "solutionText": "给每个字符串排序得到一个「签名」：互为字母异位词的串排序结果必然相同，因此用哈希表把「排序后的键 → 该组所有原串」归到同一个桶里，最后收集所有桶即为答案。易错点：排序的是键的副本，原串要原样放入桶中，不能把原串排了序。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        \n    }\n};"
 },
 {
  "id": 128,
  "title": "128. 最长连续序列",
  "category": "哈希",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个未排序的整数数组 <code>nums</code> ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。</p>\n\n<p>请你设计并实现时间复杂度为&nbsp;<code>O(n)</code><em> </em>的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [100,4,200,1,3,2]\n<strong>输出：</strong>4\n<strong>解释：</strong>最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,3,7,2,5,8,4,6,0,1]\n<strong>输出：</strong>9\n</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,0,1,2]\n<b>输出：</b>3\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>",
  "hints": [
   "题型是「哈希去重 + 序列起点判定」：不用排序，靠 O(1) 查询判断一个数的邻居在不在。",
   "用 unordered_set&lt;int&gt; 存所有数；关键不变量：<strong>只从 num-1 不在集合里的\"序列起点\"开始</strong>向右数。",
   "对每个起点 num，while (set.count(currentNum + 1)) 就 currentNum++、长度++，用最大长度更新答案。没有起点剪枝会 O(n²) 超时。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        unordered_set<int> num_set;\n        for (const int& num : nums) {\n            num_set.insert(num);\n        }\n\n        int longestStreak = 0;\n\n        for (const int& num : num_set) {\n            if (!num_set.count(num - 1)) { // 只从序列起点出发，保证整体 O(n)\n                int currentNum = num;\n                int currentStreak = 1;\n\n                while (num_set.count(currentNum + 1)) {\n                    currentNum += 1;\n                    currentStreak += 1;\n                }\n\n                longestStreak = max(longestStreak, currentStreak);\n            }\n        }\n\n        return longestStreak;\n    }\n};",
  "solutionText": "先把所有数放进 unordered_set 去重。遍历集合，只有当 num-1 不在集合中（即 num 是一段连续序列的起点）才向右 while 查 num+1、num+2… 统计长度并更新最大值。「只从起点出发」的剪枝让每个数最多被访问常数次，整体 O(n)；漏掉它会退化成 O(n²) 超时。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 283,
  "title": "283. 移动零",
  "category": "双指针",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给定一个数组 <code>nums</code>，编写一个函数将所有 <code>0</code> 移动到数组的末尾，同时保持非零元素的相对顺序。</p>\n\n<p><strong>请注意</strong>&nbsp;，必须在不复制数组的情况下原地对数组进行操作。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = <code>[0,1,0,3,12]</code>\n<strong>输出:</strong> <code>[1,3,12,0,0]</code>\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = <code>[0]</code>\n<strong>输出:</strong> <code>[0]</code></pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示</strong>:</p>\n\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup>&nbsp;&lt;= nums[i] &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>进阶：</b>你能尽量减少完成的操作次数吗？</p>",
  "hints": [
   "题型是「原地双指针」：一次遍历把非零数依次压到前面，0 自然被挤到末尾。",
   "两个指针分工：right 负责扫描每个元素，left 指向下一个非零数该放的位置；不变量是 left 左边全非零、[left, right) 全是 0。",
   "遍历 right，若 nums[right] != 0 就 swap(nums[left], nums[right]) 再 left++；right 每步都前进。交换而不是覆盖，保证 0 被留在后面。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int n = nums.size(), left = 0, right = 0;\n        while (right < n) {\n            if (nums[right]) {\n                swap(nums[left], nums[right]); // 不变量：left 左边全非零且保持原相对顺序\n                left++;\n            }\n            right++;\n        }\n    }\n};",
  "solutionText": "双指针一次遍历：right 负责扫描，left 指向「下一个非零数该放的位置」。遇到非零就 swap(nums[left], nums[right]) 并 left++。不变量：left 左侧全非零且保持原相对顺序，[left, right) 全是 0，交换恰好把 0 换到后面，原地完成。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 11,
  "title": "11. 盛最多水的容器",
  "category": "双指针",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个长度为 <code>n</code> 的整数数组&nbsp;<code>height</code>&nbsp;。有&nbsp;<code>n</code>&nbsp;条垂线，第 <code>i</code> 条线的两个端点是&nbsp;<code>(i, 0)</code>&nbsp;和&nbsp;<code>(i, height[i])</code>&nbsp;。</p>\n\n<p>找出其中的两条线，使得它们与&nbsp;<code>x</code>&nbsp;轴共同构成的容器可以容纳最多的水。</p>\n\n<p>返回容器可以储存的最大水量。</p>\n\n<p><strong>说明：</strong>你不能倾斜容器。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><img alt=\"\" src=\"https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg\" /></p>\n\n<pre>\n<strong>输入：</strong>[1,8,6,2,5,4,8,3,7]\n<strong>输出：</strong>49 \n<strong>解释：</strong>图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为&nbsp;49。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>height = [1,1]\n<strong>输出：</strong>1\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「双指针贪心」：从最宽的两端开始，每次收缩一侧指针，O(n) 内找最大面积。",
   "面积 = min(height[l], height[r]) × (r - l)，由<strong>短板</strong>决定；关键结论：只有移动较矮的一侧，面积才可能变大。",
   "while (l &lt; r)：先算当前面积更新 ans，再比较两端高度，height[l] &lt;= height[r] 就 ++l，否则 --r。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int l = 0, r = height.size() - 1;\n        int ans = 0;\n        while (l < r) {\n            int area = min(height[l], height[r]) * (r - l);\n            ans = max(ans, area);\n            if (height[l] <= height[r]) { // 移动较矮的一侧，面积才可能变大\n                ++l;\n            }\n            else {\n                --r;\n            }\n        }\n        return ans;\n    }\n};",
  "solutionText": "左右指针从两端相向收缩：每步先用 min(height[l], height[r]) × (r-l) 更新答案，再移动较矮一侧的指针。理由：容量由短板决定，若移动较高一侧，宽度变小而短板不可能变高，面积必不增，所以舍弃这些状态不会漏掉最优解；两侧相等时移哪边都行。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};"
 },
 {
  "id": 15,
  "title": "15. 三数之和",
  "category": "双指针",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> ，判断是否存在三元组 <code>[nums[i], nums[j], nums[k]]</code> 满足 <code>i != j</code>、<code>i != k</code> 且 <code>j != k</code> ，同时还满足 <code>nums[i] + nums[j] + nums[k] == 0</code> 。请你返回所有和为 <code>0</code> 且不重复的三元组。</p>\n\n<p><strong>注意：</strong>答案中不可以包含重复的三元组。</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [-1,0,1,2,-1,-4]\n<strong>输出：</strong>[[-1,-1,2],[-1,0,1]]\n<strong>解释：</strong>\nnums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。\n不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。\n注意，输出的顺序和三元组的顺序并不重要。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,1,1]\n<strong>输出：</strong>[]\n<strong>解释：</strong>唯一可能的三元组和不为 0 。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,0,0]\n<strong>输出：</strong>[[0,0,0]]\n<strong>解释：</strong>唯一可能的三元组和为 0 。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;= 3000</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>",
  "hints": [
   "题型是「排序 + 双指针」：排序后固定一个数，剩下两个数在有序区间上单调移动找和为 0，避免 O(n³)。",
   "关键不变量：固定 first 后，second 增大时可行的 third 只会向左走，所以 third 指针全程<strong>单调不回退</strong>，两层合起来是 O(n)。",
   "每一层枚举遇到与上一次相同的值就 continue 去重；内层 while (second &lt; third && nums[second] + nums[third] &gt; -nums[first]) 就 --third，相遇 break，相等则收入答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        int n = nums.size();\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> ans;\n        // 枚举 a\n        for (int first = 0; first < n; ++first) {\n            // 需要和上一次枚举的数不相同\n            if (first > 0 && nums[first] == nums[first - 1]) {\n                continue;\n            }\n            // c 对应的指针初始指向数组的最右端\n            int third = n - 1;\n            int target = -nums[first];\n            // 枚举 b\n            for (int second = first + 1; second < n; ++second) {\n                // 需要和上一次枚举的数不相同\n                if (second > first + 1 && nums[second] == nums[second - 1]) {\n                    continue;\n                }\n                // 需要保证 b 的指针在 c 的指针的左侧\n                while (second < third && nums[second] + nums[third] > target) {\n                    --third;\n                }\n                // 如果指针重合，随着 b 后续的增加\n                // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环\n                if (second == third) {\n                    break;\n                }\n                if (nums[second] + nums[third] == target) {\n                    ans.push_back({nums[first], nums[second], nums[third]});\n                }\n            }\n        }\n        return ans;\n    }\n};",
  "solutionText": "先排序，外层枚举 a；内层枚举 b 的同时让 c 的指针 third 从右端单调左移——排序后 b 增大则满足 b+c=-a 的 c 必减小，故 third 全程不回退，双指针相遇即 break，整体 O(n²)。去重全靠排序：三个位置都跳过与上一次枚举相同的值，保证不输出重复三元组。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 42,
  "title": "42. 接雨水",
  "category": "双指针",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>给定&nbsp;<code>n</code> 个非负整数表示每个宽度为 <code>1</code> 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><img src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png\" style=\"height: 161px; width: 412px;\" /></p>\n\n<pre>\n<strong>输入：</strong>height = [0,1,0,2,1,0,1,3,2,1,2,1]\n<strong>输出：</strong>6\n<strong>解释：</strong>上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 \n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>height = [4,2,0,3,2,5]\n<strong>输出：</strong>9\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>5</sup></code></li>\n</ul>",
  "hints": [
   "题型是「按列接水」：每一列能接的水 = min(左边最高, 右边最高) - 当前高度，目标是省掉两个预处理数组。",
   "双指针 left/right 相向而行，同时维护 leftMax/rightMax；关键不变量：当 height[left] &lt; height[right] 时，left 处的短板必是 leftMax。",
   "while (left &lt; right)：先用两端高度更新 leftMax/rightMax，哪侧矮就结算哪侧（累加 xMax - height[x]），然后那侧指针向内移一步。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int ans = 0;\n        int left = 0, right = height.size() - 1;\n        int leftMax = 0, rightMax = 0;\n        while (left < right) {\n            leftMax = max(leftMax, height[left]);\n            rightMax = max(rightMax, height[right]);\n            if (height[left] < height[right]) { // 哪侧矮结算哪侧：此时 left 处水量只由 leftMax 决定\n                ans += leftMax - height[left];\n                ++left;\n            } else {\n                ans += rightMax - height[right];\n                --right;\n            }\n        }\n        return ans;\n    }\n};",
  "solutionText": "每列的水 = min(左右两侧最高) - 自身高度。双指针 left、right 相向而行并维护 leftMax、rightMax：当 height[left] < height[right] 时，left 处短板必是 leftMax（右边有更高的墙兜底），累加 leftMax - height[left] 并 left++，否则对称结算右侧。O(n) 时间、O(1) 空间。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        \n    }\n};"
 },
 {
  "id": 3,
  "title": "3. 无重复字符的最长子串",
  "category": "滑动窗口",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个字符串 <code>s</code> ，请你找出其中不含有重复字符的&nbsp;<strong>最长 <span data-keyword=\"substring-nonempty\">子串</span></strong><strong>&nbsp;</strong>的长度。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"abcabcbb\"\n<strong>输出: </strong>3 \n<strong>解释:</strong> 因为无重复字符的最长子串是 <code>\"abc\"</code>，所以其长度为 3。注意 \"bca\" 和 \"cab\" 也是正确答案。\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"bbbbb\"\n<strong>输出: </strong>1\n<strong>解释: </strong>因为无重复字符的最长子串是 <code>\"b\"</code>，所以其长度为 1。\n</pre>\n\n<p><strong>示例 3:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"pwwkew\"\n<strong>输出: </strong>3\n<strong>解释: </strong>因为无重复字符的最长子串是&nbsp;<code>\"wke\"</code>，所以其长度为 3。\n&nbsp;    请注意，你的答案必须是 <strong>子串 </strong>的长度，<code>\"pwke\"</code>&nbsp;是一个<em>子序列，</em>不是子串。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code>&nbsp;由英文字母、数字、符号和空格组成</li>\n</ul>",
  "hints": [
   "题型是「滑动窗口」：窗口内维持\"无重复字符\"这一性质，左端右移时右端<strong>不需要回退</strong>。",
   "用 unordered_set&lt;char&gt; occ 表示当前窗口内出现过的字符，insert/erase/count 都是 O(1)。",
   "外层 for 枚举左端 i（i &gt; 0 时先 erase 掉 s[i-1]），内层 while (rk + 1 &lt; n && !occ.count(s[rk+1])) 就 insert 并 ++rk，随后 ans = max(ans, rk - i + 1)。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // 哈希集合，记录每个字符是否出现过\n        unordered_set<char> occ;\n        int n = s.size();\n        // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动\n        int rk = -1, ans = 0;\n        // 枚举左指针的位置，初始值隐性地表示为 -1\n        for (int i = 0; i < n; ++i) {\n            if (i != 0) {\n                // 左指针向右移动一格，移除一个字符\n                occ.erase(s[i - 1]);\n            }\n            while (rk + 1 < n && !occ.count(s[rk + 1])) {\n                // 不断地移动右指针\n                occ.insert(s[rk + 1]);\n                ++rk;\n            }\n            // 第 i 到 rk 个字符是一个极长的无重复字符子串\n            ans = max(ans, rk - i + 1);\n        }\n        return ans;\n    }\n};",
  "solutionText": "滑动窗口 + 哈希集合。枚举左端点 i，右指针 rk 只进不退：每轮先把 s[i-1] 移出集合，再不断右扩直到 s[rk+1] 与窗口内字符重复为止，窗口 [i, rk] 始终无重复，用 rk-i+1 更新答案。易错点：rk 初始为 -1 表示空窗口；两个指针各最多走 n 步，整体 O(n)。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};"
 },
 {
  "id": 438,
  "title": "438. 找到字符串中所有字母异位词",
  "category": "滑动窗口",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定两个字符串&nbsp;<code>s</code>&nbsp;和 <code>p</code>，找到&nbsp;<code>s</code><strong>&nbsp;</strong>中所有&nbsp;<code>p</code><strong>&nbsp;</strong>的&nbsp;<strong><span data-keyword=\"anagram\">异位词</span>&nbsp;</strong>的子串，返回这些子串的起始索引。不考虑答案输出的顺序。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"cbaebabacd\", p = \"abc\"\n<strong>输出: </strong>[0,6]\n<strong>解释:</strong>\n起始索引等于 0 的子串是 \"cba\", 它是 \"abc\" 的异位词。\n起始索引等于 6 的子串是 \"bac\", 它是 \"abc\" 的异位词。\n</pre>\n\n<p><strong>&nbsp;示例 2:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"abab\", p = \"ab\"\n<strong>输出: </strong>[0,1,2]\n<strong>解释:</strong>\n起始索引等于 0 的子串是 \"ab\", 它是 \"ab\" 的异位词。\n起始索引等于 1 的子串是 \"ba\", 它是 \"ab\" 的异位词。\n起始索引等于 2 的子串是 \"ab\", 它是 \"ab\" 的异位词。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length, p.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>s</code>&nbsp;和&nbsp;<code>p</code>&nbsp;仅包含小写字母</li>\n</ul>",
  "hints": [
   "题型是「定长滑动窗口」：异位词的长度固定等于 p.size()，窗口逐格滑动、比较字符构成是否一致。",
   "用两个 vector&lt;int&gt;(26) 分别统计 p 和当前窗口的字母频次，vector 可以直接用 == 整体比较。",
   "先统计前 pLen 个字符并判一次起点 0；此后每滑一格执行 --sCount[s[i]-'a'] 和 ++sCount[s[i+pLen]-'a']，若 sCount == pCount 就把 i+1 收入答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        int sLen = s.size(), pLen = p.size();\n\n        if (sLen < pLen) {\n            return vector<int>();\n        }\n\n        vector<int> ans;\n        vector<int> sCount(26);\n        vector<int> pCount(26);\n        for (int i = 0; i < pLen; ++i) {\n            ++sCount[s[i] - 'a'];\n            ++pCount[p[i] - 'a'];\n        }\n\n        if (sCount == pCount) {\n            ans.emplace_back(0);\n        }\n\n        for (int i = 0; i < sLen - pLen; ++i) {\n            --sCount[s[i] - 'a'];          // 窗口右移一格：左端字符移出\n            ++sCount[s[i + pLen] - 'a'];   // 右端字符移入\n            if (sCount == pCount) {\n                ans.emplace_back(i + 1);\n            }\n        }\n\n        return ans;\n    }\n};",
  "solutionText": "异位词长度固定，用长为 p.size() 的定长滑动窗口。先统计 p 的 26 维字母计数 pCount 和 s 前 pLen 个字符的 sCount，相等则 0 计入答案；之后窗口每右移一格，左端字符计数减一、右端加一，再比较两数组，相等就记录起点 i+1。易错点：s 比 p 短时要先返回空。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        \n    }\n};"
 },
 {
  "id": 560,
  "title": "560. 和为 K 的子数组",
  "category": "子串",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> 和一个整数&nbsp;<code>k</code> ，请你统计并返回 <em>该数组中和为&nbsp;<code>k</code><strong>&nbsp;</strong>的子数组的个数&nbsp;</em>。</p>\n\n<p>子数组是数组中元素的连续非空序列。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,1,1], k = 2\n<strong>输出：</strong>2\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3], k = 3\n<strong>输出：</strong>2\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>-10<sup>7</sup> &lt;= k &lt;= 10<sup>7</sup></code></li>\n</ul>",
  "hints": [
   "题型是「前缀和 + 哈希计数」：子数组和为 k ⇔ 两个前缀和之差为 k，把区间和问题变成一次遍历的查表问题（元素有负数，滑动窗口不可用）。",
   "用 unordered_map&lt;int,int&gt; 存「前缀和的值 → 出现次数」，并预置 mp[0] = 1 兜住从头开始的子数组。",
   "遍历时先 pre += x，再 count += mp[pre - k]（<strong>先查后存</strong>，k=0 时不会把自己算进去），最后 mp[pre]++。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> mp;\n        mp[0] = 1; // 前缀和 0 出现 1 次，兜住从下标 0 开始的子数组\n        int count = 0, pre = 0;\n        for (auto& x: nums) {\n            pre += x;\n            if (mp.find(pre - k) != mp.end()) { // 先查后存，k=0 时不会把自己算进去\n                count += mp[pre - k];\n            }\n            mp[pre]++;\n        }\n        return count;\n    }\n};",
  "solutionText": "前缀和 + 哈希表一次遍历。子数组和为 k 等价于两个前缀和之差为 k：边走边把表中 pre-k 的出现次数累加进答案，再把当前 pre 计入表。关键是预置 mp[0]=1，否则漏掉从下标 0 开始的子数组；先查后存避免 k=0 时把自己算进去。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        \n    }\n};"
 },
 {
  "id": 239,
  "title": "239. 滑动窗口最大值",
  "category": "子串",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>给你一个整数数组 <code>nums</code>，有一个大小为&nbsp;<code>k</code><em>&nbsp;</em>的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 <code>k</code>&nbsp;个数字。滑动窗口每次只向右移动一位。</p>\n\n<p>返回 <em>滑动窗口中的最大值 </em>。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<b>输入：</b>nums = [1,3,-1,-3,5,3,6,7], k = 3\n<b>输出：</b>[3,3,5,5,6,7]\n<b>解释：</b>\n滑动窗口的位置                最大值\n---------------               -----\n[1  3  -1] -3  5  3  6  7       <strong>3</strong>\n 1 [3  -1  -3] 5  3  6  7       <strong>3</strong>\n 1  3 [-1  -3  5] 3  6  7      <strong> 5</strong>\n 1  3  -1 [-3  5  3] 6  7       <strong>5</strong>\n 1  3  -1  -3 [5  3  6] 7       <strong>6</strong>\n 1  3  -1  -3  5 [3  6  7]      <strong>7</strong>\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<b>输入：</b>nums = [1], k = 1\n<b>输出：</b>[1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><b>提示：</b></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup>&nbsp;&lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= k &lt;= nums.length</code></li>\n</ul>",
  "hints": [
   "题型是「滑动窗口求最值」：暴力对每个窗口扫一遍是 O(nk)，想办法让窗口滑动时旧信息可复用，均摊 O(1) 拿到最大值。",
   "用 deque&lt;int&gt; 维护一个<strong>单调递减</strong>队列，存的是<strong>下标</strong>不是值：队首永远是当前窗口最大值的下标，存下标才能判断它是否已滑出窗口。",
   "新元素 nums[i] 入队前，先从队尾弹掉所有 nums[q.back()] &lt;= nums[i] 的下标（它们不可能再当最大值）；入队后若 q.front() &lt;= i - k 就弹队首，此时 nums[q.front()] 即本窗口答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        int n = nums.size();\n        deque<int> q;\n        for (int i = 0; i < k; ++i) {\n            while (!q.empty() && nums[i] >= nums[q.back()]) { // 弹掉队尾更小的元素，保持队列单调递减\n                q.pop_back();\n            }\n            q.push_back(i);\n        }\n\n        vector<int> ans = {nums[q.front()]};\n        for (int i = k; i < n; ++i) {\n            while (!q.empty() && nums[i] >= nums[q.back()]) {\n                q.pop_back();\n            }\n            q.push_back(i);\n            while (q.front() <= i - k) { // 队首下标已滑出窗口左边界则弹出\n                q.pop_front();\n            }\n            ans.push_back(nums[q.front()]);\n        }\n        return ans;\n    }\n};",
  "solutionText": "用存下标的单调递减双端队列维护窗口最大值：新元素入队前先把队尾所有小于等于它的下标弹掉，保证队首始终是当前窗口最大值的下标；窗口右移后若队首下标不大于 i-k 说明已出窗，弹队首。注意队列必须存下标而非值，否则无法判断元素是否滑出窗口。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        \n    }\n};"
 },
 {
  "id": 76,
  "title": "76. 最小覆盖子串",
  "category": "子串",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>给定两个字符串&nbsp;<code>s</code> 和&nbsp;<code>t</code>，长度分别是&nbsp;<code>m</code> 和&nbsp;<code>n</code>，返回 s 中的&nbsp;<strong>最短窗口 <span data-keyword=\"substring-nonempty\">子串</span></strong>，使得该子串包含 <code>t</code> 中的每一个字符（<strong>包括重复字符</strong>）。如果没有这样的子串，返回空字符串<em>&nbsp;</em><code>\"\"</code>。</p>\n\n<p>测试用例保证答案唯一。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"ADOBECODEBANC\", t = \"ABC\"\n<strong>输出：</strong>\"BANC\"\n<strong>解释：</strong>最小覆盖子串 \"BANC\" 包含来自字符串 t 的 'A'、'B' 和 'C'。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"a\", t = \"a\"\n<strong>输出：</strong>\"a\"\n<strong>解释：</strong>整个字符串 s 是最小覆盖子串。\n</pre>\n\n<p><strong>示例 3:</strong></p>\n\n<pre>\n<strong>输入:</strong> s = \"a\", t = \"aa\"\n<strong>输出:</strong> \"\"\n<strong>解释:</strong> t 中两个字符 'a' 均应包含在 s 的子串中，\n因此没有符合条件的子字符串，返回空字符串。</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == s.length</code></li>\n\t<li><code>n == t.length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s</code> 和 <code>t</code> 由英文字母组成</li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>进阶：</strong>你能设计一个在 <code>O(m + n)</code> 时间内解决此问题的算法吗？",
  "hints": [
   "题型是「滑动窗口」：右指针负责扩张、左指针负责收缩，窗口在 s 上滑动，找覆盖 t 的最短窗口。",
   "用两个 unordered_map&lt;char,int&gt;：ori 记录 t 中每个字符的需求量，cnt 记录当前窗口内的计数；窗口「覆盖」t 的条件是每种字符都有 cnt &gt;= ori。",
   "r 右移时若 s[r] 在 ori 中就 ++cnt[s[r]]；一旦满足覆盖，就在保持覆盖的前提下不断 ++l 收缩，每次收缩前用 r - l + 1 更新最短答案的长度 len 和起点 ansL。"
  ],
  "solutionCode": "class Solution {\npublic:\n    unordered_map <char, int> ori, cnt;\n\n    bool check() { // 窗口计数是否已覆盖 t 中每种字符的需求量\n        for (const auto &p: ori) {\n            if (cnt[p.first] < p.second) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    string minWindow(string s, string t) {\n        for (const auto &c: t) {\n            ++ori[c];\n        }\n\n        int l = 0, r = -1;\n        int len = INT_MAX, ansL = -1, ansR = -1;\n\n        while (r < int(s.size())) {\n            if (ori.find(s[++r]) != ori.end()) {\n                ++cnt[s[r]];\n            }\n            while (check() && l <= r) { // 已覆盖时尽量收缩左边界，更新最短答案\n                if (r - l + 1 < len) {\n                    len = r - l + 1;\n                    ansL = l;\n                }\n                if (ori.find(s[l]) != ori.end()) {\n                    --cnt[s[l]];\n                }\n                ++l;\n            }\n        }\n\n        return ansL == -1 ? string() : s.substr(ansL, len);\n    }\n};",
  "solutionText": "滑动窗口 + 两个哈希计数：ori 记 t 中每种字符的需求量，cnt 记窗口内计数。右指针不断扩张，一旦窗口覆盖 t（每种字符 cnt≥ori）就循环收缩左指针，收缩前更新最短长度和起点。易错：t 可含重复字符，判断覆盖须按计数比较而非按种类。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        \n    }\n};"
 },
 {
  "id": 53,
  "title": "53. 最大子数组和",
  "category": "普通数组",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。</p>\n\n<p><strong><span data-keyword=\"subarray-nonempty\">子数组 </span></strong>是数组中的一个连续部分。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [-2,1,-3,4,-1,2,1,-5,4]\n<strong>输出：</strong>6\n<strong>解释：</strong>连续子数组&nbsp;[4,-1,2,1] 的和最大，为&nbsp;6 。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1]\n<strong>输出：</strong>1\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [5,4,-1,7,8]\n<strong>输出：</strong>23\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>如果你已经实现复杂度为 <code>O(n)</code> 的解法，尝试使用更为精妙的 <strong>分治法</strong> 求解。</p>",
  "hints": [
   "题型是「线性 DP」：定义「以第 i 个数<strong>结尾</strong>的最大子数组和」，最终答案是所有位置该值的最大值。",
   "状态只依赖前一个位置，可以滚动成单变量 pre；另设 maxAns 边遍历边取最大，初值用 nums[0] 才能处理全负数用例。",
   "转移方程：pre = max(pre + x, x)——前面那段和为正就接上，否则从 x 另起一段；每步再 maxAns = max(maxAns, pre)。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int pre = 0, maxAns = nums[0];\n        for (const auto &x: nums) {\n            pre = max(pre + x, x); // 以 x 结尾的最大子数组和：接上前一段或另起一段\n            maxAns = max(maxAns, pre);\n        }\n        return maxAns;\n    }\n};",
  "solutionText": "线性 DP：pre 表示「以当前元素结尾的最大子数组和」，转移 pre = max(pre + x, x)——前段有正贡献就接上，否则从 x 另起一段；答案随遍历取所有 pre 的最大值。易错：maxAns 初值取 nums[0]，才能处理全负数数组。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 56,
  "title": "56. 合并区间",
  "category": "普通数组",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>以数组 <code>intervals</code> 表示若干个区间的集合，其中单个区间为 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> 。请你合并所有重叠的区间，并返回&nbsp;<em>一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间</em>&nbsp;。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>intervals = [[1,3],[2,6],[8,10],[15,18]]\n<strong>输出：</strong>[[1,6],[8,10],[15,18]]\n<strong>解释：</strong>区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>intervals = [[1,4],[4,5]]\n<strong>输出：</strong>[[1,5]]\n<strong>解释：</strong>区间 [1,4] 和 [4,5] 可被视为重叠区间。</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<pre>\n<b>输入：</b>intervals = [[4,7],[1,4]]\n<b>输出：</b>[[1,7]]\n<b>解释：</b>区间 [1,4] 和 [4,7] 可被视为重叠区间。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= intervals.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>intervals[i].length == 2</code></li>\n\t<li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「区间排序 + 一次扫描」：先想清楚按什么顺序排序，才能让所有可以合并的区间挨在一起。",
   "按<strong>左端点</strong>升序排序后，维护结果数组 merged，每个新区间只需要与 merged.back() 比较，不用回头看更早的区间。",
   "设当前区间为 [L, R]：若 merged.back()[1] &lt; L 说明不重叠，直接 push；否则合并，merged.back()[1] = max(merged.back()[1], R)，取 max 才能处理区间被包含的情况。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        if (intervals.size() == 0) {\n            return {};\n        }\n        sort(intervals.begin(), intervals.end()); // 按左端点升序，可合并的区间必相邻\n        vector<vector<int>> merged;\n        for (int i = 0; i < intervals.size(); ++i) {\n            int L = intervals[i][0], R = intervals[i][1];\n            if (!merged.size() || merged.back()[1] < L) {\n                merged.push_back({L, R});\n            }\n            else {\n                merged.back()[1] = max(merged.back()[1], R); // 有重叠：右端点取较大者，处理区间包含\n            }\n        }\n        return merged;\n    }\n};",
  "solutionText": "先按左端点排序，可合并的区间必相邻。遍历每个 [L,R]：若结果集为空或最后区间右端点小于 L，不重叠直接加入；否则有重叠，把最后区间右端点更新为 max(旧值, R)。易错：[1,4] 包含 [2,3]，右端点必须取 max 而不能直接覆盖成 R。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};"
 },
 {
  "id": 189,
  "title": "189. 轮转数组",
  "category": "普通数组",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个整数数组 <code>nums</code>，将数组中的元素向右轮转 <code>k</code><em>&nbsp;</em>个位置，其中&nbsp;<code>k</code><em>&nbsp;</em>是非负数。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [1,2,3,4,5,6,7], k = 3\n<strong>输出:</strong> <code>[5,6,7,1,2,3,4]</code>\n<strong>解释:</strong>\n向右轮转 1 步: <code>[7,1,2,3,4,5,6]</code>\n向右轮转 2 步: <code>[6,7,1,2,3,4,5]\n</code>向右轮转 3 步: <code>[5,6,7,1,2,3,4]</code>\n</pre>\n\n<p><strong>示例&nbsp;2:</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [-1,-100,3,99], k = 2\n<strong>输出：</strong>[3,99,-1,-100]\n<strong>解释:</strong> \n向右轮转 1 步: [99,-1,-100,3]\n向右轮转 2 步: [3,99,-1,-100]</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong></p>\n\n<ul>\n\t<li>尽可能想出更多的解决方案，至少有 <strong>三种</strong> 不同的方法可以解决这个问题。</li>\n\t<li>你可以使用空间复杂度为&nbsp;<code>O(1)</code> 的&nbsp;<strong>原地&nbsp;</strong>算法解决这个问题吗？</li>\n</ul>",
  "hints": [
   "题型是「原地数组变换」：不开辅助数组，找一个既能整体搬运又能恢复段内顺序的基本操作。",
   "关键操作是<strong>翻转</strong>（双指针首尾 swap）：整体翻转能把后 k 个搬到前面，代价是两段内部顺序也反了——那就再各自翻一次。",
   "三步走：k %= n 后，先 reverse(0, n-1) 整体翻转，再 reverse(0, k-1) 翻回前 k 个，最后 reverse(k, n-1) 翻回后 n-k 个。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void reverse(vector<int>& nums, int start, int end) {\n        while (start < end) {\n            swap(nums[start], nums[end]);\n            start += 1;\n            end -= 1;\n        }\n    }\n\n    void rotate(vector<int>& nums, int k) {\n        k %= nums.size(); // k 可能大于 n，先取模\n        reverse(nums, 0, nums.size() - 1); // 整体翻转后，再把前 k 个与后 n-k 个各自翻回\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, nums.size() - 1);\n    }\n};",
  "solutionText": "三次翻转原地完成轮转：先整体翻转数组，此时后 k 个元素被搬到了开头但段内顺序反了；再分别翻转前 k 个和后 n-k 个元素，把两段顺序恢复。翻转本身用双指针首尾交换。易错点：k 可能大于 n，必须先 k %= n。时间 O(n)，空间 O(1)。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        \n    }\n};"
 },
 {
  "id": 238,
  "title": "238. 除了自身以外数组的乘积",
  "category": "普通数组",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数数组&nbsp;<code>nums</code>，返回 数组&nbsp;<code>answer</code>&nbsp;，其中&nbsp;<code>answer[i]</code>&nbsp;等于&nbsp;<code>nums</code>&nbsp;中除了&nbsp;<code>nums[i]</code>&nbsp;之外其余各元素的乘积&nbsp;。</p>\n\n<p>题目数据 <strong>保证</strong> 数组&nbsp;<code>nums</code>之中任意元素的全部前缀元素和后缀的乘积都在&nbsp; <strong>32 位</strong> 整数范围内。</p>\n\n<p>请&nbsp;<strong>不要使用除法，</strong>且在&nbsp;<code>O(n)</code> 时间复杂度内完成此题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = <code>[1,2,3,4]</code>\n<strong>输出:</strong> <code>[24,12,8,6]</code>\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [-1,1,0,-3,3]\n<strong>输出:</strong> [0,0,9,0,0]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-30 &lt;= nums[i] &lt;= 30</code></li>\n\t<li>输入&nbsp;<strong>保证</strong> 数组&nbsp;<code>answer[i]</code>&nbsp;在&nbsp; <strong>32 位</strong> 整数范围内</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以在 <code>O(1)</code>&nbsp;的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组&nbsp;<strong>不被视为&nbsp;</strong>额外空间。）</p>",
  "hints": [
   "题型是「前缀 / 后缀分解」：不允许用除法，把「除自身外的乘积」拆成「左侧所有数的积 × 右侧所有数的积」。",
   "左侧前缀积直接存进答案数组：answer[0] = 1，answer[i] = answer[i-1] * nums[i-1]；右侧乘积不需要数组，用一个变量 R 从右往左滚动即可做到 O(1) 额外空间。",
   "第二趟 i 从 n-1 到 0：先 answer[i] *= R，再 R *= nums[i]——顺序不能反，乘入答案那一刻 R 必须恰好是 i 右侧的乘积，不含 nums[i] 自己。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int length = nums.size();\n        vector<int> answer(length);\n\n        // answer[i] 表示索引 i 左侧所有元素的乘积\n        // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1\n        answer[0] = 1;\n        for (int i = 1; i < length; i++) {\n            answer[i] = nums[i - 1] * answer[i - 1];\n        }\n\n        // R 为右侧所有元素的乘积\n        // 刚开始右边没有元素，所以 R = 1\n        int R = 1;\n        for (int i = length - 1; i >= 0; i--) {\n            // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R\n            answer[i] = answer[i] * R;\n            // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上\n            R *= nums[i];\n        }\n        return answer;\n    }\n};",
  "solutionText": "前后缀分解、不用除法：第一趟从左到右把 answer[i] 填成 i 左侧所有数的乘积；第二趟从右到左用变量 R 滚动右侧乘积，先 answer[i] *= R 再 R *= nums[i]，顺序不能反。输出数组不计额外空间，故 O(1)。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 41,
  "title": "41. 缺失的第一个正数",
  "category": "普通数组",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>给你一个未排序的整数数组 <code>nums</code> ，请你找出其中没有出现的最小的正整数。</p>\n请你实现时间复杂度为 <code>O(n)</code> 并且只使用常数级别额外空间的解决方案。\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,0]\n<strong>输出：</strong>3\n<strong>解释：</strong>范围 [1,2] 中的数字都在数组中。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,4,-1,1]\n<strong>输出：</strong>2\n<strong>解释：</strong>1 在数组中，但 2 没有。</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [7,8,9,11,12]\n<strong>输出：</strong>1\n<strong>解释：</strong>最小的正数 1 没有出现。</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>",
  "hints": [
   "题型是「原地哈希」：答案一定落在 [1, n+1] 区间内，要求 O(1) 空间，就把数组本身当哈希表用。",
   "用元素的<strong>符号</strong>做标记：先把所有 &lt;= 0 的数改成 n+1 排除干扰，之后「下标 x-1 处为负」就代表「正整数 x 出现过」。",
   "第二趟对每个 num = abs(nums[i])，若 num &lt;= n 就置 nums[num-1] = -abs(nums[num-1])；第三趟找第一个仍为正的下标 i 返回 i+1，全为负则返回 n+1。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        int n = nums.size();\n        for (int& num: nums) {\n            if (num <= 0) {\n                num = n + 1; // 非正数改成 n+1，使其不参与后续标记\n            }\n        }\n        for (int i = 0; i < n; ++i) {\n            int num = abs(nums[i]);\n            if (num <= n) {\n                nums[num - 1] = -abs(nums[num - 1]); // 值 num 出现过：给下标 num-1 处打负号标记\n            }\n        }\n        for (int i = 0; i < n; ++i) {\n            if (nums[i] > 0) {\n                return i + 1; // 第一个仍为正的位置，说明 i+1 未出现\n            }\n        }\n        return n + 1;\n    }\n};",
  "solutionText": "把数组自身当哈希表：答案必在 [1, n+1]。先把非正数全改成 n+1；再对每个绝对值 num≤n 的数，把下标 num-1 处打负号表示 num 出现过；最后第一个仍为正的位置 i 对应缺失的 i+1，全负返回 n+1。易错：取值须用 abs。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 73,
  "title": "73. 矩阵置零",
  "category": "矩阵",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个&nbsp;<code><em>m</em> x <em>n</em></code> 的矩阵，如果一个元素为 <strong>0 </strong>，则将其所在行和列的所有元素都设为 <strong>0</strong> 。请使用 <strong><a href=\"http://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95\" target=\"_blank\">原地</a></strong> 算法<strong>。</strong></p>\n\n<ul>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg\" style=\"width: 450px; height: 169px;\" />\n<pre>\n<strong>输入：</strong>matrix = [[1,1,1],[1,0,1],[1,1,1]]\n<strong>输出：</strong>[[1,0,1],[0,0,0],[1,0,1]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg\" style=\"width: 450px; height: 137px;\" />\n<pre>\n<strong>输入：</strong>matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]\n<strong>输出：</strong>[[0,0,0,0],[0,4,5,0],[0,3,1,0]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[0].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= matrix[i][j] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong></p>\n\n<ul>\n\t<li>一个直观的解决方案是使用 &nbsp;<code>O(<em>m</em><em>n</em>)</code>&nbsp;的额外空间，但这并不是一个好的解决方案。</li>\n\t<li>一个简单的改进方案是使用 <code>O(<em>m</em>&nbsp;+&nbsp;<em>n</em>)</code> 的额外空间，但这仍然不是最好的解决方案。</li>\n\t<li>你能想出一个仅使用常量空间的解决方案吗？</li>\n</ul>",
  "hints": [
   "题型是「原地标记」：O(m+n) 的行列标记数组可以省掉——矩阵的第一行和第一列本身就能当标记位。",
   "第一行 / 第一列既存数据又当标记会互相污染，所以额外用两个变量 flag_row0、flag_col0 先记录它们<strong>自身</strong>是否含 0。",
   "扫内部（i、j 都从 1 开始）：遇 0 就置 matrix[i][0] = matrix[0][j] = 0；再按这些标记清零内部；<strong>最后</strong>才依据两个 flag 处理第一行和第一列。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        int m = matrix.size();\n        int n = matrix[0].size();\n        int flag_col0 = false, flag_row0 = false; // 先记录第一列 / 第一行自身是否含 0\n        for (int i = 0; i < m; i++) {\n            if (!matrix[i][0]) {\n                flag_col0 = true;\n            }\n        }\n        for (int j = 0; j < n; j++) {\n            if (!matrix[0][j]) {\n                flag_row0 = true;\n            }\n        }\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                if (!matrix[i][j]) {\n                    matrix[i][0] = matrix[0][j] = 0; // 用首行首列作为该行该列需置零的标记\n                }\n            }\n        }\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                if (!matrix[i][0] || !matrix[0][j]) {\n                    matrix[i][j] = 0;\n                }\n            }\n        }\n        if (flag_col0) {\n            for (int i = 0; i < m; i++) {\n                matrix[i][0] = 0;\n            }\n        }\n        if (flag_row0) {\n            for (int j = 0; j < n; j++) {\n                matrix[0][j] = 0;\n            }\n        }\n    }\n};",
  "solutionText": "用首行首列充当标记数组：先用两个布尔变量记录首行首列自身是否含 0；再扫内部，遇 0 就把对应 matrix[i][0]、matrix[0][j] 置 0；然后按标记把内部置零；最后才处理首行首列。顺序不能颠倒，否则标记会被提前污染。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        \n    }\n};"
 },
 {
  "id": 54,
  "title": "54. 螺旋矩阵",
  "category": "矩阵",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个 <code>m</code> 行 <code>n</code> 列的矩阵 <code>matrix</code> ，请按照 <strong>顺时针螺旋顺序</strong> ，返回矩阵中的所有元素。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg\" style=\"width: 242px; height: 242px;\" />\n<pre>\n<strong>输入：</strong>matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>输出：</strong>[1,2,3,6,9,8,7,4,5]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>输入：</strong>matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\n<strong>输出：</strong>[1,2,3,4,8,12,11,10,9,5,6,7]\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 <= m, n <= 10</code></li>\n\t<li><code>-100 <= matrix[i][j] <= 100</code></li>\n</ul>",
  "hints": [
   "题型是「矩阵按层模拟」：把矩阵看成一圈套一圈的洋葱，从最外层开始一圈一圈往里剥。",
   "用四个边界变量 left、right、top、bottom 表示当前层，剥完一层四个变量各向内收缩 1，循环条件是 left &lt;= right && top &lt;= bottom。",
   "每层按顺序收集：上边 (top 行, left→right)、右边 (right 列, top+1→bottom)、下边 (bottom 行, right-1→left+1 反向)、左边 (left 列, bottom→top+1 反向)；后两条边要加 left &lt; right && top &lt; bottom 判断，防止单行 / 单列重复收集。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        if (matrix.size() == 0 || matrix[0].size() == 0) {\n            return {};\n        }\n\n        int rows = matrix.size(), columns = matrix[0].size();\n        vector<int> order;\n        int left = 0, right = columns - 1, top = 0, bottom = rows - 1;\n        while (left <= right && top <= bottom) {\n            for (int column = left; column <= right; column++) {\n                order.push_back(matrix[top][column]);\n            }\n            for (int row = top + 1; row <= bottom; row++) {\n                order.push_back(matrix[row][right]);\n            }\n            if (left < right && top < bottom) { // 该层至少两行两列才走下边和左边，防单行/单列重复\n                for (int column = right - 1; column > left; column--) {\n                    order.push_back(matrix[bottom][column]);\n                }\n                for (int row = bottom; row > top; row--) {\n                    order.push_back(matrix[row][left]);\n                }\n            }\n            left++;\n            right--;\n            top++;\n            bottom--;\n        }\n        return order;\n    }\n};",
  "solutionText": "维护 left、right、top、bottom 四个边界，从外到内逐层遍历：每层按上行→右列→下行→左列收集，走完把四边界各向内收缩一格。易错：下行和左列必须在 left<right 且 top<bottom 时才走，否则单行或单列的层会被重复遍历。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        \n    }\n};"
 },
 {
  "id": 48,
  "title": "48. 旋转图像",
  "category": "矩阵",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个 <em>n&nbsp;</em>×&nbsp;<em>n</em> 的二维矩阵&nbsp;<code>matrix</code> 表示一个图像。请你将图像顺时针旋转 90 度。</p>\n\n<p>你必须在<strong><a href=\"https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95\" target=\"_blank\"> 原地</a></strong> 旋转图像，这意味着你需要直接修改输入的二维矩阵。<strong>请不要 </strong>使用另一个矩阵来旋转图像。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg\" style=\"height: 188px; width: 500px;\" />\n<pre>\n<strong>输入：</strong>matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>输出：</strong>[[7,4,1],[8,5,2],[9,6,3]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg\" style=\"height: 201px; width: 500px;\" />\n<pre>\n<strong>输入：</strong>matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\n<strong>输出：</strong>[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == matrix.length == matrix[i].length</code></li>\n\t<li><code>1 &lt;= n &lt;= 20</code></li>\n\t<li><code>-1000 &lt;= matrix[i][j] &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>",
  "hints": [
   "题型是「原地矩阵变换」：顺时针转 90° 不开辅助数组，可以拆成两次简单的<strong>翻转</strong>操作复合。",
   "先<strong>水平（上下）翻转</strong>：swap(matrix[i][j], matrix[n-1-i][j])，i 只遍历前 n/2 行；再<strong>主对角线翻转</strong>：swap(matrix[i][j], matrix[j][i])，只遍历 j &lt; i 的下三角。",
   "两次翻转的复合就是旋转：matrix[i][j] → matrix[n-1-i][j] → matrix[j][n-1-i]，恰是顺时针 90° 的目标位置；两个循环范围各取一半，否则等于白换。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        int n = matrix.size();\n        // 水平翻转\n        for (int i = 0; i < n / 2; ++i) {\n            for (int j = 0; j < n; ++j) {\n                swap(matrix[i][j], matrix[n - i - 1][j]);\n            }\n        }\n        // 主对角线翻转\n        for (int i = 0; i < n; ++i) {\n            for (int j = 0; j < i; ++j) {\n                swap(matrix[i][j], matrix[j][i]);\n            }\n        }\n    }\n};",
  "solutionText": "顺时针旋转 90° 等价于两次翻转：先水平（上下）翻转，再沿主对角线翻转，复合正好把 matrix[i][j] 送到目标位 matrix[j][n-1-i]。易错：两次翻转各只遍历一半区域（前半行 / 下三角），扫全矩阵会换回原样。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        \n    }\n};"
 },
 {
  "id": 240,
  "title": "240. 搜索二维矩阵 II",
  "category": "矩阵",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>编写一个高效的算法来搜索&nbsp;<code><em>m</em>&nbsp;x&nbsp;<em>n</em></code>&nbsp;矩阵 <code>matrix</code> 中的一个目标值 <code>target</code> 。该矩阵具有以下特性：</p>\n\n<ul>\n\t<li>每行的元素从左到右升序排列。</li>\n\t<li>每列的元素从上到下升序排列。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>示例 1：</b></p>\n<img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/11/25/searchgrid2.jpg\" />\n<pre>\n<b>输入：</b>matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5\n<b>输出：</b>true\n</pre>\n\n<p><b>示例 2：</b></p>\n<img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/11/25/searchgrid.jpg\" />\n<pre>\n<b>输入：</b>matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20\n<b>输出：</b>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= n, m &lt;= 300</code></li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= matrix[i][j] &lt;= 10<sup>9</sup></code></li>\n\t<li>每行的所有元素从左到右升序排列</li>\n\t<li>每列的所有元素从上到下升序排列</li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= target &lt;= 10<sup>9</sup></code></li>\n</ul>",
  "hints": [
   "题型是「有序矩阵查找」：利用每行升序、每列升序的性质，找一个每次比较都能整行或整列排除的起点。",
   "站在<strong>右上角</strong>：该位置是本行最大、本列最小，与 target 比较的结果能唯一决定往左走还是往下走。",
   "维护坐标 (x, y) 从 (0, n-1) 出发：matrix[x][y] &gt; target 则 --y 排除一列；小于则 ++x 排除一行；相等返回 true。循环条件 x &lt; m 且 y &gt;= 0，越界返回 false。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        int m = matrix.size(), n = matrix[0].size();\n        int x = 0, y = n - 1; // 从右上角出发：它是本行最大、本列最小\n        while (x < m && y >= 0) {\n            if (matrix[x][y] == target) {\n                return true;\n            }\n            if (matrix[x][y] > target) {\n                --y;\n            }\n            else {\n                ++x;\n            }\n        }\n        return false;\n    }\n};",
  "solutionText": "从右上角出发的排除法。当前值等于 target 直接返回 true；比 target 大说明它所在的一整列都大，列指针左移；比 target 小说明它所在的一整行都小，行指针下移。每步排除一行或一列，时间 O(m+n)。注意循环条件是 x < m 且 y >= 0，走出边界即说明不存在。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        \n    }\n};"
 },
 {
  "id": 160,
  "title": "160. 相交链表",
  "category": "链表",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给你两个单链表的头节点&nbsp;<code>headA</code> 和 <code>headB</code> ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 <code>null</code> 。</p>\n\n<p>图示两个链表在节点 <code>c1</code> 开始相交<strong>：</strong></p>\n\n<p><a href=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/14/160_statement.png\" target=\"_blank\"><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/14/160_statement.png\" style=\"height:130px; width:400px\" /></a></p>\n\n<p>题目数据 <strong>保证</strong> 整个链式结构中不存在环。</p>\n\n<p><strong>注意</strong>，函数返回结果后，链表必须 <strong>保持其原始结构</strong> 。</p>\n\n<p><strong>自定义评测：</strong></p>\n\n<p><strong>评测系统</strong> 的输入如下（你设计的程序 <strong>不适用</strong> 此输入）：</p>\n\n<ul>\n\t<li><code>intersectVal</code> - 相交的起始节点的值。如果不存在相交节点，这一值为 <code>0</code></li>\n\t<li><code>listA</code> - 第一个链表</li>\n\t<li><code>listB</code> - 第二个链表</li>\n\t<li><code>skipA</code> - 在 <code>listA</code> 中（从头节点开始）跳到交叉节点的节点数</li>\n\t<li><code>skipB</code> - 在 <code>listB</code> 中（从头节点开始）跳到交叉节点的节点数</li>\n</ul>\n\n<p>评测系统将根据这些输入创建链式数据结构，并将两个头节点 <code>headA</code> 和 <code>headB</code> 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 <strong>视作正确答案</strong> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><a href=\"https://assets.leetcode.com/uploads/2018/12/13/160_example_1.png\" target=\"_blank\"><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/05/160_example_1_1.png\" style=\"height:130px; width:400px\" /></a></p>\n\n<pre>\n<strong>输入：</strong>intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3\n<strong>输出：</strong>Intersected at '8'\n<strong>解释：</strong>相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。\n从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。\n在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。\n— 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二个节点和 B 中第三个节点) 是不同的节点。换句话说，它们在内存中指向两个不同的位置，而链表 A 和链表 B 中值为 8 的节点 (A 中<font size=\"1\">第三个</font>节点，B 中第四个节点) 在内存中指向相同的位置。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<p><a href=\"https://assets.leetcode.com/uploads/2018/12/13/160_example_2.png\" target=\"_blank\"><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/05/160_example_2.png\" style=\"height:136px; width:350px\" /></a></p>\n\n<pre>\n<strong>输入：</strong>intersectVal&nbsp;= 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1\n<strong>输出：</strong>Intersected at '2'\n<strong>解释：</strong>相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。\n从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。\n在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。\n</pre>\n\n<p><strong>示例&nbsp;3：</strong></p>\n\n<p><a href=\"https://assets.leetcode.com/uploads/2018/12/13/160_example_3.png\" target=\"_blank\"><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/14/160_example_3.png\" style=\"height:126px; width:200px\" /></a></p>\n\n<pre>\n<strong>输入：</strong>intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2\n<strong>输出：</strong>No intersection\n<strong>解释：</strong>从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。\n由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。\n这两个链表不相交，因此返回 null 。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>listA</code> 中节点数目为 <code>m</code></li>\n\t<li><code>listB</code> 中节点数目为 <code>n</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= skipA &lt;= m</code></li>\n\t<li><code>0 &lt;= skipB &lt;= n</code></li>\n\t<li>如果 <code>listA</code> 和 <code>listB</code> 没有交点，<code>intersectVal</code> 为 <code>0</code></li>\n\t<li>如果 <code>listA</code> 和 <code>listB</code> 有交点，<code>intersectVal == listA[skipA] == listB[skipB]</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你能否设计一个时间复杂度 <code>O(m + n)</code> 、仅用 <code>O(1)</code> 内存的解决方案？</p>",
  "hints": [
   "题型是「链表双指针」：不求长度、不用哈希，想办法让两个指针抹平两条链的长度差后同步走到交点。",
   "关键不变量：pA 走完 A 再走 B，pB 走完 B 再走 A，两条路径总长都是 a+b，所以第二段路上它们会在交点（或 nullptr）对齐相遇。",
   "声明 ListNode *pA = headA, *pB = headB；循环 while (pA != pB)：pA 为空则跳到 headB，否则 pA = pA-&gt;next（pB 对称处理）；循环结束返回 pA，相交点或 nullptr 都被统一覆盖。"
  ],
  "solutionCode": "class Solution {\npublic:\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\n        if (headA == nullptr || headB == nullptr) {\n            return nullptr;\n        }\n        ListNode *pA = headA, *pB = headB;\n        while (pA != pB) {\n            pA = pA == nullptr ? headB : pA->next; // 走完 A 接着走 B：两指针总路程同为 a+b，抹平长度差\n            pB = pB == nullptr ? headA : pB->next;\n        }\n        return pA;\n    }\n};",
  "solutionText": "双指针同速遍历：pA 走完链表 A 后转到 B 的头，pB 走完 B 后转到 A 的头。两者走的总路程都是 a+b，若相交必在交点相遇；不相交则会同时走到 nullptr 而相等退出，返回值恰好就是 nullptr。易错点：是走到 nullptr 才切换到另一条链，不是走到尾节点就切换。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\n        \n    }\n};"
 },
 {
  "id": 206,
  "title": "206. 反转链表",
  "category": "链表",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "给你单链表的头节点 <code>head</code> ，请你反转链表，并返回反转后的链表。\n<div class=\"original__bRMd\">\n<div>\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>输入：</strong>head = [1,2,3,4,5]\n<strong>输出：</strong>[5,4,3,2,1]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg\" style=\"width: 182px; height: 222px;\" />\n<pre>\n<strong>输入：</strong>head = [1,2]\n<strong>输出：</strong>[2,1]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = []\n<strong>输出：</strong>[]\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点的数目范围是 <code>[0, 5000]</code></li>\n\t<li><code>-5000 <= Node.val <= 5000</code></li>\n</ul>\n\n<p> </p>\n\n<p><strong>进阶：</strong>链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？</p>\n</div>\n</div>",
  "hints": [
   "题型是「链表原地反转」：一边遍历，一边把每个节点的 next 掉头指向它的前一个节点。",
   "需要三个指针：prev（已反转部分的头）、curr（当前节点）、next（暂存后继防断链）。不变量：prev 之前的链已全部反转完成。",
   "循环体固定四步：ListNode* next = curr-&gt;next; curr-&gt;next = prev; prev = curr; curr = next。当 curr 为空时返回 prev。"
  ],
  "solutionCode": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr) {\n            ListNode* next = curr->next; // 先暂存后继，防止改指针后断链\n            curr->next = prev; // 掉头：不变量是 prev 之前的部分已完成反转\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n};",
  "solutionText": "三指针迭代原地反转。prev 初始为 nullptr，curr 从 head 出发；每步先用 next 暂存 curr->next，再把 curr->next 掉头指向 prev，然后 prev、curr 各前移一位。循环结束时 curr 为空，prev 正是新头节点。易错点：必须先存 next 再改指针，否则链表在此处断开。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};"
 },
 {
  "id": 234,
  "title": "234. 回文链表",
  "category": "链表",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给你一个单链表的头节点 <code>head</code> ，请你判断该链表是否为<span data-keyword=\"palindrome-sequence\">回文链表</span>。如果是，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg\" style=\"width: 422px; height: 62px;\" />\n<pre>\n<strong>输入：</strong>head = [1,2,2,1]\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg\" style=\"width: 182px; height: 62px;\" />\n<pre>\n<strong>输入：</strong>head = [1,2]\n<strong>输出：</strong>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点数目在范围<code>[1, 10<sup>5</sup>]</code> 内</li>\n\t<li><code>0 &lt;= Node.val &lt;= 9</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你能否用&nbsp;<code>O(n)</code> 时间复杂度和 <code>O(1)</code> 空间复杂度解决此题？</p>",
  "hints": [
   "题型是「链表回文判断」：想做到 O(1) 空间，就把链表的后一半原地反转，再与前一半逐节点比较。",
   "用快慢指针定位中点：fast 每次两步、slow 一步，fast 到尾时 slow 停在<strong>前半段尾节点</strong>；后半段用 206 题的迭代法反转。",
   "反转 slow-&gt;next 开始的后半段得到 secondHalfStart；p1 从 head、p2 从 secondHalfStart 同步比较 val，p2 走完仍全相等即回文。最后再反转一次后半段接回去，恢复原链表。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        if (head == nullptr) {\n            return true;\n        }\n\n        // 找到前半部分链表的尾节点并反转后半部分链表\n        ListNode* firstHalfEnd = endOfFirstHalf(head);\n        ListNode* secondHalfStart = reverseList(firstHalfEnd->next);\n\n        // 判断是否回文\n        ListNode* p1 = head;\n        ListNode* p2 = secondHalfStart;\n        bool result = true;\n        while (result && p2 != nullptr) {\n            if (p1->val != p2->val) {\n                result = false;\n            }\n            p1 = p1->next;\n            p2 = p2->next;\n        }\n\n        // 还原链表并返回结果\n        firstHalfEnd->next = reverseList(secondHalfStart);\n        return result;\n    }\n\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr != nullptr) {\n            ListNode* nextTemp = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n\n    ListNode* endOfFirstHalf(ListNode* head) {\n        ListNode* fast = head;\n        ListNode* slow = head;\n        while (fast->next != nullptr && fast->next->next != nullptr) {\n            fast = fast->next->next;\n            slow = slow->next;\n        }\n        return slow;\n    }\n};",
  "solutionText": "O(1) 空间做法：先用快慢指针找到前半段尾节点（fast 两步、slow 一步），反转后半段，再从两头同步比较节点值，比较完把后半段反转回去还原链表。注意 fast 的循环条件是 fast->next 与 fast->next->next 都非空，这样奇数长度时中间节点留在前半段、不参与比较。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        \n    }\n};"
 },
 {
  "id": 141,
  "title": "141. 环形链表",
  "category": "链表",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给你一个链表的头节点 <code>head</code> ，判断链表中是否有环。</p>\n\n<p>如果链表中有某个节点，可以通过连续跟踪 <code>next</code> 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 <code>pos</code> 来表示链表尾连接到链表中的位置（索引从 0 开始）。<strong>注意：<code>pos</code> 不作为参数进行传递&nbsp;</strong>。仅仅是为了标识链表的实际情况。</p>\n\n<p><em>如果链表中存在环</em>&nbsp;，则返回 <code>true</code> 。 否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png\" /></p>\n\n<pre>\n<strong>输入：</strong>head = [3,2,0,-4], pos = 1\n<strong>输出：</strong>true\n<strong>解释：</strong>链表中有一个环，其尾部连接到第二个节点。\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png\" /></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2], pos = 0\n<strong>输出：</strong>true\n<strong>解释：</strong>链表中有一个环，其尾部连接到第一个节点。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png\" /></p>\n\n<pre>\n<strong>输入：</strong>head = [1], pos = -1\n<strong>输出：</strong>false\n<strong>解释：</strong>链表中没有环。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点的数目范围是 <code>[0, 10<sup>4</sup>]</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>pos</code> 为 <code>-1</code> 或者链表中的一个 <strong>有效索引</strong> 。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你能用 <code>O(1)</code>（即，常量）内存解决此问题吗？</p>",
  "hints": [
   "题型是「链表判环」：不用额外空间，让两个速度不同的指针赛跑，有环它们终会相遇。",
   "slow 每次走 1 步、fast 走 2 步；有环时 fast 相对 slow 每步靠近 1，一定追上；无环则 fast 先碰到 nullptr。",
   "本解法 fast 从 head-&gt;next 出发，循环条件 while (slow != fast)，循环内先判 fast 或 fast-&gt;next 为空就返回 false；进循环前先排除空链表和单节点，直接返回 false。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool hasCycle(ListNode* head) {\n        if (head == nullptr || head->next == nullptr) {\n            return false;\n        }\n        ListNode* slow = head;\n        ListNode* fast = head->next;\n        while (slow != fast) {\n            if (fast == nullptr || fast->next == nullptr) {\n                return false;\n            }\n            slow = slow->next;\n            fast = fast->next->next; // 快指针每次两步，有环时相对慢指针每步逼近 1，必相遇\n        }\n        return true;\n    }\n};",
  "solutionText": "Floyd 判圈：慢指针每次走一步，快指针每次走两步。若有环，快指针在环内以相对速度 1 逼近慢指针，必定相遇；若无环，快指针先走到 nullptr。本写法让 fast 从 head->next 出发、用 slow != fast 作循环条件，所以进入循环前要先把空链表和单节点情形直接返回 false。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        \n    }\n};"
 },
 {
  "id": 142,
  "title": "142. 环形链表 II",
  "category": "链表",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个链表的头节点 &nbsp;<code>head</code>&nbsp;，返回链表开始入环的第一个节点。&nbsp;<em>如果链表无环，则返回&nbsp;<code>null</code>。</em></p>\n\n<p>如果链表中有某个节点，可以通过连续跟踪 <code>next</code> 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 <code>pos</code> 来表示链表尾连接到链表中的位置（<strong>索引从 0 开始</strong>）。如果 <code>pos</code> 是 <code>-1</code>，则在该链表中没有环。<strong>注意：<code>pos</code> 不作为参数进行传递</strong>，仅仅是为了标识链表的实际情况。</p>\n\n<p><strong>不允许修改 </strong>链表。</p>\n\n<ul>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><img src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png\" /></p>\n\n<pre>\n<strong>输入：</strong>head = [3,2,0,-4], pos = 1\n<strong>输出：</strong>返回索引为 1 的链表节点\n<strong>解释：</strong>链表中有一个环，其尾部连接到第二个节点。\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png\" /></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2], pos = 0\n<strong>输出：</strong>返回索引为 0 的链表节点\n<strong>解释：</strong>链表中有一个环，其尾部连接到第一个节点。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png\" /></p>\n\n<pre>\n<strong>输入：</strong>head = [1], pos = -1\n<strong>输出：</strong>返回 null\n<strong>解释：</strong>链表中没有环。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点的数目范围在范围 <code>[0, 10<sup>4</sup>]</code> 内</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>pos</code> 的值为 <code>-1</code> 或者链表中的一个有效索引</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你是否可以使用 <code>O(1)</code> 空间解决此题？</p>",
  "hints": [
   "题型是「链表找环入口」：先用快慢指针确认有环，再利用相遇位置的数学性质定位入环点，不用哈希表。",
   "关键结论：slow 与 fast 相遇后，从 head 和从相遇点各派一个<strong>同速</strong>指针，它们恰好在入环口相遇（a = c + (n-1)(b+c)）。",
   "第一阶段 while (fast != nullptr) 内 slow 走 1 步、fast 走 2 步；当 fast == slow 时，令 ListNode *ptr = head，ptr 与 slow 同步前进直到相等，返回 ptr 即入环口。"
  ],
  "solutionCode": "class Solution {\npublic:\n    ListNode *detectCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast != nullptr) {\n            slow = slow->next;\n            if (fast->next == nullptr) {\n                return nullptr;\n            }\n            fast = fast->next->next;\n            if (fast == slow) {\n                ListNode *ptr = head; // 相遇后：从头出发的指针与 slow 同速走，恰在入环口相遇\n                while (ptr != slow) {\n                    ptr = ptr->next;\n                    slow = slow->next;\n                }\n                return ptr;\n            }\n        }\n        return nullptr;\n    }\n};",
  "solutionText": "快慢指针两阶段：先让 slow 一步、fast 两步，相遇说明有环；再派指针 ptr 从 head 出发，与 slow 同速前进，二者相遇点就是入环口。原理是头到入环口的距离 a 恰等于相遇点沿环走回入环口的距离 c 加上若干整圈。fast 走到空指针说明无环，返回 nullptr。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode *detectCycle(ListNode *head) {\n        \n    }\n};"
 },
 {
  "id": 21,
  "title": "21. 合并两个有序链表",
  "category": "链表",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>将两个升序链表合并为一个新的 <strong>升序</strong> 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 </p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg\" style=\"width: 662px; height: 302px;\" />\n<pre>\n<strong>输入：</strong>l1 = [1,2,4], l2 = [1,3,4]\n<strong>输出：</strong>[1,1,2,3,4,4]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [], l2 = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [], l2 = [0]\n<strong>输出：</strong>[0]\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>两个链表的节点数目范围是 <code>[0, 50]</code></li>\n\t<li><code>-100 <= Node.val <= 100</code></li>\n\t<li><code>l1</code> 和 <code>l2</code> 均按 <strong>非递减顺序</strong> 排列</li>\n</ul>",
  "hints": [
   "题型是「有序链表归并」：就是归并排序的 merge 一步，每次挑两条链头部较小的那个接到结果尾部。",
   "用<strong>哨兵节点</strong> preHead 统一处理头节点；不变量：prev 始终指向已合并链的尾节点。",
   "while (l1 &amp;&amp; l2) 中比较 l1-&gt;val 与 l2-&gt;val，较小者接到 prev-&gt;next 并前移该链和 prev；循环结束把非空的那条整链挂到 prev-&gt;next，返回 preHead-&gt;next。"
  ],
  "solutionCode": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n        ListNode* preHead = new ListNode(-1); // 哨兵节点，免去头节点特判\n\n        ListNode* prev = preHead;\n        while (l1 != nullptr && l2 != nullptr) {\n            if (l1->val < l2->val) {\n                prev->next = l1;\n                l1 = l1->next;\n            } else {\n                prev->next = l2;\n                l2 = l2->next;\n            }\n            prev = prev->next;\n        }\n\n        // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可\n        prev->next = l1 == nullptr ? l2 : l1;\n\n        return preHead->next;\n    }\n};",
  "solutionText": "哨兵节点加迭代归并。建 preHead 哨兵免去头节点特判，prev 始终指向已合并部分的尾巴；每轮取 l1、l2 中较小的节点接到 prev 后面并前移该链，循环结束后把还没走完的那条链整体挂到尾部，返回 preHead->next。易错点：剩余部分直接整链接上即可，不必逐个搬运。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};"
 },
 {
  "id": 2,
  "title": "2. 两数相加",
  "category": "链表",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你两个&nbsp;<strong>非空</strong> 的链表，表示两个非负的整数。它们每位数字都是按照&nbsp;<strong>逆序</strong>&nbsp;的方式存储的，并且每个节点只能存储&nbsp;<strong>一位</strong>&nbsp;数字。</p>\n\n<p>请你将两个数相加，并以相同形式返回一个表示和的链表。</p>\n\n<p>你可以假设除了数字 0 之外，这两个数都不会以 0&nbsp;开头。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg\" style=\"width: 483px; height: 342px;\" />\n<pre>\n<strong>输入：</strong>l1 = [2,4,3], l2 = [5,6,4]\n<strong>输出：</strong>[7,0,8]\n<strong>解释：</strong>342 + 465 = 807.\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [0], l2 = [0]\n<strong>输出：</strong>[0]\n</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\n<strong>输出：</strong>[8,9,9,9,0,0,0,1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>每个链表中的节点数在范围 <code>[1, 100]</code> 内</li>\n\t<li><code>0 &lt;= Node.val &lt;= 9</code></li>\n\t<li>题目数据保证列表表示的数字不含前导零</li>\n</ul>",
  "hints": [
   "题型是「链表模拟加法」：数字已按逆序存储，从表头开始逐位相加即可，核心是维护好进位。",
   "维护 int carry 进位变量；两链可能不等长，取值写成 l1 ? l1-&gt;val : 0 补零，循环条件 while (l1 || l2)。",
   "每位算 sum = n1 + n2 + carry，尾插 new ListNode(sum % 10)，更新 carry = sum / 10；循环结束后若 carry &gt; 0，还要在尾部再补一个值为 carry 的节点。"
  ],
  "solutionCode": "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        ListNode *head = nullptr, *tail = nullptr;\n        int carry = 0;\n        while (l1 || l2) {\n            int n1 = l1 ? l1->val: 0; // 短链走完后按 0 补位\n            int n2 = l2 ? l2->val: 0;\n            int sum = n1 + n2 + carry;\n            if (!head) {\n                head = tail = new ListNode(sum % 10);\n            } else {\n                tail->next = new ListNode(sum % 10);\n                tail = tail->next;\n            }\n            carry = sum / 10;\n            if (l1) {\n                l1 = l1->next;\n            }\n            if (l2) {\n                l2 = l2->next;\n            }\n        }\n        if (carry > 0) {\n            tail->next = new ListNode(carry);\n        }\n        return head;\n    }\n};",
  "solutionText": "按位模拟竖式加法。同时遍历两条链，逐位取值（走完的链按 0 补位）求 sum = n1 + n2 + carry，新节点存 sum % 10，进位 carry = sum / 10，用 head/tail 尾插法构建结果链。易错点：循环结束后若 carry 仍大于 0，必须再补一个进位节点，如 5+5=10 的最高位。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};"
 },
 {
  "id": 19,
  "title": "19. 删除链表的倒数第 N 个结点",
  "category": "链表",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个链表，删除链表的倒数第&nbsp;<code>n</code><em>&nbsp;</em>个结点，并且返回链表的头结点。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>输入：</strong>head = [1,2,3,4,5], n = 2\n<strong>输出：</strong>[1,2,3,5]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1], n = 1\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2], n = 1\n<strong>输出：</strong>[1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中结点的数目为 <code>sz</code></li>\n\t<li><code>1 &lt;= sz &lt;= 30</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 100</code></li>\n\t<li><code>1 &lt;= n &lt;= sz</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你能尝试使用一趟扫描实现吗？</p>",
  "hints": [
   "题型是「倒数第 k 个节点」：让两个指针保持 n 的固定间距同步走，一趟遍历就能定位倒数第 n 个。",
   "加<strong>哨兵节点</strong> dummy 指向 head：first 从 head 出发先走 n 步，second 从 dummy 出发——这样 first 走到空时，second 正好停在待删节点的<strong>前驱</strong>。",
   "first 先走 n 步后两针同速前进到 first 为空，执行 second-&gt;next = second-&gt;next-&gt;next 删除目标，返回 dummy-&gt;next（删头节点的情况被自然覆盖）。"
  ],
  "solutionCode": "class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        ListNode* dummy = new ListNode(0, head);\n        ListNode* first = head;\n        ListNode* second = dummy;\n        for (int i = 0; i < n; ++i) { // first 先走 n 步，保持与 second 间距为 n\n            first = first->next;\n        }\n        while (first) {\n            first = first->next;\n            second = second->next;\n        }\n        second->next = second->next->next; // 此时 second 恰是待删节点的前驱\n        ListNode* ans = dummy->next;\n        delete dummy;\n        return ans;\n    }\n};",
  "solutionText": "一次遍历双指针。first 从 head 先走 n 步，second 从哨兵 dummy 出发与 first 同速前进；first 到 nullptr 时 second 恰好停在待删节点的前驱，执行 second->next = second->next->next 完成删除。哨兵节点保证删除头节点（n 等于链长）时无需特判，最后返回 dummy->next。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        \n    }\n};"
 },
 {
  "id": 24,
  "title": "24. 两两交换链表中的节点",
  "category": "链表",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg\" style=\"width: 422px; height: 222px;\" />\n<pre>\n<strong>输入：</strong>head = [1,2,3,4]\n<strong>输出：</strong>[2,1,4,3]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1]\n<strong>输出：</strong>[1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点的数目在范围 <code>[0, 100]</code> 内</li>\n\t<li><code>0 &lt;= Node.val &lt;= 100</code></li>\n</ul>",
  "hints": [
   "题型是「链表指针重接」：每次处理相邻的两个节点，交换后接回原链，关键是接线顺序别丢后继。",
   "用哨兵节点 dummyHead，不变量：temp 始终是<strong>待交换那一对的前驱</strong>；循环条件是 temp-&gt;next 与 temp-&gt;next-&gt;next 都非空。",
   "设 node1 = temp-&gt;next、node2 = node1-&gt;next，依次执行 temp-&gt;next = node2、node1-&gt;next = node2-&gt;next、node2-&gt;next = node1，最后 temp = node1 进入下一对。"
  ],
  "solutionCode": "class Solution {\npublic:\n    ListNode* swapPairs(ListNode* head) {\n        ListNode* dummyHead = new ListNode(0);\n        dummyHead->next = head;\n        ListNode* temp = dummyHead; // 不变量：temp 始终指向待交换那一对的前驱\n        while (temp->next != nullptr && temp->next->next != nullptr) {\n            ListNode* node1 = temp->next;\n            ListNode* node2 = temp->next->next;\n            temp->next = node2;\n            node1->next = node2->next;\n            node2->next = node1;\n            temp = node1;\n        }\n        ListNode* ans = dummyHead->next;\n        delete dummyHead;\n        return ans;\n    }\n};",
  "solutionText": "哨兵加迭代两两交换。temp 始终指向待交换对的前驱；每轮取 node1 = temp->next、node2 = node1->next，按 temp→node2→node1→原 node2->next 的顺序重接三条指针，再把 temp 前移到 node1。循环条件要求 temp 后面至少还有两个节点，末尾落单的节点自然保持原位，返回 dummy->next。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* swapPairs(ListNode* head) {\n        \n    }\n};"
 },
 {
  "id": 25,
  "title": "25. K 个一组翻转链表",
  "category": "链表",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>给你链表的头节点 <code>head</code> ，每&nbsp;<code>k</code><em>&nbsp;</em>个节点一组进行翻转，请你返回修改后的链表。</p>\n\n<p><code>k</code> 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是&nbsp;<code>k</code><em>&nbsp;</em>的整数倍，那么请将最后剩余的节点保持原有顺序。</p>\n\n<p>你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>输入：</strong>head = [1,2,3,4,5], k = 2\n<strong>输出：</strong>[2,1,4,3,5]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg\" style=\"width: 542px; height: 222px;\" /></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2,3,4,5], k = 3\n<strong>输出：</strong>[3,2,1,4,5]\n</pre>\n\n<p>&nbsp;</p>\n<strong>提示：</strong>\n\n<ul>\n\t<li>链表中的节点数目为 <code>n</code></li>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 5000</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以设计一个只用 <code>O(1)</code> 额外内存空间的算法解决此问题吗？</p>\n\n<ul>\n</ul>",
  "hints": [
   "题型是「链表分组反转」：把链表按 k 个一段切开，段内做一次标准的反转链表，段与段之间重新接好。",
   "关键辅助结构是<strong>哑结点</strong>（hair）+ 指向每组前驱的 pre 指针：每处理完一组，pre 移到该组反转后的新尾部，保证组间连接不断。",
   "每轮：从 pre 走 k 步找 tail（中途为空说明不足 k 个，直接返回）；记 nex = tail-&gt;next，反转 head..tail 后令 pre-&gt;next = 新头、新尾-&gt;next = nex，再令 pre = 新尾、head = pre-&gt;next。"
  ],
  "solutionCode": "class Solution {\npublic:\n    // 翻转一个子链表，并且返回新的头与尾\n    pair<ListNode*, ListNode*> myReverse(ListNode* head, ListNode* tail) {\n        ListNode* prev = tail->next;\n        ListNode* p = head;\n        while (prev != tail) {\n            ListNode* nex = p->next;\n            p->next = prev;\n            prev = p;\n            p = nex;\n        }\n        return {tail, head};\n    }\n\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        ListNode* hair = new ListNode(0);\n        hair->next = head;\n        ListNode* pre = hair;\n\n        while (head) {\n            ListNode* tail = pre;\n            // 查看剩余部分长度是否大于等于 k\n            for (int i = 0; i < k; ++i) {\n                tail = tail->next;\n                if (!tail) {\n                    return hair->next;\n                }\n            }\n            ListNode* nex = tail->next;\n            // 这里是 C++17 的写法，也可以写成\n            // pair<ListNode*, ListNode*> result = myReverse(head, tail);\n            // head = result.first;\n            // tail = result.second;\n            tie(head, tail) = myReverse(head, tail);\n            // 把子链表重新接回原链表\n            pre->next = head;\n            tail->next = nex;\n            pre = tail;\n            head = tail->next;\n        }\n\n        return hair->next;\n    }\n};",
  "solutionText": "哑结点 hair 接头前，pre 指向每组前驱。每轮从 pre 走 k 步找组尾 tail，不足 k 个直接结束；记住 tail->next，反转该段后 pre 接新头、新尾接回 nex，再前进到下一组。易错：断链前先存后继，不足 k 个保持原序。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        \n    }\n};"
 },
 {
  "id": 138,
  "title": "138. 随机链表的复制",
  "category": "链表",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个长度为 <code>n</code> 的链表，每个节点包含一个额外增加的随机指针 <code>random</code> ，该指针可以指向链表中的任何节点或空节点。</p>\n\n<p>构造这个链表的&nbsp;<strong><a href=\"https://baike.baidu.com/item/深拷贝/22785317?fr=aladdin\" target=\"_blank\">深拷贝</a></strong>。&nbsp;深拷贝应该正好由 <code>n</code> 个 <strong>全新</strong> 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 <code>next</code> 指针和 <code>random</code> 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。<strong>复制链表中的指针都不应指向原链表中的节点 </strong>。</p>\n\n<p>例如，如果原链表中有 <code>X</code> 和 <code>Y</code> 两个节点，其中 <code>X.random --&gt; Y</code> 。那么在复制链表中对应的两个节点 <code>x</code> 和 <code>y</code> ，同样有 <code>x.random --&gt; y</code> 。</p>\n\n<p>返回复制链表的头节点。</p>\n\n<p>用一个由&nbsp;<code>n</code>&nbsp;个节点组成的链表来表示输入/输出中的链表。每个节点用一个&nbsp;<code>[val, random_index]</code>&nbsp;表示：</p>\n\n<ul>\n\t<li><code>val</code>：一个表示&nbsp;<code>Node.val</code>&nbsp;的整数。</li>\n\t<li><code>random_index</code>：随机指针指向的节点索引（范围从&nbsp;<code>0</code>&nbsp;到&nbsp;<code>n-1</code>）；如果不指向任何节点，则为&nbsp;&nbsp;<code>null</code>&nbsp;。</li>\n</ul>\n\n<p>你的代码 <strong>只</strong> 接受原链表的头节点 <code>head</code> 作为传入参数。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/01/09/e1.png\" style=\"height: 142px; width: 700px;\" /></p>\n\n<pre>\n<strong>输入：</strong>head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\n<strong>输出：</strong>[[7,null],[13,0],[11,4],[10,2],[1,0]]\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/01/09/e2.png\" style=\"height: 114px; width: 700px;\" /></p>\n\n<pre>\n<strong>输入：</strong>head = [[1,1],[2,1]]\n<strong>输出：</strong>[[1,1],[2,1]]\n</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<p><strong><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/01/09/e3.png\" style=\"height: 122px; width: 700px;\" /></strong></p>\n\n<pre>\n<strong>输入：</strong>head = [[3,null],[3,0],[3,null]]\n<strong>输出：</strong>[[3,null],[3,0],[3,null]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 1000</code></li>\n\t<li><code>-10<sup>4</sup>&nbsp;&lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n\t<li><code>Node.random</code>&nbsp;为&nbsp;<code>null</code> 或指向链表中的节点。</li>\n</ul>\n\n<p>&nbsp;</p>",
  "hints": [
   "题型是「带随机指针的链表深拷贝」：难点在 random 可能指向还没创建的节点，需要一种「先记账、再连线」的办法。",
   "用 <code>unordered_map&lt;Node*, Node*&gt;</code> 记「原节点 → 拷贝节点」；不变量：原节点一旦在表里，它的拷贝就已创建（哪怕指针还没连全）。",
   "递归函数：head 为空返回空；head 不在表中时<strong>先</strong>新建拷贝存入表，<strong>再</strong>递归赋值 next 和 random；最后统一返回表中 head 对应的拷贝。"
  ],
  "solutionCode": "class Solution {\npublic:\n    unordered_map<Node*, Node*> cachedNode;\n\n    Node* copyRandomList(Node* head) {\n        if (head == nullptr) {\n            return nullptr;\n        }\n        if (!cachedNode.count(head)) {\n            Node* headNew = new Node(head->val);\n            cachedNode[head] = headNew; // 先存表再递归，防止 random 成环导致无限递归/重复拷贝\n            headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);\n        }\n        return cachedNode[head];\n    }\n};",
  "solutionText": "用哈希表记「原节点 → 新节点」，递归拷贝：遇到没拷贝过的节点就新建拷贝并立即存表，再递归填它的 next 和 random；已在表中则直接返回缓存。因为 random 可能指向任意节点甚至成环，「先存表、后递归」是保证每个节点只拷贝一次、不无限递归的关键。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/*\n// Definition for a Node.\nclass Node {\npublic:\n    int val;\n    Node* next;\n    Node* random;\n    \n    Node(int _val) {\n        val = _val;\n        next = NULL;\n        random = NULL;\n    }\n};\n*/\n\nclass Solution {\npublic:\n    Node* copyRandomList(Node* head) {\n        \n    }\n};"
 },
 {
  "id": 148,
  "title": "148. 排序链表",
  "category": "链表",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你链表的头结点&nbsp;<code>head</code>&nbsp;，请将其按 <strong>升序</strong> 排列并返回 <strong>排序后的链表</strong> 。</p>\n\n<ul>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg\" style=\"width: 450px;\" />\n<pre>\n<b>输入：</b>head = [4,2,1,3]\n<b>输出：</b>[1,2,3,4]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/14/sort_list_2.jpg\" style=\"width: 550px;\" />\n<pre>\n<b>输入：</b>head = [-1,5,3,4,0]\n<b>输出：</b>[-1,0,3,4,5]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<b>输入：</b>head = []\n<b>输出：</b>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><b>提示：</b></p>\n\n<ul>\n\t<li>链表中节点的数目在范围&nbsp;<code>[0, 5 * 10<sup>4</sup>]</code>&nbsp;内</li>\n\t<li><code>-10<sup>5</sup>&nbsp;&lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>进阶：</b>你可以在&nbsp;<code>O(n&nbsp;log&nbsp;n)</code> 时间复杂度和常数级空间复杂度下，对链表进行排序吗？</p>",
  "hints": [
   "题型是「链表排序」：要求 O(n log n)，链表上最顺手的是<strong>归并排序</strong>——拆一半、各自排好、再合并。",
   "递归函数按<strong>左闭右开区间</strong> [head, tail) 处理；找中点用<strong>快慢指针</strong>：slow 走一步、fast 走两步，fast 到 tail 时 slow 即中点。",
   "出口：head 为空返回空；head-&gt;next == tail 时把 head-&gt;next 置空断链、返回单节点。否则返回 merge(sortList(head, mid), sortList(mid, tail))，merge 用哑结点逐个接较小者，剩余整段挂尾。"
  ],
  "solutionCode": "class Solution {\npublic:\n    ListNode* sortList(ListNode* head) {\n        return sortList(head, nullptr);\n    }\n\n    ListNode* sortList(ListNode* head, ListNode* tail) {\n        if (head == nullptr) {\n            return head;\n        }\n        if (head->next == tail) { // 区间 [head, tail) 只剩单个节点：断链后返回\n            head->next = nullptr;\n            return head;\n        }\n        ListNode* slow = head, *fast = head;\n        while (fast != tail) {\n            slow = slow->next;\n            fast = fast->next;\n            if (fast != tail) {\n                fast = fast->next;\n            }\n        }\n        ListNode* mid = slow; // 快慢指针求得中点，劈成 [head, mid) 与 [mid, tail)\n        return merge(sortList(head, mid), sortList(mid, tail));\n    }\n\n    ListNode* merge(ListNode* head1, ListNode* head2) {\n        ListNode* dummyHead = new ListNode(0);\n        ListNode* temp = dummyHead, *temp1 = head1, *temp2 = head2;\n        while (temp1 != nullptr && temp2 != nullptr) {\n            if (temp1->val <= temp2->val) {\n                temp->next = temp1;\n                temp1 = temp1->next;\n            } else {\n                temp->next = temp2;\n                temp2 = temp2->next;\n            }\n            temp = temp->next;\n        }\n        if (temp1 != nullptr) {\n            temp->next = temp1;\n        } else if (temp2 != nullptr) {\n            temp->next = temp2;\n        }\n        return dummyHead->next;\n    }\n};",
  "solutionText": "归并排序，递归处理左闭右开区间 [head,tail)：快慢指针找中点 mid，递归排好两半，再用哑结点合并两条有序链。终止：区间空返回空；只剩单节点时必须把 head->next 置空断链再返回，否则死循环。整体 O(n log n)。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* sortList(ListNode* head) {\n        \n    }\n};"
 },
 {
  "id": 23,
  "title": "23. 合并 K 个升序链表",
  "category": "链表",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>给你一个链表数组，每个链表都已经按升序排列。</p>\n\n<p>请你将所有链表合并到一个升序链表中，返回合并后的链表。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre><strong>输入：</strong>lists = [[1,4,5],[1,3,4],[2,6]]\n<strong>输出：</strong>[1,1,2,3,4,4,5,6]\n<strong>解释：</strong>链表数组如下：\n[\n  1-&gt;4-&gt;5,\n  1-&gt;3-&gt;4,\n  2-&gt;6\n]\n将它们合并到一个有序链表中得到。\n1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre><strong>输入：</strong>lists = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre><strong>输入：</strong>lists = [[]]\n<strong>输出：</strong>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>k == lists.length</code></li>\n\t<li><code>0 &lt;= k &lt;= 10^4</code></li>\n\t<li><code>0 &lt;= lists[i].length &lt;= 500</code></li>\n\t<li><code>-10^4 &lt;= lists[i][j] &lt;= 10^4</code></li>\n\t<li><code>lists[i]</code> 按 <strong>升序</strong> 排列</li>\n\t<li><code>lists[i].length</code> 的总和不超过 <code>10^4</code></li>\n</ul>",
  "hints": [
   "题型是「k 路合并」：逐条顺序合并是 O(k²n)，想想怎么让每条链少被合并几次——归并排序式的两两配对。",
   "核心是<strong>分治</strong>：merge(l, r) 取 mid 劈成两半，各自递归合并成一条，再调用你已会的「合并两个有序链表」（21 题）拼接，递归深度 O(log k)。",
   "边界：l == r 返回 lists[l]，l &gt; r 返回 nullptr；mergeTwoLists 用哑结点 + tail 指针，谁小接谁，循环结束把剩余的一条整体挂上。"
  ],
  "solutionCode": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode *a, ListNode *b) {\n        if ((!a) || (!b)) return a ? a : b;\n        ListNode head, *tail = &head, *aPtr = a, *bPtr = b;\n        while (aPtr && bPtr) {\n            if (aPtr->val < bPtr->val) {\n                tail->next = aPtr; aPtr = aPtr->next;\n            } else {\n                tail->next = bPtr; bPtr = bPtr->next;\n            }\n            tail = tail->next;\n        }\n        tail->next = (aPtr ? aPtr : bPtr);\n        return head.next;\n    }\n\n    ListNode* merge(vector <ListNode*> &lists, int l, int r) {\n        if (l == r) return lists[l];\n        if (l > r) return nullptr;\n        int mid = (l + r) >> 1; // 对半劈开两两合并，每条链只被合并 O(log k) 次\n        return mergeTwoLists(merge(lists, l, mid), merge(lists, mid + 1, r));\n    }\n\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        return merge(lists, 0, lists.size() - 1);\n    }\n};",
  "solutionText": "分治：merge(lists,l,r) 对半劈开，递归把左右两半各合成一条，再用双指针合并两条有序链表。每条链只参与 O(log k) 次合并，总时间 O(kn log k)，优于顺序合并。边界：l>r 返回空，l==r 返回 lists[l]。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        \n    }\n};"
 },
 {
  "id": 146,
  "title": "146. LRU 缓存",
  "category": "链表",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<div class=\"title__3Vvk\">请你设计并实现一个满足&nbsp; <a href=\"https://baike.baidu.com/item/LRU\" target=\"_blank\">LRU (最近最少使用) 缓存</a> 约束的数据结构。</div>\n\n<div class=\"title__3Vvk\">实现 <code>LRUCache</code> 类：</div>\n\n<div class=\"original__bRMd\">\n<div>\n<ul>\n\t<li><code>LRUCache(int capacity)</code> 以 <strong>正整数</strong> 作为容量&nbsp;<code>capacity</code> 初始化 LRU 缓存</li>\n\t<li><code>int get(int key)</code> 如果关键字 <code>key</code> 存在于缓存中，则返回关键字的值，否则返回 <code>-1</code> 。</li>\n\t<li><code>void put(int key, int value)</code>&nbsp;如果关键字&nbsp;<code>key</code> 已经存在，则变更其数据值&nbsp;<code>value</code> ；如果不存在，则向缓存中插入该组&nbsp;<code>key-value</code> 。如果插入操作导致关键字数量超过&nbsp;<code>capacity</code> ，则应该 <strong>逐出</strong> 最久未使用的关键字。</li>\n</ul>\n\n<p>函数 <code>get</code> 和 <code>put</code> 必须以 <code>O(1)</code> 的平均时间复杂度运行。</p>\n</div>\n</div>\n\n<p>&nbsp;</p>\n\n<p><strong>示例：</strong></p>\n\n<pre>\n<strong>输入</strong>\n[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]\n<strong>输出</strong>\n[null, null, null, 1, null, -1, null, -1, 3, 4]\n\n<strong>解释</strong>\nLRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // 缓存是 {1=1}\nlRUCache.put(2, 2); // 缓存是 {1=1, 2=2}\nlRUCache.get(1);    // 返回 1\nlRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}\nlRUCache.get(2);    // 返回 -1 (未找到)\nlRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}\nlRUCache.get(1);    // 返回 -1 (未找到)\nlRUCache.get(3);    // 返回 3\nlRUCache.get(4);    // 返回 4\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= capacity &lt;= 3000</code></li>\n\t<li><code>0 &lt;= key &lt;= 10000</code></li>\n\t<li><code>0 &lt;= value &lt;= 10<sup>5</sup></code></li>\n\t<li>最多调用 <code>2 * 10<sup>5</sup></code> 次 <code>get</code> 和 <code>put</code></li>\n</ul>",
  "hints": [
   "题型是「设计题：O(1) 的 get/put + 淘汰最久未使用」：需要一个既能 O(1) 查找、又能 O(1) 维护「新旧顺序」的组合结构。",
   "组合是 <code>unordered_map&lt;int, DLinkedNode*&gt;</code> + 手写<strong>双向链表</strong>（带伪头伪尾哨兵）；不变量：链表头部 = 最近使用，尾部 = 最久未用，哈希表与链表始终同步。",
   "先写三个链表原语：addToHead、removeNode、moveToHead。get：查表 → moveToHead → 返回值；put：已存在则改值移头；不存在则新建加头，size 超容量时 removeTail 并 cache.erase(removed-&gt;key)。"
  ],
  "solutionCode": "struct DLinkedNode {\n    int key, value;\n    DLinkedNode* prev;\n    DLinkedNode* next;\n    DLinkedNode(): key(0), value(0), prev(nullptr), next(nullptr) {}\n    DLinkedNode(int _key, int _value): key(_key), value(_value), prev(nullptr), next(nullptr) {}\n};\n\nclass LRUCache {\nprivate:\n    unordered_map<int, DLinkedNode*> cache;\n    DLinkedNode* head;\n    DLinkedNode* tail;\n    int size;\n    int capacity;\n\npublic:\n    LRUCache(int _capacity): capacity(_capacity), size(0) {\n        // 使用伪头部和伪尾部节点\n        head = new DLinkedNode();\n        tail = new DLinkedNode();\n        head->next = tail;\n        tail->prev = head;\n    }\n    \n    int get(int key) {\n        if (!cache.count(key)) {\n            return -1;\n        }\n        // 如果 key 存在，先通过哈希表定位，再移到头部\n        DLinkedNode* node = cache[key];\n        moveToHead(node);\n        return node->value;\n    }\n    \n    void put(int key, int value) {\n        if (!cache.count(key)) {\n            // 如果 key 不存在，创建一个新的节点\n            DLinkedNode* node = new DLinkedNode(key, value);\n            // 添加进哈希表\n            cache[key] = node;\n            // 添加至双向链表的头部\n            addToHead(node);\n            ++size;\n            if (size > capacity) {\n                // 如果超出容量，删除双向链表的尾部节点\n                DLinkedNode* removed = removeTail();\n                // 删除哈希表中对应的项\n                cache.erase(removed->key);\n                // 防止内存泄漏\n                delete removed;\n                --size;\n            }\n        }\n        else {\n            // 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部\n            DLinkedNode* node = cache[key];\n            node->value = value;\n            moveToHead(node);\n        }\n    }\n\n    void addToHead(DLinkedNode* node) {\n        node->prev = head;\n        node->next = head->next;\n        head->next->prev = node;\n        head->next = node;\n    }\n    \n    void removeNode(DLinkedNode* node) {\n        node->prev->next = node->next;\n        node->next->prev = node->prev;\n    }\n\n    void moveToHead(DLinkedNode* node) {\n        removeNode(node);\n        addToHead(node);\n    }\n\n    DLinkedNode* removeTail() {\n        DLinkedNode* node = tail->prev;\n        removeNode(node);\n        return node;\n    }\n};",
  "solutionText": "哈希表存 key → 双向链表节点，链表按访问时间排序（头新尾旧）。get 命中后把节点移到头部；put 已存在则改值移头，不存在则新建加头，超容量时摘掉尾节点并同步删哈希表项。伪头伪尾哨兵免判空；节点必须冗余存 key，删尾时才能反查哈希表。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n    \n    int get(int key) {\n        \n    }\n    \n    void put(int key, int value) {\n        \n    }\n};\n\n/**\n * Your LRUCache object will be instantiated and called as such:\n * LRUCache* obj = new LRUCache(capacity);\n * int param_1 = obj->get(key);\n * obj->put(key,value);\n */"
 },
 {
  "id": 94,
  "title": "94. 二叉树的中序遍历",
  "category": "二叉树",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给定一个二叉树的根节点 <code>root</code> ，返回 <em>它的 <strong>中序</strong>&nbsp;遍历</em> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg\" style=\"height: 200px; width: 125px;\" />\n<pre>\n<strong>输入：</strong>root = [1,null,2,3]\n<strong>输出：</strong>[1,3,2]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1]\n<strong>输出：</strong>[1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[0, 100]</code> 内</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶:</strong>&nbsp;递归算法很简单，你可以通过迭代算法完成吗？</p>",
  "hints": [
   "题型是「二叉树遍历」：中序的定义本身就是算法——左子树、根、右子树，用递归照抄定义即可。",
   "写一个带引用参数的辅助函数 <code>void inorder(TreeNode* root, vector&lt;int&gt;&amp; res)</code>，边遍历边收集，避免每层拷贝数组。",
   "出口：root 为空直接 return；否则依次 inorder(root-&gt;left, res)、res.push_back(root-&gt;val)、inorder(root-&gt;right, res)——push 位置在中间就是「中」序。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void inorder(TreeNode* root, vector<int>& res) {\n        if (!root) {\n            return;\n        }\n        inorder(root->left, res);\n        res.push_back(root->val);\n        inorder(root->right, res);\n    }\n    vector<int> inorderTraversal(TreeNode* root) {\n        vector<int> res;\n        inorder(root, res);\n        return res;\n    }\n};",
  "solutionText": "递归照抄定义：中序 = 左子树、根、右子树。辅助函数 inorder(root,res)，空节点直接返回，否则递归左、push 根值、递归右。三种遍历只差 push 的位置；中序遍历二叉搜索树会得到升序序列，这一性质要记牢。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 104,
  "title": "104. 二叉树的最大深度",
  "category": "二叉树",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给定一个二叉树 <code>root</code> ，返回其最大深度。</p>\n\n<p>二叉树的 <strong>最大深度</strong> 是指从根节点到最远叶子节点的最长路径上的节点数。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg\" style=\"width: 400px; height: 277px;\" /></p>\n\n<p>&nbsp;</p>\n\n<pre>\n<b>输入：</b>root = [3,9,20,null,null,15,7]\n<b>输出：</b>3\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<b>输入：</b>root = [1,null,2]\n<b>输出：</b>2\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点的数量在&nbsp;<code>[0, 10<sup>4</sup>]</code>&nbsp;区间内。</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>",
  "hints": [
   "题型是「树的递归」：把大问题（整棵树的深度）拆成同构的子问题（左右子树的深度）。",
   "递推关系：depth(root) = max(depth(left), depth(right)) + 1，其中 +1 是根节点这一层。",
   "递归出口 root == nullptr 返回 0，然后一行 <code>return max(maxDepth(root-&gt;left), maxDepth(root-&gt;right)) + 1;</code> 收工。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (root == nullptr) return 0;\n        return max(maxDepth(root->left), maxDepth(root->right)) + 1;\n    }\n};",
  "solutionText": "递归 DFS：树的最大深度 = max(左子树深度, 右子树深度) + 1，空节点深度为 0 作为递归出口，一行返回即可。这是「树形递归」的最小范式：出口、递归子树、用子结果合成当前答案；543 直径、110 平衡树等题都是同一模板的变体。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 226,
  "title": "226. 翻转二叉树",
  "category": "二叉树",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给你一棵二叉树的根节点 <code>root</code> ，翻转这棵二叉树，并返回其根节点。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg\" style=\"height: 165px; width: 500px;\" /></p>\n\n<pre>\n<strong>输入：</strong>root = [4,2,7,1,3,6,9]\n<strong>输出：</strong>[4,7,2,9,6,3,1]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg\" style=\"width: 500px; height: 120px;\" /></p>\n\n<pre>\n<strong>输入：</strong>root = [2,1,3]\n<strong>输出：</strong>[2,3,1]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = []\n<strong>输出：</strong>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目范围在 <code>[0, 100]</code> 内</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>",
  "hints": [
   "题型是「树的递归」：翻转整棵树 = 先翻转左右两棵子树，再把它们左右互换。",
   "每个节点只做一件事：交换自己的 left 和 right 指针；子树内部的翻转交给递归完成，空节点直接返回。",
   "先 <code>left = invertTree(root-&gt;left)</code>、<code>right = invertTree(root-&gt;right)</code> 接住翻转结果，再 root-&gt;left = right、root-&gt;right = left，最后返回 root。"
  ],
  "solutionCode": "class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (root == nullptr) {\n            return nullptr;\n        }\n        TreeNode* left = invertTree(root->left); // 先递归翻转两棵子树，再交换挂回当前节点\n        TreeNode* right = invertTree(root->right);\n        root->left = right;\n        root->right = left;\n        return root;\n    }\n};",
  "solutionText": "自底向上递归：先递归翻转左右子树拿到新的子树根，再交换挂到当前节点的 right/left，返回 root；空节点返回 nullptr 作为出口。易错：先用临时变量接住两个递归结果再交换，直接覆盖 root->left 会丢掉左子树。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 101,
  "title": "101. 对称二叉树",
  "category": "二叉树",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给你一个二叉树的根节点 <code>root</code> ， 检查它是否轴对称。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://pic.leetcode.cn/1698026966-JDYPDU-image.png\" style=\"width: 354px; height: 291px;\" />\n<pre>\n<strong>输入：</strong>root = [1,2,2,3,4,4,3]\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://pic.leetcode.cn/1698027008-nPFLbM-image.png\" style=\"width: 308px; height: 258px;\" />\n<pre>\n<strong>输入：</strong>root = [1,2,2,null,3,null,3]\n<strong>输出：</strong>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[1, 1000]</code> 内</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以运用递归和迭代两种方法解决这个问题吗？</p>",
  "hints": [
   "题型是「树的递归」：单参数函数描述不了对称，把问题改写成「判断<strong>两棵</strong>子树是否互为镜像」。",
   "写双参数函数 check(p, q)：两个都空 → true；只有一个空 → false；否则值相等且子树<strong>交叉</strong>互为镜像。",
   "递归式：<code>p-&gt;val == q-&gt;val &amp;&amp; check(p-&gt;left, q-&gt;right) &amp;&amp; check(p-&gt;right, q-&gt;left)</code>，入口 check(root-&gt;left, root-&gt;right)。注意是左对右、右对左。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool check(TreeNode *p, TreeNode *q) {\n        if (!p && !q) return true;\n        if (!p || !q) return false;\n        return p->val == q->val && check(p->left, q->right) && check(p->right, q->left); // 镜像：左对右、右对左交叉比较\n    }\n\n    bool isSymmetric(TreeNode* root) {\n        return check(root->left, root->right);\n    }\n};",
  "solutionText": "转成「两棵子树互为镜像」：check(p,q) 同时为空对称，恰一个空不对称，否则要求值相等且 p 左对 q 右、p 右对 q 左都镜像；入口传 root->left 与 root->right。易错：比较方向是交叉的，写成同向就成了判断两树相同。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    bool isSymmetric(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 543,
  "title": "543. 二叉树的直径",
  "category": "二叉树",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给你一棵二叉树的根节点，返回该树的 <strong>直径</strong> 。</p>\n\n<p>二叉树的 <strong>直径</strong> 是指树中任意两个节点之间最长路径的 <strong>长度</strong> 。这条路径可能经过也可能不经过根节点 <code>root</code> 。</p>\n\n<p>两节点之间路径的 <strong>长度</strong> 由它们之间边数表示。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/06/diamtree.jpg\" style=\"width: 292px; height: 302px;\" />\n<pre>\n<strong>输入：</strong>root = [1,2,3,4,5]\n<strong>输出：</strong>3\n<strong>解释：</strong>3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,2]\n<strong>输出：</strong>1\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[1, 10<sup>4</sup>]</code> 内</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>",
  "hints": [
   "题型是「树的递归 + 沿途统计」：最长路径不一定经过根，要在<strong>每个节点</strong>上算一次「以它为拐点的最长路径」。",
   "复用 104 的求深度递归：depth(rt) = max(L, R) + 1；拐点处的路径节点数是 L + R + 1，用一个成员变量 ans 沿途取最大。",
   "depth 里先递归得到 L、R，然后 ans = max(ans, L + R + 1)，再返回 max(L, R) + 1；主函数把 ans 初始化为 1，最后返回 <code>ans - 1</code>（节点数换算成边数）。"
  ],
  "solutionCode": "class Solution {\n    int ans;\n    int depth(TreeNode* rt){\n        if (rt == NULL) {\n            return 0; // 访问到空节点了，返回0\n        }\n        int L = depth(rt->left); // 左儿子为根的子树的深度\n        int R = depth(rt->right); // 右儿子为根的子树的深度\n        ans = max(ans, L + R + 1); // 计算d_node即L+R+1 并更新ans\n        return max(L, R) + 1; // 返回该节点为根的子树的深度\n    }\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        ans = 1;\n        depth(root);\n        return ans - 1;\n    }\n};",
  "solutionText": "直径 = 某节点左右子树深度之和的最大值。DFS 求深度时顺带更新答案：depth 返回 max(L,R)+1，途中用 L+R+1（经过该点的路径节点数）刷新成员 ans，最后返回 ans-1 换算成边数。易错：最长路径不一定过根，每个节点都要更新。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 102,
  "title": "102. 二叉树的层序遍历",
  "category": "二叉树",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你二叉树的根节点 <code>root</code> ，返回其节点值的 <strong>层序遍历</strong> 。 （即逐层地，从左到右访问所有节点）。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>输入：</strong>root = [3,9,20,null,null,15,7]\n<strong>输出：</strong>[[3],[9,20],[15,7]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1]\n<strong>输出：</strong>[[1]]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = []\n<strong>输出：</strong>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[0, 2000]</code> 内</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>",
  "hints": [
   "题型是「二叉树层序遍历」：按层从上到下、每层从左到右收集节点值，适合逐层扩展而不是递归深入。",
   "用 queue&lt;TreeNode*&gt; 做 BFS，核心不变量：<strong>每轮外层循环开始时，队列里恰好是同一层的全部节点</strong>。",
   "每轮先记下 <code>int size = q.size()</code>，再恰好弹出 size 个节点：值收进当前层数组、非空左右孩子入队；这一轮结束即完成一层。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector <vector <int>> ret;\n        if (!root) {\n            return ret;\n        }\n\n        queue <TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int currentLevelSize = q.size(); // 不变量：此刻队列里恰好是当前层的全部节点\n            ret.push_back(vector <int> ());\n            for (int i = 1; i <= currentLevelSize; ++i) {\n                auto node = q.front(); q.pop();\n                ret.back().push_back(node->val);\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n        }\n\n        return ret;\n    }\n};",
  "solutionText": "BFS 队列逐层扩展。每轮外层循环先记下当前队列长度（即当前层节点数），精确弹出这么多节点，把值收进同一层数组，并把非空左右孩子入队。关键不变量：每轮开始时队列里恰好是同一层的全部节点。root 为空时要先返回空结果。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 108,
  "title": "108. 将有序数组转换为二叉搜索树",
  "category": "二叉树",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> ，其中元素已经按 <strong>升序</strong> 排列，请你将其转换为一棵 <span data-keyword=\"height-balanced\">平衡</span> 二叉搜索树。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/btree1.jpg\" style=\"width: 302px; height: 222px;\" />\n<pre>\n<strong>输入：</strong>nums = [-10,-3,0,5,9]\n<strong>输出：</strong>[0,-3,9,-10,null,5]\n<strong>解释：</strong>[0,-10,5,null,-3,null,9] 也将被视为正确答案：\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/btree2.jpg\" style=\"width: 302px; height: 222px;\" />\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/btree.jpg\" style=\"width: 342px; height: 142px;\" />\n<pre>\n<strong>输入：</strong>nums = [1,3]\n<strong>输出：</strong>[3,1]\n<strong>解释：</strong>[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> 按 <strong>严格递增</strong> 顺序排列</li>\n</ul>",
  "hints": [
   "题型是「分治建树」：有序数组正是 BST 的中序遍历结果，问自己\"选哪个元素当根，两边才一样多\"。",
   "每次取区间<strong>中间位置</strong>的数作根：左半段递归建左子树、右半段建右子树，树高自然是 O(log n)。",
   "写 <code>helper(nums, left, right)</code>：left &gt; right 返回 nullptr；mid = (left + right) / 2 建根，左右子树分别递归 [left, mid-1] 和 [mid+1, right]。"
  ],
  "solutionCode": "class Solution {\npublic:\n    TreeNode* sortedArrayToBST(vector<int>& nums) {\n        return helper(nums, 0, nums.size() - 1);\n    }\n\n    TreeNode* helper(vector<int>& nums, int left, int right) {\n        if (left > right) {\n            return nullptr;\n        }\n\n        // 总是选择中间位置左边的数字作为根节点\n        int mid = (left + right) / 2;\n\n        TreeNode* root = new TreeNode(nums[mid]);\n        root->left = helper(nums, left, mid - 1);\n        root->right = helper(nums, mid + 1, right);\n        return root;\n    }\n};",
  "solutionText": "分治递归。有序数组就是 BST 的中序遍历，每次取区间中间偏左位置 mid=(left+right)/2 的数作根，左半段递归建左子树、右半段建右子树，left>right 时返回空指针。固定取中间偏左保证结果确定，左右子树节点数最多差 1，高度平衡。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* sortedArrayToBST(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 98,
  "title": "98. 验证二叉搜索树",
  "category": "二叉树",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个二叉树的根节点 <code>root</code> ，判断其是否是一个有效的二叉搜索树。</p>\n\n<p><strong>有效</strong> 二叉搜索树定义如下：</p>\n\n<ul>\n\t<li>节点的左<span data-keyword=\"subtree\">子树</span>只包含<strong>&nbsp;严格小于 </strong>当前节点的数。</li>\n\t<li>节点的右子树只包含 <strong>严格大于</strong> 当前节点的数。</li>\n\t<li>所有左子树和右子树自身必须也是二叉搜索树。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg\" style=\"width: 302px; height: 182px;\" />\n<pre>\n<strong>输入：</strong>root = [2,1,3]\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg\" style=\"width: 422px; height: 292px;\" />\n<pre>\n<strong>输入：</strong>root = [5,1,4,null,null,3,6]\n<strong>输出：</strong>false\n<strong>解释：</strong>根节点的值是 5 ，但是右子节点的值是 4 。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目范围在<code>[1, 10<sup>4</sup>]</code> 内</li>\n\t<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>",
  "hints": [
   "题型是「递归验证 + 向下传约束」：只比较父子大小不够——整棵左子树都要小于根，想想怎么把这个范围约束传下去。",
   "给递归函数带一个开区间 (lower, upper)：<strong>节点值必须严格在区间内</strong>；往左走收紧上界为当前值，往右走收紧下界为当前值。",
   "<code>helper(root, lower, upper)</code>：空节点返回 true；val &lt;= lower 或 val &gt;= upper 返回 false；再递归 helper(left, lower, val) 与 helper(right, val, upper)。初始边界用 LONG_MIN / LONG_MAX 防 INT_MIN、INT_MAX 用例。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool helper(TreeNode* root, long long lower, long long upper) {\n        if (root == nullptr) {\n            return true;\n        }\n        if (root -> val <= lower || root -> val >= upper) { // 节点值必须严格落在开区间 (lower, upper) 内\n            return false;\n        }\n        return helper(root -> left, lower, root -> val) && helper(root -> right, root -> val, upper);\n    }\n    bool isValidBST(TreeNode* root) {\n        return helper(root, LONG_MIN, LONG_MAX);\n    }\n};",
  "solutionText": "递归时给每个节点带上开区间 (lower, upper)：节点值必须严格落在区间内，往左递归把上界收紧为当前值，往右递归把下界收紧为当前值。初始边界用 LONG_MIN/LONG_MAX，防止节点值恰为 INT_MIN/INT_MAX 时误判。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 230,
  "title": "230. 二叉搜索树中第 K 小的元素",
  "category": "二叉树",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个二叉搜索树的根节点 <code>root</code> ，和一个整数 <code>k</code> ，请你设计一个算法查找其中第&nbsp;<code>k</code><strong>&nbsp;</strong>小的元素（<code>k</code> 从 1 开始计数）。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg\" style=\"width: 212px; height: 301px;\" />\n<pre>\n<strong>输入：</strong>root = [3,1,4,null,2], k = 1\n<strong>输出：</strong>1\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg\" style=\"width: 382px; height: 302px;\" />\n<pre>\n<strong>输入：</strong>root = [5,3,6,2,4,null,null,1], k = 3\n<strong>输出：</strong>3\n</pre>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中的节点数为 <code>n</code> 。</li>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 <code>k</code> 小的值，你将如何优化算法？</p>",
  "hints": [
   "题型是「BST 性质 + 中序遍历」：BST 的中序遍历是递增序列，第 k 小就是中序第 k 个被访问的节点。",
   "用 stack&lt;TreeNode*&gt; 写迭代中序：先沿左链一路入栈，弹栈时计数，访问到第 k 个就能<strong>提前停止</strong>，不用遍历整棵树。",
   "外层 while(root 非空或栈非空)：内层把 root 沿左链全部入栈；弹出栈顶后 --k，k==0 就 break 返回该节点值，否则 root = root-&gt;right 转向右子树。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        stack<TreeNode *> stack;\n        while (root != nullptr || stack.size() > 0) {\n            while (root != nullptr) {\n                stack.push(root);\n                root = root->left;\n            }\n            root = stack.top();\n            stack.pop();\n            --k; // 弹栈顺序即中序递增顺序，第 k 次弹出的就是第 k 小\n            if (k == 0) {\n                break;\n            }\n            root = root->right;\n        }\n        return root->val;\n    }\n};",
  "solutionText": "用栈做迭代中序遍历：不断沿左链入栈，弹栈访问一个节点就把 k 减一，减到 0 时刚弹出的节点就是第 k 小，随后转向右子树继续。利用 BST 中序遍历严格递增的性质，访问到第 k 个立即终止，不必遍历整棵树。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        \n    }\n};"
 },
 {
  "id": 199,
  "title": "199. 二叉树的右视图",
  "category": "二叉树",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个二叉树的 <strong>根节点</strong> <code>root</code>，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>root = [1,2,3,null,5,null,4]</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[1,3,4]</span></p>\n\n<p><strong>解释：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/11/24/tmpd5jn43fs-1.png\" style=\"width: 400px; height: 207px;\" /></p>\n</div>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>root = [1,2,3,4,null,null,null,5]</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>[1,3,4,5]</span></p>\n\n<p><strong>解释：</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/11/24/tmpkpe40xeh-1.png\" style=\"width: 400px; height: 214px;\" /></p>\n</div>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入：</strong><span class=\"example-io\">root = [1,null,3]</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[1,3]</span></p>\n</div>\n\n<p><strong class=\"example\">示例 4：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>root = []</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[]</span></p>\n\n<p>&nbsp;</p>\n</div>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li>二叉树的节点个数的范围是 <code>[0,100]</code></li>\n\t<li><code>-100&nbsp;&lt;= Node.val &lt;= 100</code>&nbsp;</li>\n</ul>",
  "hints": [
   "题型是「按层看树」：右视图就是每一层<strong>最后一个</strong>（最右侧）节点的值，逐层遍历自然能拿到。",
   "用 queue&lt;TreeNode*&gt; 做 BFS，再配一个同步的深度队列，外加哈希表「深度 → 该层最右值」记录结果。",
   "出队时无条件执行 rightmostValueAtDepth[depth] = node-&gt;val：同层从左到右访问，<strong>最后写入的就是最右节点</strong>；遍历完按深度 0..max_depth 收集答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<int> rightSideView(TreeNode* root) {\n        unordered_map<int, int> rightmostValueAtDepth;\n        int max_depth = -1;\n\n        queue<TreeNode*> nodeQueue;\n        queue<int> depthQueue;\n        nodeQueue.push(root);\n        depthQueue.push(0);\n\n        while (!nodeQueue.empty()) {\n            TreeNode* node = nodeQueue.front();nodeQueue.pop();\n            int depth = depthQueue.front();depthQueue.pop();\n\n            if (node != NULL) {\n                // 维护二叉树的最大深度\n                max_depth = max(max_depth, depth);\n\n                // 由于每一层最后一个访问到的节点才是我们要的答案，因此不断更新对应深度的信息即可\n                rightmostValueAtDepth[depth] =  node -> val;\n\n                nodeQueue.push(node -> left);\n                nodeQueue.push(node -> right);\n                depthQueue.push(depth + 1);\n                depthQueue.push(depth + 1);\n            }\n        }\n\n        vector<int> rightView;\n        for (int depth = 0; depth <= max_depth; ++depth) {\n            rightView.push_back(rightmostValueAtDepth[depth]);\n        }\n\n        return rightView;\n    }\n};",
  "solutionText": "BFS 层序遍历，节点队列旁配一个同步的深度队列。同层节点按从左到右出队，出队时无条件用当前值覆盖「该深度的最右值」哈希表，一层里最后被访问的节点自然留下；最后按深度 0..max_depth 依次取出即右视图。空孩子也入队，出队时判空跳过即可。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<int> rightSideView(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 114,
  "title": "114. 二叉树展开为链表",
  "category": "二叉树",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你二叉树的根结点 <code>root</code> ，请你将它展开为一个单链表：</p>\n\n<ul>\n\t<li>展开后的单链表应该同样使用 <code>TreeNode</code> ，其中 <code>right</code> 子指针指向链表中下一个结点，而左子指针始终为 <code>null</code> 。</li>\n\t<li>展开后的单链表应该与二叉树 <a href=\"https://baike.baidu.com/item/%E5%85%88%E5%BA%8F%E9%81%8D%E5%8E%86/6442839?fr=aladdin\" target=\"_blank\"><strong>先序遍历</strong></a> 顺序相同。</li>\n</ul>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/14/flaten.jpg\" style=\"width: 500px; height: 226px;\" />\n<pre>\n<strong>输入：</strong>root = [1,2,5,3,4,null,6]\n<strong>输出：</strong>[1,null,2,null,3,null,4,null,5,null,6]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [0]\n<strong>输出：</strong>[0]\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中结点数在范围 <code>[0, 2000]</code> 内</li>\n\t<li><code>-100 <= Node.val <= 100</code></li>\n</ul>\n\n<p> </p>\n\n<p><strong>进阶：</strong>你可以使用原地算法（<code>O(1)</code> 额外空间）展开这棵树吗？</p>",
  "hints": [
   "题型是「二叉树原地改造」：展开后的节点顺序正好是<strong>前序遍历</strong>的顺序，先确定顺序再考虑怎么接指针。",
   "边遍历边改指针容易把还没访问的右子树弄丢，最稳的做法是把<strong>遍历</strong>和<strong>重连</strong>拆成两步。",
   "第一步前序遍历把节点依次收进 vector&lt;TreeNode*&gt;；第二步从 i=1 开始，令 l[i-1]-&gt;left = nullptr、l[i-1]-&gt;right = l[i]，串成一条只有右孩子的链。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void flatten(TreeNode* root) {\n        vector<TreeNode*> l;\n        preorderTraversal(root, l);\n        int n = l.size();\n        for (int i = 1; i < n; i++) { // 按前序顺序把相邻节点重连成右斜单链\n            TreeNode *prev = l.at(i - 1), *curr = l.at(i);\n            prev->left = nullptr;\n            prev->right = curr;\n        }\n    }\n\n    void preorderTraversal(TreeNode* root, vector<TreeNode*> &l) {\n        if (root != NULL) {\n            l.push_back(root);\n            preorderTraversal(root->left, l);\n            preorderTraversal(root->right, l);\n        }\n    }\n};",
  "solutionText": "两步走：先做一次前序遍历，把所有节点按访问顺序存进数组；再顺序重连——对相邻的 prev 与 curr，把 prev 的 left 置空、right 指向 curr。遍历与改指针分离，避免了边遍历边改导致右子树引用丢失的问题，代价是 O(n) 额外空间。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    void flatten(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 105,
  "title": "105. 从前序与中序遍历序列构造二叉树",
  "category": "二叉树",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定两个整数数组&nbsp;<code>preorder</code> 和 <code>inorder</code>&nbsp;，其中&nbsp;<code>preorder</code> 是二叉树的<strong>先序遍历</strong>， <code>inorder</code>&nbsp;是同一棵树的<strong>中序遍历</strong>，请构造二叉树并返回其根节点。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree.jpg\" style=\"height: 302px; width: 277px;\" />\n<pre>\n<strong>输入</strong><strong>:</strong> preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\n<strong>输出:</strong> [3,9,20,null,null,15,7]\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> preorder = [-1], inorder = [-1]\n<strong>输出:</strong> [-1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= preorder.length &lt;= 3000</code></li>\n\t<li><code>inorder.length == preorder.length</code></li>\n\t<li><code>-3000 &lt;= preorder[i], inorder[i] &lt;= 3000</code></li>\n\t<li><code>preorder</code>&nbsp;和&nbsp;<code>inorder</code>&nbsp;均 <strong>无重复</strong> 元素</li>\n\t<li><code>inorder</code>&nbsp;均出现在&nbsp;<code>preorder</code></li>\n\t<li><code>preorder</code>&nbsp;<strong>保证</strong> 为二叉树的前序遍历序列</li>\n\t<li><code>inorder</code>&nbsp;<strong>保证</strong> 为二叉树的中序遍历序列</li>\n</ul>",
  "hints": [
   "题型是「分治建树」：前序的第一个元素永远是根，而根把中序序列切成左子树、右子树两段。",
   "先用 unordered_map&lt;int,int&gt; 存「值 → 中序下标」，每层递归 O(1) 定位根在中序里的位置，进而得到左子树节点数 size_left。",
   "递归带前序、中序两对区间下标：根 = preorder[preorder_left]；左子树对应前序 [left+1, left+size_left] 与中序 [ileft, iroot-1]，右子树取剩余两段；前序区间为空返回 nullptr。"
  ],
  "solutionCode": "class Solution {\nprivate:\n    unordered_map<int, int> index;\n\npublic:\n    TreeNode* myBuildTree(const vector<int>& preorder, const vector<int>& inorder, int preorder_left, int preorder_right, int inorder_left, int inorder_right) {\n        if (preorder_left > preorder_right) {\n            return nullptr;\n        }\n\n        // 前序遍历中的第一个节点就是根节点\n        int preorder_root = preorder_left;\n        // 在中序遍历中定位根节点\n        int inorder_root = index[preorder[preorder_root]];\n\n        // 先把根节点建立出来\n        TreeNode* root = new TreeNode(preorder[preorder_root]);\n        // 得到左子树中的节点数目\n        int size_left_subtree = inorder_root - inorder_left;\n        // 递归地构造左子树，并连接到根节点\n        // 先序遍历中「从 左边界+1 开始的 size_left_subtree」个元素就对应了中序遍历中「从 左边界 开始到 根节点定位-1」的元素\n        root->left = myBuildTree(preorder, inorder, preorder_left + 1, preorder_left + size_left_subtree, inorder_left, inorder_root - 1);\n        // 递归地构造右子树，并连接到根节点\n        // 先序遍历中「从 左边界+1+左子树节点数目 开始到 右边界」的元素就对应了中序遍历中「从 根节点定位+1 到 右边界」的元素\n        root->right = myBuildTree(preorder, inorder, preorder_left + size_left_subtree + 1, preorder_right, inorder_root + 1, inorder_right);\n        return root;\n    }\n\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        int n = preorder.size();\n        // 构造哈希映射，帮助我们快速定位根节点\n        for (int i = 0; i < n; ++i) {\n            index[inorder[i]] = i;\n        }\n        return myBuildTree(preorder, inorder, 0, n - 1, 0, n - 1);\n    }\n};",
  "solutionText": "递归分治。前序区间的第一个元素是根；先用哈希表预存「值 → 中序下标」，O(1) 定位根在中序中的位置，算出左子树节点数，再据此把前序、中序各切成两段分别递归建左右子树。出口是前序区间为空返回 nullptr；哈希定位依赖节点值互不相同。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        \n    }\n};"
 },
 {
  "id": 437,
  "title": "437. 路径总和 III",
  "category": "二叉树",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个二叉树的根节点 <code>root</code> ，和一个整数 <code>targetSum</code> ，求该二叉树里节点值之和等于 <code>targetSum</code> 的 <strong>路径</strong> 的数目。</p>\n\n<p><strong>路径</strong> 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><img src=\"https://assets.leetcode.com/uploads/2021/04/09/pathsum3-1-tree.jpg\" style=\"width: 452px; \" /></p>\n\n<pre>\n<strong>输入：</strong>root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\n<strong>输出：</strong>3\n<strong>解释：</strong>和等于 8 的路径有 3 条，如图所示。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\n<strong>输出：</strong>3\n</pre>\n\n<p> </p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li>二叉树的节点个数的范围是 <code>[0,1000]</code></li>\n\t<li><code>-10<sup>9</sup> <= Node.val <= 10<sup>9</sup></code> </li>\n\t<li><code>-1000 <= targetSum <= 1000</code> </li>\n</ul>",
  "hints": [
   "题型是「树上前缀和」：任意向下路径的和 = 两个前缀和之差，把\"数路径\"转成\"数有多少个旧前缀和等于 curr - targetSum\"。",
   "用 unordered_map&lt;long long,int&gt; 记录<strong>当前递归链上</strong>每个前缀和的出现次数，初始放入 prefix[0]=1 兜住从根开始的路径。",
   "DFS 里 curr += val 后<strong>先</strong>取 ret = prefix[curr - targetSum]，再 prefix[curr]++ 并递归左右子树，<strong>回溯时 prefix[curr]--</strong>，防止兄弟子树之间串成假路径。"
  ],
  "solutionCode": "class Solution {\npublic:\n    unordered_map<long long, int> prefix;\n\n    int dfs(TreeNode *root, long long curr, int targetSum) {\n        if (!root) {\n            return 0;\n        }\n\n        int ret = 0;\n        curr += root->val;\n        if (prefix.count(curr - targetSum)) {\n            ret = prefix[curr - targetSum]; // 链上旧前缀和的个数 = 以当前节点结尾的合法路径数\n        }\n\n        prefix[curr]++;\n        ret += dfs(root->left, curr, targetSum);\n        ret += dfs(root->right, curr, targetSum);\n        prefix[curr]--; // 回溯撤销，保证表中只含根到当前节点这条链上的前缀和\n\n        return ret;\n    }\n\n    int pathSum(TreeNode* root, int targetSum) {\n        prefix[0] = 1;\n        return dfs(root, 0, targetSum);\n    }\n};",
  "solutionText": "DFS 时维护根到当前节点的前缀和 curr 和「链上前缀和→出现次数」哈希表。到达节点先查表中 curr-targetSum 的次数，即以当前节点结尾的路径数；再把 curr 计入表、递归左右子树，回溯时撤销。表初始放 0→1 兜住从根出发的路径，和用 long long 防溢出。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int pathSum(TreeNode* root, int targetSum) {\n        \n    }\n};"
 },
 {
  "id": 236,
  "title": "236. 二叉树的最近公共祖先",
  "category": "二叉树",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。</p>\n\n<p><a href=\"https://baike.baidu.com/item/%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88/8918834?fr=aladdin\" target=\"_blank\">百度百科</a>中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（<strong>一个节点也可以是它自己的祖先</strong>）。”</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/14/binarytree.png\" style=\"width: 200px; height: 190px;\" />\n<pre>\n<strong>输入：</strong>root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\n<strong>输出：</strong>3\n<strong>解释：</strong>节点 <code>5 </code>和节点 <code>1 </code>的最近公共祖先是节点 <code>3 。</code>\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/14/binarytree.png\" style=\"width: 200px; height: 190px;\" />\n<pre>\n<strong>输入：</strong>root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4\n<strong>输出：</strong>5\n<strong>解释：</strong>节点 <code>5 </code>和节点 <code>4 </code>的最近公共祖先是节点 <code>5 。</code>因为根据定义最近公共祖先节点可以为节点本身。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,2], p = 1, q = 2\n<strong>输出：</strong>1\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[2, 10<sup>5</sup>]</code> 内。</li>\n\t<li><code>-10<sup>9</sup> <= Node.val <= 10<sup>9</sup></code></li>\n\t<li>所有 <code>Node.val</code> <code>互不相同</code> 。</li>\n\t<li><code>p != q</code></li>\n\t<li><code>p</code> 和 <code>q</code> 均存在于给定的二叉树中。</li>\n</ul>",
  "hints": [
   "题型是「树上递归 + 后序汇总」：最近公共祖先就是第一个把 p、q 分到两边（或自己就是其中之一且另一个在子树里）的节点，信息要自底向上汇总。",
   "让 dfs(root) 返回布尔值：<strong>该子树里是否含 p 或 q</strong>；答案不靠返回值上传，而是在回溯判定成立时记进全局变量 ans。",
   "判定：(lson &amp;&amp; rson) 成立，或 root 自身是 p/q 且 (lson || rson) 成立时令 ans = root；返回 lson || rson || root 是否为 p/q。最深处最先满足，ans 不会被祖先覆盖。"
  ],
  "solutionCode": "class Solution {\npublic:\n    TreeNode* ans;\n    bool dfs(TreeNode* root, TreeNode* p, TreeNode* q) {\n        if (root == nullptr) return false;\n        bool lson = dfs(root->left, p, q);\n        bool rson = dfs(root->right, p, q);\n        if ((lson && rson) || ((root->val == p->val || root->val == q->val) && (lson || rson))) {\n            ans = root; // p、q 分居两侧，或自身即是其一：root 就是最近公共祖先\n        }\n        return lson || rson || (root->val == p->val || root->val == q->val); // 返回：该子树是否包含 p 或 q\n    }\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        dfs(root, p, q);\n        return ans;\n    }\n};",
  "solutionText": "后序递归。dfs 返回「该子树是否包含 p 或 q」，回溯时判定：左右子树各含其一，或当前节点自身是 p/q 且另一个在某侧子树里，则当前节点就是最近公共祖先，记入全局 ans。判定在最深处最先成立，之后祖先不会再满足条件，ans 不会被覆盖。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        \n    }\n};"
 },
 {
  "id": 124,
  "title": "124. 二叉树中的最大路径和",
  "category": "二叉树",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>二叉树中的<strong> 路径</strong> 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 <strong>至多出现一次</strong> 。该路径<strong> 至少包含一个 </strong>节点，且不一定经过根节点。</p>\n\n<p><strong>路径和</strong> 是路径中各节点值的总和。</p>\n\n<p>给你一个二叉树的根节点 <code>root</code> ，返回其 <strong>最大路径和</strong> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg\" style=\"width: 322px; height: 182px;\" />\n<pre>\n<strong>输入：</strong>root = [1,2,3]\n<strong>输出：</strong>6\n<strong>解释：</strong>最优路径是 2 -&gt; 1 -&gt; 3 ，路径和为 2 + 1 + 3 = 6</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg\" />\n<pre>\n<strong>输入：</strong>root = [-10,9,20,null,null,15,7]\n<strong>输出：</strong>42\n<strong>解释：</strong>最优路径是 15 -&gt; 20 -&gt; 7 ，路径和为 15 + 20 + 7 = 42\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目范围是 <code>[1, 3 * 10<sup>4</sup>]</code></li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>",
  "hints": [
   "题型是「树形 DP / 后序递归」：路径可以在某个节点处\"拐弯\"，把每个节点都当作路径的最高点来枚举一次。",
   "区分两个量：递归<strong>返回值</strong>是向下单侧延伸的最大贡献（只能选左或右一支），<strong>全局答案</strong>才允许左右两支都要。",
   "maxGain 里：leftGain、rightGain 都与 0 取 max（负收益直接舍弃）；用 node-&gt;val + leftGain + rightGain 更新全局 maxSum；返回 node-&gt;val + max(leftGain, rightGain)。maxSum 初始 INT_MIN 兜住全负树。"
  ],
  "solutionCode": "class Solution {\nprivate:\n    int maxSum = INT_MIN;\n\npublic:\n    int maxGain(TreeNode* node) {\n        if (node == nullptr) {\n            return 0;\n        }\n\n        // 递归计算左右子节点的最大贡献值\n        // 只有在最大贡献值大于 0 时，才会选取对应子节点\n        int leftGain = max(maxGain(node->left), 0);\n        int rightGain = max(maxGain(node->right), 0);\n\n        // 节点的最大路径和取决于该节点的值与该节点的左右子节点的最大贡献值\n        int priceNewpath = node->val + leftGain + rightGain;\n\n        // 更新答案\n        maxSum = max(maxSum, priceNewpath);\n\n        // 返回节点的最大贡献值\n        return node->val + max(leftGain, rightGain);\n    }\n\n    int maxPathSum(TreeNode* root) {\n        maxGain(root);\n        return maxSum;\n    }\n};",
  "solutionText": "后序递归。maxGain(node) 返回向下单侧延伸的最大贡献：node->val 加左右贡献中较大者，负贡献按 0 舍弃。每个节点处用 val+左贡献+右贡献 更新全局最大路径和（允许在该节点拐弯）。maxSum 初始为 INT_MIN，兜住全负节点用例。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxPathSum(TreeNode* root) {\n        \n    }\n};"
 },
 {
  "id": 200,
  "title": "200. 岛屿数量",
  "category": "图论",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个由&nbsp;<code>'1'</code>（陆地）和 <code>'0'</code>（水）组成的的二维网格，请你计算网格中岛屿的数量。</p>\n\n<p>岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。</p>\n\n<p>此外，你可以假设该网格的四条边均被水包围。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [\n&nbsp; ['1','1','1','1','0'],\n&nbsp; ['1','1','0','1','0'],\n&nbsp; ['1','1','0','0','0'],\n&nbsp; ['0','0','0','0','0']\n]\n<strong>输出：</strong>1\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [\n&nbsp; ['1','1','0','0','0'],\n&nbsp; ['1','1','0','0','0'],\n&nbsp; ['0','0','1','0','0'],\n&nbsp; ['0','0','0','1','1']\n]\n<strong>输出：</strong>3\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 300</code></li>\n\t<li><code>grid[i][j]</code> 的值为 <code>'0'</code> 或 <code>'1'</code></li>\n</ul>",
  "hints": [
   "题型是「网格连通块计数」：数一数有多少片相连的 1，每发现一片新的就计数并把整片抹掉。",
   "不需要额外 visited 数组：把访问过的 <code>'1'</code> 直接改成 <code>'0'</code>（沉岛），天然防止重复计数。",
   "双重循环扫描，遇到 '1' 就岛屿数加一并调用 dfs(r, c)：先置 <code>grid[r][c]='0'</code>，再对上下左右四个仍是 '1' 的邻居递归。"
  ],
  "solutionCode": "class Solution {\nprivate:\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        int nr = grid.size();\n        int nc = grid[0].size();\n\n        grid[r][c] = '0'; // 访问即沉没，防止重复计数\n        if (r - 1 >= 0 && grid[r-1][c] == '1') dfs(grid, r - 1, c);\n        if (r + 1 < nr && grid[r+1][c] == '1') dfs(grid, r + 1, c);\n        if (c - 1 >= 0 && grid[r][c-1] == '1') dfs(grid, r, c - 1);\n        if (c + 1 < nc && grid[r][c+1] == '1') dfs(grid, r, c + 1);\n    }\n\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int nr = grid.size();\n        if (!nr) return 0;\n        int nc = grid[0].size();\n\n        int num_islands = 0;\n        for (int r = 0; r < nr; ++r) {\n            for (int c = 0; c < nc; ++c) {\n                if (grid[r][c] == '1') {\n                    ++num_islands;\n                    dfs(grid, r, c);\n                }\n            }\n        }\n\n        return num_islands;\n    }\n};",
  "solutionText": "双重循环扫描网格，遇到 '1' 就岛屿数加一，并从该点 DFS 把整片相连的 '1' 全部改成 '0'（沉岛），保证每座岛只被计一次。DFS 向上下左右四个方向递归，进入前判断边界与是否为 '1'。易错点：直接在原网格上标记，无需额外 visited 数组。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};"
 },
 {
  "id": 994,
  "title": "994. 腐烂的橘子",
  "category": "图论",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>在给定的&nbsp;<code>m x n</code>&nbsp;网格&nbsp;<code>grid</code>&nbsp;中，每个单元格可以有以下三个值之一：</p>\n\n<ul>\n\t<li>值&nbsp;<code>0</code>&nbsp;代表空单元格；</li>\n\t<li>值&nbsp;<code>1</code>&nbsp;代表新鲜橘子；</li>\n\t<li>值&nbsp;<code>2</code>&nbsp;代表腐烂的橘子。</li>\n</ul>\n\n<p>每分钟，腐烂的橘子&nbsp;<strong>周围&nbsp;4 个方向上相邻</strong> 的新鲜橘子都会腐烂。</p>\n\n<p>返回 <em>直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回&nbsp;<code>-1</code></em>&nbsp;。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><strong><img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2019/02/16/oranges.png\" style=\"height: 137px; width: 650px;\" /></strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [[2,1,1],[1,1,0],[0,1,1]]\n<strong>输出：</strong>4\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [[2,1,1],[0,1,1],[1,0,1]]\n<strong>输出：</strong>-1\n<strong>解释：</strong>左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [[0,2]]\n<strong>输出：</strong>0\n<strong>解释：</strong>因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10</code></li>\n\t<li><code>grid[i][j]</code> 仅为&nbsp;<code>0</code>、<code>1</code>&nbsp;或&nbsp;<code>2</code></li>\n</ul>",
  "hints": [
   "题型是「多源 BFS 求最短扩散时间」：所有腐烂橘子同时作为起点向外一层层感染，层数就是分钟数。",
   "用 <code>queue&lt;pair&lt;int,int&gt;&gt;</code> 存坐标，dis 数组记每个格子被感染的时刻（-1 表示未访问），同时维护新鲜橘子计数 cnt。",
   "初始化把所有值为 2 的格子入队、dis 置 0；出队时向四方向扩展，跳过越界/已访问/空格子，感染到新鲜橘子就 cnt 减一、答案更新为它的 dis；最后 cnt&gt;0 则返回 -1。"
  ],
  "solutionCode": "class Solution {\n    int cnt;\n    int dis[10][10];\n    int dir_x[4] = {0, 1, 0, -1};\n    int dir_y[4] = {1, 0, -1, 0};\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        queue<pair<int, int>>Q;\n        memset(dis, -1, sizeof(dis));\n        cnt = 0;\n        int n = (int)grid.size(), m = (int)grid[0].size(), ans = 0;\n        for (int i = 0; i < n; ++i) {\n            for (int j = 0; j < m; ++j) {\n                if (grid[i][j] == 2) {\n                    Q.emplace(i, j); // 所有腐烂橘子同时入队：多源 BFS\n                    dis[i][j] = 0;\n                }\n                else if (grid[i][j] == 1) {\n                    cnt += 1;\n                }\n            }\n        }\n        while (!Q.empty()){\n            auto [r, c] = Q.front();\n            Q.pop();\n            for (int i = 0; i < 4; ++i) {\n                int tx = r + dir_x[i];\n                int ty = c + dir_y[i];\n                if (tx < 0|| tx >= n || ty < 0|| ty >= m || ~dis[tx][ty] || !grid[tx][ty]) { // 越界 / 已访问(~dis 非零) / 空格子都跳过\n                    continue;\n                }\n                dis[tx][ty] = dis[r][c] + 1;\n                Q.emplace(tx, ty);\n                if (grid[tx][ty] == 1) {\n                    cnt -= 1;\n                    ans = dis[tx][ty];\n                    if (!cnt) {\n                        break;\n                    }\n                }\n            }\n        }\n        return cnt ? -1 : ans;\n    }\n};",
  "solutionText": "多源 BFS：先扫一遍网格，把所有腐烂橘子同时入队并记距离 0，同时统计新鲜橘子数 cnt。逐层向四个方向扩散，每感染一个新鲜橘子就 cnt 减一、答案更新为它的距离。结束后 cnt 仍大于 0 返回 -1；一开始就没有新鲜橘子时答案自然为 0。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        \n    }\n};"
 },
 {
  "id": 207,
  "title": "207. 课程表",
  "category": "图论",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>你这个学期必须选修 <code>numCourses</code> 门课程，记为&nbsp;<code>0</code>&nbsp;到&nbsp;<code>numCourses - 1</code> 。</p>\n\n<p>在选修某些课程之前需要一些先修课程。 先修课程按数组&nbsp;<code>prerequisites</code> 给出，其中&nbsp;<code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> ，表示如果要学习课程&nbsp;<code>a<sub>i</sub></code> 则 <strong>必须</strong> 先学习课程&nbsp; <code>b<sub>i</sub></code><sub> </sub>。</p>\n\n<ul>\n\t<li>例如，先修课程对&nbsp;<code>[0, 1]</code> 表示：想要学习课程 <code>0</code> ，你需要先完成课程 <code>1</code> 。</li>\n</ul>\n\n<p>请你判断是否可能完成所有课程的学习？如果可以，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>numCourses = 2, prerequisites = [[1,0]]\n<strong>输出：</strong>true\n<strong>解释：</strong>总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>numCourses = 2, prerequisites = [[1,0],[0,1]]\n<strong>输出：</strong>false\n<strong>解释：</strong>总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numCourses &lt;= 2000</code></li>\n\t<li><code>0 &lt;= prerequisites.length &lt;= 5000</code></li>\n\t<li><code>prerequisites[i].length == 2</code></li>\n\t<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>\n\t<li><code>prerequisites[i]</code> 中的所有课程对 <strong>互不相同</strong></li>\n</ul>",
  "hints": [
   "题型是「有向图判环 / 拓扑排序」：能修完所有课，等价于先修关系构成的有向图没有环。",
   "建邻接表 edges（先修课 → 后续课）和入度数组 indeg；关键不变量：入度为 0 的课当前就可以修。",
   "把所有入度为 0 的课入队；每出队一门课就 <code>++visited</code>，并把它的后继课入度减一、减到 0 就入队；最后判断 <code>visited == numCourses</code>。"
  ],
  "solutionCode": "class Solution {\nprivate:\n    vector<vector<int>> edges;\n    vector<int> indeg;\n\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        edges.resize(numCourses);\n        indeg.resize(numCourses);\n        for (const auto& info: prerequisites) {\n            edges[info[1]].push_back(info[0]); // 先修课指向后续课\n            ++indeg[info[0]];\n        }\n\n        queue<int> q;\n        for (int i = 0; i < numCourses; ++i) {\n            if (indeg[i] == 0) {\n                q.push(i);\n            }\n        }\n\n        int visited = 0;\n        while (!q.empty()) {\n            ++visited;\n            int u = q.front();\n            q.pop();\n            for (int v: edges[u]) {\n                --indeg[v];\n                if (indeg[v] == 0) {\n                    q.push(v);\n                }\n            }\n        }\n\n        return visited == numCourses; // 全部课都能出队 ⇔ 图中无环\n    }\n};",
  "solutionText": "BFS 拓扑排序：把课程看成有向图，先修课指向后续课，统计每门课的入度。先把入度为 0 的课全部入队，每出队一门课 visited 加一，并把它指向的课入度减一，减到 0 就入队。最终 visited 等于课程总数说明无环、能修完；否则图中有环返回 false。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};"
 },
 {
  "id": 208,
  "title": "208. 实现 Trie (前缀树)",
  "category": "图论",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p><strong><a href=\"https://baike.baidu.com/item/字典树/9825209?fr=aladdin\" target=\"_blank\">Trie</a></strong>（发音类似 \"try\"）或者说 <strong>前缀树</strong> 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。</p>\n\n<p>请你实现 Trie 类：</p>\n\n<ul>\n\t<li><code>Trie()</code> 初始化前缀树对象。</li>\n\t<li><code>void insert(String word)</code> 向前缀树中插入字符串 <code>word</code> 。</li>\n\t<li><code>boolean search(String word)</code> 如果字符串 <code>word</code> 在前缀树中，返回 <code>true</code>（即，在检索之前已经插入）；否则，返回 <code>false</code> 。</li>\n\t<li><code>boolean startsWith(String prefix)</code> 如果之前已经插入的字符串&nbsp;<code>word</code> 的前缀之一为 <code>prefix</code> ，返回 <code>true</code> ；否则，返回 <code>false</code> 。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例：</strong></p>\n\n<pre>\n<strong>输入</strong>\n[\"Trie\", \"insert\", \"search\", \"search\", \"startsWith\", \"insert\", \"search\"]\n[[], [\"apple\"], [\"apple\"], [\"app\"], [\"app\"], [\"app\"], [\"app\"]]\n<strong>输出</strong>\n[null, null, true, false, true, null, true]\n\n<strong>解释</strong>\nTrie trie = new Trie();\ntrie.insert(\"apple\");\ntrie.search(\"apple\");   // 返回 True\ntrie.search(\"app\");     // 返回 False\ntrie.startsWith(\"app\"); // 返回 True\ntrie.insert(\"app\");\ntrie.search(\"app\");     // 返回 True\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= word.length, prefix.length &lt;= 2000</code></li>\n\t<li><code>word</code> 和 <code>prefix</code> 仅由小写英文字母组成</li>\n\t<li><code>insert</code>、<code>search</code> 和 <code>startsWith</code> 调用次数 <strong>总计</strong> 不超过 <code>3 * 10<sup>4</sup></code> 次</li>\n</ul>",
  "hints": [
   "题型是「设计字典树（前缀树）」：一棵 26 叉树，从根到某节点的路径拼出一个前缀，单词末尾打标记。",
   "节点结构：<code>vector&lt;Trie*&gt; children(26)</code> + <code>bool isEnd</code>；类本身就是节点，遍历从 <code>Trie* node = this</code> 出发。",
   "抽一个私有 searchPrefix(prefix)：逐字符 <code>ch - 'a'</code> 下行，子节点为空返回 nullptr。search = 找到节点且 isEnd 为真；startsWith = 找到节点即可；insert 缺节点就新建。"
  ],
  "solutionCode": "class Trie {\nprivate:\n    vector<Trie*> children;\n    bool isEnd;\n\n    Trie* searchPrefix(string prefix) {\n        Trie* node = this;\n        for (char ch : prefix) {\n            ch -= 'a';\n            if (node->children[ch] == nullptr) {\n                return nullptr;\n            }\n            node = node->children[ch];\n        }\n        return node;\n    }\n\npublic:\n    Trie() : children(26), isEnd(false) {}\n\n    void insert(string word) {\n        Trie* node = this;\n        for (char ch : word) {\n            ch -= 'a';\n            if (node->children[ch] == nullptr) {\n                node->children[ch] = new Trie();\n            }\n            node = node->children[ch];\n        }\n        node->isEnd = true; // 单词结尾打标记\n    }\n\n    bool search(string word) {\n        Trie* node = this->searchPrefix(word);\n        return node != nullptr && node->isEnd;\n    }\n\n    bool startsWith(string prefix) {\n        return this->searchPrefix(prefix) != nullptr;\n    }\n};",
  "solutionText": "每个节点存 26 个子指针和 isEnd 标记，类本身就是根节点。insert 沿字符逐层下行，缺节点就 new 一个，末尾置 isEnd。search 与 startsWith 共用 searchPrefix：沿前缀走到底返回末端节点，中途断链返回空。区别在于 search 还要求末端节点 isEnd 为真。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Trie {\npublic:\n    Trie() {\n        \n    }\n    \n    void insert(string word) {\n        \n    }\n    \n    bool search(string word) {\n        \n    }\n    \n    bool startsWith(string prefix) {\n        \n    }\n};\n\n/**\n * Your Trie object will be instantiated and called as such:\n * Trie* obj = new Trie();\n * obj->insert(word);\n * bool param_2 = obj->search(word);\n * bool param_3 = obj->startsWith(prefix);\n */"
 },
 {
  "id": 46,
  "title": "46. 全排列",
  "category": "回溯",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个不含重复数字的数组 <code>nums</code> ，返回其 <em>所有可能的全排列</em> 。你可以 <strong>按任意顺序</strong> 返回答案。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3]\n<strong>输出：</strong>[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,1]\n<strong>输出：</strong>[[0,1],[1,0]]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1]\n<strong>输出：</strong>[[1]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 6</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li><code>nums</code> 中的所有整数 <strong>互不相同</strong></li>\n</ul>",
  "hints": [
   "题型是「排列型回溯」：逐位确定每个位置放哪个数，试完一种选择要撤销后再试下一种。",
   "官方写法不用 visited 数组：数组左段是已确定的排列、右段是剩余候选集合，靠 swap 维护这个不变量。",
   "backtrack(first)：若 first==len 记录答案；否则 for i 从 first 到 len-1，<code>swap(output[i], output[first])</code> → 递归 first+1 → 再 swap 回来撤销。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void backtrack(vector<vector<int>>& res, vector<int>& output, int first, int len){\n        // 所有数都填完了\n        if (first == len) {\n            res.emplace_back(output);\n            return;\n        }\n        for (int i = first; i < len; ++i) {\n            // 动态维护数组\n            swap(output[i], output[first]);\n            // 继续递归填下一个数\n            backtrack(res, output, first + 1, len);\n            // 撤销操作\n            swap(output[i], output[first]);\n        }\n    }\n    vector<vector<int>> permute(vector<int>& nums) {\n        vector<vector<int> > res;\n        backtrack(res, nums, 0, (int)nums.size());\n        return res;\n    }\n};",
  "solutionText": "回溯 + 原地交换：把数组视为左边「已填」、右边「待填」两段。递归到第 first 位时，依次把 i∈[first,len) 的每个数换到 first 位，递归填下一位，返回后再换回来撤销。first 等于 len 时记录一份答案。免去 visited 数组，易错点是撤销时必须对称地 swap 回去。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 78,
  "title": "78. 子集",
  "category": "回溯",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数数组&nbsp;<code>nums</code> ，数组中的元素 <strong>互不相同</strong> 。返回该数组所有可能的<span data-keyword=\"subset\">子集</span>（幂集）。</p>\n\n<p>解集 <strong>不能</strong> 包含重复的子集。你可以按 <strong>任意顺序</strong> 返回解集。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3]\n<strong>输出：</strong>[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0]\n<strong>输出：</strong>[[],[0]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li><code>nums</code> 中的所有元素 <strong>互不相同</strong></li>\n</ul>",
  "hints": [
   "题型是「子集型回溯」：每个元素独立地面临「选或不选」两种选择，所有递归叶子恰好构成 2^n 个子集。",
   "维护一条路径数组 t 表示当前已选的元素；递归参数只需一个下标 cur，表示正在决策第几个元素。",
   "dfs(cur)：cur==n 时把 t 存入答案；否则 <code>t.push_back(nums[cur])</code> → dfs(cur+1)（选）→ <code>t.pop_back()</code> → dfs(cur+1)（不选）。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<int> t;\n    vector<vector<int>> ans;\n\n    void dfs(int cur, vector<int>& nums) {\n        if (cur == nums.size()) {\n            ans.push_back(t);\n            return;\n        }\n        t.push_back(nums[cur]); // 选择当前元素\n        dfs(cur + 1, nums);\n        t.pop_back(); // 撤销选择\n        dfs(cur + 1, nums); // 不选当前元素\n    }\n\n    vector<vector<int>> subsets(vector<int>& nums) {\n        dfs(0, nums);\n        return ans;\n    }\n};",
  "solutionText": "对每个元素做「选 / 不选」二叉决策：dfs(cur) 处理第 cur 个数，先把 nums[cur] 压入路径 t 再递归（选），弹出后再递归一次（不选），cur 到达末尾时把当前 t 存入答案，n 个元素共产生 2^n 个子集。易错点：两条分支之间必须 pop_back 撤销，否则路径被污染。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 17,
  "title": "17. 电话号码的字母组合",
  "category": "回溯",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个仅包含数字&nbsp;<code>2-9</code>&nbsp;的字符串，返回所有它能表示的字母组合。答案可以按 <strong>任意顺序</strong> 返回。</p>\n\n<p>给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。</p>\n\n<p><img src=\"https://pic.leetcode.cn/1752723054-mfIHZs-image.png\" style=\"width: 200px;\" /></p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>digits = \"23\"\n<strong>输出：</strong>[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>digits = \"2\"\n<strong>输出：</strong>[\"a\",\"b\",\"c\"]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= digits.length &lt;= 4</code></li>\n\t<li><code>digits[i]</code> 是范围 <code>['2', '9']</code> 的一个数字。</li>\n</ul>",
  "hints": [
   "题型是「组合型回溯（笛卡尔积）」：每个数字对应一组字母，逐位枚举并拼接出所有可能。",
   "先建 <code>unordered_map&lt;char, string&gt;</code> 映射（'2'→\"abc\"…），再用一个 string 作为可增删的当前路径。",
   "backtrack(index)：index==digits.length() 时收录答案；否则取该数字的字母串，对每个字母：push_back → 递归 index+1 → pop_back 撤销。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        vector<string> combinations;\n        if (digits.empty()) {\n            return combinations;\n        }\n        unordered_map<char, string> phoneMap{\n            {'2', \"abc\"},\n            {'3', \"def\"},\n            {'4', \"ghi\"},\n            {'5', \"jkl\"},\n            {'6', \"mno\"},\n            {'7', \"pqrs\"},\n            {'8', \"tuv\"},\n            {'9', \"wxyz\"}\n        };\n        string combination;\n        backtrack(combinations, phoneMap, digits, 0, combination);\n        return combinations;\n    }\n\n    void backtrack(vector<string>& combinations, const unordered_map<char, string>& phoneMap, const string& digits, int index, string& combination) {\n        if (index == digits.length()) {\n            combinations.push_back(combination);\n        } else {\n            char digit = digits[index];\n            const string& letters = phoneMap.at(digit);\n            for (const char& letter: letters) {\n                combination.push_back(letter);\n                backtrack(combinations, phoneMap, digits, index + 1, combination);\n                combination.pop_back(); // 撤销本层选择\n            }\n        }\n    }\n};",
  "solutionText": "回溯逐位拼字母：先建数字到字母串的映射表，backtrack(index) 处理第 index 个数字，枚举它对应的每个字母——压入当前组合、递归下一位、再弹出撤销。index 走到末尾就收录一个完整组合。易错点：digits 为空要直接返回空数组，而不是含空串的数组。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        \n    }\n};"
 },
 {
  "id": 39,
  "title": "39. 组合总和",
  "category": "回溯",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个 <strong>无重复元素</strong> 的整数数组&nbsp;<code>candidates</code> 和一个目标整数&nbsp;<code>target</code>&nbsp;，找出&nbsp;<code>candidates</code>&nbsp;中可以使数字和为目标数&nbsp;<code>target</code> 的 所有<em>&nbsp;</em><strong>不同组合</strong> ，并以列表形式返回。你可以按 <strong>任意顺序</strong> 返回这些组合。</p>\n\n<p><code>candidates</code> 中的 <strong>同一个</strong> 数字可以 <strong>无限制重复被选取</strong> 。如果至少一个数字的被选数量不同，则两种组合是不同的。&nbsp;</p>\n\n<p>对于给定的输入，保证和为&nbsp;<code>target</code> 的不同组合数少于 <code>150</code> 个。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>candidates = [2,3,6,7], target = 7\n<strong>输出：</strong>[[2,2,3],[7]]\n<strong>解释：</strong>\n2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。\n7 也是一个候选， 7 = 7 。\n仅有这两种组合。</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入: </strong>candidates = [2,3,5], target = 8\n<strong>输出: </strong>[[2,2,2,2],[2,3,3],[3,5]]</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入: </strong>candidates = [2], target = 1\n<strong>输出: </strong>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= candidates.length &lt;= 30</code></li>\n\t<li><code>2 &lt;= candidates[i] &lt;= 40</code></li>\n\t<li><code>candidates</code> 的所有元素 <strong>互不相同</strong></li>\n\t<li><code>1 &lt;= target &lt;= 40</code></li>\n</ul>",
  "hints": [
   "题型是「组合型回溯（可重复选取）」：在候选数里凑出目标和，同一个数可以使用无限次。",
   "递归状态是 (idx, 剩余 target)：每个数两条分支——跳过它，或选它；关键是选它之后 <strong>idx 不变</strong>，才能重复选同一个数。",
   "dfs：target==0 时收录组合并返回，idx 越界返回；先递归 dfs(idx+1) 表示跳过，再在 target-candidates[idx]&gt;=0 时 push → dfs(idx, target-candidates[idx]) → pop 撤销。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void dfs(vector<int>& candidates, int target, vector<vector<int>>& ans, vector<int>& combine, int idx) {\n        if (idx == candidates.size()) {\n            return;\n        }\n        if (target == 0) {\n            ans.emplace_back(combine);\n            return;\n        }\n        // 直接跳过\n        dfs(candidates, target, ans, combine, idx + 1);\n        // 选择当前数\n        if (target - candidates[idx] >= 0) {\n            combine.emplace_back(candidates[idx]);\n            dfs(candidates, target - candidates[idx], ans, combine, idx);\n            combine.pop_back();\n        }\n    }\n\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        vector<vector<int>> ans;\n        vector<int> combine;\n        dfs(candidates, target, ans, combine, 0);\n        return ans;\n    }\n};",
  "solutionText": "对每个候选数做「跳过 / 选用」两分支回溯：dfs(idx, target) 中 target 减到 0 就收录当前组合，idx 越界则返回。跳过分支递归 idx+1；选用分支把该数压入后递归时 idx 不变（同一个数可重复选），返回后 pop_back 撤销。idx 只进不退保证组合不重复。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        \n    }\n};"
 },
 {
  "id": 22,
  "title": "22. 括号生成",
  "category": "回溯",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>数字 <code>n</code>&nbsp;代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 <strong>有效的 </strong>括号组合。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 3\n<strong>输出：</strong>[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 1\n<strong>输出：</strong>[\"()\"]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 8</code></li>\n</ul>",
  "hints": [
   "题型是「构造型回溯」：逐字符构造长度 2n 的括号串，只在保证仍能合法的前提下才放字符。",
   "关键不变量：任意时刻<strong>右括号数不能超过左括号数</strong>，且左括号总数不超过 n；只需带着 open、close 两个计数递归。",
   "backtrack：串长==2n 时收录答案；若 open&lt;n，放 '(' 递归再撤销；若 close&lt;open，放 ')' 递归再撤销。"
  ],
  "solutionCode": "class Solution {\n    void backtrack(vector<string>& ans, string& cur, int open, int close, int n) {\n        if (cur.size() == n * 2) {\n            ans.push_back(cur);\n            return;\n        }\n        if (open < n) {\n            cur.push_back('(');\n            backtrack(ans, cur, open + 1, close, n);\n            cur.pop_back();\n        }\n        if (close < open) { // 右括号不能多于左括号，保证前缀合法\n            cur.push_back(')');\n            backtrack(ans, cur, open, close + 1, n);\n            cur.pop_back();\n        }\n    }\npublic:\n    vector<string> generateParenthesis(int n) {\n        vector<string> result;\n        string current;\n        backtrack(result, current, 0, 0, n);\n        return result;\n    }\n};",
  "solutionText": "回溯时维护已放的左括号数 open 与右括号数 close：open 小于 n 时才能放左括号，close 小于 open 时才能放右括号——这个不变量保证任意前缀合法。串长到 2n 时收录答案，每放一个字符递归后要 pop_back 撤销。相比先生成再验证的暴力法，剪掉了全部无效分支。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        \n    }\n};"
 },
 {
  "id": 79,
  "title": "79. 单词搜索",
  "category": "回溯",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个&nbsp;<code>m x n</code> 二维字符网格&nbsp;<code>board</code> 和一个字符串单词&nbsp;<code>word</code> 。如果&nbsp;<code>word</code> 存在于网格中，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/04/word2.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>输入：</strong>board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = \"ABCCED\"\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>输入：</strong>board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = \"SEE\"\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 3：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/15/word3.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>输入：</strong>board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = \"ABCB\"\n<strong>输出：</strong>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == board.length</code></li>\n\t<li><code>n = board[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 6</code></li>\n\t<li><code>1 &lt;= word.length &lt;= 15</code></li>\n\t<li><code>board</code> 和 <code>word</code> 仅由大小写英文字母组成</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以使用搜索剪枝的技术来优化解决方案，使其在 <code>board</code> 更大的情况下可以更快解决问题？</p>",
  "hints": [
   "题型是「网格路径回溯」：从每个格子出发 DFS 匹配单词，同一条路径中的格子不能重复使用。",
   "用 visited 二维数组标记当前路径上的格子；递归参数 (i, j, k) 表示正在用 board[i][j] 匹配 word[k]。",
   "check：board[i][j]!=word[k] 返回 false；k 是最后一位返回 true；否则置 visited，向四个未越界且未访问的邻居递归 k+1，返回前<strong>撤销 visited 标记</strong>。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool check(vector<vector<char>>& board, vector<vector<int>>& visited, int i, int j, string& s, int k) {\n        if (board[i][j] != s[k]) {\n            return false;\n        } else if (k == s.length() - 1) {\n            return true;\n        }\n        visited[i][j] = true;\n        vector<pair<int, int>> directions{{0, 1}, {0, -1}, {1, 0}, {-1, 0}};\n        bool result = false;\n        for (const auto& dir: directions) {\n            int newi = i + dir.first, newj = j + dir.second;\n            if (newi >= 0 && newi < board.size() && newj >= 0 && newj < board[0].size()) {\n                if (!visited[newi][newj]) {\n                    bool flag = check(board, visited, newi, newj, s, k + 1);\n                    if (flag) {\n                        result = true;\n                        break;\n                    }\n                }\n            }\n        }\n        visited[i][j] = false; // 回溯：撤销访问标记\n        return result;\n    }\n\n    bool exist(vector<vector<char>>& board, string word) {\n        int h = board.size(), w = board[0].size();\n        vector<vector<int>> visited(h, vector<int>(w));\n        for (int i = 0; i < h; i++) {\n            for (int j = 0; j < w; j++) {\n                bool flag = check(board, visited, i, j, word, 0);\n                if (flag) {\n                    return true;\n                }\n            }\n        }\n        return false;\n    }\n};",
  "solutionText": "枚举每个格子作起点，check(i,j,k) 判断从 (i,j) 出发能否匹配 word[k..]：当前字符不等直接失败，k 到达末尾则成功。匹配后标记 visited[i][j]，向四个方向递归匹配下一个字符，任一方向成功即整体成功。易错点：函数返回前必须把 visited[i][j] 恢复为 false，否则会挡住其他路径。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        \n    }\n};"
 },
 {
  "id": 131,
  "title": "131. 分割回文串",
  "category": "回溯",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个字符串 <code>s</code>，请你将<em> </em><code>s</code><em> </em>分割成一些 <span data-keyword=\"substring-nonempty\">子串</span>，使每个子串都是 <strong><span data-keyword=\"palindrome-string\">回文串</span></strong> 。返回 <code>s</code> 所有可能的分割方案。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"aab\"\n<strong>输出：</strong>[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"a\"\n<strong>输出：</strong>[[\"a\"]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 16</code></li>\n\t<li><code>s</code> 仅由小写英文字母组成</li>\n</ul>",
  "hints": [
   "题型是「回溯」：枚举\"下一刀切在哪\"——从当前位置向后尝试每一个回文前缀，切完递归处理剩余后缀，走到末尾就收获一组方案。",
   "判断子串回文别在回溯里现算：先用区间 DP 预处理 f[i][j] = (s[i] == s[j]) && f[i+1][j-1]，i 从大到小、j 从小到大填表，f 初始化全 true 覆盖短区间。",
   "dfs(s, i)：i == n 时把当前路径存入答案并返回；否则 j 从 i 到 n-1 枚举，f[i][j] 为真则 push s.substr(i, j-i+1)、递归 dfs(s, j+1)，返回后 pop_back 撤销。"
  ],
  "solutionCode": "class Solution {\nprivate:\n    vector<vector<int>> f;\n    vector<vector<string>> ret;\n    vector<string> ans;\n    int n;\n\npublic:\n    void dfs(const string& s, int i) {\n        if (i == n) {\n            ret.push_back(ans);\n            return;\n        }\n        for (int j = i; j < n; ++j) {\n            if (f[i][j]) {\n                ans.push_back(s.substr(i, j - i + 1));\n                dfs(s, j + 1);\n                ans.pop_back();\n            }\n        }\n    }\n\n    vector<vector<string>> partition(string s) {\n        n = s.size();\n        f.assign(n, vector<int>(n, true));\n\n        for (int i = n - 1; i >= 0; --i) {\n            for (int j = i + 1; j < n; ++j) {\n                f[i][j] = (s[i] == s[j]) && f[i + 1][j - 1]; // i 倒序填表，保证 f[i+1][j-1] 已算好\n            }\n        }\n\n        dfs(s, 0);\n        return ret;\n    }\n};",
  "solutionText": "先区间 DP 预处理 f[i][j] 表示 s[i..j] 是否回文（i 倒序填表），再回溯：dfs(s, i) 枚举 j，f[i][j] 为真就切下该段递归到 j+1，i==n 时收集当前路径。易错点：递归返回后必须 pop_back 撤销选择。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> partition(string s) {\n        \n    }\n};"
 },
 {
  "id": 51,
  "title": "51. N 皇后",
  "category": "回溯",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。</p>\n\n<p><strong>n&nbsp;皇后问题</strong> 研究的是如何将 <code>n</code>&nbsp;个皇后放置在 <code>n×n</code> 的棋盘上，并且使皇后彼此之间不能相互攻击。</p>\n\n<p>给你一个整数 <code>n</code> ，返回所有不同的&nbsp;<strong>n<em>&nbsp;</em>皇后问题</strong> 的解决方案。</p>\n\n<div class=\"original__bRMd\">\n<div>\n<p>每一种解法包含一个不同的&nbsp;<strong>n 皇后问题</strong> 的棋子放置方案，该方案中 <code>'Q'</code> 和 <code>'.'</code> 分别代表了皇后和空位。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/queens.jpg\" style=\"width: 600px; height: 268px;\" />\n<pre>\n<strong>输入：</strong>n = 4\n<strong>输出：</strong>[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\n<strong>解释：</strong>如上图所示，4 皇后问题存在两个不同的解法。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 1\n<strong>输出：</strong>[[\"Q\"]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 9</code></li>\n</ul>\n</div>\n</div>",
  "hints": [
   "题型是「回溯」：逐行放置、每行恰放一个皇后，这样同行冲突天然不存在，只剩下列和两条对角线要检查。",
   "用三个 unordered_set&lt;int&gt; 做 O(1) 冲突判断：列记 i，主对角线记 row - i（同斜线差恒定），副对角线记 row + i（同斜线和恒定）。",
   "第 row 行枚举列 i：三个集合任一命中就 continue；否则 queens[row] = i、三个集合各 insert，递归 row + 1，返回后<strong>对称地</strong>全部 erase 撤销。row == n 时按 queens 生成棋盘存入答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        auto solutions = vector<vector<string>>();\n        auto queens = vector<int>(n, -1);\n        auto columns = unordered_set<int>();\n        auto diagonals1 = unordered_set<int>();\n        auto diagonals2 = unordered_set<int>();\n        backtrack(solutions, queens, n, 0, columns, diagonals1, diagonals2);\n        return solutions;\n    }\n\n    void backtrack(vector<vector<string>> &solutions, vector<int> &queens, int n, int row, unordered_set<int> &columns, unordered_set<int> &diagonals1, unordered_set<int> &diagonals2) {\n        if (row == n) {\n            vector<string> board = generateBoard(queens, n);\n            solutions.push_back(board);\n        } else {\n            for (int i = 0; i < n; i++) {\n                if (columns.find(i) != columns.end()) {\n                    continue;\n                }\n                int diagonal1 = row - i; // 同一条主对角线上 row - col 恒定\n                if (diagonals1.find(diagonal1) != diagonals1.end()) {\n                    continue;\n                }\n                int diagonal2 = row + i; // 同一条副对角线上 row + col 恒定\n                if (diagonals2.find(diagonal2) != diagonals2.end()) {\n                    continue;\n                }\n                queens[row] = i;\n                columns.insert(i);\n                diagonals1.insert(diagonal1);\n                diagonals2.insert(diagonal2);\n                backtrack(solutions, queens, n, row + 1, columns, diagonals1, diagonals2);\n                queens[row] = -1;\n                columns.erase(i);\n                diagonals1.erase(diagonal1);\n                diagonals2.erase(diagonal2);\n            }\n        }\n    }\n\n    vector<string> generateBoard(vector<int> &queens, int n) {\n        auto board = vector<string>();\n        for (int i = 0; i < n; i++) {\n            string row = string(n, '.');\n            row[queens[i]] = 'Q';\n            board.push_back(row);\n        }\n        return board;\n    }\n};",
  "solutionText": "按行回溯，每行恰放一个皇后，只需查列与两条对角线冲突：用三个哈希集合记录列 i、主对角线 row-i、副对角线 row+i，O(1) 判冲突；row==n 时按 queens 生成棋盘。易错点：递归返回后要与放置完全对称地撤销三个集合。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        \n    }\n};"
 },
 {
  "id": 35,
  "title": "35. 搜索插入位置",
  "category": "二分查找",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。</p>\n\n<p>请必须使用时间复杂度为 <code>O(log n)</code> 的算法。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [1,3,5,6], target = 5\n<strong>输出:</strong> 2\n</pre>\n\n<p><strong>示例&nbsp;2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [1,3,5,6], target = 2\n<strong>输出:</strong> 1\n</pre>\n\n<p><strong>示例 3:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [1,3,5,6], target = 7\n<strong>输出:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> 为&nbsp;<strong>无重复元素&nbsp;</strong>的&nbsp;<strong>升序&nbsp;</strong>排列数组</li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「二分查找」：目标存在返回其下标、不存在返回插入位置，两者其实是同一个答案——第一个 &gt;= target 的下标。",
   "闭区间 [left, right] 上二分，循环条件 left &lt;= right；另设 ans 初值为 n（表示都比 target 小、插在末尾），每次满足条件就更新它。",
   "当 target &lt;= nums[mid] 时说明 mid 是候选答案：记 ans = mid 并 right = mid - 1 继续向左收缩；否则 left = mid + 1。最后返回 ans。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        int n = nums.size();\n        int left = 0, right = n - 1, ans = n; // ans 初值 n：全部元素都小于 target 时插在末尾\n        while (left <= right) {\n            int mid = ((right - left) >> 1) + left;\n            if (target <= nums[mid]) { // 找第一个 >= target 的位置：满足就记下并继续向左\n                ans = mid;\n                right = mid - 1;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return ans;\n    }\n};",
  "solutionText": "标准闭区间二分，找「第一个 >= target 的下标」：ans 初值为 n，target <= nums[mid] 时记 ans = mid 并 right = mid - 1，否则 left = mid + 1。易错点：判断必须带等号，目标存在时才返回原下标。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        \n    }\n};"
 },
 {
  "id": 74,
  "title": "74. 搜索二维矩阵",
  "category": "二分查找",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个满足下述两条属性的 <code>m x n</code> 整数矩阵：</p>\n\n<ul>\n\t<li>每行中的整数从左到右按非严格递增顺序排列。</li>\n\t<li>每行的第一个整数大于前一行的最后一个整数。</li>\n</ul>\n\n<p>给你一个整数 <code>target</code> ，如果 <code>target</code> 在矩阵中，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/05/mat.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/11/25/mat2.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13\n<strong>输出：</strong>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= matrix[i][j], target &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「二分查找」：每行升序、且下一行开头比上一行结尾大，整个矩阵按行展平后就是一个严格升序的一维数组。",
   "不必真的展平：在下标区间 [0, m*n-1] 上二分，一维下标 mid 映射回二维元素 matrix[mid / n][mid % n]，其中 n 是<strong>列数</strong>。",
   "标准闭区间写法：x &lt; target 则 low = mid + 1；x &gt; target 则 high = mid - 1；相等直接返回 true，循环结束返回 false。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        int m = matrix.size(), n = matrix[0].size();\n        int low = 0, high = m * n - 1;\n        while (low <= high) {\n            int mid = (high - low) / 2 + low;\n            int x = matrix[mid / n][mid % n]; // 一维下标映射回二维：除/模的都是列数 n\n            if (x < target) {\n                low = mid + 1;\n            } else if (x > target) {\n                high = mid - 1;\n            } else {\n                return true;\n            }\n        }\n        return false;\n    }\n};",
  "solutionText": "把矩阵视作按行拼接后的有序一维数组，在 [0, m*n-1] 上做一次标准二分：一维 mid 映射回二维 matrix[mid/n][mid%n] 再与 target 比较。易错点：除和取模用的都是列数 n，写成行数 m 会错位。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        \n    }\n};"
 },
 {
  "id": 34,
  "title": "34. 在排序数组中查找元素的第一个和最后一个位置",
  "category": "二分查找",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个按照非递减顺序排列的整数数组 <code>nums</code>，和一个目标值 <code>target</code>。请你找出给定目标值在数组中的开始位置和结束位置。</p>\n\n<p>如果数组中不存在目标值 <code>target</code>，返回&nbsp;<code>[-1, -1]</code>。</p>\n\n<p>你必须设计并实现时间复杂度为&nbsp;<code>O(log n)</code>&nbsp;的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [<code>5,7,7,8,8,10]</code>, target = 8\n<strong>输出：</strong>[3,4]</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [<code>5,7,7,8,8,10]</code>, target = 6\n<strong>输出：</strong>[-1,-1]</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [], target = 0\n<strong>输出：</strong>[-1,-1]</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= nums[i]&nbsp;&lt;= 10<sup>9</sup></code></li>\n\t<li><code>nums</code>&nbsp;是一个非递减数组</li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= target&nbsp;&lt;= 10<sup>9</sup></code></li>\n</ul>",
  "hints": [
   "题型是「二分查找边界」：开始位置 = 第一个 &gt;= target 的下标，结束位置 = 第一个 &gt; target 的下标再减一，两次二分即可。",
   "写一个带 bool lower 参数的通用二分函数：条件 nums[mid] &gt; target || (lower && nums[mid] &gt;= target) 成立时记 ans = mid 并 right = mid - 1，否则 left = mid + 1。",
   "调用两次：leftIdx = binarySearch(true)，rightIdx = binarySearch(false) - 1；最后校验 leftIdx &lt;= rightIdx 且两端的值确实等于 target，否则返回 {-1, -1}。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int binarySearch(vector<int>& nums, int target, bool lower) {\n        int left = 0, right = (int)nums.size() - 1, ans = (int)nums.size();\n        while (left <= right) {\n            int mid = (left + right) / 2;\n            if (nums[mid] > target || (lower && nums[mid] >= target)) { // lower=true 找第一个 >= target，否则找第一个 > target\n                right = mid - 1;\n                ans = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return ans;\n    }\n\n    vector<int> searchRange(vector<int>& nums, int target) {\n        int leftIdx = binarySearch(nums, target, true);\n        int rightIdx = binarySearch(nums, target, false) - 1;\n        if (leftIdx <= rightIdx && rightIdx < nums.size() && nums[leftIdx] == target && nums[rightIdx] == target) {\n            return vector<int>{leftIdx, rightIdx};\n        }\n        return vector<int>{-1, -1};\n    }\n};",
  "solutionText": "带 lower 参数的二分复用两次：lower=true 找第一个 >= target 的下标（左端点），lower=false 找第一个 > target 的下标减 1（右端点）。易错点：最后须校验两端下标合法且值等于 target，否则返回 [-1,-1]。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> searchRange(vector<int>& nums, int target) {\n        \n    }\n};"
 },
 {
  "id": 33,
  "title": "33. 搜索旋转排序数组",
  "category": "二分查找",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>整数数组 <code>nums</code> 按升序排列，数组中的值 <strong>互不相同</strong> 。</p>\n\n<p>在传递给函数之前，<code>nums</code> 在预先未知的某个下标 <code>k</code>（<code>0 &lt;= k &lt; nums.length</code>）上进行了 <strong>向左旋转</strong>，使数组变为 <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code>（下标 <strong>从 0 开始</strong> 计数）。例如， <code>[0,1,2,4,5,6,7]</code> 下标&nbsp;<code>3</code>&nbsp;上向左旋转后可能变为&nbsp;<code>[4,5,6,7,0,1,2]</code> 。</p>\n\n<p>给你 <strong>旋转后</strong> 的数组 <code>nums</code> 和一个整数 <code>target</code> ，如果 <code>nums</code> 中存在这个目标值 <code>target</code> ，则返回它的下标，否则返回&nbsp;<code>-1</code>&nbsp;。</p>\n\n<p>你必须设计一个时间复杂度为 <code>O(log n)</code> 的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [4,5,6,7,0,1,2], target = 0\n<strong>输出：</strong>4\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [4,5,6,7,0,1,2], target = 3\n<strong>输出：</strong>-1</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1], target = 0\n<strong>输出：</strong>-1\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> 中的每个值都 <strong>独一无二</strong></li>\n\t<li>题目数据保证 <code>nums</code> 在预先未知的某个下标上进行了旋转</li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「旋转数组上的二分」：整体无序但以 mid 切开后<strong>必有一半是有序的</strong>，判断 target 在不在那半有序区间里，就能决定往哪边收缩。",
   "用 nums[0] &lt;= nums[mid] 判断左半 [0, mid] 是否有序（注意要带等号）；不满足则右半 [mid, n-1] 一定有序。",
   "左半有序时：nums[0] &lt;= target && target &lt; nums[mid] 则 r = mid - 1，否则 l = mid + 1；右半有序时对称地用 nums[mid] &lt; target && target &lt;= nums[n-1] 决定去向。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int n = (int)nums.size();\n        if (!n) {\n            return -1;\n        }\n        if (n == 1) {\n            return nums[0] == target ? 0 : -1;\n        }\n        int l = 0, r = n - 1;\n        while (l <= r) {\n            int mid = (l + r) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[0] <= nums[mid]) { // 左半 [0, mid] 有序\n                if (nums[0] <= target && target < nums[mid]) {\n                    r = mid - 1;\n                } else {\n                    l = mid + 1;\n                }\n            } else {\n                if (nums[mid] < target && target <= nums[n - 1]) {\n                    l = mid + 1;\n                } else {\n                    r = mid - 1;\n                }\n            }\n        }\n        return -1;\n    }\n};",
  "solutionText": "以 mid 切开后必有一半有序：nums[0] <= nums[mid] 则左半有序，target 落在有序半的范围内就收缩到该半，否则去另一半；右半有序时对称判断。易错点：判有序要带等号，且区间判断中等号位置不能写反。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};"
 },
 {
  "id": 153,
  "title": "153. 寻找旋转排序数组中的最小值",
  "category": "二分查找",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "已知一个长度为 <code>n</code> 的数组，预先按照升序排列，经由 <code>1</code> 到 <code>n</code> 次 <strong>旋转</strong> 后，得到输入数组。例如，原数组 <code>nums = [0,1,2,4,5,6,7]</code> 在变化后可能得到：\n<ul>\n\t<li>若旋转 <code>4</code> 次，则可以得到 <code>[4,5,6,7,0,1,2]</code></li>\n\t<li>若旋转 <code>7</code> 次，则可以得到 <code>[0,1,2,4,5,6,7]</code></li>\n</ul>\n\n<p>注意，数组 <code>[a[0], a[1], a[2], ..., a[n-1]]</code> <strong>旋转一次</strong> 的结果为数组 <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code> 。</p>\n\n<p>给你一个元素值 <strong>互不相同</strong> 的数组 <code>nums</code> ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 <strong>最小元素</strong> 。</p>\n\n<p>你必须设计一个时间复杂度为&nbsp;<code>O(log n)</code> 的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,4,5,1,2]\n<strong>输出：</strong>1\n<strong>解释：</strong>原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [4,5,6,7,0,1,2]\n<strong>输出：</strong>0\n<strong>解释：</strong>原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [11,13,15,17]\n<strong>输出：</strong>11\n<strong>解释：</strong>原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 5000</code></li>\n\t<li><code>-5000 &lt;= nums[i] &lt;= 5000</code></li>\n\t<li><code>nums</code> 中的所有整数 <strong>互不相同</strong></li>\n\t<li><code>nums</code> 原来是一个升序排序的数组，并进行了 <code>1</code> 至 <code>n</code> 次旋转</li>\n</ul>",
  "hints": [
   "题型是「旋转数组上的二分」：不需要 target，最小值就是那个\"比右侧边界元素小\"的分界点，用二分逼近它。",
   "每次把 nums[pivot] 与 <strong>nums[high]</strong>（右端点）比较——与左端点比无法区分\"整段有序\"和\"跨过了最小值\"两种情况；循环条件是 low &lt; high。",
   "nums[pivot] &lt; nums[high] 说明最小值在 [low, pivot]，令 high = pivot（不能减一，pivot 可能就是答案）；否则 low = pivot + 1。退出循环时返回 nums[low]。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        int low = 0;\n        int high = nums.size() - 1;\n        while (low < high) {\n            int pivot = low + (high - low) / 2;\n            if (nums[pivot] < nums[high]) {\n                high = pivot; // pivot 可能就是最小值，不能减一\n            }\n            else {\n                low = pivot + 1; // nums[pivot] >= nums[high]，最小值一定在 pivot 右侧\n            }\n        }\n        return nums[low];\n    }\n};",
  "solutionText": "与右端点比较的二分：nums[pivot] < nums[high] 说明最小值在左半，令 high = pivot（不能减一）；否则 low = pivot + 1。循环条件 low < high，退出时 low 即答案。易错点：和左端点比会有歧义。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 4,
  "title": "4. 寻找两个正序数组的中位数",
  "category": "二分查找",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>给定两个大小分别为 <code>m</code> 和 <code>n</code> 的正序（从小到大）数组&nbsp;<code>nums1</code> 和&nbsp;<code>nums2</code>。请你找出并返回这两个正序数组的 <strong>中位数</strong> 。</p>\n\n<p>算法的时间复杂度应该为 <code>O(log (m+n))</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums1 = [1,3], nums2 = [2]\n<strong>输出：</strong>2.00000\n<strong>解释：</strong>合并数组 = [1,2,3] ，中位数 2\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums1 = [1,2], nums2 = [3,4]\n<strong>输出：</strong>2.50000\n<strong>解释：</strong>合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5\n</pre>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>nums1.length == m</code></li>\n\t<li><code>nums2.length == n</code></li>\n\t<li><code>0 &lt;= m &lt;= 1000</code></li>\n\t<li><code>0 &lt;= n &lt;= 1000</code></li>\n\t<li><code>1 &lt;= m + n &lt;= 2000</code></li>\n\t<li><code>-10<sup>6</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>6</sup></code></li>\n</ul>",
  "hints": [
   "题型是「二分排除」：把求中位数转化为求两个有序数组合并后的<strong>第 k 小</strong>，每轮排除约 k/2 个元素，复杂度 O(log(m+n))。",
   "每轮比较 nums1[k/2-1] 与 nums2[k/2-1]：较小者所在数组的前 k/2 个元素都不可能是第 k 小，可整体\"删除\"（前移该数组起始下标 index），同时 k 减去删除的个数。",
   "循环里先写三个出口：某数组已空则直接返回另一数组第 k 个；k == 1 时返回两个开头的较小者；取 pivot 时下标用 min(index + k/2 - 1, m - 1) 防止越界。总长偶数时取第 len/2 和 len/2+1 小求平均。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int getKthElement(const vector<int>& nums1, const vector<int>& nums2, int k) {\n        /* 主要思路：要找到第 k (k>1) 小的元素，那么就取 pivot1 = nums1[k/2-1] 和 pivot2 = nums2[k/2-1] 进行比较\n         * 这里的 \"/\" 表示整除\n         * nums1 中小于等于 pivot1 的元素有 nums1[0 .. k/2-2] 共计 k/2-1 个\n         * nums2 中小于等于 pivot2 的元素有 nums2[0 .. k/2-2] 共计 k/2-1 个\n         * 取 pivot = min(pivot1, pivot2)，两个数组中小于等于 pivot 的元素共计不会超过 (k/2-1) + (k/2-1) <= k-2 个\n         * 这样 pivot 本身最大也只能是第 k-1 小的元素\n         * 如果 pivot = pivot1，那么 nums1[0 .. k/2-1] 都不可能是第 k 小的元素。把这些元素全部 \"删除\"，剩下的作为新的 nums1 数组\n         * 如果 pivot = pivot2，那么 nums2[0 .. k/2-1] 都不可能是第 k 小的元素。把这些元素全部 \"删除\"，剩下的作为新的 nums2 数组\n         * 由于我们 \"删除\" 了一些元素（这些元素都比第 k 小的元素要小），因此需要修改 k 的值，减去删除的数的个数\n         */\n\n        int m = nums1.size();\n        int n = nums2.size();\n        int index1 = 0, index2 = 0;\n\n        while (true) {\n            // 边界情况\n            if (index1 == m) {\n                return nums2[index2 + k - 1];\n            }\n            if (index2 == n) {\n                return nums1[index1 + k - 1];\n            }\n            if (k == 1) {\n                return min(nums1[index1], nums2[index2]);\n            }\n\n            // 正常情况\n            int newIndex1 = min(index1 + k / 2 - 1, m - 1);\n            int newIndex2 = min(index2 + k / 2 - 1, n - 1);\n            int pivot1 = nums1[newIndex1];\n            int pivot2 = nums2[newIndex2];\n            if (pivot1 <= pivot2) {\n                k -= newIndex1 - index1 + 1;\n                index1 = newIndex1 + 1;\n            }\n            else {\n                k -= newIndex2 - index2 + 1;\n                index2 = newIndex2 + 1;\n            }\n        }\n    }\n\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        int totalLength = nums1.size() + nums2.size();\n        if (totalLength % 2 == 1) {\n            return getKthElement(nums1, nums2, (totalLength + 1) / 2);\n        }\n        else {\n            return (getKthElement(nums1, nums2, totalLength / 2) + getKthElement(nums1, nums2, totalLength / 2 + 1)) / 2.0;\n        }\n    }\n};",
  "solutionText": "转化为找第 k 小：每轮比较两数组第 k/2 个元素，较小一方的前 k/2 个必不含第 k 小，整体排除并把 k 减去排除数，k 近似减半。偶数长度取第 len/2 与 len/2+1 小的平均。易错点：先处理数组排空、k==1 出口，下标用 min 防越界。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};"
 },
 {
  "id": 20,
  "title": "20. 有效的括号",
  "category": "栈",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给定一个只包括 <code>'('</code>，<code>')'</code>，<code>'{'</code>，<code>'}'</code>，<code>'['</code>，<code>']'</code>&nbsp;的字符串 <code>s</code> ，判断字符串是否有效。</p>\n\n<p>有效字符串需满足：</p>\n\n<ol>\n\t<li>左括号必须用相同类型的右括号闭合。</li>\n\t<li>左括号必须以正确的顺序闭合。</li>\n\t<li>每个右括号都有一个对应的相同类型的左括号。</li>\n</ol>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"()\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>true</span></p>\n</div>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"()[]{}\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>true</span></p>\n</div>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"(]\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>false</span></p>\n</div>\n\n<p><strong class=\"example\">示例 4：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"([])\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>true</span></p>\n</div>\n\n<p><strong class=\"example\">示例 5：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"([)]\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>false</span></p>\n</div>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> 仅由括号 <code>'()[]{}'</code> 组成</li>\n</ul>",
  "hints": [
   "题型是「栈匹配」：每个右括号必须和<strong>最近一个</strong>未匹配的左括号配对，\"最近\"天然对应栈的后进先出。",
   "用 stack&lt;char&gt; 存左括号，再用 unordered_map&lt;char, char&gt; 存「右括号 → 对应左括号」的映射；字符串长度为奇数可以直接 return false。",
   "遍历时：左括号一律入栈；遇右括号若栈空或 stk.top() != pairs[ch] 立刻返回 false，否则 pop。循环结束还要检查 stk.empty()——有剩余左括号也不合法。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool isValid(string s) {\n        int n = s.size();\n        if (n % 2 == 1) {\n            return false;\n        }\n\n        unordered_map<char, char> pairs = {\n            {')', '('},\n            {']', '['},\n            {'}', '{'}\n        };\n        stack<char> stk;\n        for (char ch: s) {\n            if (pairs.count(ch)) {\n                if (stk.empty() || stk.top() != pairs[ch]) { // 栈顶必须恰是当前右括号对应的左括号\n                    return false;\n                }\n                stk.pop();\n            }\n            else {\n                stk.push(ch);\n            }\n        }\n        return stk.empty();\n    }\n};",
  "solutionText": "用栈保存尚未匹配的左括号：遍历字符串，遇左括号入栈；遇右括号时若栈为空或栈顶不是与之配对的左括号则直接判非法，否则弹栈。遍历结束后栈必须为空才有效。用哈希表存「右括号 → 左括号」映射让判断更整洁；长度为奇数可在开头直接返回 false。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};"
 },
 {
  "id": 155,
  "title": "155. 最小栈",
  "category": "栈",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>设计一个支持 <code>push</code> ，<code>pop</code> ，<code>top</code> 操作，并能在常数时间内检索到最小元素的栈。</p>\n\n<p>实现 <code>MinStack</code> 类:</p>\n\n<ul>\n\t<li><code>MinStack()</code> 初始化堆栈对象。</li>\n\t<li><code>void push(int value)</code> 将元素 <code>value</code> 推入堆栈。</li>\n\t<li><code>void pop()</code> 删除堆栈顶部的元素。</li>\n\t<li><code>int top()</code> 获取堆栈顶部的元素。</li>\n\t<li><code>int getMin()</code> 获取堆栈中的最小元素。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入：</strong>\n[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]\n\n<strong>输出：</strong>\n[null,null,null,null,-3,null,0,-2]\n\n<strong>解释：</strong>\nMinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin();   --&gt; 返回 -3.\nminStack.pop();\nminStack.top();      --&gt; 返回 0.\nminStack.getMin();   --&gt; 返回 -2.\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup>&nbsp;&lt;= val &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>\n\t<li><code>pop</code>、<code>top</code> 和 <code>getMin</code> 操作总是在 <strong>非空栈</strong> 上调用</li>\n\t<li><code>push</code>,&nbsp;<code>pop</code>,&nbsp;<code>top</code>, and&nbsp;<code>getMin</code>最多被调用&nbsp;<code>3 * 10<sup>4</sup></code>&nbsp;次</li>\n</ul>",
  "hints": [
   "题型是「栈的设计题」：想 O(1) 查最小值，就让<strong>每一个栈状态</strong>都记住自己对应的最小值，而不是调用时现算。",
   "再开一个辅助栈 min_stack，维持不变量：辅助栈顶 == 当前数据栈中所有元素的最小值；两个栈永远同 push、同 pop，高度一致。",
   "push(x) 时辅助栈压入 min(min_stack.top(), x)；构造函数里先压一个 INT_MAX 当哨兵，第一次 push 就无需判空。getMin 直接返回 min_stack.top()。"
  ],
  "solutionCode": "class MinStack {\n    stack<int> x_stack;\n    stack<int> min_stack;\npublic:\n    MinStack() {\n        min_stack.push(INT_MAX); // 哨兵，首次 push 时不用判空\n    }\n\n    void push(int x) {\n        x_stack.push(x);\n        min_stack.push(min(min_stack.top(), x)); // 不变量：辅助栈顶 == 当前栈内最小值\n    }\n\n    void pop() {\n        x_stack.pop();\n        min_stack.pop();\n    }\n\n    int top() {\n        return x_stack.top();\n    }\n\n    int getMin() {\n        return min_stack.top();\n    }\n};",
  "solutionText": "辅助栈与数据栈同步进出：push 时辅助栈压 min(辅助栈顶, x)，pop 时两栈同弹，始终维持「辅助栈顶 == 当前最小值」不变量，getMin O(1) 读栈顶。易错点：构造时先压 INT_MAX 作哨兵，否则首次 push 取 top() 访问空栈。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass MinStack {\npublic:\n    MinStack() {\n        \n    }\n    \n    void push(int value) {\n        \n    }\n    \n    void pop() {\n        \n    }\n    \n    int top() {\n        \n    }\n    \n    int getMin() {\n        \n    }\n};\n\n/**\n * Your MinStack object will be instantiated and called as such:\n * MinStack* obj = new MinStack();\n * obj->push(value);\n * obj->pop();\n * int param_3 = obj->top();\n * int param_4 = obj->getMin();\n */"
 },
 {
  "id": 394,
  "title": "394. 字符串解码",
  "category": "栈",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个经过编码的字符串，返回它解码后的字符串。</p>\n\n<p>编码规则为: <code>k[encoded_string]</code>，表示其中方括号内部的 <code>encoded_string</code> 正好重复 <code>k</code> 次。注意 <code>k</code> 保证为正整数。</p>\n\n<p>你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。</p>\n\n<p>此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 <code>k</code> ，例如不会出现像&nbsp;<code>3a</code>&nbsp;或&nbsp;<code>2[4]</code>&nbsp;的输入。</p>\n\n<p>测试用例保证输出的长度不会超过&nbsp;<code>10<sup>5</sup></code>。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"3[a]2[bc]\"\n<strong>输出：</strong>\"aaabcbc\"\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"3[a2[c]]\"\n<strong>输出：</strong>\"accaccacc\"\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"2[abc]3[cd]ef\"\n<strong>输出：</strong>\"abcabccdcdcdef\"\n</pre>\n\n<p><strong>示例 4：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"abc3[cd]xyz\"\n<strong>输出：</strong>\"abccdcdcdxyz\"\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 30</code></li>\n\t<li><code>s</code>&nbsp;由小写英文字母、数字和方括号&nbsp;<code>'[]'</code> 组成</li>\n\t<li><code>s</code>&nbsp;保证是一个&nbsp;<strong>有效</strong>&nbsp;的输入。</li>\n\t<li><code>s</code>&nbsp;中所有整数的取值范围为&nbsp;<code>[1, 300]</code>&nbsp;</li>\n</ul>",
  "hints": [
   "题型是「括号嵌套展开」：最内层括号要最先展开，这种后进先出的处理顺序天然适合用<strong>栈</strong>。",
   "用 vector&lt;string&gt; 当栈，数字（可能多位，整体解析成一个串）、字母、'[' 都作为独立 token 入栈；栈里存的是「还没配对完成的片段」，方便最后从栈底到栈顶拼接。",
   "扫到 ']' 时：不断出栈直到 '['，把出栈序列<strong>反转</strong>后拼成子串；弹掉 '[' 后栈顶必是重复次数，用 stoi 取出，把子串重复该次数再压回栈。"
  ],
  "solutionCode": "class Solution {\npublic:\n    string getDigits(string &s, size_t &ptr) {\n        string ret = \"\";\n        while (isdigit(s[ptr])) {\n            ret.push_back(s[ptr++]);\n        }\n        return ret;\n    }\n\n    string getString(vector <string> &v) {\n        string ret;\n        for (const auto &s: v) {\n            ret += s;\n        }\n        return ret;\n    }\n\n    string decodeString(string s) {\n        vector <string> stk;\n        size_t ptr = 0;\n\n        while (ptr < s.size()) {\n            char cur = s[ptr];\n            if (isdigit(cur)) {\n                // 获取一个数字并进栈\n                string digits = getDigits(s, ptr);\n                stk.push_back(digits);\n            } else if (isalpha(cur) || cur == '[') {\n                // 获取一个字母并进栈\n                stk.push_back(string(1, s[ptr++]));\n            } else {\n                ++ptr;\n                vector <string> sub;\n                while (stk.back() != \"[\") {\n                    sub.push_back(stk.back());\n                    stk.pop_back();\n                }\n                reverse(sub.begin(), sub.end());\n                // 左括号出栈\n                stk.pop_back();\n                // 此时栈顶为当前 sub 对应的字符串应该出现的次数\n                int repTime = stoi(stk.back());\n                stk.pop_back();\n                string t, o = getString(sub);\n                // 构造字符串\n                while (repTime--) t += o;\n                // 将构造好的字符串入栈\n                stk.push_back(t);\n            }\n        }\n\n        return getString(stk);\n    }\n};",
  "solutionText": "用栈维护 token：数字整体解析入栈，字母和 '[' 直接入栈；遇 ']' 不断出栈直到 '['，出栈序列反转拼成子串，再弹出 '[' 和栈顶数字，把子串重复对应次数后重新压栈，最后从栈底到栈顶拼接即答案。易错点：数字可能多位，要连续读完。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string decodeString(string s) {\n        \n    }\n};"
 },
 {
  "id": 739,
  "title": "739. 每日温度",
  "category": "栈",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个整数数组&nbsp;<code>temperatures</code>&nbsp;，表示每天的温度，返回一个数组&nbsp;<code>answer</code>&nbsp;，其中&nbsp;<code>answer[i]</code>&nbsp;是指对于第 <code>i</code> 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用&nbsp;<code>0</code> 来代替。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> temperatures = [73,74,75,71,69,72,76,73]\n<strong>输出:</strong>&nbsp;[1,1,4,2,1,1,0,0]\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> temperatures = [30,40,50,60]\n<strong>输出:</strong>&nbsp;[1,1,1,0]\n</pre>\n\n<p><strong>示例 3:</strong></p>\n\n<pre>\n<strong>输入:</strong> temperatures = [30,60,90]\n<strong>输出: </strong>[1,1,0]</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;=&nbsp;temperatures.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>30 &lt;=&nbsp;temperatures[i]&nbsp;&lt;= 100</code></li>\n</ul>",
  "hints": [
   "题型是「下一个更大元素」：为每个位置找右边第一个比它大的值，这类问题用<strong>单调栈</strong>一次遍历即可。",
   "栈里存<strong>下标</strong>（不是温度），且栈内温度从底到顶递减——它们都是「还没等到更高温度的日子」。",
   "遍历到第 i 天：只要栈非空且 temperatures[i] &gt; 栈顶下标的温度，就弹出栈顶 j 并令 ans[j] = i - j；弹完后把 i 压栈。没被弹出的下标答案保持 0。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        int n = temperatures.size();\n        vector<int> ans(n);\n        stack<int> s; // 存下标，栈内温度从底到顶递减：都是还没等到更高温度的日子\n        for (int i = 0; i < n; ++i) {\n            while (!s.empty() && temperatures[i] > temperatures[s.top()]) {\n                int previousIndex = s.top();\n                ans[previousIndex] = i - previousIndex; // i 是它右边第一个更高温度的下标\n                s.pop();\n            }\n            s.push(i);\n        }\n        return ans;\n    }\n};",
  "solutionText": "维护一个存下标的单调栈，栈内下标对应温度从底到顶递减，含义是「还没等到更高温度的日子」。从左到右遍历，当前温度比栈顶下标的温度高就不断弹栈，答案即两下标之差，然后当前下标入栈。每个下标至多进出栈一次，O(n)。注意栈里存下标而非温度，否则算不出等待天数。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        \n    }\n};"
 },
 {
  "id": 84,
  "title": "84. 柱状图中最大的矩形",
  "category": "栈",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>给定 <em>n</em> 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。</p>\n\n<p>求在该柱状图中，能够勾勒出来的矩形的最大面积。</p>\n\n<p> </p>\n\n<p><strong>示例 1:</strong></p>\n\n<p><img src=\"https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg\" /></p>\n\n<pre>\n<strong>输入：</strong>heights = [2,1,5,6,2,3]\n<strong>输出：</strong>10\n<strong>解释：</strong>最大的矩形为图中红色区域，面积为 10\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<p><img src=\"https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg\" /></p>\n\n<pre>\n<strong>输入：</strong> heights = [2,4]\n<b>输出：</b> 4</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= heights.length <=10<sup>5</sup></code></li>\n\t<li><code>0 <= heights[i] <= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「枚举高」：最大矩形一定以某根柱子的高度为高，问题转化为求每根柱子向左右最多能延伸多宽。",
   "延伸的边界是左右两侧<strong>第一个高度小于它</strong>的柱子。用单调栈（栈内下标对应高度从底到顶递增）可以 O(n) 求出所有柱子的 left[i] 和 right[i]。",
   "从左到右遍历：先弹掉栈顶高度 &gt;= heights[i] 的下标，left[i] = 栈顶（空则 -1），再压入 i；从右到左同理得 right[i]（空则 n）。答案为 max((right[i] - left[i] - 1) * heights[i])。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        int n = heights.size();\n        vector<int> left(n), right(n);\n\n        stack<int> mono_stack;\n        for (int i = 0; i < n; ++i) {\n            while (!mono_stack.empty() && heights[mono_stack.top()] >= heights[i]) {\n                mono_stack.pop();\n            }\n            left[i] = (mono_stack.empty() ? -1 : mono_stack.top()); // 左边第一个高度小于它的下标，不存在记 -1\n            mono_stack.push(i);\n        }\n\n        mono_stack = stack<int>();\n        for (int i = n - 1; i >= 0; --i) {\n            while (!mono_stack.empty() && heights[mono_stack.top()] >= heights[i]) {\n                mono_stack.pop();\n            }\n            right[i] = (mono_stack.empty() ? n : mono_stack.top()); // 右边第一个高度小于它的下标，不存在记 n\n            mono_stack.push(i);\n        }\n\n        int ans = 0;\n        for (int i = 0; i < n; ++i) {\n            ans = max(ans, (right[i] - left[i] - 1) * heights[i]); // 以 heights[i] 为高能延伸的宽度\n        }\n        return ans;\n    }\n};",
  "solutionText": "枚举每根柱子作为高：用单调栈求出左右两侧第一个高度小于它的位置 left[i]、right[i]，宽度即 right[i]-left[i]-1，面积取最大。两次遍历各维护栈内高度递增的单调栈。易错点：左边不存在记 -1、右边记 n，宽度公式才成立。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        \n    }\n};"
 },
 {
  "id": 215,
  "title": "215. 数组中的第K个最大元素",
  "category": "堆",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定整数数组 <code>nums</code> 和整数 <code>k</code>，请返回数组中第 <code><strong>k</strong></code> 个最大的元素。</p>\n\n<p>请注意，你需要找的是数组排序后的第 <code>k</code> 个最大的元素，而不是第 <code>k</code> 个不同的元素。</p>\n\n<p>你必须设计并实现时间复杂度为 <code>O(n)</code> 的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> <code>[3,2,1,5,6,4],</code> k = 2\n<strong>输出:</strong> 5\n</pre>\n\n<p><strong>示例&nbsp;2:</strong></p>\n\n<pre>\n<strong>输入:</strong> <code>[3,2,3,1,2,4,5,5,6], </code>k = 4\n<strong>输出:</strong> 4</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示： </strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup>&nbsp;&lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「选择问题」：只要第 k 大这一个数，不必完整排序——基于快排划分的<strong>快速选择</strong>期望 O(n)。",
   "第 k 大 = 升序排列后下标 <code>n - k</code> 的元素。每轮划分后左半都 &lt;= 右半，目标下标只会落在其中一侧，另一侧整块扔掉。",
   "Hoare 划分：取 nums[l] 为基准，i、j 从两端相向走（do i++; while (nums[i] &lt; 基准)，do j--; while (nums[j] &gt; 基准)），i &lt; j 就交换；结束后目标下标 &lt;= j 递归 [l, j]，否则递归 [j+1, r]，l == r 时 nums[k] 即答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int quickselect(vector<int> &nums, int l, int r, int k) {\n        if (l == r) {\n            return nums[k];\n        }\n        int partition = nums[l], i = l - 1, j = r + 1;\n        while (i < j) {\n            do i++; while (nums[i] < partition);\n            do j--; while (nums[j] > partition);\n            if (i < j) {\n                swap(nums[i], nums[j]);\n            }\n        }\n        if (k <= j) { // 目标下标在左半，只递归一侧\n            return quickselect(nums, l, j, k);\n        }\n        return quickselect(nums, j + 1, r, k);\n    }\n\n    int findKthLargest(vector<int> &nums, int k) {\n        int n = nums.size();\n        return quickselect(nums, 0, n - 1, n - k); // 第 k 大 = 升序排列后下标 n-k 的元素\n    }\n};",
  "solutionText": "第 k 大即升序后下标 n-k 的元素，用快速选择：每轮取基准做 Hoare 划分，使左半都不大于右半，目标下标在哪侧就只递归那侧，l==r 时即答案，期望 O(n)。易错点：do-while 先移动再比较，递归区间是 [l,j] 与 [j+1,r]。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        \n    }\n};"
 },
 {
  "id": 347,
  "title": "347. 前 K 个高频元素",
  "category": "堆",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，请你返回其中出现频率前 <code>k</code> 高的元素。你可以按 <strong>任意顺序</strong> 返回答案。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>nums = [1,1,1,2,2,3], k = 2</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[1,2]</span></p>\n</div>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>nums = [1], k = 1</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>[1]</span></p>\n</div>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>nums = [1,2,1,2,1,2,3,1,3,2], k = 2</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[1,2]</span></p>\n</div>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup>&nbsp;&lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>k</code> 的取值范围是 <code>[1, 数组中不相同的元素的个数]</code></li>\n\t<li>题目数据保证答案唯一，换句话说，数组中前 <code>k</code> 个高频元素的集合是唯一的</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你所设计算法的时间复杂度 <strong>必须</strong> 优于 <code>O(n log n)</code> ，其中 <code>n</code><em>&nbsp;</em>是数组大小。</p>",
  "hints": [
   "题型是「TopK」：统计频率后只要最大的 k 个，用容量为 k 的堆边扫边淘汰，比全量排序的 O(n log n) 更优。",
   "先 unordered_map&lt;int,int&gt; 统计「值 → 次数」；再用 priority_queue 按<strong>次数</strong>建<strong>小顶堆</strong>——堆顶始终是 k 个候选里频率最小的那个，方便被淘汰。",
   "遍历频率表：堆大小不足 k 直接 emplace(num, count)；否则当 count &gt; 堆顶的次数时先 pop 再 emplace。自定义比较 <code>m.second &gt; n.second</code> 配 decltype(&amp;cmp) 声明堆，最后把堆里所有 pair 的 first 取出即答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    static bool cmp(pair<int, int>& m, pair<int, int>& n) {\n        return m.second > n.second; // 按出现次数比较，构成小顶堆\n    }\n\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        unordered_map<int, int> occurrences;\n        for (auto& v : nums) {\n            occurrences[v]++;\n        }\n\n        // pair 的第一个元素代表数组的值，第二个元素代表了该值出现的次数\n        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(&cmp)> q(cmp);\n        for (auto& [num, count] : occurrences) {\n            if (q.size() == k) {\n                if (q.top().second < count) { // 堆顶是 k 个候选里频率最小的，被更高频的替换\n                    q.pop();\n                    q.emplace(num, count);\n                }\n            } else {\n                q.emplace(num, count);\n            }\n        }\n        vector<int> ret;\n        while (!q.empty()) {\n            ret.emplace_back(q.top().first);\n            q.pop();\n        }\n        return ret;\n    }\n};",
  "solutionText": "先用哈希表统计每个数的出现次数，再维护按频率比较的小顶堆，容量不超过 k：堆未满直接入堆；堆满时若当前频率大于堆顶（k 个候选中最小的频率）则弹顶再入堆。最终堆内即前 k 个高频元素，O(n log k)。易错点：要留频率大的，堆必须是小顶堆。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        \n    }\n};"
 },
 {
  "id": 295,
  "title": "295. 数据流的中位数",
  "category": "堆",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p><strong>中位数</strong>是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。</p>\n\n<ul>\n\t<li>例如 <code>arr = [2,3,4]</code>&nbsp;的中位数是 <code>3</code>&nbsp;。</li>\n\t<li>例如&nbsp;<code>arr = [2,3]</code> 的中位数是 <code>(2 + 3) / 2 = 2.5</code> 。</li>\n</ul>\n\n<p>实现 MedianFinder 类:</p>\n\n<ul>\n\t<li>\n\t<p><code>MedianFinder()</code> 初始化 <code>MedianFinder</code>&nbsp;对象。</p>\n\t</li>\n\t<li>\n\t<p><code>void addNum(int num)</code> 将数据流中的整数 <code>num</code> 添加到数据结构中。</p>\n\t</li>\n\t<li>\n\t<p><code>double findMedian()</code> 返回到目前为止所有元素的中位数。与实际答案相差&nbsp;<code>10<sup>-5</sup></code>&nbsp;以内的答案将被接受。</p>\n\t</li>\n</ul>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入</strong>\n[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"]\n[[], [1], [2], [], [3], []]\n<strong>输出</strong>\n[null, null, null, 1.5, null, 2.0]\n\n<strong>解释</strong>\nMedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0</pre>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>-10<sup>5</sup>&nbsp;&lt;= num &lt;= 10<sup>5</sup></code></li>\n\t<li>在调用 <code>findMedian</code>&nbsp;之前，数据结构中至少有一个元素</li>\n\t<li>最多&nbsp;<code>5 * 10<sup>4</sup></code>&nbsp;次调用&nbsp;<code>addNum</code>&nbsp;和&nbsp;<code>findMedian</code></li>\n</ul>",
  "hints": [
   "题型是「动态维护中位数」：把数据流分成较小一半和较大一半，中位数只由两半交界处的值决定。",
   "用两个堆：<strong>大顶堆</strong>存较小的一半（堆顶是这半的最大值），<strong>小顶堆</strong>存较大的一半，并保持不变量：大顶堆个数 = 小顶堆个数，或恰好多 1。",
   "addNum：num &lt;= 大顶堆堆顶（或其为空）就进大顶堆，否则进小顶堆；哪边超出不变量就把该堆堆顶挪到另一边。findMedian：大顶堆多 1 个时返回其堆顶，否则返回 (两堆顶之和) / 2.0。"
  ],
  "solutionCode": "class MedianFinder {\npublic:\n    priority_queue<int, vector<int>, less<int>> queMin;    // 大顶堆：存较小的一半，堆顶是这半的最大值\n    priority_queue<int, vector<int>, greater<int>> queMax; // 小顶堆：存较大的一半，个数等于 queMin 或少 1\n\n    MedianFinder() {}\n\n    void addNum(int num) {\n        if (queMin.empty() || num <= queMin.top()) {\n            queMin.push(num);\n            if (queMax.size() + 1 < queMin.size()) {\n                queMax.push(queMin.top());\n                queMin.pop();\n            }\n        } else {\n            queMax.push(num);\n            if (queMax.size() > queMin.size()) {\n                queMin.push(queMax.top());\n                queMax.pop();\n            }\n        }\n    }\n\n    double findMedian() {\n        if (queMin.size() > queMax.size()) {\n            return queMin.top();\n        }\n        return (queMin.top() + queMax.top()) / 2.0;\n    }\n};",
  "solutionText": "双堆把数据分成两半：大顶堆存较小的一半，小顶堆存较大的一半，保持大顶堆个数等于小顶堆或恰好多 1。插入时与大顶堆堆顶比较决定进哪个堆，超出平衡就把堆顶挪去另一边。中位数即大顶堆堆顶（总数为奇）或两堆顶平均。易错点：求平均要除以 2.0。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass MedianFinder {\npublic:\n    MedianFinder() {\n        \n    }\n    \n    void addNum(int num) {\n        \n    }\n    \n    double findMedian() {\n        \n    }\n};\n\n/**\n * Your MedianFinder object will be instantiated and called as such:\n * MedianFinder* obj = new MedianFinder();\n * obj->addNum(num);\n * double param_2 = obj->findMedian();\n */"
 },
 {
  "id": 121,
  "title": "121. 买卖股票的最佳时机",
  "category": "贪心算法",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给定一个数组 <code>prices</code> ，它的第 <code>i</code> 个元素 <code>prices[i]</code> 表示一支给定股票第 <code>i</code> 天的价格。</p>\n\n<p>你只能选择 <strong>某一天</strong> 买入这只股票，并选择在 <strong>未来的某一个不同的日子</strong> 卖出该股票。设计一个算法来计算你所能获取的最大利润。</p>\n\n<p>返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 <code>0</code> 。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>[7,1,5,3,6,4]\n<strong>输出：</strong>5\n<strong>解释：</strong>在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。\n     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>prices = [7,6,4,3,1]\n<strong>输出：</strong>0\n<strong>解释：</strong>在这种情况下, 没有交易完成, 所以最大利润为 0。\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= prices.length <= 10<sup>5</sup></code></li>\n\t<li><code>0 <= prices[i] <= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「一次遍历维护前缀信息」：第 i 天卖出的最优买入点，一定是前面所有天里的历史最低价。",
   "只需两个变量：<code>minprice</code>（到目前为止的最低价格，初始取足够大如 1e9）和 <code>maxprofit</code>（当前最大利润，初始 0），边走边更新，O(n) 一趟完成。",
   "对每个 price：先 maxprofit = max(maxprofit, price - minprice)，再 minprice = min(minprice, price)。先算利润再更新最低价（同一天买卖利润为 0，不影响答案），全程下跌时返回 0。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int inf = 1e9;\n        int minprice = inf, maxprofit = 0;\n        for (int price: prices) {\n            maxprofit = max(maxprofit, price - minprice); // 假设在历史最低点买入、今天卖出\n            minprice = min(price, minprice); // 维护到今天为止的历史最低价\n        }\n        return maxprofit;\n    }\n};",
  "solutionText": "一次遍历，维护历史最低价 minprice 与最大利润 maxprofit：每天先用 price - minprice（最低点买入、今天卖出）更新答案，再用今天价格更新 minprice。初始 maxprofit 为 0，一路下跌时答案自然为 0。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};"
 },
 {
  "id": 55,
  "title": "55. 跳跃游戏",
  "category": "贪心算法",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个非负整数数组&nbsp;<code>nums</code> ，你最初位于数组的 <strong>第一个下标</strong> 。数组中的每个元素代表你在该位置可以跳跃的最大长度。</p>\n\n<p>判断你是否能够到达最后一个下标，如果可以，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,3,1,1,4]\n<strong>输出：</strong>true\n<strong>解释：</strong>可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,2,1,0,4]\n<strong>输出：</strong>false\n<strong>解释：</strong>无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>",
  "hints": [
   "题型是「可达性判断」：不必枚举具体怎么跳，只需要知道<strong>最远</strong>能到哪个下标。",
   "维护变量 rightmost = 目前可达的最远下标，不变量是：所有 &lt;= rightmost 的位置都可达；i &gt; rightmost 时 i 本身不可达，不能用它更新。",
   "遍历 i：若 i &lt;= rightmost，则 rightmost = max(rightmost, i + nums[i])，一旦 rightmost &gt;= n - 1 返回 true；循环走完还没达到就返回 false。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        int n = nums.size();\n        int rightmost = 0; // 目前可达的最远下标，不变量：所有 <= rightmost 的位置都可达\n        for (int i = 0; i < n; ++i) {\n            if (i <= rightmost) {\n                rightmost = max(rightmost, i + nums[i]);\n                if (rightmost >= n - 1) {\n                    return true;\n                }\n            }\n        }\n        return false;\n    }\n};",
  "solutionText": "贪心一次遍历，维护可达最远下标 rightmost：i 可达（即 i <= rightmost）时用 i + nums[i] 更新它，一旦覆盖 n-1 返回 true；遍历完够不到则 false。易错点：i 超过 rightmost 即被 0 卡死，不能更新。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 45,
  "title": "45. 跳跃游戏 II",
  "category": "贪心算法",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个长度为 <code>n</code> 的 <strong>0 索引</strong>整数数组 <code>nums</code>。初始位置在下标 0。</p>\n\n<p>每个元素 <code>nums[i]</code> 表示从索引 <code>i</code> 向后跳转的最大长度。换句话说，如果你在索引&nbsp;<code>i</code>&nbsp;处，你可以跳转到任意 <code>(i + j)</code> 处：</p>\n\n<ul>\n\t<li><code>0 &lt;= j &lt;= nums[i]</code>&nbsp;且</li>\n\t<li><code>i + j &lt; n</code></li>\n</ul>\n\n<p>返回到达&nbsp;<code>n - 1</code>&nbsp;的最小跳跃次数。测试用例保证可以到达 <code>n - 1</code>。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [2,3,1,1,4]\n<strong>输出:</strong> 2\n<strong>解释:</strong> 跳到最后一个位置的最小跳跃数是 <code>2</code>。\n&nbsp;    从下标为 0 跳到下标为 1 的位置，跳&nbsp;<code>1</code>&nbsp;步，然后跳&nbsp;<code>3</code>&nbsp;步到达数组的最后一个位置。\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [2,3,0,1,4]\n<strong>输出:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li>题目保证可以到达&nbsp;<code>n - 1</code></li>\n</ul>",
  "hints": [
   "题型是「最少步数」：把下标按「第几步能到达」分层，每一步都贪心地选择能让<strong>下一步走得最远</strong>的方案。",
   "两个变量：<code>end</code> = 当前步数可达的右边界，<code>maxPos</code> = 从当前层任一点出发、下一步可达的最远位置。",
   "遍历 i 从 0 到 n - 2：先 maxPos = max(maxPos, i + nums[i])；当 i == end 时，end = maxPos 且 step++。注意循环<strong>不含最后一个下标</strong>，否则恰好站在终点时会多加一步。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        int maxPos = 0, n = nums.size(), end = 0, step = 0; // end=当前步数可达的右边界，maxPos=下一步可达的最远位置\n        for (int i = 0; i < n - 1; ++i) {\n            if (maxPos >= i) {\n                maxPos = max(maxPos, i + nums[i]);\n                if (i == end) { // 当前这一层走完，必须再跳一步\n                    end = maxPos;\n                    ++step;\n                }\n            }\n        }\n        return step;\n    }\n};",
  "solutionText": "贪心分层：end 是当前步数能到达的右边界，maxPos 是从当前层出发下一步能到的最远位置。遍历时不断用 i + nums[i] 更新 maxPos；走到 i == end 说明这一层用完，令 end = maxPos 并把步数加一。易错点：循环只到 n-2，不访问最后一个位置，否则恰好落在终点时会多算一步。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int jump(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 763,
  "title": "763. 划分字母区间",
  "category": "贪心算法",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个字符串 <code>s</code> 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。例如，字符串&nbsp;<code>\"ababcc\"</code> 能够被分为 <code>[\"abab\", \"cc\"]</code>，但类似&nbsp;<code>[\"aba\", \"bcc\"]</code> 或&nbsp;<code>[\"ab\", \"ab\", \"cc\"]</code> 的划分是非法的。</p>\n\n<p>注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 <code>s</code> 。</p>\n\n<p>返回一个表示每个字符串片段的长度的列表。</p>\n\n<p>&nbsp;</p>\n<strong class=\"example\">示例 1：</strong>\n\n<pre>\n<strong>输入：</strong>s = \"ababcbacadefegdehijhklij\"\n<strong>输出：</strong>[9,7,8]\n<strong>解释：</strong>\n划分结果为 \"ababcbaca\"、\"defegde\"、\"hijhklij\" 。\n每个字母最多出现在一个片段中。\n像 \"ababcbacadefegde\", \"hijhklij\" 这样的划分是错误的，因为划分的片段数较少。 </pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"eccbbbbdec\"\n<strong>输出：</strong>[10]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 500</code></li>\n\t<li><code>s</code> 仅由小写英文字母组成</li>\n</ul>",
  "hints": [
   "题型是「贪心划分」：同一字母必须落在同一段，一段可以结束的条件是——段内出现过的所有字母，后面都不会再出现。",
   "先预处理 <code>last[26]</code>：每个字母<strong>最后一次</strong>出现的下标。当前段的右端点必须不断扩展到段内每个字母的 last。",
   "遍历时维护 start 和 end：每个字符令 end = max(end, last[s[i] - 'a'])；当 i == end 时切段，push_back(end - start + 1)，然后 start = end + 1。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        int last[26]; // 每个字母最后一次出现的下标\n        int length = s.size();\n        for (int i = 0; i < length; i++) {\n            last[s[i] - 'a'] = i;\n        }\n        vector<int> partition;\n        int start = 0, end = 0;\n        for (int i = 0; i < length; i++) {\n            end = max(end, last[s[i] - 'a']); // 当前段必须至少延伸到段内每个字母的最后出现位置\n            if (i == end) {\n                partition.push_back(end - start + 1);\n                start = end + 1;\n            }\n        }\n        return partition;\n    }\n};",
  "solutionText": "先扫一遍记录每个字母最后一次出现的下标 last。再从头遍历维护当前片段 [start, end]：每遇到一个字符就用 last[s[i]] 扩展 end；当 i == end 时说明段内所有字母都不会再在后面出现，切下这一段并记录长度 end-start+1，start 移到 end+1。贪心保证每段尽可能短、段数最多。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        \n    }\n};"
 },
 {
  "id": 70,
  "title": "70. 爬楼梯",
  "category": "动态规划",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>假设你正在爬楼梯。需要 <code>n</code>&nbsp;阶你才能到达楼顶。</p>\n\n<p>每次你可以爬 <code>1</code> 或 <code>2</code> 个台阶。你有多少种不同的方法可以爬到楼顶呢？</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 2\n<strong>输出：</strong>2\n<strong>解释：</strong>有两种方法可以爬到楼顶。\n1. 1 阶 + 1 阶\n2. 2 阶</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 3\n<strong>输出：</strong>3\n<strong>解释：</strong>有三种方法可以爬到楼顶。\n1. 1 阶 + 1 阶 + 1 阶\n2. 1 阶 + 2 阶\n3. 2 阶 + 1 阶\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 45</code></li>\n</ul>",
  "hints": [
   "题型是「一维递推 DP」：走到第 i 阶只可能从第 i-1 或 i-2 阶跨上来，方案数满足斐波那契式递推。",
   "设 <code>f(i)</code> 表示爬到第 i 阶的方案数；它只依赖前两项，可以不开数组，用三个 int 变量滚动。",
   "转移：<code>f(i) = f(i-1) + f(i-2)</code>，边界 <code>f(0)=1, f(1)=1</code>。循环里依次 <code>p=q; q=r; r=p+q;</code>，执行 n 次后 r 就是答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int climbStairs(int n) {\n        int p = 0, q = 0, r = 1;\n        for (int i = 1; i <= n; ++i) {\n            p = q;\n            q = r;\n            r = p + q; // 滚动递推：f(i) = f(i-1) + f(i-2)\n        }\n        return r;\n    }\n};",
  "solutionText": "设 f(i) 为爬到第 i 阶的方案数，最后一步只能跨 1 或 2 阶，故 f(i)=f(i-1)+f(i-2)。只依赖前两项，用 p、q、r 三变量滚动代替数组，空间 O(1)。边界 f(0)=1、f(1)=1，循环 n 次后 r 即答案。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};"
 },
 {
  "id": 118,
  "title": "118. 杨辉三角",
  "category": "动态规划",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给定一个非负整数&nbsp;<em><code>numRows</code>，</em>生成「杨辉三角」的前&nbsp;<em><code>numRows</code>&nbsp;</em>行。</p>\n\n<p>在<strong>「杨辉三角」</strong>中，每个数是它左上方和右上方的数的和。</p>\n\n<p><img alt=\"\" src=\"https://pic.leetcode.cn/1626927345-DZmfxB-PascalTriangleAnimated2.gif\" /></p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> numRows = 5\n<strong>输出:</strong> [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]\n</pre>\n\n<p><strong>示例&nbsp;2:</strong></p>\n\n<pre>\n<strong>输入:</strong> numRows = 1\n<strong>输出:</strong> [[1]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numRows &lt;= 30</code></li>\n</ul>",
  "hints": [
   "题型是「递推构造」：每一行都能由上一行直接算出来，逐行填表即可，不需要额外算法。",
   "答案本身就是状态表：<code>ret[i][j]</code> 表示第 i 行第 j 个数；先把每行 resize 成 i+1 个元素，并把首尾置 1。",
   "中间元素转移：<code>ret[i][j] = ret[i-1][j-1] + ret[i-1][j]</code>，内层 j 从 1 循环到 i-1；前两行没有中间元素，循环体自然不会执行。"
  ],
  "solutionCode": "class Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        vector<vector<int>> ret(numRows);\n        for (int i = 0; i < numRows; ++i) {\n            ret[i].resize(i + 1);\n            ret[i][0] = ret[i][i] = 1; // 每行首尾恒为 1\n            for (int j = 1; j < i; ++j) {\n                ret[i][j] = ret[i - 1][j] + ret[i - 1][j - 1]; // 中间元素 = 上一行相邻两数之和\n            }\n        }\n        return ret;\n    }\n};",
  "solutionText": "逐行构造：第 i 行有 i+1 个数，首尾恒为 1；中间第 j 个数等于上一行相邻两数之和 ret[i-1][j-1]+ret[i-1][j]。外层按行、内层按列双重循环填表即可。注意内层 j 从 1 到 i-1，前两行没有中间元素，循环自然不执行，无需特判。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        \n    }\n};"
 },
 {
  "id": 198,
  "title": "198. 打家劫舍",
  "category": "动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，<strong>如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警</strong>。</p>\n\n<p>给定一个代表每个房屋存放金额的非负整数数组，计算你<strong> 不触动警报装置的情况下 </strong>，一夜之内能够偷窃到的最高金额。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>[1,2,3,1]\n<strong>输出：</strong>4\n<strong>解释：</strong>偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。\n     偷窃到的最高金额 = 1 + 3 = 4 。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>[2,7,9,3,1]\n<strong>输出：</strong>12\n<strong>解释：</strong>偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。\n     偷窃到的最高金额 = 2 + 9 + 1 = 12 。\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= nums.length <= 100</code></li>\n\t<li><code>0 <= nums[i] <= 400</code></li>\n</ul>",
  "hints": [
   "题型是「线性 DP（相邻互斥）」：每间房只有偷 / 不偷两种选择，且不能偷相邻两间，按房间顺序递推。",
   "设 <code>dp[i]</code> 表示只考虑前 i 间房能偷到的最大金额；第 i 间要么不偷（继承 dp[i-1]），要么偷（只能接 dp[i-2]）。",
   "转移：<code>dp[i] = max(dp[i-2] + nums[i], dp[i-1])</code>，初始 <code>dp[0]=nums[0]</code>、<code>dp[1]=max(nums[0], nums[1])</code>；只依赖前两项，可用 first/second 两个变量滚动。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        if (nums.empty()) {\n            return 0;\n        }\n        int size = nums.size();\n        if (size == 1) {\n            return nums[0];\n        }\n        int first = nums[0], second = max(nums[0], nums[1]); // first=dp[i-2]，second=dp[i-1]\n        for (int i = 2; i < size; i++) {\n            int temp = second;\n            second = max(first + nums[i], second); // 偷第 i 间（first+nums[i]）或不偷（second）\n            first = temp;\n        }\n        return second;\n    }\n};",
  "solutionText": "线性 DP：dp[i] 表示偷前 i 间房的最大金额，第 i 间偷或不偷取较大：dp[i]=max(dp[i-2]+nums[i], dp[i-1])。只依赖前两项，用 first/second 两变量滚动。注意特判空数组与仅一间房两个边界。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 279,
  "title": "279. 完全平方数",
  "category": "动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数 <code>n</code> ，返回 <em>和为 <code>n</code> 的完全平方数的最少数量</em> 。</p>\n\n<p><strong>完全平方数</strong> 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，<code>1</code>、<code>4</code>、<code>9</code> 和 <code>16</code> 都是完全平方数，而 <code>3</code> 和 <code>11</code> 不是。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = <code>12</code>\n<strong>输出：</strong>3 \n<strong>解释：</strong><code>12 = 4 + 4 + 4</code></pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = <code>13</code>\n<strong>输出：</strong>2\n<strong>解释：</strong><code>13 = 4 + 9</code></pre>\n&nbsp;\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「完全背包 / 一维 DP」：把 n 拆成若干个平方数之和求最少个数，每个平方数可以无限次使用。",
   "设 <code>f[i]</code> 表示和为 i 的完全平方数的最少数量，答案就是 f[n]。",
   "转移：枚举最后一个平方数 j*j（j*j &lt;= i），<code>f[i] = 1 + min(f[i - j*j])</code>；边界 <code>f[0]=0</code>。任何数都能由若干个 1 凑出，必定有解。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int numSquares(int n) {\n        vector<int> f(n + 1);\n        for (int i = 1; i <= n; i++) {\n            int minn = INT_MAX;\n            for (int j = 1; j * j <= i; j++) {\n                minn = min(minn, f[i - j * j]);\n            }\n            f[i] = minn + 1; // f[i] = 1 + min(f[i - j*j])，枚举最后一个平方数\n        }\n        return f[n];\n    }\n};",
  "solutionText": "完全背包型 DP：f[i] 表示和为 i 的完全平方数最少数量。枚举最后一个平方数 j*j（j*j<=i）：f[i]=1+min(f[i-j*j])。边界 f[0]=0；因 1 是平方数，任何 i 都有解，无需判 -1。复杂度 O(n√n)。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numSquares(int n) {\n        \n    }\n};"
 },
 {
  "id": 322,
  "title": "322. 零钱兑换",
  "category": "动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数数组 <code>coins</code> ，表示不同面额的硬币；以及一个整数 <code>amount</code> ，表示总金额。</p>\n\n<p>计算并返回可以凑成总金额所需的 <strong>最少的硬币个数</strong> 。如果没有任何一种硬币组合能组成总金额，返回&nbsp;<code>-1</code> 。</p>\n\n<p>你可以认为每种硬币的数量是无限的。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>coins = <code>[1, 2, 5]</code>, amount = <code>11</code>\n<strong>输出：</strong><code>3</code> \n<strong>解释：</strong>11 = 5 + 5 + 1</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>coins = <code>[2]</code>, amount = <code>3</code>\n<strong>输出：</strong>-1</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>coins = [1], amount = 0\n<strong>输出：</strong>0\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= coins.length &lt;= 12</code></li>\n\t<li><code>1 &lt;= coins[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>0 &lt;= amount &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "hints": [
   "题型是「完全背包求最值」：每种硬币无限个，求凑出 amount 的最少硬币数，自底向上递推每个金额。",
   "设 <code>dp[i]</code> 表示凑出金额 i 所需的最少硬币数；用 amount+1 这个「不可能的大值」表示暂时凑不出。",
   "转移：对每个金额 i 枚举硬币 c（c &lt;= i）：<code>dp[i] = min(dp[i], dp[i-c] + 1)</code>；初始 <code>dp[0]=0</code>，最后 dp[amount] 若仍大于 amount 就返回 -1。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        int Max = amount + 1;\n        vector<int> dp(amount + 1, Max); // 初值 amount+1 表示暂不可达\n        dp[0] = 0;\n        for (int i = 1; i <= amount; ++i) {\n            for (int j = 0; j < (int)coins.size(); ++j) {\n                if (coins[j] <= i) {\n                    dp[i] = min(dp[i], dp[i - coins[j]] + 1); // 枚举最后一枚硬币，取最少数量\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};",
  "solutionText": "完全背包求最值：dp[i] 表示凑出金额 i 的最少硬币数，枚举最后一枚硬币 c：dp[i]=min(dp[i], dp[i-c]+1)。dp[0]=0，其余初始为 amount+1 表示不可达；dp[amount] 仍大于 amount 则返回 -1。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};"
 },
 {
  "id": 139,
  "title": "139. 单词拆分",
  "category": "动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个字符串 <code>s</code> 和一个字符串列表 <code>wordDict</code> 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 <code>s</code>&nbsp;则返回 <code>true</code>。</p>\n\n<p><strong>注意：</strong>不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入:</strong> s = \"leetcode\", wordDict = [\"leet\", \"code\"]\n<strong>输出:</strong> true\n<strong>解释:</strong> 返回 true 因为 \"leetcode\" 可以由 \"leet\" 和 \"code\" 拼接成。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入:</strong> s = \"applepenapple\", wordDict = [\"apple\", \"pen\"]\n<strong>输出:</strong> true\n<strong>解释:</strong> 返回 true 因为 \"applepenapple\" 可以由 \"apple\" \"pen\" \"apple\" 拼接成。\n&nbsp;    注意，你可以重复使用字典中的单词。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入:</strong> s = \"catsandog\", wordDict = [\"cats\", \"dog\", \"sand\", \"and\", \"cat\"]\n<strong>输出:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 300</code></li>\n\t<li><code>1 &lt;= wordDict.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= wordDict[i].length &lt;= 20</code></li>\n\t<li><code>s</code> 和 <code>wordDict[i]</code> 仅由小写英文字母组成</li>\n\t<li><code>wordDict</code> 中的所有字符串 <strong>互不相同</strong></li>\n</ul>",
  "hints": [
   "题型是「字符串可行性 DP」：问整串能否被切成若干个字典单词，考虑「前缀能否拆分」的递推。",
   "设 <code>dp[i]</code> 表示 s 的前 i 个字符能否被拆分成字典单词；先把 wordDict 放进 unordered_set&lt;string&gt; 加速查询。",
   "转移：枚举最后一个单词的起点 j（0 &lt;= j &lt; i），若 <code>dp[j]</code> 为真且 <code>s.substr(j, i-j)</code> 在字典中，则 dp[i]=true 并 break；边界 <code>dp[0]=true</code>，答案是 dp[n]。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        auto wordDictSet = unordered_set <string> ();\n        for (auto word: wordDict) {\n            wordDictSet.insert(word);\n        }\n\n        auto dp = vector <bool> (s.size() + 1);\n        dp[0] = true; // 空串视为可拆分\n        for (int i = 1; i <= s.size(); ++i) {\n            for (int j = 0; j < i; ++j) {\n                if (dp[j] && wordDictSet.find(s.substr(j, i - j)) != wordDictSet.end()) { // 前 j 个可拆，且末段 s[j..i) 是字典单词\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n\n        return dp[s.size()];\n    }\n};",
  "solutionText": "可行性 DP：dp[i] 表示 s 前 i 个字符能否拆成字典单词。枚举末段单词起点 j：dp[j] 为真且 s[j..i) 在字典（unordered_set 加速）中则 dp[i] 为真，可提前 break。边界 dp[0]=true，答案 dp[n]。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};"
 },
 {
  "id": 300,
  "title": "300. 最长递增子序列",
  "category": "动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> ，找到其中最长严格递增子序列的长度。</p>\n\n<p><strong>子序列&nbsp;</strong>是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，<code>[3,6,2,7]</code> 是数组 <code>[0,3,1,6,2,2,7]</code> 的<span data-keyword=\"subsequence-array\">子序列</span>。</p>\n&nbsp;\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [10,9,2,5,3,7,101,18]\n<strong>输出：</strong>4\n<strong>解释：</strong>最长递增子序列是 [2,3,7,101]，因此长度为 4 。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,1,0,3,2,3]\n<strong>输出：</strong>4\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [7,7,7,7,7,7,7]\n<strong>输出：</strong>1\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2500</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>进阶：</b></p>\n\n<ul>\n\t<li>你能将算法的时间复杂度降低到&nbsp;<code>O(n log(n))</code> 吗?</li>\n</ul>",
  "hints": [
   "题型是「贪心 + 二分」：想让递增子序列长得快，就要让每种长度的子序列末尾尽可能小。",
   "维护数组 d：<code>d[len]</code> 表示所有长度为 len 的递增子序列中最小的末尾元素，可证明 d 单调递增，因此可以二分。",
   "遍历 nums[i]：若比 <code>d[len]</code> 大就 <code>d[++len]=nums[i]</code>；否则二分找 d 中第一个 &gt;= nums[i] 的位置替换（条件写 <code>d[mid] &lt; nums[i]</code>）。最终 len 即答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        int len = 1, n = (int)nums.size();\n        if (n == 0) {\n            return 0;\n        }\n        vector<int> d(n + 1, 0);\n        d[len] = nums[0];\n        for (int i = 1; i < n; ++i) {\n            if (nums[i] > d[len]) {\n                d[++len] = nums[i]; // 比 d 末尾大：直接延长\n            } else {\n                int l = 1, r = len, pos = 0; // 如果找不到说明所有的数都比 nums[i] 大，此时要更新 d[1]，所以这里将 pos 设为 0\n                while (l <= r) {\n                    int mid = (l + r) >> 1;\n                    if (d[mid] < nums[i]) {\n                        pos = mid;\n                        l = mid + 1;\n                    } else {\n                        r = mid - 1;\n                    }\n                }\n                d[pos + 1] = nums[i]; // 替换第一个 >= nums[i] 的位置，让末尾尽量小\n            }\n        }\n        return len;\n    }\n};",
  "solutionText": "贪心+二分：d[len] 表示长度为 len 的递增子序列的最小末尾，可证 d 严格递增。比 d 末尾大就接上使 len+1；否则二分找第一个不小于它的位置替换，让末尾尽量小。len 即答案但 d 不是真实子序列；二分条件是 d[mid] < nums[i]。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 152,
  "title": "152. 乘积最大子数组",
  "category": "动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个整数数组 <code>nums</code>&nbsp;，请你找出数组中乘积最大的非空连续 <span data-keyword=\"subarray-nonempty\">子数组</span>（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。</p>\n\n<p>测试用例的答案是一个&nbsp;<strong>32-位</strong> 整数。</p>\n\n<p><strong>请注意</strong>，一个只包含一个元素的数组的乘积是这个元素的值。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [2,3,-2,4]\n<strong>输出:</strong> <code>6</code>\n<strong>解释:</strong>&nbsp;子数组 [2,3] 有最大乘积 6。\n</pre>\n\n<p><strong class=\"example\">示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [-2,0,-1]\n<strong>输出:</strong> 0\n<strong>解释:</strong>&nbsp;结果不能为 2, 因为 [-2,-1] 不是子数组。</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li><code>nums</code> 的任何子数组的乘积都 <strong>保证</strong>&nbsp;是一个 <strong>32-位</strong> 整数</li>\n</ul>",
  "hints": [
   "题型是「带正负翻转的线性 DP」：乘积不像求和——很小的负数再乘一个负数可能变成最大，只记最大值会漏解。",
   "以 i 结尾同时维护两个状态：<code>maxF</code> = 以 nums[i] 结尾的最大乘积，<code>minF</code> = 以 nums[i] 结尾的最小乘积（可能是绝对值很大的负数）。",
   "转移在三个候选里取：<code>maxF = max(mx*nums[i], mn*nums[i], nums[i])</code>，minF 同理取 min；注意先用临时变量存旧的 maxF/minF 再更新，答案取所有 maxF 的最大值。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        long maxF = nums[0], minF = nums[0], ans = nums[0];\n        for (int i = 1; i < nums.size(); ++i) {\n            long mx = maxF, mn = minF;\n            maxF = max(mx * nums[i], max((long)nums[i], mn * nums[i])); // 负负得正：最大值可能来自最小值乘负数\n            minF = min(mn * nums[i], min((long)nums[i], mx * nums[i]));\n            if(minF<INT_MIN) {\n                minF=nums[i];\n            }\n            ans = max(maxF, ans);\n        }\n        return ans;\n    }\n};",
  "solutionText": "乘积会因负数翻转正负，只维护最大值会漏解：同时维护以 i 结尾的最大乘积 maxF 与最小乘积 minF，在 mx*nums[i]、mn*nums[i]、nums[i] 三者中取最大/最小，先存旧值再更新。答案取所有 maxF 的最大值。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 416,
  "title": "416. 分割等和子集",
  "category": "动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个 <strong>只包含正整数 </strong>的 <strong>非空 </strong>数组 <code>nums</code> 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,5,11,5]\n<strong>输出：</strong>true\n<strong>解释：</strong>数组可以分割成 [1, 5, 5] 和 [11] 。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3,5]\n<strong>输出：</strong>false\n<strong>解释：</strong>数组不能分割成两个元素和相等的子集。\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= nums.length <= 200</code></li>\n\t<li><code>1 <= nums[i] <= 100</code></li>\n</ul>",
  "hints": [
   "题型是「01 背包（可行性）」：能否选出一个子集使和恰好等于总和的一半；总和为奇数可以直接判否。",
   "设 <code>dp[j]</code> 表示能否从数组中选若干个数（每个至多用一次）凑出和 j，目标是 dp[sum/2]。",
   "转移：对每个 num，容量 j 从 target <strong>倒序</strong>循环到 num：<code>dp[j] |= dp[j - num]</code>，倒序才能保证每个数只用一次；初始 <code>dp[0]=true</code>。"
  ],
  "solutionCode": "class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        int n = nums.size();\n        if (n < 2) {\n            return false;\n        }\n        int sum = 0, maxNum = 0;\n        for (auto& num : nums) {\n            sum += num;\n            maxNum = max(maxNum, num);\n        }\n        if (sum & 1) {\n            return false;\n        }\n        int target = sum / 2;\n        if (maxNum > target) {\n            return false;\n        }\n        vector<int> dp(target + 1, 0);\n        dp[0] = true;\n        for (int i = 0; i < n; i++) {\n            int num = nums[i];\n            for (int j = target; j >= num; --j) { // 01 背包：容量倒序，保证每个数只用一次\n                dp[j] |= dp[j - num]; // 不选 num（dp[j]）或选 num（dp[j-num]）\n            }\n        }\n        return dp[target];\n    }\n};",
  "solutionText": "01 背包：总和为奇数直接 false，否则求能否凑出 target=sum/2。dp[j] 表示能否选若干数凑出和 j；对每个 num，j 从 target 倒序到 num：dp[j] |= dp[j-num]，倒序保证每数只用一次。dp[0]=true。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 32,
  "title": "32. 最长有效括号",
  "category": "动态规划",
  "difficulty": "hard",
  "diffText": "困难",
  "descHtml": "<p>给你一个只包含 <code>'('</code> 和 <code>')'</code> 的字符串，找出最长有效（格式正确且连续）括号 <span data-keyword=\"substring\">子串</span> 的长度。</p>\n\n<p>左右括号匹配，即每个左括号都有对应的右括号将其闭合的字符串是格式正确的，比如&nbsp;<code>\"(()())\"</code>。</p>\n\n<p>&nbsp;</p>\n\n<div class=\"original__bRMd\">\n<div>\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"(()\"\n<strong>输出：</strong>2\n<strong>解释：</strong>最长有效括号子串是 \"()\"\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \")()())\"\n<strong>输出：</strong>4\n<strong>解释：</strong>最长有效括号子串是 \"()()\"\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"\"\n<strong>输出：</strong>0\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>s[i]</code> 为 <code>'('</code> 或 <code>')'</code></li>\n</ul>\n</div>\n</div>",
  "hints": [
   "题型是「以结尾为状态的线性 DP」：有效括号子串一定以 ')' 结尾，考虑每个 ')' 能向左延伸出多长的有效段。",
   "设 <code>dp[i]</code> 表示以 s[i] 结尾的最长有效括号长度；s[i] 是 '(' 时 dp[i] 恒为 0。",
   "s[i]==')' 分两种：前一位是 '(' 则 <code>dp[i]=dp[i-2]+2</code>；前一位是 ')' 则看 <code>s[i-dp[i-1]-1]</code> 是否为 '('，是则 <code>dp[i] = dp[i-1] + dp[i-dp[i-1]-2] + 2</code>；越界下标一律按 0 处理，答案取最大的 dp[i]。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int longestValidParentheses(string s) {\n        int maxans = 0, n = s.length();\n        vector<int> dp(n, 0);\n        for (int i = 1; i < n; i++) {\n            if (s[i] == ')') {\n                if (s[i - 1] == '(') {\n                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2; // 情况 \"...()\"\n                } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] == '(') {\n                    dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2; // 情况 \"...))\"：跨过内层有效段 dp[i-1] 找配对的 '('\n                }\n                maxans = max(maxans, dp[i]);\n            }\n        }\n        return maxans;\n    }\n};",
  "solutionText": "dp[i] 表示以 s[i] 结尾的最长有效括号长度，仅 ')' 可能非零：前一位是 '(' 时 dp[i]=dp[i-2]+2；前一位是 ')' 时若跨过 dp[i-1] 段之前是 '('，则两段 dp 相加再加 2。越界按 0 处理，答案取最大 dp。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestValidParentheses(string s) {\n        \n    }\n};"
 },
 {
  "id": 62,
  "title": "62. 不同路径",
  "category": "多维动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>一个机器人位于一个 <code>m x n</code><em>&nbsp;</em>网格的左上角 （起始点在下图中标记为 “Start” ）。</p>\n\n<p>机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。</p>\n\n<p>问总共有多少条不同的路径？</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n<img src=\"https://pic.leetcode.cn/1697422740-adxmsI-image.png\" style=\"width: 400px; height: 183px;\" />\n<pre>\n<strong>输入：</strong>m = 3, n = 7\n<strong>输出：</strong>28</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>m = 3, n = 2\n<strong>输出：</strong>3\n<strong>解释：</strong>\n从左上角开始，总共有 3 条路径可以到达右下角。\n1. 向右 -&gt; 向下 -&gt; 向下\n2. 向下 -&gt; 向下 -&gt; 向右\n3. 向下 -&gt; 向右 -&gt; 向下\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>m = 7, n = 3\n<strong>输出：</strong>28\n</pre>\n\n<p><strong>示例 4：</strong></p>\n\n<pre>\n<strong>输入：</strong>m = 3, n = 3\n<strong>输出：</strong>6</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li>题目数据保证答案小于等于 <code>2 * 10<sup>9</sup></code></li>\n</ul>",
  "hints": [
   "题型是「网格路径计数 DP」：走到每个格子的方案数，只取决于它上面和左面两个格子。",
   "用 vector&lt;vector&lt;int&gt;&gt; f(m, vector&lt;int&gt;(n)) 记「走到 (i,j) 的路径数」；第一行和第一列都只有一种走法，全初始化为 1。",
   "转移方程：<code>f[i][j] = f[i-1][j] + f[i][j-1]</code>，从 i=1、j=1 开始双重循环填表，最后返回 f[m-1][n-1]。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        vector<vector<int>> f(m, vector<int>(n)); // f[i][j]：走到 (i,j) 的路径数\n        for (int i = 0; i < m; ++i) {\n            f[i][0] = 1;\n        }\n        for (int j = 0; j < n; ++j) {\n            f[0][j] = 1;\n        }\n        for (int i = 1; i < m; ++i) {\n            for (int j = 1; j < n; ++j) {\n                f[i][j] = f[i - 1][j] + f[i][j - 1]; // 只能从上方或左方走来，方案数相加\n            }\n        }\n        return f[m - 1][n - 1];\n    }\n};",
  "solutionText": "二维 DP。f[i][j] 表示从左上角走到 (i,j) 的路径数，每格只能从上方或左方走来，故 f[i][j]=f[i-1][j]+f[i][j-1]。第一行、第一列只有一条直路，全部初始化为 1，答案为 f[m-1][n-1]。注意先填好边界再从 (1,1) 开始填内部，避免越界。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        \n    }\n};"
 },
 {
  "id": 64,
  "title": "64. 最小路径和",
  "category": "多维动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个包含非负整数的 <code><em>m</em>&nbsp;x&nbsp;<em>n</em></code>&nbsp;网格&nbsp;<code>grid</code> ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。</p>\n\n<p><strong>说明：</strong>每次只能向下或者向右移动一步。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg\" style=\"width: 242px; height: 242px;\" />\n<pre>\n<strong>输入：</strong>grid = [[1,3,1],[1,5,1],[4,2,1]]\n<strong>输出：</strong>7\n<strong>解释：</strong>因为路径 1→3→1→1→1 的总和最小。\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [[1,2,3],[4,5,6]]\n<strong>输出：</strong>12\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>0 &lt;= grid[i][j] &lt;= 200</code></li>\n</ul>",
  "hints": [
   "题型是「网格 DP」：和「不同路径」同一个骨架，只是把\"方案数相加\"换成\"路径和取最小\"。",
   "状态定义：dp[i][j] = 从 (0,0) 走到 (i,j) 的最小路径和；第一行、第一列没有两个来源，只能沿边把 grid 累加作为初始值。",
   "内部转移：<code>dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]</code>，双重循环填表后返回 dp[rows-1][columns-1]。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        if (grid.size() == 0 || grid[0].size() == 0) {\n            return 0;\n        }\n        int rows = grid.size(), columns = grid[0].size();\n        auto dp = vector<vector<int>>(rows, vector<int>(columns)); // dp[i][j]：走到 (i,j) 的最小路径和\n        dp[0][0] = grid[0][0];\n        for (int i = 1; i < rows; i++) {\n            dp[i][0] = dp[i - 1][0] + grid[i][0];\n        }\n        for (int j = 1; j < columns; j++) {\n            dp[0][j] = dp[0][j - 1] + grid[0][j];\n        }\n        for (int i = 1; i < rows; i++) {\n            for (int j = 1; j < columns; j++) {\n                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]; // 取上、左更小的一条路\n            }\n        }\n        return dp[rows - 1][columns - 1];\n    }\n};",
  "solutionText": "二维 DP。dp[i][j] 表示从左上角走到 (i,j) 的最小路径和，转移为 dp[i][j]=min(dp[i-1][j], dp[i][j-1])+grid[i][j]。易错点在边界：第一行只能从左来、第一列只能从上来，必须先沿边单独累加初始化，再填内部，答案在右下角 dp[rows-1][columns-1]。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        \n    }\n};"
 },
 {
  "id": 5,
  "title": "5. 最长回文子串",
  "category": "多维动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你一个字符串 <code>s</code>，找到 <code>s</code> 中最长的 <span data-keyword=\"palindromic-string\">回文</span> <span data-keyword=\"substring-nonempty\">子串</span>。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"babad\"\n<strong>输出：</strong>\"bab\"\n<strong>解释：</strong>\"aba\" 同样是符合题意的答案。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"cbbd\"\n<strong>输出：</strong>\"bb\"\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>s</code> 仅由数字和英文字母组成</li>\n</ul>",
  "hints": [
   "题型是「回文中心扩展」：回文由中心唯一决定，枚举每个中心同时向两边扩，比二维 DP 好写且只用 O(1) 空间。",
   "中心分两类：奇数长度中心 (i, i) 和偶数长度中心 (i, i+1)，长度 n 的串共 2n-1 个中心，一个都不能漏。",
   "写辅助函数 expandAroundCenter(s, left, right)：while 中 --left、++right 直到字符不等或越界，返回 {left+1, right-1}；主循环对两类中心各扩一次，用返回区间更新最长的 [start, end]。"
  ],
  "solutionCode": "class Solution {\npublic:\n    pair<int, int> expandAroundCenter(const string& s, int left, int right) {\n        while (left >= 0 && right < s.size() && s[left] == s[right]) {\n            --left;\n            ++right;\n        }\n        return {left + 1, right - 1}; // 退出时多扩了一步，往回收一格才是回文边界\n    }\n\n    string longestPalindrome(string s) {\n        int start = 0, end = 0;\n        for (int i = 0; i < s.size(); ++i) {\n            auto [left1, right1] = expandAroundCenter(s, i, i);     // 奇数长度：单字符中心\n            auto [left2, right2] = expandAroundCenter(s, i, i + 1); // 偶数长度：双字符中心\n            if (right1 - left1 > end - start) {\n                start = left1;\n                end = right1;\n            }\n            if (right2 - left2 > end - start) {\n                start = left2;\n                end = right2;\n            }\n        }\n        return s.substr(start, end - start + 1);\n    }\n};",
  "solutionText": "枚举回文中心向两侧扩展：每个位置各做一次「单字符中心」（奇数长度）和「双字符中心」（偶数长度）扩展，扩到两端字符不等或越界为止，维护当前最长回文的起止下标。易错点：偶数中心是 (i, i+1)，漏掉它会错过 \"abba\" 这类偶数长度回文。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};"
 },
 {
  "id": 1143,
  "title": "1143. 最长公共子序列",
  "category": "多维动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定两个字符串 <code>text1</code> 和 <code>text2</code>，返回这两个字符串的最长 <strong>公共子序列</strong> 的长度。如果不存在 <strong>公共子序列</strong> ，返回 <code>0</code> 。</p>\n\n<p>一个字符串的 <strong>子序列</strong><em> </em>是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。</p>\n\n<ul>\n\t<li>例如，<code>\"ace\"</code> 是 <code>\"abcde\"</code> 的子序列，但 <code>\"aec\"</code> 不是 <code>\"abcde\"</code> 的子序列。</li>\n</ul>\n\n<p>两个字符串的 <strong>公共子序列</strong> 是这两个字符串所共同拥有的子序列。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>text1 = \"abcde\", text2 = \"ace\" \n<strong>输出：</strong>3  \n<strong>解释：</strong>最长公共子序列是 \"ace\" ，它的长度为 3 。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>text1 = \"abc\", text2 = \"abc\"\n<strong>输出：</strong>3\n<strong>解释：</strong>最长公共子序列是 \"abc\" ，它的长度为 3 。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>text1 = \"abc\", text2 = \"def\"\n<strong>输出：</strong>0\n<strong>解释：</strong>两个字符串没有公共子序列，返回 0 。\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= text1.length, text2.length <= 1000</code></li>\n\t<li><code>text1</code> 和 <code>text2</code> 仅由小写英文字符组成。</li>\n</ul>",
  "hints": [
   "题型是「双序列 DP」：涉及两个字符串的匹配问题，状态通常定义成\"第一个串的前 i 个 × 第二个串的前 j 个\"。",
   "状态定义：dp[i][j] = text1 前 i 个字符与 text2 前 j 个字符的 LCS 长度；开 (m+1)×(n+1) 的表，第 0 行第 0 列代表空串、天然为 0。",
   "转移分两种：text1[i-1]==text2[j-1] 时 <code>dp[i][j] = dp[i-1][j-1] + 1</code>；否则 <code>dp[i][j] = max(dp[i-1][j], dp[i][j-1])</code>，最后返回 dp[m][n]。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        int m = text1.length(), n = text2.length();\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1)); // dp[i][j]：text1 前 i 个与 text2 前 j 个的 LCS 长度\n        for (int i = 1; i <= m; i++) {\n            char c1 = text1.at(i - 1);\n            for (int j = 1; j <= n; j++) {\n                char c2 = text2.at(j - 1);\n                if (c1 == c2) {\n                    dp[i][j] = dp[i - 1][j - 1] + 1;\n                } else {\n                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        return dp[m][n];\n    }\n};",
  "solutionText": "经典双序列二维 DP。dp[i][j] 表示 text1 前 i 个字符与 text2 前 j 个字符的最长公共子序列长度：末尾字符相等时取 dp[i-1][j-1]+1，否则取 max(dp[i-1][j], dp[i][j-1])。下标易错：dp 比字符串各多一行一列（第 0 行/列表示空串），dp[i][j] 对应的字符是 text1[i-1] 和 text2[j-1]。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        \n    }\n};"
 },
 {
  "id": 72,
  "title": "72. 编辑距离",
  "category": "多维动态规划",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给你两个单词&nbsp;<code>word1</code> 和&nbsp;<code>word2</code>， <em>请返回将&nbsp;<code>word1</code>&nbsp;转换成&nbsp;<code>word2</code> 所使用的最少操作数</em> &nbsp;。</p>\n\n<p>你可以对一个单词进行如下三种操作：</p>\n\n<ul>\n\t<li>插入一个字符</li>\n\t<li>删除一个字符</li>\n\t<li>替换一个字符</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>word1 = \"horse\", word2 = \"ros\"\n<strong>输出：</strong>3\n<strong>解释：</strong>\nhorse -&gt; rorse (将 'h' 替换为 'r')\nrorse -&gt; rose (删除 'r')\nrose -&gt; ros (删除 'e')\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>word1 = \"intention\", word2 = \"execution\"\n<strong>输出：</strong>5\n<strong>解释：</strong>\nintention -&gt; inention (删除 't')\ninention -&gt; enention (将 'i' 替换为 'e')\nenention -&gt; exention (将 'n' 替换为 'x')\nexention -&gt; exection (将 'n' 替换为 'c')\nexection -&gt; execution (插入 'u')\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= word1.length, word2.length &lt;= 500</code></li>\n\t<li><code>word1</code> 和 <code>word2</code> 由小写英文字母组成</li>\n</ul>",
  "hints": [
   "题型是「双序列 DP」：编辑距离只看两个前缀之间的最少操作数，增、删、改三种操作恰好对应 DP 表中三个相邻格子。",
   "状态定义：D[i][j] = word1 前 i 个字符转成 word2 前 j 个字符的最少操作数；边界 D[i][0]=i（全删）、D[0][j]=j（全插）。",
   "转移：<code>D[i][j] = min(D[i-1][j]+1, D[i][j-1]+1, D[i-1][j-1] + (word1[i-1] != word2[j-1] ? 1 : 0))</code>，末尾字符相同时替换项不加一。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int n = word1.length();\n        int m = word2.length();\n\n        // 有一个字符串为空串\n        if (n * m == 0) return n + m;\n\n        // D[i][j]：word1 前 i 个字符变为 word2 前 j 个字符的最少操作数\n        vector<vector<int>> D(n + 1, vector<int>(m + 1));\n\n        // 边界状态初始化\n        for (int i = 0; i < n + 1; i++) {\n            D[i][0] = i;\n        }\n        for (int j = 0; j < m + 1; j++) {\n            D[0][j] = j;\n        }\n\n        // 计算所有 DP 值\n        for (int i = 1; i < n + 1; i++) {\n            for (int j = 1; j < m + 1; j++) {\n                int left = D[i - 1][j] + 1;\n                int down = D[i][j - 1] + 1;\n                int left_down = D[i - 1][j - 1];\n                if (word1[i - 1] != word2[j - 1]) left_down += 1;\n                D[i][j] = min(left, min(down, left_down)); // 删、插、改三种操作取最小\n            }\n        }\n        return D[n][m];\n    }\n};",
  "solutionText": "二维 DP。D[i][j] 表示 word1 前 i 个字符变成 word2 前 j 个字符的最少操作数。边界：D[i][0]=i（全删）、D[0][j]=j（全插）。转移取三者最小：删除 D[i-1][j]+1、插入 D[i][j-1]+1、替换 D[i-1][j-1]（末尾字符相同不加一，不同加一）。别忘了先特判有一个空串时直接返回 n+m。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        \n    }\n};"
 },
 {
  "id": 136,
  "title": "136. 只出现一次的数字",
  "category": "技巧",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给你一个 <strong>非空</strong> 整数数组 <code>nums</code> ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。</p>\n\n<p>你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。</p>\n\n<div class=\"original__bRMd\">\n<div>\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1 ：</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入：</strong>nums = [2,2,1]</p>\n\n<p><strong>输出：</strong>1</p>\n</div>\n\n<p><strong class=\"example\">示例 2 ：</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入：</strong>nums = [4,1,2,1,2]</p>\n\n<p><strong>输出：</strong>4</p>\n</div>\n\n<p><strong class=\"example\">示例 3 ：</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入：</strong>nums = [1]</p>\n\n<p><strong>输出：</strong>1</p>\n</div>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-3 * 10<sup>4</sup> &lt;= nums[i] &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li>除了某个元素只出现一次以外，其余每个元素均出现两次。</li>\n</ul>\n</div>\n</div>",
  "hints": [
   "题型是「位运算」：题目要求 O(n) 时间 + O(1) 空间，排序和哈希表都不达标，往异或的性质上想。",
   "关键性质：a^a=0、a^0=a，且异或满足交换律和结合律——运算顺序无关，成对出现的数一定互相抵消。",
   "初始化 ret=0，一趟循环对每个元素执行 <code>ret ^= e</code>，循环结束后 ret 就是那个只出现一次的数。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int ret = 0;\n        for (auto e: nums) ret ^= e; // 成对的数异或两两抵消，剩下只出现一次的数\n        return ret;\n    }\n};",
  "solutionText": "位运算。异或满足交换律、结合律，且 a^a=0、a^0=a：把全部元素异或到一起，出现两次的数两两抵消为 0，最终剩下的就是只出现一次的那个数。一次遍历、O(1) 空间，恰好满足题目「线性时间 + 常数空间」的要求；哈希表计数可行但不满足空间限制。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 169,
  "title": "169. 多数元素",
  "category": "技巧",
  "difficulty": "easy",
  "diffText": "简单",
  "descHtml": "<p>给定一个大小为 <code>n</code><em> </em>的数组&nbsp;<code>nums</code> ，返回其中的多数元素。多数元素是指在数组中出现次数 <strong>大于</strong>&nbsp;<code>⌊ n/2 ⌋</code>&nbsp;的元素。</p>\n\n<p>你可以假设数组是非空的，并且给定的数组总是存在多数元素。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,2,3]\n<strong>输出：</strong>3</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,2,1,1,1,2,2]\n<strong>输出：</strong>2\n</pre>\n\n<p>&nbsp;</p>\n<strong>提示：</strong>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li>输入保证数组中一定有一个多数元素。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。</p>",
  "hints": [
   "题型是「投票抵消」：多数元素个数超过一半，让不同的数互相\"同归于尽\"，最后站着的一定是它——O(n) 时间、O(1) 空间。",
   "维护两个变量：candidate（当前候选人）和 count（净票数）；直觉不变量：被抵消掉的元素两两不同，多数元素抵不完。",
   "遍历规则：num==candidate 时 ++count；否则 --count，一旦 count 减到小于 0，就把 candidate 换成当前 num 且 count=1；扫完返回 candidate。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        int candidate = -1; // 当前候选人\n        int count = 0;      // 候选人的净票数\n        for (int num : nums) {\n            if (num == candidate)\n                ++count;\n            else if (--count < 0) { // 票数被抵消耗尽，换当前元素当候选人\n                candidate = num;\n                count = 1;\n            }\n        }\n        return candidate;\n    }\n};",
  "solutionText": "Boyer-Moore 投票。维护候选人 candidate 和净票数 count：遇到相同元素加一票，不同元素减一票，票数减到负数就换当前元素当候选人并把 count 重置为 1。因为多数元素超过一半，怎么抵消都会剩下它。注意该结论依赖「多数元素一定存在」的题设，否则最后还需再验证一遍。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 75,
  "title": "75. 颜色分类",
  "category": "技巧",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个包含红色、白色和蓝色、共&nbsp;<code>n</code><em> </em>个元素的数组&nbsp;<code>nums</code>&nbsp;，<strong><a href=\"https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95\" target=\"_blank\">原地</a>&nbsp;</strong>对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。</p>\n\n<p>我们使用整数 <code>0</code>、&nbsp;<code>1</code> 和 <code>2</code> 分别表示红色、白色和蓝色。</p>\n\n<ul>\n</ul>\n\n<p>必须在不使用库内置的 sort 函数的情况下解决这个问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,0,2,1,1,0]\n<strong>输出：</strong>[0,0,1,1,2,2]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,0,1]\n<strong>输出：</strong>[0,1,2]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 300</code></li>\n\t<li><code>nums[i]</code> 为 <code>0</code>、<code>1</code> 或 <code>2</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong></p>\n\n<ul>\n\t<li>你能想出一个仅使用常数空间的一趟扫描算法吗？</li>\n</ul>",
  "hints": [
   "题型是「荷兰国旗问题」：只有 0/1/2 三种值，一趟扫描把 0 换到最前、2 换到最后，中间自然剩下 1。",
   "双指针不变量：[0, p0) 全是 0，(p2, n-1] 全是 2；i 在中间扫描，循环条件是 i &lt;= p2，越过 p2 就结束。",
   "遇到 2 时要用 <strong>while</strong> 反复与 nums[p2] 交换并 --p2（从后面换回来的可能还是 2）；之后若 nums[i]==0 再与 nums[p0] 交换并 ++p0。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        int n = nums.size();\n        int p0 = 0, p2 = n - 1; // 不变量：[0,p0) 全为 0，(p2,n-1] 全为 2\n        for (int i = 0; i <= p2; ++i) {\n            while (i <= p2 && nums[i] == 2) { // 换回来的可能还是 2，必须继续换\n                swap(nums[i], nums[p2]);\n                --p2;\n            }\n            if (nums[i] == 0) {\n                swap(nums[i], nums[p0]);\n                ++p0;\n            }\n        }\n    }\n};",
  "solutionText": "双指针一趟扫描（荷兰国旗）。p0 指向下一个 0 该放的位置，p2 指向下一个 2 该放的位置，i 从头扫到 p2：遇到 2 时与 nums[p2] 交换并左移 p2——换回来的可能还是 2，必须用 while 连续换；遇到 0 时与 nums[p0] 交换并右移 p0。i 越过 p2 即结束，0 在前、2 在后、1 自然居中。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 31,
  "title": "31. 下一个排列",
  "category": "技巧",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>整数数组的一个 <strong>排列</strong>&nbsp; 就是将其所有成员以序列或线性顺序排列。</p>\n\n<ul>\n\t<li>例如，<code>arr = [1,2,3]</code> ，以下这些都可以视作 <code>arr</code> 的排列：<code>[1,2,3]</code>、<code>[1,3,2]</code>、<code>[3,1,2]</code>、<code>[2,3,1]</code> 。</li>\n</ul>\n\n<p>整数数组的 <strong>下一个排列</strong> 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 <strong>下一个排列</strong> 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。</p>\n\n<ul>\n\t<li>例如，<code>arr = [1,2,3]</code> 的下一个排列是 <code>[1,3,2]</code> 。</li>\n\t<li>类似地，<code>arr = [2,3,1]</code> 的下一个排列是 <code>[3,1,2]</code> 。</li>\n\t<li>而 <code>arr = [3,2,1]</code> 的下一个排列是 <code>[1,2,3]</code> ，因为 <code>[3,2,1]</code> 不存在一个字典序更大的排列。</li>\n</ul>\n\n<p>给你一个整数数组 <code>nums</code> ，找出 <code>nums</code> 的下一个排列。</p>\n\n<p>必须<strong><a href=\"https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95\" target=\"_blank\"> 原地 </a></strong>修改，只允许使用额外常数空间。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3]\n<strong>输出：</strong>[1,3,2]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,2,1]\n<strong>输出：</strong>[1,2,3]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,1,5]\n<strong>输出：</strong>[1,5,1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 100</code></li>\n</ul>",
  "hints": [
   "题型是「构造下一个字典序」：目标是让排列\"变大但变大得最少\"——在尽量靠右的位置，用一个刚好更大的数替换。",
   "从后往前找第一个满足 nums[i] &lt; nums[i+1] 的下标 i：i 右边是降序后缀，已是这段的最大排列，必须动 nums[i] 才能变大。",
   "再从后往前找第一个大于 nums[i] 的 nums[j]，swap 后后缀仍保持降序，最后 <code>reverse(nums.begin()+i+1, nums.end())</code> 把后缀变成最小升序；若 i&lt;0（整体降序）则直接整段反转。"
  ],
  "solutionCode": "class Solution {\npublic:\n    void nextPermutation(vector<int>& nums) {\n        int i = nums.size() - 2;\n        while (i >= 0 && nums[i] >= nums[i + 1]) { // 从后往前找第一个升序对 nums[i] < nums[i+1]\n            i--;\n        }\n        if (i >= 0) {\n            int j = nums.size() - 1;\n            while (j >= 0 && nums[i] >= nums[j]) { // 在降序后缀里找第一个比 nums[i] 大的数\n                j--;\n            }\n            swap(nums[i], nums[j]);\n        }\n        reverse(nums.begin() + i + 1, nums.end()); // 降序后缀反转成升序，保证增量最小\n    }\n};",
  "solutionText": "两遍扫描。先从后往前找第一个升序对 nums[i]<nums[i+1]，i 右边是一段降序后缀；再从后往前在后缀里找第一个大于 nums[i] 的数与之交换（交换后后缀仍降序）；最后把 i 之后的后缀整体反转成升序，使排列增大得最少。若整个数组降序（i<0），跳过交换直接反转，得到最小排列。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    void nextPermutation(vector<int>& nums) {\n        \n    }\n};"
 },
 {
  "id": 287,
  "title": "287. 寻找重复数",
  "category": "技巧",
  "difficulty": "medium",
  "diffText": "中等",
  "descHtml": "<p>给定一个包含&nbsp;<code>n + 1</code> 个整数的数组&nbsp;<code>nums</code> ，其数字都在&nbsp;<code>[1, n]</code>&nbsp;范围内（包括 <code>1</code> 和 <code>n</code>），可知至少存在一个重复的整数。</p>\n\n<p>假设 <code>nums</code> 只有 <strong>一个重复的整数</strong> ，返回&nbsp;<strong>这个重复的数</strong> 。</p>\n\n<p>你设计的解决方案必须 <strong>不修改</strong> 数组 <code>nums</code> 且只用常量级 <code>O(1)</code> 的额外空间。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,3,4,2,2]\n<strong>输出：</strong>2\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,1,3,4,2]\n<strong>输出：</strong>3\n</pre>\n\n<p><strong>示例 3 :</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,3,3,3,3]\n<strong>输出：</strong>3\n</pre>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>nums.length == n + 1</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= n</code></li>\n\t<li><code>nums</code> 中 <strong>只有一个整数</strong> 出现 <strong>两次或多次</strong> ，其余整数均只出现 <strong>一次</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>进阶：</b></p>\n\n<ul>\n\t<li>如何证明 <code>nums</code> 中至少存在一个重复的数字?</li>\n\t<li>你可以设计一个线性级时间复杂度 <code>O(n)</code> 的解决方案吗？</li>\n</ul>",
  "hints": [
   "题型是「隐式链表判环」：不许修改数组、只能用 O(1) 空间，把\"长度 n+1、值域 1..n\"的数组翻译成链表结构来想。",
   "建图方式：每个下标 i 连一条边 i → nums[i]；存在重复数意味着有两个下标指向同一个节点，链表必然有环，且<strong>环的入口就是重复的数</strong>。",
   "Floyd 两阶段：先 slow=nums[slow]、fast=nums[nums[fast]] 走到相遇；再把 slow 置回 0，两指针每次各走一步 slow=nums[slow]、fast=nums[fast]，再次相遇的位置即答案。"
  ],
  "solutionCode": "class Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        // 把下标 i -> nums[i] 看作链表的 next 指针，重复数即环的入口\n        int slow = 0, fast = 0;\n        do {\n            slow = nums[slow];\n            fast = nums[nums[fast]]; // 快指针每次走两步\n        } while (slow != fast);\n        slow = 0;\n        while (slow != fast) { // 第二阶段：同速前进，相遇点就是环入口\n            slow = nums[slow];\n            fast = nums[fast];\n        }\n        return slow;\n    }\n};",
  "solutionText": "快慢指针（Floyd 判环）。把下标 i 到 nums[i] 看作链表的 next 指针：因为存在重复数，必有两个下标指向同一节点，链表必然成环，环入口就是重复数。第一阶段 slow 走一步、fast 走两步直到相遇；第二阶段把 slow 放回 0，两指针同速前进，再次相遇处即答案。全程不修改数组、O(1) 空间。",
  "starterCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        \n    }\n};"
 }
];

# Bingqiao Gu · Personal Academic Homepage

谷炳桥的双语学术主页，采用 React 19、TypeScript、Vite 6、Tailwind CSS 4 和 Lucide。经典双栏布局包含矩形个人照片、真实全球访客地图、个人介绍、新闻、论文、荣誉、学习经历、学术服务和兴趣爱好。

默认使用英文及浅色主题；语言和主题偏好保存在浏览器 `localStorage`，切换无需刷新。英文使用 Lato，中文使用自行托管的 Noto Serif SC 字体子集。

## 本地运行

建议使用 Node.js 22 LTS，在本目录执行：

```bash
npm install
npm run dev
```

打开终端显示的本地地址。其他命令：

```bash
npm run check    # TypeScript 检查
npm run build    # 类型检查、生产构建及英文内容预渲染
npm run preview  # 本地预览 dist/ 生产版本
npm test         # Playwright 浏览器测试；先完成生产构建
```

macOS 已安装 Edge 时测试会自动使用 Edge；其他环境默认使用 Chromium。若缺少浏览器，先运行 `npx playwright install chromium`，也可用 `PLAYWRIGHT_CHANNEL` 指定已安装的浏览器。

浏览器测试覆盖桌面、平板和手机布局，中英文与主题偏好、导航、论文链接、图片放大、三条奖学金记录、两条学习经历及最新内容。自动化测试拦截统计服务网络请求，避免测试访问增加真实访客记录；地图的在线加载需在正常浏览器中检查。

## 修改内容

| 文件 | 用途 |
| --- | --- |
| `src/data/content.ts` | 个人资料、研究兴趣、论文、新闻、荣誉、学习经历、学术服务和其他兴趣；文案使用 `en` / `zh` 字段 |
| `src/data/ui.ts` | 导航、按钮、区块标题及其他界面文字 |
| `src/data/venues.ts` | 会议与期刊名称、标识及展示类型 |
| `src/data/analytics.ts` | 官方访客地图、统计页链接及可选在线人数嵌入代码 |
| `src/App.tsx` | 页面组件与交互、介绍段落及页面元数据更新 |
| `src/styles.css` | 布局、主题、字体与响应式样式 |
| `public/images/bingqiao-gu.webp` | 完整矩形个人照片，保留原图比例 |
| `public/images/publications/` | 从提供的论文 PDF 提取的真实图示 |
| `public/images/publications/asset-notes.json` | 图示源文件、页码与裁切记录 |
| `public/images/venues/` | 官方会议及期刊标识；来源记录在 `provenance.json` |
| `public/images/universities/` | 山东大学与清华大学官方校徽；来源记录在 `provenance.json` |
| `public/papers/` | 保留的四篇 2026 年论文 PDF；页面的 Paper 按钮使用官方出版页面，不含 HYHOLIC PDF |
| `public/fonts/` | 中文字体子集与 SIL Open Font License |
| `scripts/subset-chinese-font.py` | 根据当前中文文案重新生成字体子集 |
| `index.html` | 默认页面标题、描述、canonical 与 Open Graph 元数据 |

新增论文时填写 `Publication` 对象，补齐中英文标题、期刊或会议、`venueKey`、图示替代文本和简介。`paper`、`doi`、`code`、`project` 均仅在有真实地址时填写；缺少链接时省略该字段。同一年内可调整数组顺序安排展示优先级。

当前内容约定：

- 侧栏不重复个人简介，姓名后直接显示全球访客地图；联系方式包括 `bingqiaog@acm.org` 和 `gubingqiao@mail.sdu.edu.cn`。
- About Me 使用一个段落介绍当前身份、研究方向、论文成果和 WWW 2027 审稿工作；不包含导师或未来计划。
- 研究兴趣依次为 Artificial Intelligence / 人工智能、Network Science and Engineering / 网络科学与工程、Large Language Models / 大语言模型、AI Agents and Their Applications / 智能体及其应用。
- 参会新闻包括 2026.08 赴韩国济州岛参加 SIGKDD，以及 2027.08 计划在美国圣何塞或线上参加 SIGKDD。未来参会使用“计划中”标签，按活动日期倒序展示；明确成行后再更新 `upcoming` 和对应中英文时态。
- 国家奖学金按 2026.10、2025.10、2024.10 分成三条记录。
- 学习经历只包含山东大学本科及 2027 年清华大学电子工程系博士阶段，配有两校官方校徽；赴清华计划只在学习经历中展示，不推断博士导师。
- Academic Service 展示 WWW 2027 Reviewer / 审稿人；Other Things 展示游泳爱好，以及对人与人交互和社会关系的思考。
- 个人 GitHub 为用户确认的 [Naproxen-Network](https://github.com/Naproxen-Network)，不展示 LinkedIn。未知社交账号保持 `null`。

## 论文链接与图片

四篇 2026 年论文的 Paper 按钮直接打开官方出版页面：

| 论文 | 官方页面 |
| --- | --- |
| NEMARL | [Nature Communications](https://www.nature.com/articles/s41467-026-75382-1) |
| HyMAGE | [ACM Digital Library](https://dl.acm.org/doi/10.1145/3770855.3817897) |
| PersonaSteer | [ACL Anthology](https://aclanthology.org/2026.findings-emnlp.1270/) |
| Lévy Geometric Hypergraph | [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0378437126008496) |

HYHOLIC / KDD 2027 保留录用状态、作者、配图和 Code 链接，不显示 Paper 链接，也不在网站公开托管其 PDF。原始 `94_HYHOLIC_A_Hyperbolic_Geomet.pdf` 保留在项目上一级的原始资料目录中，不应复制到 `public/` 或构建产物。

HYHOLIC、NEMARL 配图分别来自原 PDF 第 7 页 Figure 6、第 7 页 Figure 4。Physica A / Lévy 使用原论文首页上半部分截图，包含标题、作者和摘要节选，并铺满缩略图区域。HyMAGE 使用第 5 页 Figure 2，PersonaSteer 使用第 4 页 Figure 2。论文配图保留完整面板、坐标轴与图例；首页截图保留完整宽度，严格截取页面上半部分。点击可查看大图，详细来源见 `public/images/publications/asset-notes.json`。KDD 使用完整蓝色几何图案与黑色 KDD 字样标识；两校校徽按实际图形直径统一大小，保留原始比例。

## 全球访客地图

当前已配置真实的 **whos.amung.us 全球地图**。官方 [Get Started](https://whos.amung.us/getstarted/) 页面生成的站点标识为 `owy8xz7bj8`，采用 `classic` 地图、`heart-orange` 标记和 250×125 尺寸。嵌入代码来自官方配置界面，统计页为[该站点的访问统计](https://whos.amung.us/stats/owy8xz7bj8/)；没有模拟访问次数、在线人数或地理标记。地图仅展示服务实际收到的访问数据。

原优先方案 MapMyVisitors 需要注册；当前使用用户已授权的另一方案 whos.amung.us。配置位于 `src/data/analytics.ts`：

| 字段 | 当前用途 |
| --- | --- |
| `whosAmungUsMapEmbedHtml` | 已填写官方全球地图嵌入代码 |
| `visitorStatsUrl` | 对应的官方统计页面 |
| `mapmyvisitorsEmbedHtml` | 留空；未来取得 MapMyVisitors 官方代码后可配置 |
| `whosAmungUsEmbedHtml` | 独立的可选在线人数计数器，当前留空 |

地图容器为 `visitor-map-embed`，独立计数器容器为 `online-visitors-embed`。组件在靠近可视区域时加载官方代码；统计功能不阻塞主页内容。官方配置来源记录在 `public/analytics/provenance.json`。

更换服务时，从 [MapMyVisitors](https://mapmyvisitors.com/) 或 [whos.amung.us](https://whos.amung.us/) 获取本站的完整官方 Embed Code，更新对应字段，并清空不再使用的地图代码；需要时一并更新 `visitorStatsUrl`。计数器可独立配置，空字符串表示禁用。嵌入字符串会作为 HTML 加载并执行其中的脚本，因此仅粘贴可信官方代码，不猜测 API、Widget ID 或嵌入地址。

## 字体维护

Lato 由 `@fontsource/lato` 随项目自行托管。中文使用 Noto Serif SC 的 WOFF2 子集，保留 400–700 的可变字重，当前约 190 KB。字体声明位于 `src/styles.css`，许可文件为 `public/fonts/OFL-NotoSerifSC.txt`。

新增未包含的汉字后，重新运行 `scripts/subset-chinese-font.py`。脚本扫描 `src/` 下的 `.ts`、`.tsx` 和 `.css`，保留当前文案需要的字符及标点；它需要 `fonttools[woff]` 和 Google Fonts 提供的[官方可变 TTF](https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf)。在项目根目录执行：

```bash
python3 -m venv /tmp/bingqiao-font-tools
/tmp/bingqiao-font-tools/bin/pip install 'fonttools[woff]'
curl --fail -L 'https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf' -o /tmp/NotoSerifSC.ttf
/tmp/bingqiao-font-tools/bin/python scripts/subset-chinese-font.py /tmp/NotoSerifSC.ttf
npm run build
```

输出覆盖 `public/fonts/noto-serif-sc-subset.woff2`，并报告字符数量、文件大小及字重范围。保留字体许可文件；完整 TTF 不需要放入网站构建产物。

## 构建与部署

`npm run build` 输出 `dist/`，并将默认英文正文预渲染至 `dist/index.html`，便于搜索引擎读取。中英文及主题切换仍由客户端完成。

本项目配置为 **Sites 私有站点**，访问范围不会因构建而自动公开。Sites 发布应使用现有 `.openai/hosting.json` 中的项目标识和 `dist` 静态目录，保留当前访问权限。需要面向公众开放时再明确调整站点访问范围。

也可将 `dist/` 上传至支持静态文件的托管平台。当前资源路径按域名根目录部署配置；若部署到 `/project/` 等子路径，需要同步调整 Vite `base` 及数据中的资源路径。

更换域名或部署地址时，更新 `index.html` 中的 canonical、`og:url`、`og:image` 和 JSON-LD 结构化数据，同时更新 `public/robots.txt` 及 `public/sitemap.xml` 中的网址。页面动态描述在 `src/App.tsx` 中维护。保持 Open Graph 图片为可访问的绝对地址。私有站点的搜索引擎收录及链接预览取决于访问权限；设置元数据不会改变站点权限。

## 内容来源与维护说明

- **HYHOLIC / KDD 2027**：作者列表及 2026 年 11 月录用消息依用户提供信息；本地 PDF 为匿名稿，未编造 DOI。
- **HyMAGE / KDD 2026**：2026 年 6 月录用消息依用户提供；正式出版信息及 DOI 由 [ACM / Crossref](https://doi.org/10.1145/3770855.3817897)核实。
- **PersonaSteer / EMNLP 2026 Findings**：采用 [ACL Anthology](https://aclanthology.org/2026.findings-emnlp.1270/)正式论文标题，与上传的早期稿件标题有差异；原 PDF 保留。
- **Nature Communications** 与 **Physica A**：出版信息分别参考[期刊文章](https://www.nature.com/articles/s41467-026-75382-1)及[出版社 DOI](https://doi.org/10.1016/j.physa.2026.132103)。
- **国家奖学金、清华博士计划、WWW 2027 审稿工作与游泳爱好**：依用户确认信息维护。未补写未提供的竞赛、资助、实习或教学经历。
- **ORCID**：[0009-0009-9631-1324](https://orcid.org/0009-0009-9631-1324)，经 HyMAGE 元数据和 ORCID 公开记录确认。
- **ICIC**：按用户要求不展示。论文图示均来自真实 PDF，会议与院校标识均保留来源记录。

更新论文状态、学习经历或其他内容时，同步维护相关新闻、中英文文案和字体子集。

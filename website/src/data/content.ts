import type { VenueKey } from './venues';

export type Language = 'en' | 'zh';

export type Localized = { en: string; zh: string };

export interface Profile {
  name: string;
  chineseName: string;
  email: string;
  academicEmail: string;
  affiliation: Localized;
  department: Localized;
  role: Localized;
  bio: Localized;
  scholar: string;
  openreview: string;
  orcid: string;
  github: string | null;
  linkedin: string | null;
  university: string;
  advisor: { name: Localized; url: string };
  futurePlans: Localized | null;
}

export interface Publication {
  id: string;
  year: number;
  title: string;
  titleZh: string;
  authors: string[];
  venue: Localized;
  badge: string;
  venueKey: VenueKey;
  image: string;
  imageFit?: 'cover';
  figureAlt: Localized;
  summary: Localized;
  firstAuthor: boolean;
  links: { paper?: string; doi?: string; code?: string; project?: string };
  status?: Localized;
}

export interface NewsItem {
  id: string;
  date: string;
  text: Localized;
  link?: string;
  venueKey?: VenueKey;
  upcoming?: boolean;
}

export interface Award {
  id: string;
  dates: string[];
  title: Localized;
  description: Localized;
}

export interface Experience {
  id: string;
  date: Localized;
  title: Localized;
  organization: Localized;
  description: Localized;
  logo: string;
  url?: string;
}

export interface ResearchInterest {
  id: string;
  label: Localized;
}

export const profile: Profile = {
  name: 'Bingqiao Gu',
  chineseName: '谷炳桥',
  email: 'bingqiaog@acm.org',
  academicEmail: 'gubingqiao@mail.sdu.edu.cn',
  affiliation: { en: 'Shandong University', zh: '山东大学' },
  department: { en: 'Computer Science and Technology', zh: '计算机科学与技术' },
  role: { en: 'Undergraduate Researcher', zh: '本科生' },
  bio: {
    en: 'I am an undergraduate in Computer Science and Technology at Shandong University. My research interests are artificial intelligence, network science and engineering, large language models, and AI agents and their applications. My work appears in Nature Communications, KDD, and Physica A, including two first-author papers accepted at CCF A– or CORE A*–ranked conferences or journals.',
    zh: '谷炳桥，现为山东大学计算机科学与技术专业本科生。研究兴趣为人工智能、网络科学与工程、大语言模型、智能体及其应用。已在 Nature Communications、KDD 和 Physica A 等期刊与会议发表多篇论文，其中以第一作者身份录用 CCF A（或 CORE A*）会议/期刊论文两篇。',
  },
  scholar: 'https://scholar.google.com/citations?user=u4KPLu0AAAAJ&hl=en',
  openreview: 'https://openreview.net/profile?id=~Bingqiao_Gu1',
  orcid: 'https://orcid.org/0009-0009-9631-1324',
  github: 'https://github.com/Naproxen-Network',
  linkedin: null,
  university: 'https://www.sdu.edu.cn/',
  advisor: {
    name: { en: 'Dong Li', zh: '李栋' },
    url: 'https://faculty.sdu.edu.cn/lidong6/zh_CN/index.htm',
  },
  futurePlans: {
    en: 'In 2027, I will join the Department of Electronic Engineering at Tsinghua University to pursue a Ph.D.',
    zh: '2027 年，我将加入清华大学电子工程系攻读博士学位。',
  },
};

// Canonical paper titles are retained in English; titleZh provides a Chinese rendering.
// HYHOLIC acceptance and authors follow the owner's update; the supplied PDF is anonymous.
export const publications: Publication[] = [
  {
    id: 'hyholic',
    year: 2027,
    title: 'HYHOLIC: A Hyperbolic Geometric Generative Model for Hypergraphs',
    titleZh: 'HYHOLIC：基于双曲几何的超图生成模型',
    authors: ['Bingqiao Gu', 'Zhanwei Du', 'Sihui Qian', 'Jiale Zeng', 'Yanhao Sun', 'Dong Li'],
    venue: {
      en: '33rd ACM SIGKDD Conference on Knowledge Discovery and Data Mining',
      zh: '第 33 届 ACM SIGKDD 知识发现与数据挖掘会议',
    },
    badge: 'KDD 2027',
    venueKey: 'kdd',
    image: '/images/publications/hyholic.webp',
    figureAlt: {"en": "Four-panel HYHOLIC benchmark comparison: degree distributions, clustering, a capability matrix, and navigation performance across network sizes.", "zh": "HYHOLIC 的四面板基准比较：度分布、聚类、能力矩阵，以及不同网络规模下的导航表现。"},
    summary: {"en": "HYHOLIC combines heavy-tailed degrees, high clustering, and navigability, with stable behavior across network sizes.", "zh": "HYHOLIC 同时刻画重尾度分布、高聚类与可导航性，并在不同网络规模下保持稳定表现。"},
    firstAuthor: true,
    links: {
      code: 'https://anonymous.4open.science/r/HYHOLIC-7D2E/',
    },
    status: { en: 'Accepted · November 2026', zh: '已录用 · 2026 年 11 月' },
  },
  {
    id: 'nemarl',
    year: 2026,
    title: 'Modeling network evolution by multi-agent reinforcement learning',
    titleZh: '基于多智能体强化学习的网络演化建模',
    authors: ['Dong Li', 'Tianwei Lin', 'Zhaoyang Bao', 'Bingqiao Gu', 'Yatao Zhang', 'Fei Yang', 'Yanhao Sun', 'Zhanwei Du', 'Petter Holme'],
    venue: {
      en: 'Nature Communications, 17, 8888',
      zh: 'Nature Communications（自然·通讯），第 17 卷，8888',
    },
    badge: 'Nature Communications',
    venueKey: 'nature',
    image: '/images/publications/nemarl.webp',
    figureAlt: {"en": "Six NEMARL network snapshots at times 1, 5, 10, 20, 30, and 40, showing nodes moving between community cores and peripheries.", "zh": "NEMARL 在时刻 1、5、10、20、30 和 40 的六张网络快照，展示节点在社群核心与外围之间的角色转换。"},
    summary: {"en": "Multi-agent reinforcement learning reproduces network evolution and changing node roles within communities.", "zh": "多智能体强化学习重现网络演化，以及节点在社群中的角色转换。"},
    firstAuthor: false,
    links: {
      paper: 'https://www.nature.com/articles/s41467-026-75382-1',
      doi: 'https://doi.org/10.1038/s41467-026-75382-1',
      code: 'https://github.com/network-computing/NEMARL',
    },
  },
  {
    id: 'hymage',
    year: 2026,
    title: 'HyMAGE: Semantic-Aware Dynamic Hypergraph Generation',
    titleZh: 'HyMAGE：语义感知的动态超图生成',
    authors: ['Bingqiao Gu', 'Jiale Zeng', 'Nuoran Zhou', 'Xingqin Qi', 'Dong Li'],
    venue: {
      en: '32nd ACM SIGKDD Conference on Knowledge Discovery and Data Mining, Volume 2',
      zh: '第 32 届 ACM SIGKDD 知识发现与数据挖掘会议，第 2 卷',
    },
    badge: 'KDD 2026',
    venueKey: 'kdd',
    image: '/images/publications/hymage.webp',
    figureAlt: {
      en: 'HyMAGE uses large language models to balance semantic hyperedge addition and dissolution.',
      zh: 'HyMAGE 利用大语言模型平衡语义超边的生成与消解。',
    },
    summary: {
      en: 'Language-model-driven agents generate dynamic hypergraphs that preserve both structural patterns and semantic relationships.',
      zh: '由大语言模型驱动的智能体生成动态超图，同时保留结构模式与语义关系。',
    },
    firstAuthor: true,
    links: {
      paper: 'https://dl.acm.org/doi/10.1145/3770855.3817897',
      doi: 'https://doi.org/10.1145/3770855.3817897',
      code: 'https://doi.org/10.5281/zenodo.20496905',
    },
  },
  {
    id: 'personasteer',
    year: 2026,
    title: 'PersonaSteer: Dynamic Activation Steering for Personalized Multi-turn LLM Conversations',
    titleZh: 'PersonaSteer：面向大语言模型多轮个性化对话的动态激活引导',
    authors: ['Sijian Ren', 'Qingbin Zeng', 'Bingqiao Gu', 'Fengli Xu', 'Yong Li'],
    venue: {
      en: 'Findings of the Association for Computational Linguistics: EMNLP 2026, pp. 26856–26876',
      zh: '计算语言学协会研究成果集：EMNLP 2026，第 26856–26876 页',
    },
    badge: 'EMNLP 2026',
    venueKey: 'emnlp',
    image: '/images/publications/personasteer.webp',
    figureAlt: {
      en: 'PersonaSteer framework with a steering persona engine and dynamic activation injection into an LLM.',
      zh: 'PersonaSteer 框架：利用个性引导引擎向大语言模型动态注入激活向量。',
    },
    summary: {
      en: 'Dynamic activation steering adapts language models to evolving user preferences throughout multi-turn conversations.',
      zh: '利用动态激活引导，使语言模型在多轮对话中适应持续变化的用户偏好。',
    },
    firstAuthor: false,
    links: {
      paper: 'https://aclanthology.org/2026.findings-emnlp.1270/',
      doi: 'https://doi.org/10.18653/2026.findings-emnlp.1270',
      code: 'https://github.com/tsinghua-fib-lab/PersonaSteer',
    },
  },
  {
    id: 'levy',
    year: 2026,
    title: 'Lévy Geometric Hypergraph heuristics for higher-order link prediction',
    titleZh: '用于高阶链接预测的 Lévy 几何超图启发式方法',
    authors: ['Bingqiao Gu', 'Longqi Li', 'Zhaoyang Bao', 'Zhanwei Du', 'Dong Li'],
    venue: {
      en: 'Physica A: Statistical Mechanics and its Applications, 702, 132103',
      zh: 'Physica A：统计力学及其应用，第 702 卷，132103',
    },
    badge: 'Physica A',
    venueKey: 'physica',
    image: '/images/publications/levy.webp',
    imageFit: 'cover',
    figureAlt: { en: 'Upper half of the Physica A paper’s first page, including its title, authors, and abstract excerpt.', zh: 'Physica A 论文首页上半部分，包含标题、作者及摘要节选。' },
    summary: {"en": "Lévy-flight geometry and connection kernels disentangle fragmentation, long-range interactions, and propagation range for higher-order link prediction.", "zh": "通过区分 Lévy 飞行几何与连接核的作用，研究网络碎片化、长程交互及传播范围对高阶链接预测的影响。"},
    firstAuthor: true,
    links: {
      paper: 'https://www.sciencedirect.com/science/article/pii/S0378437126008496',
      doi: 'https://doi.org/10.1016/j.physa.2026.132103',
    },
  },
];

export const news: NewsItem[] = [
  {
    id: 'kdd-2027-attendance',
    date: '2027.08',
    text: {
      en: 'I plan to attend SIGKDD 2027 in San Jose, USA, either in person or online.',
      zh: '计划前往美国圣何塞参加 SIGKDD 2027，或线上参会。',
    },
    venueKey: 'kdd',
    upcoming: true,
  },
  {
    id: 'hyholic-accepted',
    date: '2026.11',
    text: {
      en: 'HYHOLIC, our hyperbolic geometric generative model for hypergraphs, has been accepted to KDD 2027!',
      zh: '我们的双曲几何超图生成模型 HYHOLIC 被 KDD 2027 录用！',
    },
    link: '#paper-hyholic',
  },
  {
    id: 'scholarship-2026',
    date: '2026.10',
    text: {
      en: 'Awarded the National Scholarship for the third consecutive year.',
      zh: '连续第三年荣获中华人民共和国国家奖学金。',
    },
    link: '#awards',
  },
  {
    id: 'personasteer-published',
    date: '2026.10',
    text: {
      en: 'PersonaSteer appears in Findings of EMNLP 2026, exploring personalized multi-turn conversations through dynamic activation steering.',
      zh: 'PersonaSteer 发表于 EMNLP 2026 Findings，探索通过动态激活引导实现多轮个性化对话。',
    },
    link: 'https://aclanthology.org/2026.findings-emnlp.1270/',
  },
  {
    id: 'levy-published',
    date: '2026.10',
    text: {
      en: 'Our work on Lévy Geometric Hypergraph heuristics for higher-order link prediction is published in Physica A.',
      zh: '我们关于高阶链接预测的 Lévy 几何超图启发式方法论文发表于 Physica A。',
    },
    link: 'https://doi.org/10.1016/j.physa.2026.132103',
  },
  {
    id: 'kdd-2026-attendance',
    date: '2026.08',
    text: {
      en: 'I attended SIGKDD 2026 on Jeju Island, South Korea.',
      zh: '赴韩国济州岛参加 SIGKDD 2026。',
    },
    link: 'https://kdd2026.kdd.org/',
    venueKey: 'kdd',
  },
  {
    id: 'nemarl-published',
    date: '2026.07',
    text: {
      en: 'Our work on modeling network evolution with multi-agent reinforcement learning is published in Nature Communications.',
      zh: '我们关于多智能体强化学习驱动网络演化的论文发表于 Nature Communications。',
    },
    link: 'https://doi.org/10.1038/s41467-026-75382-1',
  },
  {
    id: 'hymage-accepted',
    date: '2026.06',
    text: {
      en: 'HyMAGE: Semantic-Aware Dynamic Hypergraph Generation has been accepted to KDD 2026!',
      zh: 'HyMAGE：语义感知的动态超图生成被 KDD 2026 录用！',
    },
    link: 'https://doi.org/10.1145/3770855.3817897',
  },
  {
    id: 'scholarship-2025',
    date: '2025.10',
    text: {
      en: 'Awarded the National Scholarship for the second consecutive year.',
      zh: '连续第二年荣获中华人民共和国国家奖学金。',
    },
    link: '#awards',
  },
  {
    id: 'scholarship-2024',
    date: '2024.10',
    text: {
      en: 'Awarded the National Scholarship.',
      zh: '荣获中华人民共和国国家奖学金。',
    },
    link: '#awards',
  },
];

export const awards: Award[] = [
  {
    id: 'national-scholarship-2026',
    dates: ['2026.10'],
    title: { en: 'National Scholarship', zh: '中华人民共和国国家奖学金' },
    description: {
      en: 'Awarded for the third consecutive year.',
      zh: '连续第三年获得国家奖学金。',
    },
  },
  {
    id: 'national-scholarship-2025',
    dates: ['2025.10'],
    title: { en: 'National Scholarship', zh: '中华人民共和国国家奖学金' },
    description: { en: 'Awarded for the second consecutive year.', zh: '连续第二年获得国家奖学金。' },
  },
  {
    id: 'national-scholarship-2024',
    dates: ['2024.10'],
    title: { en: 'National Scholarship', zh: '中华人民共和国国家奖学金' },
    description: { en: 'Awarded the National Scholarship.', zh: '获得中华人民共和国国家奖学金。' },
  },
];

export const experiences: Experience[] = [
  {
    id: 'upcoming-2027',
    date: { en: '2027 · Upcoming', zh: '2027 · 即将加入' },
    title: { en: 'Ph.D. studies in Electronic Engineering', zh: '电子工程系博士研究生' },
    organization: { en: 'Tsinghua University', zh: '清华大学' },
    logo: '/images/universities/tsinghua.webp',
    description: {
      en: 'In 2027, I will join the Department of Electronic Engineering at Tsinghua University to pursue a Ph.D.',
      zh: '2027 年，我将加入清华大学电子工程系攻读博士学位。',
    },
    url: 'https://www.ee.tsinghua.edu.cn/',
  },
  {
    id: 'education',
    date: { en: 'Present', zh: '至今' },
    title: { en: 'Undergraduate · Computer Science and Technology', zh: '本科 · 计算机科学与技术' },
    organization: { en: 'Shandong University', zh: '山东大学' },
    logo: '/images/universities/shandong.webp',
    description: {
      en: 'Undergraduate studies in Computer Science and Technology.',
      zh: '就读于山东大学计算机科学与技术专业。',
    },
    url: 'https://www.sdu.edu.cn/',
  },
];

export const interests: ResearchInterest[] = [
  { id: 'artificial-intelligence', label: { en: 'Artificial Intelligence', zh: '人工智能' } },
  { id: 'network-science', label: { en: 'Network Science and Engineering', zh: '网络科学与工程' } },
  { id: 'large-language-models', label: { en: 'Large Language Models', zh: '大语言模型' } },
  { id: 'agents-and-applications', label: { en: 'AI Agents and Their Applications', zh: '智能体及其应用' } },
];

export const otherThings: Localized = {
  en: 'Outside of research, I enjoy swimming and thinking about how people interact and form social relationships.',
  zh: '科研之外，我喜欢游泳，也喜欢思考人与人的交互与社会关系。',
};

export const academicServices: { id: string; year: number; venue: Localized; role: Localized; venueKey: VenueKey; url: string }[] = [
  { id: 'www-2027', year: 2027, venue: { en: 'The Web Conference (WWW 2027)', zh: 'The Web Conference（WWW 2027）' }, role: { en: 'Reviewer', zh: '审稿人' }, venueKey: 'www', url: 'https://www2027.thewebconf.org/' },
];

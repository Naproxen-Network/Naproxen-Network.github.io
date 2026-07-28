(() => {
  const dict = {
    zh: {
      "nav.about": "简介",
      "nav.pubs": "论文",
      "nav.contact": "联系",
      "hero.affil": "山东大学 Shandong University · 计算机科学与技术",
      "hero.lead":
        "我对大模型后训练、社交计算与推荐、强化学习和大语言模型在大规模文本挖掘和图挖掘中的应用感兴趣。",
      "hero.cta.primary": "自我介绍",
      "hero.cta.secondary": "论文列表",
      "about.kicker": "关于",
      "about.title": "自我介绍",
      "about.p1":
        "谷炳桥（Bingqiao Gu），就读于山东大学（Shandong University）计算机科学与技术专业，研究方向是大语言模型、社会计算、复杂系统、强化学习和大语言模型在图挖掘和文本挖掘中的应用，截止目前在 ACM SIGKDD、Nature Communications 等国际期刊、会议发表论文。",
      "about.p2":
        "我熟悉 SFT、DPO 及 LoRA、多智能体强化学习算法，同时目前对后训练、大语言模型推理、大模型智能体感兴趣。学术研究领域，如果您对科学学、AI 伦理、复杂系统、高阶网络数据挖掘感兴趣，欢迎与我联系。",
      "about.fact1.label": "院校",
      "about.fact1.value": "山东大学 Shandong University",
      "about.fact2.label": "方向",
      "about.fact2.value": "LLMs · 社会计算 · 复杂系统 · 强化学习",
      "about.fact3.label": "兴趣",
      "about.fact3.value": "游泳 · 唱歌",
      "about.fact4.label": "导师",
      "about.fact4.value": "李栋教授",
      "pubs.kicker": "论文",
      "pubs.title": "发表与成果",
      "pubs.1.badge": "CCF-A · 独立第一作者",
      "pubs.1.authors":
        "B. Gu, J. Zeng, N. Zhou, X. Qi, D. Li（通讯作者）",
      "pubs.1.abstract":
        "我们提出 HyMAGE：基于语义优先连接、无需图结构预训练的语义感知动态超图生成框架。每个节点作为自治智能体，由 LLM 进行局部语义选择，使超边的形成与溶解在语义亲和与结构语境中自组织涌现。HyMAGE 可复现真实超图的九种高阶结构模式，并生成拓扑—语义对齐的属性超图，在 HGNN 训练与扩散行为上均表现良好。",
      "pubs.2.badge": "Journal",
      "pubs.2.abstract":
        "针对网络演化常为群体决策、既有模型缺少节点策略学习与协同的问题，本文提出基于多智能体强化学习的网络演化模型 NEMARL：自治节点协作涌现群体智能并驱动结构演化。实验表明该模型可复现经典网络特征、较好拟合真实网络，并在场景测试中验证有效性。",
      "pubs.2.link": "Nature 全文",
      "pubs.3.badge": "Conference",
      "pubs.3.pages": "pp. 307–317",
      "pubs.3.abstract":
        "我们提出 Lévy Geometric Hypergraphs（LGH）：由 Lévy 飞行驱动的 k-均匀几何超图生成框架。顶点按重尾 Pareto–Lévy 律布点，超边连接尺度 s 内的 k−1 近邻；仿真未见尖锐渗流相变，并呈现尺度不变的高阶重叠结构，可作为高阶智能计算算法的基准生成模型。",
      "pubs.3.link": "Springer 全文",
      "contact.kicker": "联系",
      "contact.title": "欢迎交流研究与合作",
      "contact.lead":
        "若你对大语言模型、社会计算、复杂系统或图/文本挖掘相关方向感兴趣，欢迎邮件联系。",
      "footer.copy": "© 2026 Bingqiao Gu. All rights reserved.",
    },
    en: {
      "nav.about": "About",
      "nav.pubs": "Publications",
      "nav.contact": "Contact",
      "hero.affil": "Shandong University · Computer Science and Technology",
      "hero.lead":
        "I am interested in LLM post-training, social computing and recommendation, reinforcement learning, and applications of large language models in large-scale text mining and graph mining.",
      "hero.cta.primary": "About me",
      "hero.cta.secondary": "Publications",
      "about.kicker": "About",
      "about.title": "About me",
      "about.p1":
        "Bingqiao Gu is studying Computer Science and Technology at Shandong University. His research interests include large language models, social computing, complex systems, reinforcement learning, and applications of LLMs in graph mining and text mining. He has published papers in international journals and conferences such as ACM SIGKDD and Nature Communications.",
      "about.p2":
        "I am familiar with SFT, DPO, LoRA, and multi-agent reinforcement learning algorithms, and I am currently interested in post-training, LLM inference, and LLM agents. For academic collaboration, if you are interested in scientometrics, AI ethics, complex systems, or higher-order network data mining, feel free to contact me.",
      "about.fact1.label": "Affiliation",
      "about.fact1.value": "Shandong University",
      "about.fact2.label": "Focus",
      "about.fact2.value": "LLMs · Social computing · Complex systems · RL",
      "about.fact3.label": "Interests",
      "about.fact3.value": "Swimming · Singing",
      "about.fact4.label": "Advisor",
      "about.fact4.value": "Prof. Dong Li",
      "pubs.kicker": "Publications",
      "pubs.title": "Selected work",
      "pubs.1.badge": "CCF-A · Sole first author",
      "pubs.1.authors":
        "B. Gu, J. Zeng, N. Zhou, X. Qi, D. Li (corresponding)",
      "pubs.1.abstract":
        "We propose HyMAGE, a semantic-aware dynamic hypergraph generation framework based on semantic preferential attachment without graph-structure pretraining. Each node acts as an autonomous agent; LLMs perform local semantic selection so hyperedge formation and dissolution emerge from semantic affinity. HyMAGE reproduces nine high-order structural patterns of real hypergraphs and yields topology-and-semantics-aligned attributed hypergraphs that transfer well to HGNN training and diffusion tasks.",
      "pubs.2.badge": "Journal",
      "pubs.2.abstract":
        "We propose NEMARL, a network-evolution model based on multi-agent reinforcement learning that treats evolution as a group decision process: autonomous nodes learn coordinated policies whose swarm intelligence drives structural change. Experiments show it reproduces classical network properties, fits real networks well, and is effective in scenario tests.",
      "pubs.2.link": "Nature link",
      "pubs.3.badge": "Conference",
      "pubs.3.pages": "pp. 307–317",
      "pubs.3.abstract":
        "We introduce Lévy Geometric Hypergraphs (LGH), a geometry-aware generative framework for k-uniform hypergraphs driven by Lévy-flight point processes with heavy-tailed Pareto–Lévy steps. Hyperedges link each vertex to its k−1 nearest neighbours within scale s. Simulations show no sharp percolation transition and highlight scale-invariant higher-order overlap, positioning LGH as a useful benchmark for intelligent-computing algorithms on higher-order data.",
      "pubs.3.link": "Springer link",
      "contact.kicker": "Contact",
      "contact.title": "Open to research conversations",
      "contact.lead":
        "If you are interested in large language models, social computing, complex systems, or graph/text mining, feel free to reach out.",
      "footer.copy": "© 2026 Bingqiao Gu. All rights reserved.",
    },
  };

  const root = document.documentElement;
  const toggle = document.getElementById("langToggle");
  const header = document.querySelector(".site-header");
  const labelEl = toggle?.querySelector("[data-lang-label]");
  const idleEl = toggle?.querySelector("[data-lang-idle]");

  let lang = localStorage.getItem("pagehome-lang") || "zh";

  function applyLang(next) {
    lang = next;
    localStorage.setItem("pagehome-lang", lang);
    root.lang = lang === "zh" ? "zh-CN" : "en";
    root.dataset.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = dict[lang][key];
      if (value != null) el.textContent = value;
    });

    document.title =
      lang === "zh" ? "谷炳桥 · Bingqiao Gu" : "Bingqiao Gu";

    if (labelEl && idleEl) {
      if (lang === "zh") {
        labelEl.textContent = "中";
        idleEl.textContent = "EN";
      } else {
        labelEl.textContent = "EN";
        idleEl.textContent = "ZH";
      }
    }
  }

  toggle?.addEventListener("click", () => {
    applyLang(lang === "zh" ? "en" : "zh");
  });

  applyLang(lang);

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

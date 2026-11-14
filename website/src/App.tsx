import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, ChevronDown, ChevronUp, Code2, ExternalLink, FileText, Github, GraduationCap, Mail, Menu, Moon, Sun, Trophy, X, ZoomIn } from 'lucide-react';
import { academicServices, awards, experiences, interests, news, otherThings, profile, publications, type Language } from './data/content';
import { ui } from './data/ui';
import { VisitorMap } from './components/VisitorMap';
import { VenueMark } from './components/VenueMark';

const sectionIds = ['home', 'about', 'news', 'publications', 'awards', 'experiences', 'service', 'other'] as const;
type SectionId = typeof sectionIds[number];
function saved(key: string, fallback: string) {
  try { return typeof window === 'undefined' ? fallback : localStorage.getItem(key) || fallback; }
  catch { return fallback; }
}
function External({ href, children, className, label }: { href: string; children: ReactNode; className?: string; label?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label} title={label}>{children}</a>;
}
function OrcidIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><circle cx="7.6" cy="7.4" r="1" fill="currentColor"/><path d="M7.6 10v7m3.5-7h2.3c5 0 5 7 0 7h-2.3z" stroke="currentColor" strokeWidth="1.6"/></svg>;
}

export function App() {
  const [language, setLanguage] = useState<Language>(() => saved('bg-language', 'en') === 'zh' ? 'zh' : 'en');
  const [theme, setTheme] = useState(() => saved('bg-theme', 'light') === 'dark' ? 'dark' : 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [expandedNews, setExpandedNews] = useState(false);
  const [figure, setFigure] = useState<(typeof publications)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const t = ui[language];

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh' ? '谷炳桥 | 山东大学' : 'Bingqiao Gu | Shandong University';
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'zh'
      ? '谷炳桥，山东大学计算机科学与技术专业本科生。研究兴趣为人工智能、网络科学与工程、大语言模型、智能体及其应用。'
      : 'Bingqiao Gu is an undergraduate researcher at Shandong University. His research interests are artificial intelligence, network science and engineering, large language models, and AI agents and their applications.');
    try { localStorage.setItem('bg-language', language); } catch { /* Storage may be unavailable. */ }
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171b20' : '#ffffff');
    try { localStorage.setItem('bg-theme', theme); } catch { /* Storage may be unavailable. */ }
  }, [theme]);
  useEffect(() => {
    const onScroll = () => {
      let current: SectionId = 'home';
      for (const id of sectionIds.slice(1)) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) < 170) current = id;
      }
      if (window.scrollY < 40) current = 'home';
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (figure) dialog.current?.showModal();
  }, [figure]);

  const closeFigure = () => { dialog.current?.close(); setFigure(null); };
  const nav = (mobile = false) => <nav aria-label={language === 'en' ? (mobile ? 'Mobile navigation' : 'Main navigation') : (mobile ? '移动端导航' : '主导航')} className={mobile ? 'mobile-nav' : 'desktop-nav'}>
    {sectionIds.map(id => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} onClick={() => { setMenuOpen(false); setActiveSection(id); }}>{t[id]}</a>)}
  </nav>;

  return <>
    <a href="#main-content" className="skip-link">{t.skip}</a>
    <header className="site-header">
      <div className="header-inner">
        <a href="#home" className="wordmark" onClick={() => setMenuOpen(false)}>Bingqiao Gu<span className="wordmark-period">.</span></a>
        {nav()}
        <div className="header-actions">
          <div className="language-switch" aria-label={language === 'en' ? 'Language' : '语言'}>
            <button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" lang="zh-CN" aria-pressed={language === 'zh'} onClick={() => setLanguage('zh')}>中文</button>
          </div>
          <span className="action-divider" />
          <button type="button" className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? t.dark : t.light} title={theme === 'light' ? t.dark : t.light}>
            {theme === 'light' ? <Moon size={19} strokeWidth={1.6} /> : <Sun size={19} strokeWidth={1.6} />}
          </button>
          <button type="button" className="icon-button menu-toggle" aria-label={t.menu} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
      {menuOpen && <div id="mobile-menu">{nav(true)}</div>}
    </header>

    <div id="home" className="page-shell">
      <aside className="sidebar" aria-label={language === 'en' ? 'Personal information' : '个人信息'}>
        <div className="profile-top">
          <img src="/images/bingqiao-gu.webp" width="853" height="1280" alt={t.portrait} className="portrait" fetchPriority="high" />
          <div className="profile-details">
            <h1>{language === 'en' ? profile.name : profile.chineseName}</h1>
            <p className="alternate-name">{language === 'en' ? profile.chineseName : profile.name}</p>
          </div>
        </div>
        <VisitorMap language={language} />
        <div className="profile-contact">
            <p className="profile-role">{profile.role[language]}</p>
            <External href={profile.university} className="affiliation">{profile.affiliation[language]}<ArrowUpRight size={13} /></External>
            <p className="department">{profile.department[language]}</p>
            <div className="profile-emails">{[profile.email, profile.academicEmail].map(email => <a key={email} href={`mailto:${email}`} className="email-link"><Mail size={15} strokeWidth={1.6} />{email}</a>)}</div>
            <div className="social-links">
              <External href={profile.scholar} label={t.viewScholar}><GraduationCap size={21} strokeWidth={1.7} /></External>
              {profile.github && <External href={profile.github} label="GitHub"><Github size={19} strokeWidth={1.7} /></External>}
              <External href={profile.orcid} label="ORCID"><OrcidIcon /></External>
              <External href={profile.openreview} label="OpenReview"><BookOpen size={19} strokeWidth={1.6} /></External>
            </div>
        </div>
      </aside>

      <main id="main-content">
        <section id="about" className="content-section about-section" aria-labelledby="about-heading">
          <div className="section-heading"><h2 id="about-heading">{t.about}</h2></div>
          <div className="about-copy">
            <p>{language === 'en' ? <>I am an undergraduate student in Computer Science and Technology at <External href={profile.university}><span aria-hidden="true">🏫 </span>Shandong University</External>. </>
              : <>我是<External href={profile.university}><span aria-hidden="true">🏫 </span>山东大学</External>计算机科学与技术专业的本科生。</>}
              {t.bio2} {t.bio3Start}<span className="venue-inline">Nature Communications</span>{language === 'en' ? ', ' : '、'}<span className="venue-inline">KDD</span>{language === 'en' ? ', ' : '、'}<span className="venue-inline">EMNLP</span>{language === 'en' ? ', and ' : ' 和 '}<span className="venue-inline">Physica A</span>{t.bio3End} {t.serviceSentence}</p>
          </div>
          <div className="research-interests"><h3><span aria-hidden="true">🌱 </span>{t.research}</h3><div>{interests.map(interest => <span key={interest.id}>{interest.label[language]}</span>)}</div></div>
        </section>

        <section id="news" className="content-section news-section" aria-labelledby="news-heading">
          <div className="section-heading"><h2 id="news-heading"><span className="heading-emoji" aria-hidden="true">🔥</span>{t.news}</h2></div>
          <ol className="news-list">
            {(expandedNews ? news : news.slice(0, 6)).map(item => <li key={item.id}>
              <time dateTime={item.date.replace('.', '-')}>{item.date}</time>
              <div>{item.venueKey ? <VenueMark venue={item.venueKey} /> : publications.filter(paper => item.id.startsWith(paper.id)).map(paper => <VenueMark key={paper.id} venue={paper.venueKey} />)}{item.link ? <a href={item.link} target={item.link.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">{item.text[language]}</a> : <span>{item.text[language]}</span>}</div>
            </li>)}
          </ol>
          {news.length > 6 && <button type="button" className="text-button news-toggle" aria-expanded={expandedNews} onClick={() => setExpandedNews(!expandedNews)}>{expandedNews ? t.lessNews : t.allNews}{expandedNews ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>}
        </section>

        <section id="publications" className="content-section publications-section" aria-labelledby="publications-heading">
          <div className="section-heading"><h2 id="publications-heading"><span className="heading-emoji" aria-hidden="true">📑</span>{t.publications}</h2><External href={profile.scholar} className="section-link">{t.viewScholar}<ArrowUpRight size={14} /></External></div>
          {[...new Set(publications.map(p => p.year))].sort((a, b) => b - a).map(year => <div className="publication-year-group" key={year}>
            <div className="year-divider"><h3>{year}</h3><span /></div>
            {publications.filter(p => p.year === year).map(paper => <article className="publication" id={`paper-${paper.id}`} key={paper.id}>
              <button type="button" className={`paper-figure${paper.imageFit === 'cover' ? ' paper-figure-page' : ''}`} onClick={() => setFigure(paper)} aria-label={`${t.figure}: ${paper.title}`}>
                <span className={`venue-badge ${paper.id === 'nemarl' ? 'nature-badge' : ''}`}>{paper.badge}</span>
                <img src={paper.image} alt={paper.figureAlt[language]} className={paper.imageFit === 'cover' ? 'paper-page-crop' : undefined} width="600" height="400" loading="lazy" />
                <span className="zoom-cue"><ZoomIn size={14} /></span>
              </button>
              <div className="paper-info">
                <h4>{paper.links.paper ? <External href={paper.links.paper}>{language === 'zh' ? paper.titleZh : paper.title}</External> : <span>{language === 'zh' ? paper.titleZh : paper.title}</span>}</h4>
                {language === 'zh' && <p className="original-title" lang="en">{paper.title}</p>}
                <p className="authors">{paper.authors.map((author, i) => <span key={author}>{i > 0 ? ', ' : ''}{author === 'Bingqiao Gu' ? <strong>{language === 'en' ? author : '谷炳桥'}</strong> : author}</span>)}</p>
                <p className="paper-venue"><VenueMark venue={paper.venueKey} />{paper.venue[language]}</p>
                <div className="paper-links">
                  {paper.links.paper && <External href={paper.links.paper}><FileText size={13} />{t.paper}</External>}
                  {paper.links.doi && <External href={paper.links.doi}><ExternalLink size={12} />{t.doi}</External>}
                  {paper.links.code && <External href={paper.links.code}><Code2 size={14} />{t.code}</External>}
                  {paper.links.project && <External href={paper.links.project}><ArrowUpRight size={14} />{t.project}</External>}
                </div>
              </div>
            </article>)}
          </div>)}
        </section>

        <section id="awards" className="content-section awards-section" aria-labelledby="awards-heading">
          <div className="section-heading"><h2 id="awards-heading"><span className="heading-emoji" aria-hidden="true">🏅</span>{t.awards}</h2></div>
          {awards.map(award => <div className="award-row" key={award.id}>
            <div className="award-symbol"><Trophy size={23} strokeWidth={1.4} /></div>
            <div><h3>{award.title[language]}</h3><p>{award.description[language]}</p><div className="award-dates">{award.dates.map(date => <time key={date} dateTime={date.replace('.', '-')}>{date}</time>)}</div></div>
          </div>)}
        </section>

        <section id="experiences" className="content-section experiences-section" aria-labelledby="experiences-heading">
          <div className="section-heading"><h2 id="experiences-heading"><span className="heading-emoji" aria-hidden="true">🎓</span>{t.experiences}</h2></div>
          <ol className="timeline">
            {experiences.map((experience, i) => <li key={experience.id} className={i === 0 ? 'upcoming' : ''}>
              <span className="timeline-dot" /><span className="experience-date">{experience.date[language]}</span>
              <div className="education-detail"><img className="university-logo" src={experience.logo} width="52" height="52" alt={language === 'en' ? `${experience.organization.en} emblem` : `${experience.organization.zh}校徽`} loading="lazy" /><div className="experience-body"><h3>{experience.url ? <External href={experience.url}>{experience.organization[language]}<ArrowUpRight size={13} /></External> : experience.organization[language]}</h3><h4>{experience.title[language]}</h4><p>{experience.description[language]}</p></div></div>
            </li>)}
          </ol>
        </section>

        <section id="service" className="content-section service-section" aria-labelledby="service-heading"><div className="section-heading"><h2 id="service-heading"><span className="heading-emoji" aria-hidden="true">📝</span>{t.serviceTitle}</h2></div><ul className="service-list">{academicServices.map(service => <li key={service.id}><time>{service.year}</time><div><VenueMark venue={service.venueKey} /><strong><External href={service.url}>{service.venue[language]}</External></strong><span className="service-role">{service.role[language]}</span></div></li>)}</ul></section>
        <section id="other" className="content-section other-section" aria-labelledby="other-heading"><div className="section-heading"><h2 id="other-heading"><span className="heading-emoji" aria-hidden="true">🏊</span>{t.other}</h2></div><p>{otherThings[language]}</p></section>
        <section className="contact-section" aria-labelledby="contact-heading"><div><h2 id="contact-heading">{t.contact}</h2><p>{t.contactCopy}</p></div><div className="contact-emails">{[profile.email, profile.academicEmail].map(email => <a key={email} href={`mailto:${email}`} aria-label={`${t.contact}: ${email}`}><Mail size={17} /><span>{email}</span><ArrowUpRight size={16} /></a>)}</div></section>
      </main>
    </div>

    <dialog ref={dialog} className="figure-dialog" aria-labelledby="figure-title" onClose={() => setFigure(null)} onClick={event => { if (event.target === event.currentTarget) closeFigure(); }}>
      {figure && <div className="dialog-content"><div className="dialog-heading"><h2 id="figure-title">{language === 'en' ? figure.title : figure.titleZh}</h2><button type="button" className="icon-button" autoFocus onClick={closeFigure} aria-label={t.close}><X size={22} /></button></div><div className="dialog-image"><img src={figure.image} alt={figure.figureAlt[language]} /></div><p>{figure.summary[language]}</p>{figure.links.paper && <External href={figure.links.paper} className="dialog-paper-link">{t.paper}<ArrowRight size={14} /></External>}{!figure.links.paper && figure.links.code && <External href={figure.links.code} className="dialog-paper-link">{t.code}<Code2 size={14} /></External>}</div>}
    </dialog>
  </>;
}

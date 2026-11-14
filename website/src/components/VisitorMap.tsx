import { useEffect, useRef } from 'react';
import { Globe2 } from 'lucide-react';
import { analytics } from '../data/analytics';
import type { Language } from '../data/content';
import { ui } from '../data/ui';

function OfficialEmbed({ html, id }: { html: string; id: string }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current;
    if (!container || !html) return;
    const isWorldMap = id === 'visitor-map-embed' && html.includes('waust.at/m.js');
    // Scale the whole official map, including its geographic markers, together.
    const updateSize = () => container.style.setProperty('--map-scale', String(Math.min(1, container.clientWidth / 250)));
    const resizeObserver = isWorldMap ? new ResizeObserver(updateSize) : null;
    if (isWorldMap) { updateSize(); resizeObserver?.observe(container); }
    let mounted = false;
    const mount = () => {
      if (mounted) return;
      mounted = true;
      container.innerHTML = html;
      // innerHTML does not run scripts. Re-create the exact official script tags.
      for (const old of container.querySelectorAll('script')) {
        const script = document.createElement('script');
        for (const attr of old.attributes) script.setAttribute(attr.name, attr.value);
        script.textContent = old.textContent;
        old.replaceWith(script);
      }
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { mount(); observer.disconnect(); }
    }, { rootMargin: '200px' });
    observer.observe(container);
    return () => { observer.disconnect(); resizeObserver?.disconnect(); container.replaceChildren(); };
  }, [html, id]);
  return <div ref={host} id={id} className="official-embed" data-provider={html.includes('waust.at/m.js') ? 'whos.amung.us' : undefined} />;
}

export function VisitorMap({ language }: { language: Language }) {
  const t = ui[language];
  const mapEmbed = analytics.mapmyvisitorsEmbedHtml || analytics.whosAmungUsMapEmbedHtml;
  return <section className="visitor-section" aria-label={t.visitor}>
    <h3>{t.visitor}</h3>
    {mapEmbed
      ? <OfficialEmbed html={mapEmbed} id="visitor-map-embed" />
      : <div className="visitor-placeholder" id="visitor-map-embed">
        <Globe2 size={30} strokeWidth={1.1} aria-hidden="true" />
        <span>{t.mapPending}</span>
        <p>{t.mapDetail}</p>
        <a href="https://mapmyvisitors.com/" target="_blank" rel="noopener noreferrer">MapMyVisitors ↗</a>
      </div>}
    {mapEmbed && analytics.visitorStatsUrl && <a className="visitor-stats-link" href={analytics.visitorStatsUrl} target="_blank" rel="noopener noreferrer">{language === 'en' ? 'Visitor statistics' : '全球访客统计'} ↗</a>}
    {analytics.whosAmungUsEmbedHtml && <OfficialEmbed html={analytics.whosAmungUsEmbedHtml} id="online-visitors-embed" />}
  </section>;
}

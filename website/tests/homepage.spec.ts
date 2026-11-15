import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Browser regression checks must not create artificial analytics traffic.
  await page.route('**/waust.at/**', route => route.abort());
  await page.route('**/whos.amung.us/**', route => route.abort());
});

test('real content, responsive layout, and bilingual theme preferences', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: 'Bingqiao Gu', exact: true })).toBeVisible();
  expect((await page.locator('body').innerText()).match(/谷炳桥/g)).toHaveLength(1);
  await expect(page.locator('.publication')).toHaveCount(5);
  await expect(page.locator('.about-copy > p')).toHaveCount(1);
  await expect(page.locator('.about-copy')).toContainText('reviewer for The Web Conference (WWW 2027)');
  await expect(page.locator('.about-copy')).not.toContainText('Tsinghua');
  await expect(page.locator('.about-copy')).not.toContainText('Dong Li');
  await expect(page.locator('#experiences')).toContainText('to pursue a Ph.D.');
  await expect(page.locator('.social-links a[aria-label="GitHub"]')).toHaveAttribute('href', 'https://github.com/Naproxen-Network');
  await expect(page.locator('.social-links a[aria-label="LinkedIn"]')).toHaveCount(0);
  await expect(page.locator('#visitor-map-embed script[src="//waust.at/m.js"]')).toBeAttached();
  await expect(page.locator('.visitor-stats-link')).toHaveAttribute('href', 'https://whos.amung.us/stats/owy8xz7bj8/');
  await expect(page.locator('.profile-top + .visitor-section')).toBeVisible();
  await expect(page.locator('.sidebar-bio')).toHaveCount(0);
  await expect(page.locator('footer')).toHaveCount(0);
  await expect(page.locator('.profile-contact a[href="mailto:gubingqiao@mail.sdu.edu.cn"]')).toBeVisible();
  await expect(page.locator('.award-row')).toHaveCount(3);
  await expect(page.locator('.timeline > li')).toHaveCount(2);
  await expect(page.locator('.university-logo')).toHaveCount(2);
  await expect(page.locator('#other')).toContainText('swimming');
  await expect(page.locator('.research-interests > div > span')).toHaveText(['Artificial Intelligence', 'Network Science and Engineering', 'Large Language Models', 'AI Agents and Their Applications']);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBeTruthy();
  }
  const dimensions = await page.locator('.portrait').evaluate((img: HTMLImageElement) => ({ ratio: img.clientWidth / img.clientHeight, natural: img.naturalWidth / img.naturalHeight }));
  expect(Math.abs(dimensions.ratio - dimensions.natural)).toBeLessThan(.01);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `test-results/${testInfo.project.name}-english.png`, fullPage: true });

  await page.getByRole('button', { name: '中文', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByRole('heading', { name: '关于我', exact: true })).toBeVisible();
  await expect(page.locator('#paper-hyholic h4')).toContainText('基于双曲几何');
  await expect(page.locator('.about-copy')).toContainText('审稿人');
  await expect(page.locator('.about-copy')).not.toContainText('攻读博士学位');
  await expect(page.locator('#experiences')).toContainText('攻读博士学位');
  await expect(page.locator('.research-interests > div > span')).toHaveText(['人工智能', '网络科学与工程', '大语言模型', '智能体及其应用']);
  await expect(page.locator('#other')).toContainText('游泳');
  await page.getByRole('button', { name: '切换深色模式' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBeTruthy();
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `test-results/${testInfo.project.name}-chinese-dark.png`, fullPage: true });
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'About Me', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(errors).toEqual([]);
});

test('news, navigation, official paper pages, and accessible figure dialog work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Show all updates' }).click();
  await expect(page.locator('.news-list li')).toHaveCount(10);
  await page.getByRole('button', { name: 'Show fewer updates' }).click();
  await expect(page.locator('.news-list li')).toHaveCount(6);
  const figure = page.getByRole('button', { name: /Enlarge paper figure: HYHOLIC/ });
  await figure.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Paper', exact: true })).toHaveCount(0);
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Code', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(figure).toBeFocused();
  if (await page.getByRole('button', { name: 'Toggle navigation' }).isVisible()) {
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Honors & Awards' }).click();
    await expect(page.getByRole('button', { name: 'Toggle navigation' })).toHaveAttribute('aria-expanded', 'false');
  } else {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Honors & Awards' }).click();
  }
  await expect(page).toHaveURL(/#awards$/);
  await expect(page.locator('#awards')).toBeInViewport();
  await expect(page.locator('#paper-hyholic').getByRole('link', { name: 'Paper', exact: true })).toHaveAttribute('href', '/hyholic/');
  await expect(page.locator('a[href*="hyholic.pdf"]')).toHaveCount(0);
  const officialPages = {
    nemarl: 'https://www.nature.com/articles/s41467-026-75382-1',
    hymage: 'https://dl.acm.org/doi/10.1145/3770855.3817897',
    personasteer: 'https://aclanthology.org/2026.findings-emnlp.1270/',
    levy: 'https://www.sciencedirect.com/science/article/pii/S0378437126008496',
  };
  for (const [id, url] of Object.entries(officialPages)) {
    await expect(page.locator(`#paper-${id}`).getByRole('link', { name: 'Paper', exact: true })).toHaveAttribute('href', url);
    await expect(page.locator(`#paper-${id} .venue-mark`)).toHaveCount(1);
  }
});

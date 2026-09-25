// Uso: node scripts/check-overflow.mjs [url]
// Detecta elementos que provocan scroll horizontal en móvil (390px).
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(url);

const result = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const offenders = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 && !el.closest("[class*='overflow-x-auto']")) {
      offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 80)} right=${Math.round(r.right)}`);
    }
  }
  return { vw, scrollWidth: document.documentElement.scrollWidth, offenders: offenders.slice(0, 15) };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();

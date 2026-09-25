// Uso (con `npm run dev` en marcha): node scripts/check-motion.mjs [url]
// Comprueba las animaciones de aparición al hacer scroll y el modo "reducir movimiento".
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch();

async function run(reducedMotion) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion });
  const logs = [];
  page.on("console", (m) => ["error", "warning"].includes(m.type()) && logs.push(m.text().slice(0, 160)));
  await page.goto(url);
  await page.waitForTimeout(500);

  const count = () =>
    page.evaluate(() => ({
      total: document.querySelectorAll("[data-reveal]").length,
      revealed: document.querySelectorAll("[data-revealed]").length,
      hiddenNow: [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).opacity === "0")
        .length,
    }));

  const before = await count();
  for (let y = 0; y < 12000; y += 400) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(900);
  const after = await count();

  console.log(reducedMotion === "reduce" ? "Reducir movimiento:" : "Normal:", { before, after });
  if (logs.length) console.log("  Consola:", logs);
  await page.close();
}

await run("no-preference");
await run("reduce");
await browser.close();

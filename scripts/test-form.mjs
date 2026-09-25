// Uso (con `npm run dev` en marcha): node scripts/test-form.mjs [baseUrl]
// Prueba el formulario del Mapa: errores de validación y envío correcto.
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`${base}/mapa-gratuito`);

await page.getByRole("button", { name: "Pedir mi Mapa gratis" }).last().click();
await page.getByText("Revisa los campos marcados.").waitFor();
const errors = await page.locator("[id$='-error']").allTextContents();
console.log("Errores al enviar vacío:", errors);

await page.getByLabel("Tu nombre").fill("Prueba");
await page.getByLabel("Email").fill("prueba@clinica.es");
await page.getByLabel("Nombre de la clínica").fill("Clínica de prueba");
await page.getByLabel("Ciudad").fill("A Coruña");
await page.getByLabel("Sillones en la clínica").selectOption("3-4");
await page.getByRole("checkbox").check();
await page.getByRole("button", { name: "Pedir mi Mapa gratis" }).last().click();
const success = page.getByRole("heading", { name: "Solicitud recibida" });
await success.waitFor();
console.log("Tras envío correcto: se muestra", JSON.stringify(await success.innerText()));

await page.screenshot({ path: "form-success.png" });
await browser.close();

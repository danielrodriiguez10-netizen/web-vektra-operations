# Vektra Operations — web

Web de [vektraoperations.com](https://vektraoperations.com): automatización de agendas para clínicas dentales.
Next.js 16 (App Router) + Tailwind CSS 4.

## Páginas

- `/` — landing principal
- `/mapa-gratuito` — formulario del Mapa de Producción Perdida (Server Action en `src/app/mapa-gratuito/actions.ts`)
- `/privacidad`, `/aviso-legal` — textos legales (borrador: completar los `[PENDIENTE]`)

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

Datos de negocio (email, precios, plazas al mes) en `src/lib/site.ts`.

## Envío del formulario

Las solicitudes llegan a `vektraoperations@vektraoperations.com`, enviadas por el SMTP de Hostinger. Copia
`.env.example` como `.env.local` y pon la contraseña del buzón en `SMTP_PASSWORD`. Sin ella, en local las solicitudes
se muestran en la consola; en producción el formulario pide al visitante escribir por email.

## Comprobaciones (con `npm run dev -- -p 3100` en marcha)

```bash
node scripts/test-form.mjs        # validación y envío del formulario
node scripts/check-overflow.mjs   # scroll horizontal en móvil
node scripts/check-motion.mjs     # animaciones al hacer scroll y "reducir movimiento"
```

## Despliegue

Hostinger (plan Business o Cloud): hPanel → Websites → Add Website → Deploy Web App → Import Git Repository.

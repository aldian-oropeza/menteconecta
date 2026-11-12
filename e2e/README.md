# Pruebas E2E de MenteConecta (Playwright)

Pruebas automáticas que abren un navegador real y usan la aplicación como lo haría una persona.
Cubren solo lo que el piloto ya tiene desarrollado. Cada prueba lleva el ID `CP_xxx` del archivo
`Casos_de_prueba_MenteConecta.xlsx`, para pasar los resultados a las columnas «Ciclo».

## Dónde va esta carpeta

Dentro del proyecto, al lado de `backend/` y `frontend/`:

```
menteconecta/
├── backend/
├── frontend/
├── e2e/        <- esta carpeta
└── ...
```

## Requisitos

- Node.js 22 o superior.
- SQL Server encendido, con los scripts de `database/` (01 al 07) ya ejecutados.
- `backend/.env` configurado, con `GEMINI_MODE=demo`.
- Comprueba a mano que puedes registrarte e iniciar sesión antes de correr las pruebas.

## Primera vez (PowerShell)

Abre la terminal **dentro de la carpeta `e2e`** (`cd` hasta ella) y ejecuta:

```powershell
npm.cmd install
npx.cmd playwright install chromium
```

## Ejecutar

Opción A (más simple): cierra el backend y el frontend. Playwright los inicia solo, con el límite
de intentos de autenticación ya subido.

Opción B: si prefieres dejarlos corriendo, pon `AUTH_RATE_LIMIT_MAX=10000` en `backend/.env` y
reinicia el backend. Si no, aparecerá un error 429 después de unas 20 cuentas nuevas.

```powershell
npm.cmd test              # ejecuta todo
npm.cmd run test:ui       # panel interactivo (recomendado para empezar)
npm.cmd run test:headed   # con el navegador visible
npm.cmd run report        # abre el informe con capturas de los fallos
```

Para correr un solo archivo o una sola prueba:

```powershell
npx.cmd playwright test tests/01-autenticacion.spec.js
npx.cmd playwright test -g "CP_012"
```

## Archivos

| Archivo | Requisitos |
| --- | --- |
| `01-autenticacion.spec.js` | RF-01, RF-02, RF-12, RF-41 |
| `02-consentimiento.spec.js` | RF-04 |
| `03-registro-emocional.spec.js` | RF-15, RF-16, RF-17, RF-19, RF-20 |
| `04-biblioteca.spec.js` | RF-07, RF-08, RF-31, RF-32, RF-33 |
| `05-asistente-ia.spec.js` | RF-09, RF-10, RF-36, RF-37, RF-38 |
| `06-panel-principal.spec.js` | RF-42 |

## Cosas a tener en cuenta

- Cada prueba crea su propio usuario por API, con correo `e2e.…@tdea.edu.co`. Esos usuarios quedan en
  la base de datos.
- Las pruebas del asistente solo funcionan con `GEMINI_MODE=demo`; con otro modo se omiten solas.
- Las pruebas de «fallo del servidor» cortan la conexión del navegador con Playwright; no tocan el
  backend real.
- Algunas pruebas pueden fallar la primera vez por diferencias de texto o de tiempos. Revisa el
  informe (`npm.cmd run report`) antes de asumir que hay un error en la aplicación.
- Los casos del Excel que dependen de funciones no desarrolladas (TOTP, recuperar contraseña,
  perfil, recordatorios, exportaciones, estadísticas, etc.) no están automatizados.

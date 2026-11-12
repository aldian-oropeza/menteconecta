# MenteConecta

Piloto de bienestar emocional para estudiantes del TdeA: registro e inicio de sesión, registro emocional con consentimiento, biblioteca y favoritos, ayuda interactiva, apoyo institucional y chat guiado con historial privado.

## Antes de comenzar

Esta guía permite instalar una copia independiente en otro equipo Windows. **GitHub contiene el código y los scripts SQL, pero no instala SQL Server ni copia la base de datos, los usuarios o los archivos `.env` de otro equipo.** Cada integrante debe preparar su entorno.

Para consultar la página desde un celular u otro equipo de la misma red, ve a la sección «Abrir la página desde otro dispositivo».

### Requisitos

| Componente | Para qué se necesita |
| --- | --- |
| Node.js 24 y su npm incluido (mínimo: Node 22) | Las dependencias actuales de Azure requieren Node 22 o superior. La revisión local se realizó con Node.js 24. |
| Git | Clonar y actualizar el repositorio. |
| SQL Server, por ejemplo Express | Ejecutar el motor de base de datos. Instalar solo SSMS no instala el motor. |
| SQL Server Management Studio (SSMS) | Conectarse a la instancia y ejecutar los scripts SQL. |
| Microsoft ODBC Driver 18 for SQL Server | Necesario para la conexión con autenticación Windows descrita en esta guía. |
| VS Code | Editar archivos y abrir las dos terminales del proyecto. |
| Postman, opcional | Ejecutar las pruebas de la API. |

Los comandos siguientes son para **PowerShell**, incluida la terminal de VS Code. Ejecuta cada línea por separado. `npm.cmd` evita los bloqueos de ejecución del archivo `npm.ps1` en PowerShell.

Comprueba la instalación:

```powershell
node --version
npm.cmd --version
git --version
```

Si un comando no se reconoce, revisa su instalación y vuelve a abrir VS Code para que tome el PATH actualizado.

## 1. Descargar y abrir el proyecto completo

Desde la carpeta donde quieras guardarlo:

```powershell
git clone https://github.com/aldian-oropeza/menteconecta.git
cd menteconecta
```

En VS Code selecciona **Archivo → Abrir carpeta → menteconecta**. Conserva esta estructura:

```text
menteconecta/
├── backend/     API y conexión a SQL Server
├── frontend/    Página React y Vite
├── shared/      Flujo y contenido compartido del chat
├── database/    Scripts SQL numerados
├── postman/     Colecciones de pruebas
├── scripts/     Inicio local en Windows
└── docs/        Contratos y documentación
```

No copies solo `frontend` o `backend`: ambos utilizan archivos de `shared`. No copies `node_modules` desde otro computador; instala las dependencias en cada equipo.

## 2. Preparar SQL Server

1. Abre SSMS y comprueba que puedes conectarte a tu instancia.
2. Anota el nombre de servidor que utilizaste. Por ejemplo, `localhost\SQLEXPRESS` significa servidor `localhost` e instancia `SQLEXPRESS`. No uses el nombre del computador de otra persona.
3. En una **instalación nueva**, abre y ejecuta cada archivo de `database/`, en este orden, usando la misma instancia:

| Orden | Archivo |
| --- | --- |
| 1 | `01_schema_seed_MenteConecta.sql` |
| 2 | `02_biblioteca_chat.sql` |
| 3 | `03_recursos_emociones.sql` |
| 4 | `04_lecturas_categorias.sql` |
| 5 | `05_lecturas_por_emocion.sql` |
| 6 | `06_contenido_ampliado.sql` |
| 7 | `07_ejercicios_por_categoria.sql` |

Comprueba que cada script termine sin errores antes de continuar. El primero crea la base `MenteConecta`; el 05 añade `RecursoBienestar.emocion`, utilizada por la biblioteca. La preparación completa contiene 37 lecturas activas.

**Si la base ya existe, aplica solo los scripts pendientes.** Lleva un registro de los ejecutados. No repitas todos los scripts de contenido para actualizar una instalación: algunos identifican lecturas por títulos que cambian en scripts posteriores y podrías duplicarlas. No es necesario borrar tu base.

Elige una de las dos formas de conexión siguientes.

### Opción A: autenticación Windows con SQL Server local

Utiliza esta opción si SSMS conecta con tu cuenta de Windows. La cuenta que ejecuta Node debe tener acceso a la base `MenteConecta`. Instala ODBC Driver 18.

Para una instancia local llamada SQLEXPRESS, configura estas líneas de `backend/.env`:

```dotenv
DB_WINDOWS_AUTH=true
DB_SERVER=localhost
DB_INSTANCE=SQLEXPRESS
DB_PORT=1433
DB_NAME=MenteConecta
DB_ODBC_DRIVER=ODBC Driver 18 for SQL Server
DB_USER=
DB_PASSWORD=
DB_ENCRYPT=true
DB_TRUST_SERVER_CERT=true
```

Si tu instancia tiene otro nombre, cambia `DB_INSTANCE`. Si usas una instancia por puerto, deja `DB_INSTANCE` vacío y escribe su puerto real en `DB_PORT`. El puerto se ignora cuando hay una instancia configurada. En este modo no se utilizan `DB_USER` y `DB_PASSWORD` y no necesitas crear el login SQL de la opción B.

### Opción B: autenticación mediante usuario de SQL Server

Usa esta opción si vas a conectar con un login SQL. El servidor debe permitir autenticación SQL y TCP/IP. Si modificas esa configuración, reinicia el servicio de SQL Server.

En SSMS, con una cuenta con permisos administrativos, crea el login y su usuario **solo si aún no existen**. Sustituye la contraseña de ejemplo por una propia:

```sql
USE master;
GO
CREATE LOGIN menteconecta_app WITH PASSWORD = 'REEMPLAZAR_POR_CLAVE_PROPIA', CHECK_POLICY = ON;
GO
USE MenteConecta;
GO
CREATE USER menteconecta_app FOR LOGIN menteconecta_app;
ALTER ROLE db_datareader ADD MEMBER menteconecta_app;
ALTER ROLE db_datawriter ADD MEMBER menteconecta_app;
GO
```

Después configura `backend/.env`, usando exactamente la contraseña que asignaste:

```dotenv
DB_WINDOWS_AUTH=false
DB_SERVER=localhost
DB_INSTANCE=
DB_PORT=1433
DB_NAME=MenteConecta
DB_USER=menteconecta_app
DB_PASSWORD=REEMPLAZAR_POR_CLAVE_PROPIA
DB_ENCRYPT=true
DB_TRUST_SERVER_CERT=true
```

`1433` es solo un ejemplo: debe coincidir con el puerto TCP real de tu instancia. Para conectar por nombre, utiliza `DB_INSTANCE=SQLEXPRESS` o el nombre correspondiente; su resolución puede requerir SQL Server Browser. Los valores de `.env.example` no crean usuarios ni contraseñas en SQL Server.

## 3. Configurar el backend

Abre una terminal en la raíz `menteconecta`:

```powershell
cd backend
npm.cmd ci
if (!(Test-Path .env)) { Copy-Item .env.example .env }
```

Edita `backend/.env` y coloca los datos de la opción A o B. Conserva también:

```dotenv
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
JWT_EXPIRES_IN=2h
BCRYPT_COST=12
AUTH_RATE_LIMIT_MAX=20
GEMINI_MODE=demo
GEMINI_API_KEY=
```

Genera un secreto para firmar las sesiones:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copia el resultado en la línea `JWT_SECRET=` de **tu** `backend/.env`. No lo compartas ni lo subas a GitHub. El ejemplo deja ese valor vacío para que cada instalación genere el suyo. Mantén `PORT=3000` para usar el proxy de Vite incluido.

Comprueba la conexión antes de iniciar:

```powershell
npm.cmd run db:check
```

Debe informar conexión correcta y esquema principal correcto. Esta comprobación no sustituye ejecutar los scripts de contenido pendientes. Si falla, corrige la configuración antes de continuar.

Inicia el servidor:

```powershell
npm.cmd run dev
```

La entrada del backend es `backend/src/server.js`; se ejecuta mediante el comando anterior. Deben aparecer los mensajes de conexión a SQL Server y API escuchando en el puerto 3000. **Deja esta terminal abierta.** Si SQL Server falla, el backend se detiene.

Abre `http://127.0.0.1:3000/api/health`: debe responder `{"status":"ok"}`. Esto confirma que HTTP responde; para verificar la base usa `db:check`.

## 4. Configurar el frontend

Abre una **segunda terminal en la raíz `menteconecta`**:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

No necesitas crear `frontend/.env` para la configuración local habitual: el cliente usa `/api` y Vite redirige esas solicitudes al backend `http://127.0.0.1:3000`.

Si ya tienes `frontend/.env`, comprueba que la dirección sea:

```dotenv
VITE_API_URL=/api
```

Reinicia Vite si cambias esa variable. No coloques contraseñas ni secretos en variables del frontend.

Abre `http://localhost:5173` o `http://127.0.0.1:5173`. React se inicia desde `frontend/src/main.jsx`, a través de Vite: no abras `index.html` con doble clic ni con Live Server.

Crea una cuenta desde la página. Los usuarios de otra instalación no se copian automáticamente a tu base.

## 5. Iniciar el proyecto en días posteriores

No necesitas reinstalar dependencias ni ejecutar todos los scripts SQL cada vez. Asegúrate de que el servicio SQL Server esté iniciado y ejecuta:

- En una terminal situada en `backend`: `npm.cmd run dev`.
- En otra terminal situada en `frontend`: `npm.cmd run dev`.

También puedes usar `Iniciar-MenteConecta.cmd` en Windows tras completar la configuración. Usa un único método de inicio para evitar servidores duplicados. Para detener un servidor iniciado en terminal, pulsa `Ctrl+C` en su terminal.

## 6. Abrir la página desde otro dispositivo de la misma red

Esta opción permite probar desde un celular u otro computador **usando la base y el backend del equipo anfitrión**. No es una publicación en Internet.

1. Conecta ambos dispositivos a la misma red de confianza.
2. En el anfitrión, deja SQL Server y el backend encendidos.
3. Conserva `VITE_API_URL=/api` en el frontend.
4. Detén el frontend anterior con `Ctrl+C` y, desde `frontend`, ejecuta:

```powershell
npm.cmd run dev -- --host 0.0.0.0
```

5. Abre en el otro dispositivo la dirección **Network** que muestre Vite, por ejemplo `http://192.168.1.25:5173`, sustituyendo esa IP por la real del anfitrión. `localhost` en un celular se refiere al celular, no al computador.
6. Si no conecta, comprueba la red y que el firewall permita el puerto 5173 en la red privada utilizada para la prueba. No desactives el firewall ni abras SQL Server a Internet.

Las peticiones `/api` llegan al proxy de Vite del anfitrión; el otro dispositivo no necesita acceder directamente al puerto SQL. Este acceso de desarrollo no usa HTTPS: úsalo para pruebas con datos ficticios. Para producción se necesita un despliegue con HTTPS y un proxy `/api` o una URL pública del backend con su CORS configurado. Subir el código a GitHub no publica la aplicación.

### Sobre macOS y Linux

La guía paso a paso y el lanzador `.cmd` están orientados a Windows. En macOS/Linux se usan `npm` en lugar de `npm.cmd` y `cp` en lugar de `Copy-Item`. No utilices autenticación Windows: necesitas una instancia SQL Server accesible y autenticación SQL. La instalación nativa de dependencias puede requerir herramientas adicionales de esa plataforma. No se ha validado una instalación completa del proyecto en esos sistemas.

## 7. Pruebas

Desde `backend`, sin necesitar SQL Server para las pruebas unitarias:

```powershell
npm.cmd test
```

Con SQL Server y ambos servidores en ejecución, desde `backend`:

```powershell
node scripts/check-modules.js
```

La prueba de integración usa `http://localhost:5173/api` (se puede cambiar con `TEST_API_URL`), crea cuentas temporales y elimina sus propios datos al terminar. Verifica biblioteca, favoritos, ayuda, chat y controles de acceso.

### Pruebas end-to-end (Playwright)

La carpeta `e2e/` abre un navegador real y recorre la aplicación (72 casos con su ID `CP_xxx`). La primera vez, desde `e2e`:

```powershell
npm.cmd install
npx.cmd playwright install chromium
```

Para ejecutarlas, con los servidores **detenidos** (Playwright los inicia solo con `GEMINI_MODE=demo` y el límite de intentos subido):

```powershell
npm.cmd test              # todo
npm.cmd run test:ui       # panel interactivo
npm.cmd run report        # informe con capturas de los fallos
```

Detalles en [`e2e/README.md`](e2e/README.md). Las pruebas crean usuarios `e2e.…@tdea.edu.co` que quedan en tu base local.

Desde `frontend`, comprueba la compilación:

```powershell
npm.cmd run build
```

### Postman

Importa `postman/MenteConecta-Pruebas-Locales.postman_collection.json`. Mantén el backend encendido y ejecuta las 19 solicitudes en orden o la colección completa con **Run**. `baseUrl` es `http://127.0.0.1:3000/api`; no necesitas un environment adicional. El token se guarda automáticamente.

La colección contiene carpetas de acceso, biblioteca, ayuda, chat y seguridad. Crea un usuario ficticio; elimina su favorito y conversación de prueba, pero conserva la cuenta y su consentimiento para inspección. Las otras colecciones de `postman/` incluyen pruebas de autenticación y registro emocional.

## 8. Solución de problemas

| Mensaje o síntoma | Qué revisar |
| --- | --- |
| `npm` o `node` no se reconoce | Instala Node.js y vuelve a abrir VS Code para actualizar el PATH. |
| PowerShell bloquea `npm.ps1` | Usa `npm.cmd` como en esta guía. |
| `npm ci` indica `Missing: msnodesqlv8` | Actualiza el repositorio: `package.json` y `package-lock.json` deben corresponder. No copies dependencias de otro equipo. |
| Falla la carga de `msnodesqlv8` o el controlador ODBC | Revisa Node y el controlador nativo instalados en ese equipo; para Windows Auth necesitas ODBC Driver 18. Guarda el error exacto de instalación. |
| Faltan variables o `JWT_SECRET` | Crea `backend/.env`, configura la base y genera tu secreto. |
| `Login failed` / `ELOGIN` | Verifica autenticación Windows o SQL, credenciales y permisos sobre MenteConecta. |
| No encuentra servidor o instancia SQL | Comprueba que SQL Server esté iniciado y que servidor, instancia o puerto coincidan con SSMS. En conexión TCP revisa TCP/IP y la resolución de la instancia. |
| No existe MenteConecta, una tabla o la columna `emocion` | Comprueba la instancia seleccionada y los scripts aplicados. La columna de la biblioteca se añade en el script 05. |
| «No se pudo conectar con el servidor» | Prueba `/api/health` en el puerto 3000 y revisa la terminal del backend. Que se vea el frontend no significa que la API esté encendida. |
| Error CORS o solicitudes a una URL equivocada | Usa `VITE_API_URL=/api` y reinicia Vite. Si eliges una API externa, configura su URL y `CORS_ORIGIN` con el origen exacto de tu frontend. |
| `EADDRINUSE` / puerto ocupado | Ya hay un proceso usando ese puerto. Detén la instancia duplicada del proyecto; no abras otro servidor encima. |
| La biblioteca falla o faltan lecturas | Revisa que los scripts 01 al 07 estén aplicados en la base que realmente utiliza el backend. |
| Un usuario del compañero no puede iniciar sesión | Cada base local tiene sus propios usuarios. Registra uno en esa instalación. |
| Desde el celular no abre | Usa la dirección Network del anfitrión, la misma red y Vite con `--host 0.0.0.0`. |

Para pedir ayuda, comparte el error de la terminal del backend, el resultado de `db:check` y las versiones de Node/npm. No compartas `.env`, contraseñas ni tokens.

## Actualizar una instalación existente

Guarda o confirma tus cambios locales antes de traer actualizaciones. Desde la raíz:

```powershell
git pull --ff-only
```

> **Biblioteca, Ayuda interactiva o Asistente IA no muestran nada.** Estos tres módulos y los scripts SQL `02` al `07` llegaron juntos (commit `1b83d77`). Si instalaste antes, el inicio de sesión y el registro emocional siguen funcionando, pero esos módulos fallan. Haz, en orden: `git pull --ff-only`; `npm.cmd ci` en `backend` y en `frontend`; ejecuta en SSMS los scripts `02` al `07` (son seguros de repetir) sobre la base que usa tu backend; corre `npm.cmd run db:check` en `backend` hasta que diga «correcto»; y reinicia **ambos** servidores (cierra las ventanas anteriores, incluido el lanzador `.cmd`).

Si Git informa cambios locales o ramas divergentes, revísalos con el equipo; no fuerces ni descartes tu trabajo. Después instala con `npm.cmd ci` en `backend` y en `frontend`, con los servidores detenidos. Conserva tus `.env`: revisa las nuevas variables del ejemplo sin reemplazar tu configuración. Aplica únicamente migraciones SQL pendientes y reinicia ambos servidores.

## Alcance del piloto y reglas del proyecto

El chat usa `GEMINI_MODE=demo`: flujo guiado local, sin clave ni llamadas a Google. Su historial se guarda en `ConversacionIA` y `Mensaje`; el registro emocional es independiente. El adaptador Gemini real requiere configuración propia y un modelo disponible; no se ha validado con una clave real. La recuperación de contraseñas aún no está implementada. Las contraseñas se almacenan mediante hash bcrypt, no son recuperables como texto.

El backend sigue **ruta → controlador → servicio → repositorio**. Las consultas SQL deben estar parametrizadas. El usuario de una ruta protegida proviene del JWT validado, no de un identificador enviado por el cliente. Acuerda con el equipo los cambios de contrato o esquema y documenta migraciones incrementales.

No subas `.env`, `node_modules`, `logs`, `.vs`, copias personales de SQL Server ni datos reales de usuarios. Comparte código, ejemplos sin secretos y scripts SQL.

- [Contrato de autenticación](docs/04_Contrato_API_Auth.md).
- [Consentimiento y registro emocional](docs/05_Contrato_API_Consentimiento_Emociones.md).
- [Biblioteca, ayuda y chat](docs/07_Contrato_Biblioteca_Ayuda_Chat.md).
- [Documentación del piloto](docs/README_Documentacion_Piloto.md).

## Si la instalación falla con Node 20 o Python 3.12

Los avisos EBADENGINE con Node 20 indican que no se cumple el mínimo de las dependencias. Instala Node.js 24 para Windows con el npm incluido desde https://nodejs.org/en/download, cierra todas las ventanas de VS Code y vuelve a abrirlo. Comprueba node --version y npm.cmd --version antes de reinstalar.

Si aparece ModuleNotFoundError: No module named 'distutils' al compilar msnodesqlv8, revisa la versión de node-gyp del error: Python 3.12 requiere node-gyp 10 o superior (https://github.com/nodejs/node-gyp#installation). El log recibido utilizaba node-gyp 9.4.0 incluido en npm 10.1.0. Actualizar Node con su npm incluido evita seguir usando esa herramienta antigua; instalar node-gyp globalmente no garantiza que npm use esa copia.

Detén los servidores del proyecto antes de repetir npm.cmd ci desde backend. Si siguen los avisos EPERM de archivos bloqueados, reinicia Windows y vuelve a intentar la instalación antes de iniciar servidores. No ejecutes db:check ni dev hasta que ci termine sin errores. La ausencia de dotenv después de una instalación fallida es una consecuencia, no se resuelve instalando únicamente ese paquete.

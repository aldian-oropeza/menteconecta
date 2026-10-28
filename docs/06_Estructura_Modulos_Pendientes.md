# Organización de los módulos

Los módulos biblioteca, ayuda-interactiva y chat-gemini ya están implementados y conectados al inicio de la aplicación. El chat se inicia en modo de simulación explícita; no requiere clave ni se conecta con Google. Su adaptador real está preparado, pero requiere configuración y verificación con una clave propia.

- frontend/src/pages/: pantallas de biblioteca, ayuda-interactiva y chat-gemini.
- frontend/src/components/: componentes compartidos y reproductor de actividades.
- frontend/src/api/ y frontend/src/validation/: peticiones y validaciones por módulo.
- backend/src/routes/, controllers/, services/, db/ y validation/: capas de cada módulo.
- backend/src/integrations/gemini/: adaptador real y simulador separado.
- database/02_biblioteca_chat.sql: migración incremental y recursos iniciales.
- docs/07_Contrato_Biblioteca_Ayuda_Chat.md: rutas, límites y configuración.

La numeración del grupo difiere de la documentación original: el registro emocional ya existente también se denominaba módulo 2. Los nuevos archivos usan nombres funcionales para evitar confusión. Se conservan registro, login, consentimiento y emociones.

El inicio local continúa siendo Iniciar-MenteConecta.cmd.

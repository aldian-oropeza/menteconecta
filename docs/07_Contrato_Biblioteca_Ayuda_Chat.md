# Biblioteca, ayuda y chat

Todas las rutas requieren Bearer JWT y un usuario activo. Los propietarios se obtienen del token.

| Método | Ruta bajo /api | Resultado |
| --- | --- | --- |
| GET | /library/categories | categorias |
| GET | /library?q=&categoria=&favoritos=true | recursos activos con favorito del usuario |
| POST / DELETE | /library/:id/favorite | Guardar / quitar favorito, 204 |
| GET | /help | actividades guiadas y recursos de ayuda configurados |
| GET | /chat/status | modo (demo/live), disponible, aviso, consentimiento |
| POST | /chat/consent | Aceptar con {aceptado:true} |
| DELETE | /chat/consent | Retirar consentimiento; conserva lectura y eliminación |
| GET / POST | /chat/conversations | Listar / crear conversación |
| DELETE | /chat/conversations/:id | Eliminar conversación propia y mensajes |
| GET / POST | /chat/conversations/:id/messages | Consultar / enviar {mensaje:"texto"} |

Mensajes: 1–2000 caracteres, 30 envíos por usuario cada 15 minutos, hasta 50 intercambios por conversación. El cliente real envía hasta 20 mensajes anteriores de la misma conversación. Nunca incluye el registro emocional, correo ni nombre. Las respuestas del proveedor se muestran como texto, no HTML. Si falla el proveedor, no se guardan mensajes parciales; el usuario puede reintentar.

La migración incremental 02_biblioteca_chat.sql agrega modo a ConversacionIA, un aviso específico y recursos iniciales sin eliminar datos. Las conversaciones demo y live permanecen separadas; al cambiar de modo hay que crear otra conversación.

El consentimiento usa finalidad CONVERSACION_IA, la política vigente y el aviso chat-1. Se vuelve a verificar antes de guardar la respuesta. El piloto admite una instancia del backend; el bloqueo de envíos simultáneos y el límite de uso viven en memoria.

La ayuda ofrece ejercicios voluntarios de reflexión, no tratamientos. Los contactos solo aparecen si están cargados en RecursoAyuda; no se inventan teléfonos. El chat no diagnostica ni evalúa de forma fiable emergencias. En demo todas las respuestas están identificadas como predefinidas y no se consulta Google.

## Activar Gemini real más adelante

En backend/.env: GEMINI_MODE=live, GEMINI_API_KEY con una clave propia y GEMINI_MODEL con un modelo disponible en esa cuenta. Reiniciar el backend. Nunca poner la clave en frontend/.env. La configuración inicial es demo y funciona sin clave ni conexión a Google. El aviso informa del envío externo antes de la aceptación. Revisar las condiciones de tratamiento de datos del proveedor antes de usar información sensible real.

Referencias de implementación: https://ai.google.dev/api/generate-content y https://ai.google.dev/gemini-api/docs/models.

## Verificación

node --test tests/*.test.js: pruebas automáticas, incluido el adaptador Gemini con respuestas simuladas.
node scripts/check-modules.js: pruebas reales de SQL y HTTP con dos cuentas temporales que se eliminan al terminar; requiere la aplicación iniciada en modo demo.

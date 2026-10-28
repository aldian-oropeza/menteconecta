USE MenteConecta;
SET XACT_ABORT ON;
BEGIN TRANSACTION;
IF NOT EXISTS (SELECT 1 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones') INSERT dbo.CategoriaRecurso(nombre,descripcion) VALUES(N'Emociones',N'Lecturas de reflexión sobre emociones y experiencias cotidianas.');
IF NOT EXISTS (SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Tristeza: darte espacio para sentir') INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos) SELECT idCategoria,N'Tristeza: darte espacio para sentir',N'Reconoce la tristeza y explora una forma amable de acompañarte.',N'Cuando aparece la tristeza
No necesitas justificar lo que sientes ni encontrar una solución inmediata. Puedes usar esta lectura como una invitación a observar tu experiencia, sin ponerle un diagnóstico.

Una reflexión breve
1. Completa para ti: «Hoy siento tristeza cuando pienso en…».
2. Pregúntate qué necesitas en este momento: descanso, compañía, ser escuchado o tiempo.
3. Elige algo pequeño que esté a tu alcance. Por ejemplo, tomar agua o escribir a alguien de confianza.

Para conversar
Puedes decir: «Hoy no me siento bien, ¿tienes un momento para escucharme?». No estás obligado a contar más de lo que quieras.

Si esto está afectando tu vida cotidiana o quieres acompañamiento, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS (SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Estrés académico: organizar un primer paso') INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos) SELECT idCategoria,N'Estrés académico: organizar un primer paso',N'Una lectura para momentos de presión por tareas, estudio o exámenes.',N'Cuando todo parece urgente
Esta actividad no busca que termines todo hoy. Su propósito es ayudarte a elegir por dónde empezar.

Haz una lista breve
Escribe las tareas pendientes y sus fechas. Separa lo que puedes hacer tú de lo que requiere información o ayuda de otra persona.

Elige una acción concreta
En lugar de «estudiar todo», prueba con «leer una página y anotar una duda». Decide un momento para comenzar y uno para descansar. Ajusta el plan si no te resulta posible.

Pedir apoyo también es una acción
Si no entiendes una entrega, formula una pregunta específica para tu docente o compañero. Al finalizar, reconoce el paso que sí lograste, aunque sea pequeño.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Manejo del estrés';
IF NOT EXISTS (SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Ansiedad y preocupación: volver al presente') INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos) SELECT idCategoria,N'Ansiedad y preocupación: volver al presente',N'Una pausa para observar tu entorno cuando las preocupaciones ocupan tu atención.',N'Observar sin exigirte
Cuando notes preocupación, puedes detenerte y mirar alrededor. Esta propuesta es opcional y no sustituye atención profesional.

Una pausa a tu ritmo
Si te resulta cómodo, siente el apoyo de tus pies. Describe para ti tres objetos que ves: su color, forma o textura. Nota un sonido cercano. No necesitas cerrar los ojos ni controlar la respiración.

Después de la pausa
Pregúntate: «¿Qué necesito ahora?». Puedes descansar, hablar con alguien o retomar una actividad sencilla. Si el ejercicio te incomoda, detente.

Para seguir explorando
La guía de la OMS «En tiempos de estrés, haz lo que importa» contiene ejercicios de atención al presente. Si la preocupación limita tu día, considera pedir orientación profesional.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS (SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Soledad: acercarte a una persona') INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos) SELECT idCategoria,N'Soledad: acercarte a una persona',N'Ideas para pedir compañía y reconocer tus redes de apoyo.',N'Elegir con quién hablar
Puedes sentir soledad incluso estando acompañado. Esta lectura propone pensar en una conexión posible, sin obligarte a socializar de una manera que no te resulte cómoda.

Un primer contacto
Anota una persona con quien te sientas relativamente seguro: un compañero, familiar o alguien de tu institución. Piensa qué necesitas pedirle: conversar, caminar juntos o simplemente compartir un momento.

Un mensaje posible
«Hola, me gustaría hablar un rato. ¿Tienes tiempo esta semana?». Si no puede en ese momento, eso no define tu valor; puedes consultar otra opción.

Si no sabes a quién acudir
En Opciones de apoyo encontrarás el Escuchadero y otros canales de acompañamiento del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS (SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Alegría: reconocer un momento valioso') INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos) SELECT idCategoria,N'Alegría: reconocer un momento valioso',N'Una invitación a recordar lo que disfrutaste y registrarlo con tus palabras.',N'Notar lo agradable
No tiene que ser un gran logro: una conversación, una comida o terminar una tarea pueden ser momentos que quieras recordar.

Tres preguntas
¿Qué pasó? ¿Qué disfrutaste? ¿Hubo alguien o algo que contribuyó a ese momento?

Conservarlo
Puedes escribir una nota breve en Mi registro emocional. Usa tus palabras y registra lo que realmente sentiste. No hay una emoción correcta ni obligación de sentir alegría todos los días.

Compartir, si quieres
Piensa si te gustaría agradecer a alguien o contarle lo ocurrido. También puedes guardar el recuerdo solo para ti.',2 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS (SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Frustración: hacer una pausa antes de responder') INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos) SELECT idCategoria,N'Frustración: hacer una pausa antes de responder',N'Reflexiona sobre el enojo y lo que necesitas comunicar.',N'Poner en palabras lo ocurrido
Antes de responder a una situación frustrante, puedes darte un momento y describir lo que pasó sin juzgarte.

Una nota para ti
Completa: «Me molestó…», «Necesitaba…» y «Quisiera pedir…». Esta nota no tiene que enviarse a nadie.

Elegir cómo continuar
Si es posible, pospón la conversación hasta que puedas expresar lo que necesitas. Una frase concreta puede ser: «Cuando ocurrió esto me sentí frustrado y quisiera que acordáramos otra forma de hacerlo».

Si hay riesgo
Si la situación incluye violencia o no te sientes seguro, prioriza alejarte y buscar apoyo humano. No tienes que resolverla mediante este ejercicio.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS(SELECT 1 FROM dbo.AvisoAsistente WHERE version=N'chat-2')
INSERT dbo.AvisoAsistente(version,texto) VALUES(N'chat-2',N'Este asistente ofrece orientación general y no realiza diagnósticos ni atiende emergencias. En la versión de demostración, la conversación es guiada y tiene respuestas limitadas. Los mensajes se guardan en tu historial hasta que elimines la conversación. No se accede a tu registro emocional. Puedes retirar el consentimiento y seguir consultando o eliminando tu historial. Evita compartir información identificable o datos de otras personas.');
COMMIT;


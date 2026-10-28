USE MenteConecta;
SET XACT_ABORT ON;
BEGIN TRANSACTION;
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Atención al presente: observar sin juzgar')
INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Atención al presente: observar sin juzgar',N'Una práctica de observación para dedicarte unos minutos sin exigirte dejar la mente en blanco.',N'Antes de empezar
Elige un lugar donde puedas hacer una pausa. Mantén los ojos abiertos si lo prefieres. No necesitas lograr un estado especial ni dejar de pensar.

Observa un objeto
Escoge algo cercano y describe su color, forma y textura. Si tu atención se va a otra cosa, puedes volver al objeto sin regañarte. Hazlo durante el tiempo que te resulte cómodo.

Cierra la práctica
Pregúntate qué necesitas para continuar: volver a tu actividad, descansar o pedir compañía. Puedes detener el ejercicio en cualquier momento.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Meditación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Una pausa para notar tu respiración')
INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Una pausa para notar tu respiración',N'Observa tu respiración natural sin contar segundos, retener el aire ni forzar un ritmo.',N'Encuentra una postura cómoda
Puedes permanecer sentado con apoyo o elegir una posición que ya te resulte agradable.

Observa, sin cambiar nada
Nota por un momento cómo entra y sale el aire. No intentes respirar más profundo ni más rápido. Si concentrarte en la respiración te resulta incómodo, dirige la atención a un objeto de tu entorno y detén la práctica.

Antes de continuar
Decide si quieres descansar un poco más o retomar tu actividad. Esta lectura es una invitación opcional de autocuidado, no un tratamiento.',2 FROM dbo.CategoriaRecurso WHERE nombre=N'Respiración';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Descanso entre actividades')
INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Descanso entre actividades',N'Una propuesta para desconectarte un momento de una tarea y elegir cómo descansar.',N'Reconoce la pausa
No hace falta terminar todas las tareas para darte un descanso. Si puedes hacerlo, guarda lo que estabas trabajando y aléjate un momento de la pantalla.

Elige algo sencillo
Mira por una ventana, toma agua si lo necesitas o cambia de postura sin forzarte. También puedes quedarte quieto en un lugar cómodo. Elige lo que se ajuste a tu situación.

Vuelve a tu ritmo
Antes de regresar, decide cuál será tu siguiente tarea y qué puede esperar. Si necesitas ayuda para organizarte, consulta las lecturas de Manejo del estrés.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Relajación';
COMMIT;


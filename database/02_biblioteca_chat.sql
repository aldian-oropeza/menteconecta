USE MenteConecta;
GO
IF COL_LENGTH('dbo.ConversacionIA','modo') IS NULL
  ALTER TABLE dbo.ConversacionIA ADD modo NVARCHAR(10) NOT NULL CONSTRAINT DF_Conversacion_modo DEFAULT(N'demo') CONSTRAINT CK_Conversacion_modo CHECK(modo IN(N'demo',N'live'));
GO
IF NOT EXISTS(SELECT 1 FROM dbo.AvisoAsistente WHERE version=N'chat-1')
  INSERT dbo.AvisoAsistente(version,texto) VALUES(N'chat-1',N'El chat ofrece apoyo general, no diagnósticos ni atención de emergencias. En simulación usa respuestas predefinidas sin enviar datos a Google. En modo Gemini envía tu mensaje y hasta 20 mensajes anteriores de esa conversación a Google para generar una respuesta. No envía tu registro emocional. Los mensajes se guardan localmente hasta que elimines la conversación. Puedes retirar el consentimiento y consultar o borrar tu historial. Evita compartir datos identificables o de terceros.');
GO
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Observa tu entorno')
  INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos)
    SELECT idCategoria,N'Observa tu entorno',N'Una pausa breve de atención a lo que te rodea.',N'Mira a tu alrededor y reconoce tres colores, dos formas y un sonido. Hazlo a tu ritmo. No hay respuestas correctas ni necesitas cerrar los ojos. Puedes detenerte cuando quieras.',2 FROM dbo.CategoriaRecurso WHERE nombre=N'Meditación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Un paso a la vez')
  INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos)
    SELECT idCategoria,N'Un paso a la vez',N'Elige una acción pequeña para organizar tu día.',N'Piensa en una tarea que puedas dividir en pasos. Elige uno que esté a tu alcance hoy. Decide cuándo comenzar y qué necesitas. Puedes pedir apoyo a una persona de confianza. Esta actividad es una propuesta de reflexión, no un tratamiento.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Manejo del estrés';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar WHERE titulo=N'Un descanso consciente')
  INSERT dbo.RecursoBienestar(idCategoria,titulo,descripcion,contenido,duracionMinutos)
    SELECT idCategoria,N'Un descanso consciente',N'Date un momento para descansar de la pantalla.',N'Si te resulta cómodo, aparta un momento la mirada de la pantalla. Observa cómo estás sentado y cambia de postura a tu ritmo. No fuerces movimientos. Decide si necesitas agua, un descanso o compañía antes de continuar.',2 FROM dbo.CategoriaRecurso WHERE nombre=N'Relajación';
GO

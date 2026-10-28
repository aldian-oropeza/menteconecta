USE MenteConecta;
GO
IF COL_LENGTH('dbo.RecursoBienestar','emocion') IS NULL ALTER TABLE dbo.RecursoBienestar ADD emocion NVARCHAR(80) NULL;
GO
SET XACT_ABORT ON;
BEGIN TRANSACTION;
UPDATE dbo.RecursoBienestar SET emocion=N'Tristeza' WHERE titulo=N'Tristeza: darte espacio para sentir' AND emocion IS NULL;
UPDATE dbo.RecursoBienestar SET emocion=N'Estrés' WHERE titulo=N'Estrés académico: organizar un primer paso' AND emocion IS NULL;
UPDATE dbo.RecursoBienestar SET emocion=N'Ansiedad' WHERE titulo=N'Ansiedad y preocupación: volver al presente' AND emocion IS NULL;
UPDATE dbo.RecursoBienestar SET emocion=N'Soledad' WHERE titulo=N'Soledad: acercarte a una persona' AND emocion IS NULL;
UPDATE dbo.RecursoBienestar SET emocion=N'Alegría' WHERE titulo=N'Alegría: reconocer un momento valioso' AND emocion IS NULL;
UPDATE dbo.RecursoBienestar SET emocion=N'Frustración' WHERE titulo=N'Frustración: hacer una pausa antes de responder' AND emocion IS NULL;
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Tristeza' AND c.nombre=N'Emociones' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Tristeza',N'Tristeza: comprender',N'Darte espacio para sentir. La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.',N'Darte espacio para sentir
La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.

Comprender
Ponle nombre a lo que sientes con tus propias palabras. Describe una situación que lo acompañe y piensa qué necesitas. Puedes anotar esa reflexión en Mi registro emocional; no hay respuestas correctas.

Una pregunta para ti
¿Necesito compañía, descanso o ser escuchado?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Tristeza' AND c.nombre=N'Meditación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Tristeza',N'Tristeza: observar el presente',N'Darte espacio para sentir. La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.',N'Darte espacio para sentir
La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.

Observar el presente
Elige un objeto cercano. Observa su forma, color y textura. Si tu atención se va a otros pensamientos, puedes volver a mirar el objeto sin regañarte. No necesitas dejar la mente en blanco ni cerrar los ojos.

Una pregunta para ti
¿Necesito compañía, descanso o ser escuchado?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Meditación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Tristeza' AND c.nombre=N'Respiración' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Tristeza',N'Tristeza: respirar a tu ritmo',N'Darte espacio para sentir. La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.',N'Darte espacio para sentir
La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.

Respirar a tu ritmo
Busca una postura cómoda y observa por un momento tu respiración natural. No retengas el aire ni fuerces profundidad o velocidad. Si te incomoda prestar atención a la respiración, detente y mira algo de tu entorno.

Una pregunta para ti
¿Necesito compañía, descanso o ser escuchado?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Respiración';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Tristeza' AND c.nombre=N'Relajación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Tristeza',N'Tristeza: darte un descanso',N'Darte espacio para sentir. La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.',N'Darte espacio para sentir
La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.

Darte un descanso
Si es posible, aparta un momento la tarea o pantalla. Elige una postura que ya te resulte cómoda, sin forzar movimientos. Puedes tomar agua, mirar por una ventana o descansar en silencio. Tú decides cuánto tiempo.

Una pregunta para ti
¿Necesito compañía, descanso o ser escuchado?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Relajación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Tristeza' AND c.nombre=N'Manejo del estrés' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Tristeza',N'Tristeza: elegir una acción posible',N'Darte espacio para sentir. La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.',N'Darte espacio para sentir
La tristeza puede acompañar momentos difíciles. No necesitas obligarte a estar bien para empezar a cuidarte.

Elegir una acción posible
Separa lo que depende de ti de lo que necesita tiempo o apoyo. Elige una acción pequeña y concreta para hoy. Decide qué necesitas para intentarla y cuándo descansar. Pedir ayuda también puede ser ese primer paso.

Una pregunta para ti
¿Necesito compañía, descanso o ser escuchado?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Manejo del estrés';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Estrés' AND c.nombre=N'Emociones' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Estrés',N'Estrés: comprender',N'Bajar la exigencia por un momento. Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.',N'Bajar la exigencia por un momento
Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.

Comprender
Ponle nombre a lo que sientes con tus propias palabras. Describe una situación que lo acompañe y piensa qué necesitas. Puedes anotar esa reflexión en Mi registro emocional; no hay respuestas correctas.

Una pregunta para ti
¿Qué puede esperar y con qué puedo pedir ayuda?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Estrés' AND c.nombre=N'Meditación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Estrés',N'Estrés: observar el presente',N'Bajar la exigencia por un momento. Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.',N'Bajar la exigencia por un momento
Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.

Observar el presente
Elige un objeto cercano. Observa su forma, color y textura. Si tu atención se va a otros pensamientos, puedes volver a mirar el objeto sin regañarte. No necesitas dejar la mente en blanco ni cerrar los ojos.

Una pregunta para ti
¿Qué puede esperar y con qué puedo pedir ayuda?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Meditación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Estrés' AND c.nombre=N'Respiración' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Estrés',N'Estrés: respirar a tu ritmo',N'Bajar la exigencia por un momento. Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.',N'Bajar la exigencia por un momento
Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.

Respirar a tu ritmo
Busca una postura cómoda y observa por un momento tu respiración natural. No retengas el aire ni fuerces profundidad o velocidad. Si te incomoda prestar atención a la respiración, detente y mira algo de tu entorno.

Una pregunta para ti
¿Qué puede esperar y con qué puedo pedir ayuda?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Respiración';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Estrés' AND c.nombre=N'Relajación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Estrés',N'Estrés: darte un descanso',N'Bajar la exigencia por un momento. Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.',N'Bajar la exigencia por un momento
Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.

Darte un descanso
Si es posible, aparta un momento la tarea o pantalla. Elige una postura que ya te resulte cómoda, sin forzar movimientos. Puedes tomar agua, mirar por una ventana o descansar en silencio. Tú decides cuánto tiempo.

Una pregunta para ti
¿Qué puede esperar y con qué puedo pedir ayuda?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Relajación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Estrés' AND c.nombre=N'Manejo del estrés' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Estrés',N'Estrés: elegir una acción posible',N'Bajar la exigencia por un momento. Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.',N'Bajar la exigencia por un momento
Cuando hay muchas exigencias, puedes elegir una sola cosa a la vez.

Elegir una acción posible
Separa lo que depende de ti de lo que necesita tiempo o apoyo. Elige una acción pequeña y concreta para hoy. Decide qué necesitas para intentarla y cuándo descansar. Pedir ayuda también puede ser ese primer paso.

Una pregunta para ti
¿Qué puede esperar y con qué puedo pedir ayuda?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Manejo del estrés';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Ansiedad' AND c.nombre=N'Emociones' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Ansiedad',N'Ansiedad: comprender',N'Atender el momento presente. Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.',N'Atender el momento presente
Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.

Comprender
Ponle nombre a lo que sientes con tus propias palabras. Describe una situación que lo acompañe y piensa qué necesitas. Puedes anotar esa reflexión en Mi registro emocional; no hay respuestas correctas.

Una pregunta para ti
¿Qué sé que está ocurriendo ahora y qué estoy anticipando?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Ansiedad' AND c.nombre=N'Meditación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Ansiedad',N'Ansiedad: observar el presente',N'Atender el momento presente. Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.',N'Atender el momento presente
Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.

Observar el presente
Elige un objeto cercano. Observa su forma, color y textura. Si tu atención se va a otros pensamientos, puedes volver a mirar el objeto sin regañarte. No necesitas dejar la mente en blanco ni cerrar los ojos.

Una pregunta para ti
¿Qué sé que está ocurriendo ahora y qué estoy anticipando?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Meditación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Ansiedad' AND c.nombre=N'Respiración' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Ansiedad',N'Ansiedad: respirar a tu ritmo',N'Atender el momento presente. Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.',N'Atender el momento presente
Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.

Respirar a tu ritmo
Busca una postura cómoda y observa por un momento tu respiración natural. No retengas el aire ni fuerces profundidad o velocidad. Si te incomoda prestar atención a la respiración, detente y mira algo de tu entorno.

Una pregunta para ti
¿Qué sé que está ocurriendo ahora y qué estoy anticipando?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Respiración';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Ansiedad' AND c.nombre=N'Relajación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Ansiedad',N'Ansiedad: darte un descanso',N'Atender el momento presente. Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.',N'Atender el momento presente
Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.

Darte un descanso
Si es posible, aparta un momento la tarea o pantalla. Elige una postura que ya te resulte cómoda, sin forzar movimientos. Puedes tomar agua, mirar por una ventana o descansar en silencio. Tú decides cuánto tiempo.

Una pregunta para ti
¿Qué sé que está ocurriendo ahora y qué estoy anticipando?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Relajación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Ansiedad' AND c.nombre=N'Manejo del estrés' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Ansiedad',N'Ansiedad: elegir una acción posible',N'Atender el momento presente. Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.',N'Atender el momento presente
Si aparecen muchas preocupaciones, puedes observar lo que ocurre ahora sin resolver todo de inmediato.

Elegir una acción posible
Separa lo que depende de ti de lo que necesita tiempo o apoyo. Elige una acción pequeña y concreta para hoy. Decide qué necesitas para intentarla y cuándo descansar. Pedir ayuda también puede ser ese primer paso.

Una pregunta para ti
¿Qué sé que está ocurriendo ahora y qué estoy anticipando?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Manejo del estrés';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Soledad' AND c.nombre=N'Emociones' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Soledad',N'Soledad: comprender',N'Reconocer tu necesidad de compañía. Puedes darte un momento para reconocer la soledad sin culparte por sentirla.',N'Reconocer tu necesidad de compañía
Puedes darte un momento para reconocer la soledad sin culparte por sentirla.

Comprender
Ponle nombre a lo que sientes con tus propias palabras. Describe una situación que lo acompañe y piensa qué necesitas. Puedes anotar esa reflexión en Mi registro emocional; no hay respuestas correctas.

Una pregunta para ti
¿Con quién me sentiría cómodo compartiendo un momento?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Soledad' AND c.nombre=N'Meditación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Soledad',N'Soledad: observar el presente',N'Reconocer tu necesidad de compañía. Puedes darte un momento para reconocer la soledad sin culparte por sentirla.',N'Reconocer tu necesidad de compañía
Puedes darte un momento para reconocer la soledad sin culparte por sentirla.

Observar el presente
Elige un objeto cercano. Observa su forma, color y textura. Si tu atención se va a otros pensamientos, puedes volver a mirar el objeto sin regañarte. No necesitas dejar la mente en blanco ni cerrar los ojos.

Una pregunta para ti
¿Con quién me sentiría cómodo compartiendo un momento?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Meditación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Soledad' AND c.nombre=N'Respiración' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Soledad',N'Soledad: respirar a tu ritmo',N'Reconocer tu necesidad de compañía. Puedes darte un momento para reconocer la soledad sin culparte por sentirla.',N'Reconocer tu necesidad de compañía
Puedes darte un momento para reconocer la soledad sin culparte por sentirla.

Respirar a tu ritmo
Busca una postura cómoda y observa por un momento tu respiración natural. No retengas el aire ni fuerces profundidad o velocidad. Si te incomoda prestar atención a la respiración, detente y mira algo de tu entorno.

Una pregunta para ti
¿Con quién me sentiría cómodo compartiendo un momento?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Respiración';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Soledad' AND c.nombre=N'Relajación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Soledad',N'Soledad: darte un descanso',N'Reconocer tu necesidad de compañía. Puedes darte un momento para reconocer la soledad sin culparte por sentirla.',N'Reconocer tu necesidad de compañía
Puedes darte un momento para reconocer la soledad sin culparte por sentirla.

Darte un descanso
Si es posible, aparta un momento la tarea o pantalla. Elige una postura que ya te resulte cómoda, sin forzar movimientos. Puedes tomar agua, mirar por una ventana o descansar en silencio. Tú decides cuánto tiempo.

Una pregunta para ti
¿Con quién me sentiría cómodo compartiendo un momento?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Relajación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Soledad' AND c.nombre=N'Manejo del estrés' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Soledad',N'Soledad: elegir una acción posible',N'Reconocer tu necesidad de compañía. Puedes darte un momento para reconocer la soledad sin culparte por sentirla.',N'Reconocer tu necesidad de compañía
Puedes darte un momento para reconocer la soledad sin culparte por sentirla.

Elegir una acción posible
Separa lo que depende de ti de lo que necesita tiempo o apoyo. Elige una acción pequeña y concreta para hoy. Decide qué necesitas para intentarla y cuándo descansar. Pedir ayuda también puede ser ese primer paso.

Una pregunta para ti
¿Con quién me sentiría cómodo compartiendo un momento?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Manejo del estrés';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Alegría' AND c.nombre=N'Emociones' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Alegría',N'Alegría: comprender',N'Disfrutar un momento valioso. Puedes reconocer lo agradable sin exigirte que dure todo el día.',N'Disfrutar un momento valioso
Puedes reconocer lo agradable sin exigirte que dure todo el día.

Comprender
Ponle nombre a lo que sientes con tus propias palabras. Describe una situación que lo acompañe y piensa qué necesitas. Puedes anotar esa reflexión en Mi registro emocional; no hay respuestas correctas.

Una pregunta para ti
¿Qué hizo especial este momento y cómo quiero recordarlo?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Alegría' AND c.nombre=N'Meditación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Alegría',N'Alegría: observar el presente',N'Disfrutar un momento valioso. Puedes reconocer lo agradable sin exigirte que dure todo el día.',N'Disfrutar un momento valioso
Puedes reconocer lo agradable sin exigirte que dure todo el día.

Observar el presente
Elige un objeto cercano. Observa su forma, color y textura. Si tu atención se va a otros pensamientos, puedes volver a mirar el objeto sin regañarte. No necesitas dejar la mente en blanco ni cerrar los ojos.

Una pregunta para ti
¿Qué hizo especial este momento y cómo quiero recordarlo?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Meditación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Alegría' AND c.nombre=N'Respiración' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Alegría',N'Alegría: respirar a tu ritmo',N'Disfrutar un momento valioso. Puedes reconocer lo agradable sin exigirte que dure todo el día.',N'Disfrutar un momento valioso
Puedes reconocer lo agradable sin exigirte que dure todo el día.

Respirar a tu ritmo
Busca una postura cómoda y observa por un momento tu respiración natural. No retengas el aire ni fuerces profundidad o velocidad. Si te incomoda prestar atención a la respiración, detente y mira algo de tu entorno.

Una pregunta para ti
¿Qué hizo especial este momento y cómo quiero recordarlo?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Respiración';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Alegría' AND c.nombre=N'Relajación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Alegría',N'Alegría: darte un descanso',N'Disfrutar un momento valioso. Puedes reconocer lo agradable sin exigirte que dure todo el día.',N'Disfrutar un momento valioso
Puedes reconocer lo agradable sin exigirte que dure todo el día.

Darte un descanso
Si es posible, aparta un momento la tarea o pantalla. Elige una postura que ya te resulte cómoda, sin forzar movimientos. Puedes tomar agua, mirar por una ventana o descansar en silencio. Tú decides cuánto tiempo.

Una pregunta para ti
¿Qué hizo especial este momento y cómo quiero recordarlo?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Relajación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Alegría' AND c.nombre=N'Manejo del estrés' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Alegría',N'Alegría: elegir una acción posible',N'Disfrutar un momento valioso. Puedes reconocer lo agradable sin exigirte que dure todo el día.',N'Disfrutar un momento valioso
Puedes reconocer lo agradable sin exigirte que dure todo el día.

Elegir una acción posible
Separa lo que depende de ti de lo que necesita tiempo o apoyo. Elige una acción pequeña y concreta para hoy. Decide qué necesitas para intentarla y cuándo descansar. Pedir ayuda también puede ser ese primer paso.

Una pregunta para ti
¿Qué hizo especial este momento y cómo quiero recordarlo?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Manejo del estrés';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Frustración' AND c.nombre=N'Emociones' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Frustración',N'Frustración: comprender',N'Pausar antes de responder. Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.',N'Pausar antes de responder
Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.

Comprender
Ponle nombre a lo que sientes con tus propias palabras. Describe una situación que lo acompañe y piensa qué necesitas. Puedes anotar esa reflexión en Mi registro emocional; no hay respuestas correctas.

Una pregunta para ti
¿Qué necesitaba y qué puedo pedir de forma concreta?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Emociones';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Frustración' AND c.nombre=N'Meditación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Frustración',N'Frustración: observar el presente',N'Pausar antes de responder. Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.',N'Pausar antes de responder
Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.

Observar el presente
Elige un objeto cercano. Observa su forma, color y textura. Si tu atención se va a otros pensamientos, puedes volver a mirar el objeto sin regañarte. No necesitas dejar la mente en blanco ni cerrar los ojos.

Una pregunta para ti
¿Qué necesitaba y qué puedo pedir de forma concreta?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Meditación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Frustración' AND c.nombre=N'Respiración' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Frustración',N'Frustración: respirar a tu ritmo',N'Pausar antes de responder. Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.',N'Pausar antes de responder
Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.

Respirar a tu ritmo
Busca una postura cómoda y observa por un momento tu respiración natural. No retengas el aire ni fuerces profundidad o velocidad. Si te incomoda prestar atención a la respiración, detente y mira algo de tu entorno.

Una pregunta para ti
¿Qué necesitaba y qué puedo pedir de forma concreta?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Respiración';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Frustración' AND c.nombre=N'Relajación' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Frustración',N'Frustración: darte un descanso',N'Pausar antes de responder. Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.',N'Pausar antes de responder
Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.

Darte un descanso
Si es posible, aparta un momento la tarea o pantalla. Elige una postura que ya te resulte cómoda, sin forzar movimientos. Puedes tomar agua, mirar por una ventana o descansar en silencio. Tú decides cuánto tiempo.

Una pregunta para ti
¿Qué necesitaba y qué puedo pedir de forma concreta?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Relajación';
IF NOT EXISTS(SELECT 1 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE r.emocion=N'Frustración' AND c.nombre=N'Manejo del estrés' AND r.activo=1)
INSERT dbo.RecursoBienestar(idCategoria,emocion,titulo,descripcion,contenido,duracionMinutos)
SELECT idCategoria,N'Frustración',N'Frustración: elegir una acción posible',N'Pausar antes de responder. Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.',N'Pausar antes de responder
Puedes dejar pasar un momento antes de actuar cuando algo no sale como esperabas.

Elegir una acción posible
Separa lo que depende de ti de lo que necesita tiempo o apoyo. Elige una acción pequeña y concreta para hoy. Decide qué necesitas para intentarla y cuándo descansar. Pedir ayuda también puede ser ese primer paso.

Una pregunta para ti
¿Qué necesitaba y qué puedo pedir de forma concreta?

Para continuar
Elige si quieres retomar tu actividad, descansar o buscar compañía. Esta propuesta es opcional; puedes detenerte cuando quieras. Si necesitas acompañamiento humano, consulta Opciones de apoyo del TdeA.',3 FROM dbo.CategoriaRecurso WHERE nombre=N'Manejo del estrés';
COMMIT;


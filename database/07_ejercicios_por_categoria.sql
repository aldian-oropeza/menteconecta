USE MenteConecta;
GO
SET XACT_ABORT ON;
BEGIN TRANSACTION;
UPDATE r SET titulo=N'Meditación con sonidos',descripcion=N'Escucha sin intentar cambiar lo que sientes.',contenido=N'Meditación con sonidos

Meditar consiste en prestar atención a una experiencia presente. No exige eliminar los pensamientos ni lograr una emoción determinada.

Práctica paso a paso
1. Elige un lugar donde puedas estar un momento. Mantén los ojos abiertos si lo prefieres.

2. Identifica un sonido cercano y otro lejano. Observa cómo empiezan, cambian y terminan.

3. Si aparece un recuerdo, reconoce que estás pensando y vuelve a escuchar. Al terminar, mira a tu alrededor antes de continuar.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: tristeza. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Meditación' AND r.emocion=N'Tristeza';
UPDATE r SET titulo=N'Meditación entre tareas',descripcion=N'Una transición consciente antes de pasar a la siguiente actividad.',contenido=N'Meditación entre tareas

Meditar consiste en prestar atención a una experiencia presente. No exige eliminar los pensamientos ni lograr una emoción determinada.

Práctica paso a paso
1. Deja el material de la tarea anterior y nota dónde estás sentado.

2. Observa tres detalles del espacio. Cuando aparezca la lista de pendientes, nómbrala mentalmente como «planificación» y vuelve a un detalle.

3. Elige con intención qué tarea vas a abrir. La pausa no necesita resolver todos los pendientes.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: estrés. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Meditación' AND r.emocion=N'Estrés';
UPDATE r SET titulo=N'Observar pensamientos sin seguirlos',descripcion=N'Practica distinguir una idea de lo que está ocurriendo ahora.',contenido=N'Observar pensamientos sin seguirlos

Meditar consiste en prestar atención a una experiencia presente. No exige eliminar los pensamientos ni lograr una emoción determinada.

Práctica paso a paso
1. Escoge un punto visible como referencia: una pared, una hoja o una ventana.

2. Cuando aparezca una preocupación, prueba decirte «estoy teniendo el pensamiento de…». No tienes que discutir con ella.

3. Regresa al color o la forma del punto elegido. Puedes repetirlo suavemente o detener la práctica.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: ansiedad. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Meditación' AND r.emocion=N'Ansiedad';
UPDATE r SET titulo=N'Atención consciente al caminar',descripcion=N'Explora el entorno durante un recorrido corto y seguro.',contenido=N'Atención consciente al caminar

Meditar consiste en prestar atención a una experiencia presente. No exige eliminar los pensamientos ni lograr una emoción determinada.

Práctica paso a paso
1. Elige un espacio conocido y sin tráfico. Si caminar no es posible, observa el entorno desde una silla.

2. Nota el contacto de los pies, un cambio de luz y un sonido. Camina a un ritmo cómodo sin mirar una pantalla.

3. Detente y observa qué detalle no habías notado antes. Esta práctica no reemplaza la compañía que puedas necesitar.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: soledad. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Meditación' AND r.emocion=N'Soledad';
UPDATE r SET titulo=N'Meditar en un momento agradable',descripcion=N'Presta atención a los detalles de una experiencia que disfrutas.',contenido=N'Meditar en un momento agradable

Meditar consiste en prestar atención a una experiencia presente. No exige eliminar los pensamientos ni lograr una emoción determinada.

Práctica paso a paso
1. Elige una escena sencilla: la luz de la tarde, una canción o una conversación que recuerdes.

2. Observa un detalle concreto y lo que notas ahora. No necesitas prolongar la alegría ni retenerla.

3. Cierra la práctica nombrando qué valoras de ese momento y continúa con tu día.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: alegría. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Meditación' AND r.emocion=N'Alegría';
UPDATE r SET titulo=N'Observar un impulso antes de actuar',descripcion=N'Un espacio de atención entre una emoción y una respuesta.',contenido=N'Observar un impulso antes de actuar

Meditar consiste en prestar atención a una experiencia presente. No exige eliminar los pensamientos ni lograr una emoción determinada.

Práctica paso a paso
1. Deja el teléfono o la tarea por un momento. Nota el apoyo de la silla o del suelo.

2. Reconoce el impulso con una frase como «tengo ganas de responder ya». Observarlo no te obliga a actuar.

3. Vuelve a un sonido presente. Después decide si responderás, esperarás o pedirás tiempo.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: frustración. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Meditación' AND r.emocion=N'Frustración';
UPDATE r SET titulo=N'Reconocer tu respiración natural',descripcion=N'Una primera práctica sin cambiar el ritmo.',contenido=N'Reconocer tu respiración natural

La práctica se centra en respirar de forma suave y cómoda. No es una prueba de capacidad pulmonar: evita forzar el aire o retenerlo.

Práctica paso a paso
1. Siéntate con apoyo y afloja cualquier prenda que te incomode.

2. Nota la entrada y salida del aire tal como ocurren. No necesitas hacer respiraciones grandes.

3. Después de unas respiraciones, mira el entorno y decide si deseas continuar o terminar.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado. Si aparece mareo o malestar, detente y vuelve a respirar con normalidad.

Aplicación: tristeza. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Respiración' AND r.emocion=N'Tristeza';
UPDATE r SET titulo=N'Respiración suave entre pendientes',descripcion=N'Una pausa breve antes de retomar una tarea.',contenido=N'Respiración suave entre pendientes

La práctica se centra en respirar de forma suave y cómoda. No es una prueba de capacidad pulmonar: evita forzar el aire o retenerlo.

Práctica paso a paso
1. Aparta la pantalla y apoya los pies si te resulta cómodo.

2. Deja entrar y salir el aire suavemente. Si te ayuda, acompaña cada fase con una cuenta corta, sin perseguir una cifra.

3. Suelta la cuenta y regresa a tu ritmo habitual. Retoma solo el siguiente paso de la tarea.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado. Si aparece mareo o malestar, detente y vuelve a respirar con normalidad.

Aplicación: estrés. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Respiración' AND r.emocion=N'Estrés';
UPDATE r SET titulo=N'Respirar sin perseguir un ritmo perfecto',descripcion=N'Una práctica flexible antes de un examen o una exposición.',contenido=N'Respirar sin perseguir un ritmo perfecto

La práctica se centra en respirar de forma suave y cómoda. No es una prueba de capacidad pulmonar: evita forzar el aire o retenerlo.

Práctica paso a paso
1. Busca una postura cómoda. Puedes mantener los ojos abiertos.

2. Respira suavemente sin intentar llenar los pulmones al máximo. Si contar te pone más pendiente del cuerpo, no cuentes.

3. Vuelve a mirar tus materiales y elige la primera acción concreta. Si observar la respiración te incomoda, pasa a una actividad de atención al entorno.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado. Si aparece mareo o malestar, detente y vuelve a respirar con normalidad.

Aplicación: ansiedad. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Respiración' AND r.emocion=N'Ansiedad';
UPDATE r SET titulo=N'Una pausa respiratoria antes de conversar',descripcion=N'Prepara un momento tranquilo antes de contactar a alguien.',contenido=N'Una pausa respiratoria antes de conversar

La práctica se centra en respirar de forma suave y cómoda. No es una prueba de capacidad pulmonar: evita forzar el aire o retenerlo.

Práctica paso a paso
1. Deja preparado el mensaje que quieres enviar sin hacerlo todavía.

2. Observa unas respiraciones cómodas. Relaja la postura si estabas inclinándote sobre la pantalla.

3. Vuelve a leer el mensaje. Decide si expresa la compañía que necesitas, sin esperar que esta pausa elimine la soledad.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado. Si aparece mareo o malestar, detente y vuelve a respirar con normalidad.

Aplicación: soledad. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Respiración' AND r.emocion=N'Soledad';
UPDATE r SET titulo=N'Respirar durante una pausa agradable',descripcion=N'Acompaña un descanso sin intentar prolongar una emoción.',contenido=N'Respirar durante una pausa agradable

La práctica se centra en respirar de forma suave y cómoda. No es una prueba de capacidad pulmonar: evita forzar el aire o retenerlo.

Práctica paso a paso
1. Elige un lugar cómodo y nota algo agradable del entorno.

2. Deja que el aire fluya a tu ritmo. Puedes alternar la atención entre la respiración y ese detalle agradable.

3. Finaliza cuando quieras, sin evaluar si respiraste «bien» o «mal».

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado. Si aparece mareo o malestar, detente y vuelve a respirar con normalidad.

Aplicación: alegría. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Respiración' AND r.emocion=N'Alegría';
UPDATE r SET titulo=N'Pausa respiratoria antes de responder',descripcion=N'Introduce un descanso antes de enviar un mensaje impulsivo.',contenido=N'Pausa respiratoria antes de responder

La práctica se centra en respirar de forma suave y cómoda. No es una prueba de capacidad pulmonar: evita forzar el aire o retenerlo.

Práctica paso a paso
1. Aparta el mensaje y busca apoyo para tu espalda.

2. Permite varias respiraciones suaves, sin retenciones. Si te resulta incómodo, vuelve al ritmo habitual y observa un objeto cercano.

3. Revisa la respuesta cuando puedas hacerlo con más espacio. Puedes optar por pedir tiempo antes de hablar.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado. Si aparece mareo o malestar, detente y vuelve a respirar con normalidad.

Aplicación: frustración. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Respiración' AND r.emocion=N'Frustración';
UPDATE r SET titulo=N'Descanso con un entorno amable',descripcion=N'Prepara una pausa sencilla sin exigirte estar bien.',contenido=N'Descanso con un entorno amable

Relajarse puede comenzar por ajustar el entorno y disminuir una exigencia. No necesitas sentir alivio inmediato para permitirte descansar.

Práctica paso a paso
1. Busca una postura apoyada y una luz que te resulte cómoda.

2. Elige una actividad de baja demanda: escuchar una canción tranquila o mirar por la ventana.

3. Al terminar, decide si necesitas comer, compañía o continuar descansando.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: tristeza. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Relajación' AND r.emocion=N'Tristeza';
UPDATE r SET titulo=N'Desconectar de las notificaciones',descripcion=N'Un descanso con menos interrupciones.',contenido=N'Desconectar de las notificaciones

Relajarse puede comenzar por ajustar el entorno y disminuir una exigencia. No necesitas sentir alivio inmediato para permitirte descansar.

Práctica paso a paso
1. Si tus responsabilidades lo permiten, silencia las notificaciones durante una pausa.

2. Deja la pantalla fuera de la mano y cambia de postura sin forzar movimientos.

3. Antes de volver, decide qué aviso atenderás primero y cuál puede esperar.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: estrés. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Relajación' AND r.emocion=N'Estrés';
UPDATE r SET titulo=N'Preparar un rincón para descansar',descripcion=N'Reduce estímulos mientras haces una pausa.',contenido=N'Preparar un rincón para descansar

Relajarse puede comenzar por ajustar el entorno y disminuir una exigencia. No necesitas sentir alivio inmediato para permitirte descansar.

Práctica paso a paso
1. Elige un asiento cómodo y disminuye el volumen o la iluminación si te ayuda.

2. Mantén una actividad predecible y sencilla, como escuchar un sonido suave que tú elijas.

3. Si quedarte quieto te incomoda, puedes cambiar de actividad. Descansar no requiere permanecer inmóvil.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: ansiedad. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Relajación' AND r.emocion=N'Ansiedad';
UPDATE r SET titulo=N'Descansar con compañía',descripcion=N'Diseña una pausa compartida y sin obligaciones de conversar.',contenido=N'Descansar con compañía

Relajarse puede comenzar por ajustar el entorno y disminuir una exigencia. No necesitas sentir alivio inmediato para permitirte descansar.

Práctica paso a paso
1. Piensa en alguien con quien puedas estar cómodo.

2. Propón algo concreto: sentarse un rato, escuchar música o acompañarse mientras descansan.

3. Aclara si quieres conversar o simplemente estar acompañado. Respeta también la disponibilidad de la otra persona.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: soledad. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Relajación' AND r.emocion=N'Soledad';
UPDATE r SET titulo=N'Disfrutar sin llenar la agenda',descripcion=N'Reserva un espacio tranquilo después de una experiencia agradable.',contenido=N'Disfrutar sin llenar la agenda

Relajarse puede comenzar por ajustar el entorno y disminuir una exigencia. No necesitas sentir alivio inmediato para permitirte descansar.

Práctica paso a paso
1. Deja un intervalo libre antes de aceptar otra actividad.

2. Elige cómo disfrutarlo: música, una bebida o un momento de quietud.

3. Observa si quieres compartirlo o conservarlo para ti; no tienes que convertirlo en una nueva tarea.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: alegría. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Relajación' AND r.emocion=N'Alegría';
UPDATE r SET titulo=N'Descanso antes de volver a intentarlo',descripcion=N'Interrumpe temporalmente una tarea que te está frustrando.',contenido=N'Descanso antes de volver a intentarlo

Relajarse puede comenzar por ajustar el entorno y disminuir una exigencia. No necesitas sentir alivio inmediato para permitirte descansar.

Práctica paso a paso
1. Si puedes, deja la tarea en un punto seguro y aparta el material.

2. Cambia de entorno o postura de forma cómoda. Evita usar la pausa para seguir repasando cada error.

3. Al volver, decide si cambiarás un paso, pedirás ayuda o retomarás en otro momento.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: frustración. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Relajación' AND r.emocion=N'Frustración';
UPDATE r SET titulo=N'Un plan mínimo para un día difícil',descripcion=N'Reduce el plan a lo esencial y posible.',contenido=N'Un plan mínimo para un día difícil

Gestionar las demandas implica organizar acciones y apoyos, no hacer más cosas a cualquier costo.

Práctica paso a paso
1. Anota lo que necesita atención hoy y lo que puede esperar.

2. Elige una necesidad básica y una tarea breve. Define qué apoyo necesitarías.

3. Revisa el plan sin castigarte si necesitas reducirlo.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: tristeza. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Manejo del estrés' AND r.emocion=N'Tristeza';
UPDATE r SET titulo=N'Ordenar entregas y prioridades',descripcion=N'Convierte una lista de pendientes en pasos concretos.',contenido=N'Ordenar entregas y prioridades

Gestionar las demandas implica organizar acciones y apoyos, no hacer más cosas a cualquier costo.

Práctica paso a paso
1. Escribe las fechas reales de entrega y el primer paso de cada tarea.

2. Elige una tarea por urgencia e importancia. Separa un bloque posible para empezarla.

3. Si el tiempo no alcanza, consulta una duda, reparte trabajo o negocia una fecha cuando sea posible.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: estrés. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Manejo del estrés' AND r.emocion=N'Estrés';
UPDATE r SET titulo=N'Preparar lo que sí está a tu alcance',descripcion=N'Distingue preparación de preocupación repetida.',contenido=N'Preparar lo que sí está a tu alcance

Gestionar las demandas implica organizar acciones y apoyos, no hacer más cosas a cualquier costo.

Práctica paso a paso
1. Haz dos listas: hechos conocidos y resultados que estás imaginando.

2. Elige una acción verificable, como revisar instrucciones o ensayar la introducción.

3. Cuando la preocupación vuelva, comprueba si hay un dato nuevo antes de rehacer el plan.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: ansiedad. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Manejo del estrés' AND r.emocion=N'Ansiedad';
UPDATE r SET titulo=N'Incluir apoyo en tu planificación',descripcion=N'No dejes toda la carga en una sola persona: tú.',contenido=N'Incluir apoyo en tu planificación

Gestionar las demandas implica organizar acciones y apoyos, no hacer más cosas a cualquier costo.

Práctica paso a paso
1. Identifica una tarea que admitiría colaboración.

2. Prepara una petición concreta con qué necesitas y para cuándo, sin asumir disponibilidad.

3. Si esa persona no puede, considera otra ayuda o ajusta la tarea.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: soledad. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Manejo del estrés' AND r.emocion=N'Soledad';
UPDATE r SET titulo=N'Aceptar compromisos con espacio para descansar',descripcion=N'Planifica incluso cuando tienes ganas de hacerlo todo.',contenido=N'Aceptar compromisos con espacio para descansar

Gestionar las demandas implica organizar acciones y apoyos, no hacer más cosas a cualquier costo.

Práctica paso a paso
1. Revisa cuánto tiempo ocupa cada compromiso, incluidos traslados y descanso.

2. Elige qué quieres mantener y qué puedes dejar para otra semana.

3. Responde con un límite concreto cuando algo no quepa en tu agenda.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: alegría. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Manejo del estrés' AND r.emocion=N'Alegría';
UPDATE r SET titulo=N'Revisar un intento que no funcionó',descripcion=N'Ajusta el proceso sin convertir el resultado en un juicio personal.',contenido=N'Revisar un intento que no funcionó

Gestionar las demandas implica organizar acciones y apoyos, no hacer más cosas a cualquier costo.

Práctica paso a paso
1. Describe qué esperabas y qué ocurrió usando hechos.

2. Elige una parte modificable: instrucciones, tiempo, material o ayuda.

3. Prueba un cambio cada vez y decide cuándo revisarás el resultado.

Al finalizar
¿Qué parte te resultó cómoda? Puedes modificar la duración o elegir otra práctica. No hace falta obtener un resultado determinado.

Aplicación: frustración. Es una propuesta educativa, no un tratamiento.',duracionMinutos=3 FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria WHERE c.nombre=N'Manejo del estrés' AND r.emocion=N'Frustración';
COMMIT;
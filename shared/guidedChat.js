import {emotionInfo,topicDetails} from './wellbeingContent.js';
// Flujo compartido por la interfaz y el proveedor local; sin datos globales de usuarios.
export const MOODS = ['Tristeza','Estrés','Ansiedad','Soledad','Alegría','Frustración'];
const moodChoices = MOODS.map(m => 'Siento ' + m.toLowerCase());
const reflections = {
 Tristeza:'Puedes reconocer la tristeza sin exigirte que desaparezca. Tal vez hoy necesites descanso, compañía o ser escuchado.',
 Estrés:'Cuando se acumulan tareas, puede ayudar separar lo urgente de lo que puede esperar y pedir ayuda con una parte.',
 Ansiedad:'La preocupación puede llevar la atención hacia lo que podría pasar. Podemos centrarnos en algo concreto del presente, sin intentar resolverlo todo.',
 Soledad:'Necesitar compañía es válido. Puedes empezar por un contacto pequeño con alguien con quien te sientas cómodo.',
 Alegría:'Puedes darte tiempo para disfrutar este momento y reconocer qué lo hizo valioso para ti.',
 Frustración:'Puedes hacer una pausa antes de responder y pensar qué necesitabas o qué te gustaría pedir.'
};
export function guidedState(messages=[]) {
 const users=messages.filter(m=>m.autor==='USUARIO').map(m=>m.contenido);
 const last=users.at(-1);
 const mood=[...users].reverse().map(t=>MOODS.find(m=>t==='Siento '+m.toLowerCase())).find(Boolean);
 const actions=['Comprender lo que siento','Hacer una pausa guiada','Elegir un siguiente paso','Consultar apoyo del TdeA','Elegir otra emoción'];
 const info=emotionInfo[mood];
 const contexts=info?.contexts || [];
 const specific=Object.values(emotionInfo).flatMap(i=>i.contexts).find(c=>c[0]===last);
 if(specific) return {text:specific[1],options:specific[2]};
 if(topicDetails[last]) return {text:topicDetails[last][0],options:topicDetails[last][1]};
 if(last==='Comprender lo que siento' && info) return {text:info.overview+' Elige una situación para explorarla con un ejemplo concreto.',options:[...contexts.map(c=>c[0]),'Hacer una pausa guiada','Elegir otra emoción']};
 if(last==='Elegir un siguiente paso' && info) return {text:'¿Cuál de estas situaciones se parece más a lo que necesitas hoy?',options:[...contexts.map(c=>c[0]),'Preparar un plan breve','Consultar apoyo del TdeA']};
 if(last==='Necesito otra opción' && info) return {text:'Probemos otra herramienta. Puedes trabajar en una petición, revisar una preocupación o cambiar de tema.',options:['Practicar cómo pedir compañía','Distinguir hechos de suposiciones','Ensayar un límite respetuoso','Elegir otra emoción']};
 if(!last || last==='Elegir otra emoción' || last==='Volver a empezar') return {text:'¿Cómo te sientes hoy? Elige una opción para comenzar.',options:moodChoices};
 if(moodChoices.includes(last)) return {text:reflections[mood]+' ¿Qué te gustaría hacer ahora?',options:[...contexts.map(c=>c[0]),...actions]};
 if(last==='Comprender lo que siento') return {text:(reflections[mood] || 'No necesitas juzgar lo que sientes.')+' Puedes pensar: ¿qué pasó, qué necesito y qué está a mi alcance hoy? Elige cómo quieres continuar.',options:['Hacer una pausa guiada','Elegir un siguiente paso','Consultar apoyo del TdeA','Elegir otra emoción']};
 if(last==='Hacer una pausa guiada') return {text:'Busca una postura cómoda. Si te resulta agradable, observa tres colores y nota el apoyo de tus pies. Respira a tu ritmo, sin retener ni forzar el aire. Puedes detenerte cuando quieras. Cuando termines, elige cómo te encuentras.',options:['Me siento un poco mejor','Me siento igual','Prefiero detener la pausa']};
 if(last==='Me siento un poco mejor') return {text:'Qué bueno que notes algo de alivio. No necesitas resolver todo ahora. ¿Quieres elegir una acción pequeña o cerrar por hoy?',options:['Elegir un siguiente paso','Terminar por ahora','Elegir otra emoción']};
 if(last==='Me siento igual' || last==='Prefiero detener la pausa') return {text:'Está bien parar o no notar un cambio. No hace falta repetir algo que no te ayuda. Puedes elegir otro camino o buscar acompañamiento humano.',options:['Elegir un siguiente paso','Consultar apoyo del TdeA','Terminar por ahora']};
 if(last==='Elegir un siguiente paso') return {text:mood==='Alegría'?'¿Cómo te gustaría conservar o compartir este momento?':'Elige una acción pequeña que te resulte posible, sin exigirte hacerlas todas.',options:mood==='Alegría'?['Guardar un momento en mi registro','Hablar con alguien de confianza','Terminar por ahora']:['Organizar una tarea pequeña','Hablar con alguien de confianza','Tomar un descanso','Consultar apoyo del TdeA']};
 if(last==='Organizar una tarea pequeña') return {text:'Piensa en una tarea y divídela. Elige solo el primer paso, como abrir el material o anotar una duda. Decide cuándo intentarlo y qué ayuda necesitas. No tienes que completar todo hoy.',options:['Ya elegí mi paso','Necesito otra opción','Terminar por ahora']};
 if(last==='Hablar con alguien de confianza') return {text:'Podrías decir: «¿Tienes un momento para escucharme? Me gustaría tener compañía». Tú decides cuánto compartir. Si prefieres orientación institucional, puedes consultar las opciones del TdeA.',options:['Ya elegí mi paso','Consultar apoyo del TdeA','Terminar por ahora']};
 if(last==='Tomar un descanso') return {text:'Si puedes, aparta un momento la tarea y elige algo sencillo: beber agua, mirar por la ventana o quedarte en una postura cómoda. Decide después si quieres continuar o pedir ayuda.',options:['Ya elegí mi paso','Consultar apoyo del TdeA','Terminar por ahora']};
 if(last==='Guardar un momento en mi registro') return {text:'En Mi registro emocional puedes guardar tu emoción y una nota con lo que hizo importante este momento. Este chat no crea ese registro automáticamente.',options:['Ya elegí mi paso','Terminar por ahora']};
 if(last==='Necesito otra opción') return {text:'Podemos cambiar el enfoque. ¿Qué te resultaría más cómodo?',options:['Hablar con alguien de confianza','Tomar un descanso','Consultar apoyo del TdeA']};
 if(last==='Ya elegí mi paso') return {text:'Puedes intentarlo a tu ritmo y ajustar el plan si hace falta. Reconoce el esfuerzo de elegir algo posible para ti.',options:['Elegir otra emoción','Terminar por ahora']};
 if(last==='Consultar apoyo del TdeA') return {text:'En Opciones de apoyo, en la barra lateral, encontrarás el Observatorio de Salud Mental, Mente Sana y el Escuchadero. Allí puedes consultar los canales oficiales. Este chat no agenda citas ni atiende emergencias.',options:['Preparar una solicitud de apoyo','Elegir otra emoción','Terminar por ahora']};
 if(last==='Preparar una solicitud de apoyo') return {text:'Puedes escribir: «Hola, soy estudiante del TdeA y quisiera orientación para solicitar acompañamiento. ¿Me indican el proceso y la disponibilidad?». No necesitas incluir detalles íntimos en el primer contacto. El correo está en Opciones de apoyo.',options:['Terminar por ahora','Elegir otra emoción']};
 if(last==='Terminar por ahora') return {text:'Gracias por dedicarte este momento. Puedes volver cuando quieras; esta conversación queda en tu historial.',options:['Volver a empezar']};
 return {text:'Continuemos con opciones para elegir. ¿Cómo te sientes hoy?',options:moodChoices};
}
export function isGuidedChoice(text) {
 return [...Object.keys(topicDetails),...Object.values(emotionInfo).flatMap(i=>i.contexts.map(c=>c[0])),...moodChoices,'Elegir otra emoción','Volver a empezar','Comprender lo que siento','Hacer una pausa guiada','Elegir un siguiente paso','Consultar apoyo del TdeA','Me siento un poco mejor','Me siento igual','Prefiero detener la pausa','Terminar por ahora','Guardar un momento en mi registro','Hablar con alguien de confianza','Organizar una tarea pequeña','Tomar un descanso','Ya elegí mi paso','Necesito otra opción','Preparar una solicitud de apoyo'].includes(text);
}


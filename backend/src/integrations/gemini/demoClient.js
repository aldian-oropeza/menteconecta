import {guidedState, isGuidedChoice} from '../../../../shared/guidedChat.js';
// Conversación guiada local: usa exclusivamente el historial de esta conversación.
// El modo demo se informa en la interfaz y el aviso; no se presenta como un modelo generativo.
const normalize = value => (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const topics = [
  ['stress', /estres|agob|presion|examen|tarea|estudi|trabajo|universidad/],
  ['sad', /trist|llor|duelo|perdid|desanim/],
  ['lonely', /soledad|\bsol[oa]\b|sin amigos|nadie me/],
  ['anxious', /ansied|ansios|preocup|miedo|nervios/],
  ['anger', /rabia|enojo|enojad|frustra|ira\b/],
  ['happy', /alegr|feliz|content|me siento bien/],
];
const starters = {
  stress: 'Cuando se acumulan las exigencias puede costar decidir por dónde empezar. ¿Qué pesa más ahora: el estudio, el trabajo o una situación personal?',
  sad: 'Siento que estés pasando por un momento triste. No tienes que apresurarte a sentirte mejor. ¿Quieres contar qué pasó o prefieres una pausa?',
  lonely: 'Sentir soledad puede ser difícil, incluso cuando hay gente alrededor. ¿Extrañas a alguien en particular o te cuesta encontrar con quién hablar?',
  anxious: 'Podemos ir con calma. ¿Hay algo concreto que te preocupa ahora, o prefieres empezar con una pausa?',
  anger: 'Podemos darle espacio a esa frustración sin actuar de inmediato. ¿Qué ocurrió antes de que empezaras a sentirte así?',
  happy: 'Qué agradable tener un momento así. ¿Qué ocurrió hoy que te gustaría recordar?',
};
function identify(text) { return topics.find(([, pattern]) => pattern.test(text))?.[0]; }
export function createDemoClient() {
  return { enabled:true, mode:'demo', async reply(messages) {
    const latest=messages.at(-1)?.contenido || '';
    if(isGuidedChoice(latest)) return guidedState(messages).text;
    const text=normalize(latest);
    const previous=messages.slice(0,-1);
    const lastAssistant=normalize([...previous].reverse().find(m=>m.autor==='IA')?.contenido);
    const priorUser=[...previous].reverse().filter(m=>m.autor==='USUARIO');
    const topic=identify(text) || priorUser.map(m=>identify(normalize(m.contenido))).find(Boolean);
    if (/suicid|matarme|hacerme dano|quitarme la vida|no quiero vivir|acabar con mi vida/.test(text))
      return 'Siento que estés pasando por algo tan difícil. Si podrías hacerte daño ahora, busca atención de urgencias y contacta a una persona de confianza que pueda quedarse contigo. Aléjate de objetos con los que puedas lastimarte. Este chat no puede evaluar una emergencia ni contactar ayuda por ti. ¿Estás a salvo en este momento?';
    if (/diagnost|medicamento|pastilla|dosis/.test(text))
      return 'Este chat no puede diagnosticar ni indicar medicamentos. Un profesional de salud puede valorar tu situación. Si quieres, podemos ordenar lo que te gustaría contarle: qué sientes, desde cuándo y cómo afecta tu día.';
    if (/gemini|google|eres una ia|eres real|simulacion|demostracion/.test(text))
      return 'Soy el asistente de demostración de MenteConecta. Esta versión ofrece una conversación guiada con respuestas preparadas que se adaptan al tema y al historial; no es Gemini en vivo. Puedo ayudarte a ordenar una idea, hacer una pausa o encontrar apoyo institucional.';
    if (/no (?:me siento|estoy) bien/.test(text)) return 'Siento que estés pasando un momento difícil. ¿Podrías decirme si se parece más a tristeza, preocupación, cansancio o algo distinto?';
    if (/no me ayuda|no funciona|no me sirve|no entiendes|repites/.test(text))
      return 'Gracias por decirlo. Puede que lo que propuse no encaje contigo. Esta conversación guiada tiene límites. Podemos cambiar de enfoque: ¿prefieres contar más, buscar una lectura o consultar acompañamiento del TdeA?';
    if (/apoyo|psicolog|cita|tdea|institucion/.test(text))
      return 'En Opciones de apoyo encontrarás el Observatorio de Salud Mental, Mente Sana y el Escuchadero del TdeA. Puedes consultar disponibilidad y pedir orientación desde sus canales oficiales. ¿Te gustaría preparar un mensaje breve para solicitar acompañamiento?';
    if (lastAssistant.includes('preparar un mensaje') && /^(si|claro|bueno|dale|por favor)/.test(text))
      return 'Podrías escribir: «Hola, soy estudiante del TdeA y quisiera orientación para solicitar acompañamiento psicológico. ¿Me indican el proceso y la disponibilidad? Gracias». No necesitas incluir detalles íntimos en el primer mensaje. Puedes encontrar el correo en Opciones de apoyo.';
    if (/gracias/.test(text)) return 'Gracias a ti por compartirlo. Puedes continuar cuando quieras. ¿Prefieres cerrar por ahora o explorar otra cosa que tengas en mente?';
    if (/^(adios|chao|hasta luego|cerrar|no gracias)/.test(text)) return 'De acuerdo. Puedes volver a este espacio cuando quieras. Cuídate y busca compañía si la necesitas.';
    if (lastAssistant.includes('notas después') || lastAssistant.includes('notas despues')) {
      if (/mejor|tranquil|calma/.test(text)) return 'Me alegra que notes un cambio. No necesitas resolver todo de una vez. ¿Qué paso pequeño y posible quieres elegir para continuar tu día?';
      if (/igual|peor|nada/.test(text)) return 'Está bien que una pausa no cambie lo que sientes. No hace falta forzarlo. Podemos hablar de lo que pasó o pensar en alguien que pueda acompañarte. ¿Qué prefieres?';
    }
    if (/pausa|respirar|calmar|relajar/.test(text) || (/^(si|claro|dale|bueno)\b/.test(text) && lastAssistant.includes('pausa')))
      return 'Si te resulta cómodo, apoya los pies y observa tres cosas a tu alrededor. Respira a tu ritmo, sin retener ni forzar el aire. Puedes parar cuando quieras. ¿Qué notas después de esta pausa?';
    if (lastAssistant.includes('paso pequeño') || lastAssistant.includes('primera accion')) {
      if (/no se|no puedo/.test(text)) return 'Podemos hacerlo más sencillo: abrir el material, anotar una duda o pedir ayuda con una parte. ¿Cuál de esas opciones te resulta más accesible?';
      return 'Podemos tomar eso como punto de partida. Elige un momento breve para intentarlo y deja margen para descansar. ¿Qué necesitarías preparar o a quién podrías pedir ayuda?';
    }
    if (lastAssistant.includes('que pesa mas')) {
      return 'Vamos a centrarnos en eso. Anota qué depende de ti hoy y qué necesita más tiempo o ayuda de otra persona. No tienes que resolverlo todo ahora. ¿Cuál podría ser una primera acción pequeña?';
    }
    if (topic && !previous.some(m=>m.autor==='IA' && m.contenido===starters[topic])) return starters[topic];
    if (topic==='sad' || topic==='lonely') {
      if (/nadie|no se|no tengo/.test(text)) return 'No tener claro a quién acudir puede hacer esto más pesado. En Opciones de apoyo hay espacios de escucha del TdeA. También podemos pensar qué te gustaría que una persona entendiera de cómo estás.';
      if (lastAssistant.includes('escuchara sin aconsejarte')) return 'Puedes pedirlo de forma directa: «¿Tienes un momento para escucharme? Ahora necesito compañía, más que soluciones». Si prefieres orientación profesional, tienes los canales del TdeA en Opciones de apoyo.';
      return 'Gracias por contar un poco más. Puedes elegir cuánto compartir y a tu ritmo. ¿Te ayudaría que alguien te escuchara sin aconsejarte, o prefieres pensar en una acción para hoy?';
    }
    if (topic==='happy') return 'Puedes guardar ese momento en Mi registro emocional y añadir qué lo hizo importante para ti. ¿Hay alguien con quien te gustaría compartirlo?';
    if (topic==='stress' || topic==='anxious' || topic==='anger') return 'Podemos separar lo que ocurrió de lo que temes que pase. ¿Qué parte puedes atender hoy con un paso pequeño y qué parte necesita apoyo?';
    if (/^(hola|buenas|buenos dias|buenas tardes)[!.\s]*$/.test(text)) return 'Hola, soy el asistente de bienestar de MenteConecta. ¿Cómo te sientes hoy o qué te gustaría conversar?';
    if (/no se/.test(text)) return 'No hace falta tenerlo claro. Puedes empezar con una palabra: tristeza, estrés, miedo, alegría o cansancio. También podemos hacer una pausa.';
    return 'Gracias por escribir. Para orientarte mejor en esta conversación guiada, ¿quieres hablar de cómo te sientes, ordenar una preocupación o buscar apoyo? Puedes decirme qué necesitas hoy.';
  }};
}


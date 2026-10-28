export const ACTIVITIES = [
  { id: 'pausa', titulo: 'Una pausa para ti', descripcion: 'Un minuto para bajar el ritmo y prestar atención al presente.', segundos: 60,
    pasos: ['Busca una postura cómoda y deja los ojos abiertos si lo prefieres.', 'Observa tu respiración natural, sin forzarla ni retener el aire.', 'Nota el apoyo de tus pies y mira a tu alrededor.', 'Puedes detener la pausa cuando quieras. Si te incomodas, vuelve a tu actividad habitual.'] },
  { id: 'entorno', titulo: 'Observa tu entorno', descripcion: 'Una actividad breve de atención, a tu propio ritmo.',
    pasos: ['Encuentra tres colores a tu alrededor.', 'Observa dos formas o texturas sin tener que tocarlas.', 'Escucha un sonido que puedas reconocer.', 'Elige una pequeña acción amable para continuar tu día.'] },
  { id: 'paso', titulo: 'Mi siguiente paso', descripcion: 'Ordena una idea y elige algo pequeño que puedas hacer.',
    pasos: ['Piensa en algo que te ocupa hoy. No tienes que escribirlo ni compartirlo.', 'Distingue qué parte está a tu alcance en este momento.', 'Elige un paso pequeño y realista.', 'Piensa en alguien de confianza a quien puedas pedir compañía o ayuda.'] }
];
export function createHelpService(repository) { return { async list() { return { actividades: ACTIVITIES, recursos: await repository.list() }; } }; }

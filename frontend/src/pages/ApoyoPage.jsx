import ModuleShell from '../components/ModuleShell.jsx';
const source = 'https://tdea.edu.co/micrositios/bienestar-universitario/';
export default function ApoyoPage(props) {
  return <ModuleShell {...props} title="Opciones de apoyo · TdeA" description="Encuentra acompañamiento humano y canales oficiales de Bienestar Universitario.">
    <div className="resource-grid support-routes">
      <article className="resource-card"><span className="module-tag">ORIENTACIÓN</span><h2>Observatorio de Salud Mental</h2><p>Consulta los servicios de acompañamiento y orientación de la institución.</p><a href="mailto:observatorio.salud@tdea.edu.co">observatorio.salud@tdea.edu.co</a></article>
      <article className="resource-card"><span className="module-tag">CITA PSICOLÓGICA</span><h2>Mente Sana</h2><p>Atención psicológica dirigida a estudiantes y egresados. En el sitio de Bienestar, entra en “Pide tu cita aquí”.</p><a href={source} target="_blank" rel="noreferrer">Consultar y solicitar cita en el TdeA ↗</a><p className="muted">También puedes consultar presencialmente en el bloque 10, oficina de enfermería.</p></article>
      <article className="resource-card"><span className="module-tag">ESCUCHA PRESENCIAL</span><h2>Escuchadero</h2><p>Espacio de escucha y orientación para la comunidad TdeA, en la carpa Sendero de la Paz.</p><p>Lunes a viernes, de 9:00 a. m. a 6:00 p. m.</p><a href={source} target="_blank" rel="noreferrer">Ver información oficial ↗</a></article>
    </div>
    <section className="support-panel"><h2>¿Cómo pedir acompañamiento?</h2><ol><li>Elige el servicio que necesitas.</li><li>Consulta el enlace oficial o escribe al correo de orientación.</li><li>Pregunta por disponibilidad y revisa la respuesta en tu correo.</li></ol><p>MenteConecta no agenda ni envía solicitudes por ti. Los canales institucionales gestionan la atención.</p><p className="muted">Fuente: <a href={source} target="_blank" rel="noreferrer">Bienestar Universitario del TdeA</a>. Información consultada el 26 de octubre de 2026. Confirma los horarios antes de asistir.</p></section>
  </ModuleShell>;
}

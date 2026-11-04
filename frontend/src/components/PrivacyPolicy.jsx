export default function PrivacyPolicy() {
  return <section id="privacy-policy" className="privacy-policy" aria-labelledby="privacy-title">
    <h2 id="privacy-title">Política de privacidad de MenteConecta</h2>
    <p className="muted">Versión informativa del proyecto · Actualizada el 4 de noviembre de 2026.</p>
    <h3>1. Sobre este espacio</h3>
    <p>MenteConecta es un proyecto de bienestar emocional que ofrece registro de emociones, lecturas, actividades de reflexión, rutas de apoyo y un chatbot guiado. Esta política describe el funcionamiento actual del proyecto; no es la política institucional del Tecnológico de Antioquia ni implica su aprobación.</p>
    <h3>2. Qué datos se guardan y para qué</h3>
    <ul>
      <li><strong>Cuenta:</strong> nombre, correo electrónico y contraseña protegida mediante un hash, para identificarte y permitir el acceso.</li>
      <li><strong>Registro emocional:</strong> emoción, intensidad, fecha y las notas que decidas escribir, para consultar tu historial personal. Estas notas pueden contener información sensible; comparte solo lo necesario.</li>
      <li><strong>Biblioteca:</strong> las lecturas que marques como favoritas, para encontrarlas de nuevo.</li>
      <li><strong>Chatbot:</strong> opciones seleccionadas, mensajes, respuestas y fechas de las conversaciones, para conservar tu historial.</li>
      <li><strong>Consentimientos:</strong> las decisiones de aceptación de los módulos que las solicitan y sus fechas, para gestionar su acceso.</li>
    </ul>
    <h3>3. Cómo funciona el chatbot</h3>
    <p>El chatbot actual es una simulación guiada con opciones y respuestas preparadas. No se conecta a Gemini ni envía las conversaciones a Google para generar respuestas. Ofrece orientación general: no realiza diagnósticos ni presta atención de emergencias.</p>
    <h3>4. Dónde se guarda la información</h3>
    <p>Los datos se guardan en la base de datos del servidor configurado para esta instalación. Cuando el proyecto se ejecuta completamente en tu equipo, esa base es local; si usas un servidor compartido, la información queda en ese servidor. Las personas que administran la instalación y su base de datos pueden tener acceso técnico a ella.</p>
    <p>La sesión de acceso se mantiene en la memoria de la página. Cerrar sesión no elimina los datos guardados en la base de datos. Evita compartir tu contraseña y cierra la sesión si utilizas un equipo compartido.</p>
    <h3>5. Tus decisiones y el historial</h3>
    <p>Puedes consultar y eliminar tus registros emocionales y conversaciones desde sus respectivos módulos, y quitar lecturas de favoritos. En el chat puedes retirar el consentimiento; esto impide continuar enviando mensajes, pero no borra automáticamente las conversaciones existentes.</p>
    <p>La aplicación no tiene actualmente una función de eliminación completa de cuenta ni un plazo automático de borrado. Los datos permanecen hasta que se eliminan mediante las opciones disponibles o mediante la gestión de quien administra esta instalación. Para solicitar una revisión, corrección o eliminación que no puedas realizar desde la página, contacta al equipo que te proporcionó acceso a MenteConecta.</p>
    <h3>6. Enlaces y servicios externos</h3>
    <p>Los enlaces de apoyo abren sitios oficiales del TdeA y los enlaces de correo abren tu aplicación de correo. MenteConecta no envía tu historial a esos servicios al pulsar un enlace ni solicita citas por ti. La información que decidas entregar en el portal externo se rige por sus propias condiciones de privacidad.</p>
    <h3>7. Uso responsable y cambios</h3>
    <p>No incluyas contraseñas, documentos de identidad ni datos personales de otras personas en las notas o conversaciones. La aceptación específica del registro emocional y del chat se solicita dentro de esos módulos. Si cambian los datos recopilados o las funciones del proyecto, este texto deberá actualizarse para reflejar esos cambios.</p>
  </section>;
}

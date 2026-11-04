import { useRef } from 'react';
import PrivacyPolicy from './PrivacyPolicy.jsx';

export function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`.trim()}>
      Mente<span className="logo-accent">Conecta</span>
    </span>
  );
}

/** Ilustración de la marca (anillo morado + círculos verdes), según Figma. */
function Illustration() {
  return (
    <div className="brand-art"><img src="/assets/figma/access.svg" alt="" /></div>
  );
}

/**
 * Estructura común de las pantallas de acceso:
 *  - escritorio: panel lateral de marca + formulario
 *  - móvil: solo la tarjeta con el formulario
 */
export default function AuthLayout({ title, children }) {
  const privacyDialog = useRef(null);

  return (
    <div className="auth-page">
      <main className="auth-card">
        <aside className="auth-aside" aria-hidden="true">
          <div>
            <Logo />
            <p className="aside-tagline">Bienestar emocional</p>
          </div>
          <Illustration />
          <p className="aside-features">
            Registro emocional · Recursos
            <br />
            Asistente IA
          </p>
        </aside>

        <section className="auth-main">
          <Logo className="logo-mobile" />
          <div className="auth-heading"><h1 className="auth-title">{title}</h1><img className="auth-institution-logo" src="/assets/tdea.svg" alt="Tecnológico de Antioquia — Institución Universitaria" width="125" height="32" /></div>
          {children}
        </section>
      </main>

      <footer className="auth-footer">
        <span>MenteConecta</span>
        <button type="button" className="link-button" aria-haspopup="dialog" aria-controls="privacy-dialog" onClick={() => privacyDialog.current?.showModal()}>
          Política de privacidad
        </button>
      </footer>
      <dialog id="privacy-dialog" ref={privacyDialog} className="privacy-dialog" aria-labelledby="privacy-title"><div className="privacy-dialog-toolbar"><button type="button" className="btn btn-secondary" autoFocus onClick={() => privacyDialog.current?.close()}>Cerrar política</button></div><PrivacyPolicy /></dialog>
    </div>
  );
}


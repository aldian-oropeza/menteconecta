import { Logo } from './AuthLayout.jsx';
export default function ModuleShell({title,description,onBack,onLogout,children}) {
  return <div className="auth-page"><main className="module-card"><header className="emotion-header"><Logo/><nav className="emotion-actions" aria-label="Navegación"><button className="link-button" onClick={onBack}>Inicio</button><button className="link-button" onClick={onLogout}>Cerrar sesión</button></nav></header><h1>{title}</h1><p className="muted module-description">{description}</p>{children}</main></div>;
}

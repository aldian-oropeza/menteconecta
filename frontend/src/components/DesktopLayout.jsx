import { Logo } from './AuthLayout.jsx';
const sections = [['welcome','Inicio'],['emotions','Mi registro emocional'],['biblioteca','Biblioteca'],['ayuda','Ayuda interactiva'],['chat','Asistente IA'],['apoyo','Opciones de apoyo']];
export default function DesktopLayout({active,user,onNavigate,onLogout,children}) {
  return <div className="desktop-app">
    <a className="skip-link" href="#page-content">Saltar al contenido</a>
    <aside className="desktop-sidebar"><Logo/><p className="sidebar-caption">TU ESPACIO</p>
      <nav className="desktop-nav" aria-label="Navegación principal">{sections.filter(([id])=>id!=='apoyo').map(([id,label])=><button key={id} type="button" aria-current={active===id?'page':undefined} onClick={()=>onNavigate(id)}>{label}</button>)}</nav>
      <div className="sidebar-support"><strong>Opciones de apoyo</strong><p>Bienestar y acompañamiento institucional.</p><button className="btn" aria-current={active==='apoyo'?'page':undefined} onClick={()=>onNavigate('apoyo')}>Ver apoyo del TdeA</button></div>
      <div className="sidebar-account"><strong>{user?.nombre || 'Mi cuenta'}</strong><span>Mi cuenta personal</span><button className="link-button" onClick={onLogout}>Cerrar sesión</button></div>
    </aside>
    <div className="desktop-workspace"><header className="desktop-topbar"><span>MenteConecta / {sections.find(([id])=>id===active)?.[1]}</span><button className="link-button mobile-logout" onClick={onLogout}>Cerrar sesión</button><span className="account-badge">Mi espacio</span></header><div id="page-content" className="desktop-content" key={active}>{children}</div></div>
  </div>;
}


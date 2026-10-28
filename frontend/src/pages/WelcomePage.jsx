import { useEffect, useState } from 'react';
import { ApiError, getCurrentUser } from '../api/authApi.js';
export default function WelcomePage({session,message,onOpenEmotions,onOpenModule,onSessionExpired}) {
  const [user,setUser]=useState(null);
  const [error,setError]=useState('');
  useEffect(()=>{
    let cancelled=false;
    getCurrentUser(session.token).then(data=>{if(!cancelled)setUser(data.user);}).catch(err=>{
      if(cancelled)return;
      if(err instanceof ApiError && err.status===401)onSessionExpired(); else setError(err.message);
    });
    return ()=>{cancelled=true;};
  },[session.token,onSessionExpired]);
  return <main className="home-page">
    <header><h1>Inicio</h1><p className="muted">{user ? `Hola, ${user.nombre}. Este es tu espacio de bienestar.` : 'Tu espacio de bienestar'}</p></header>
    {message && <p className="alert alert-success" role="status">{message}</p>}
    {error && <p className="alert alert-error" role="alert">{error}</p>}
    <section className="home-hero"><div className="hero-copy"><span className="eyebrow">REGISTRO EMOCIONAL</span><h2>¿Cómo te sientes hoy?</h2><p className="muted">Registra tu emoción y consulta su evolución.</p><button className="btn btn-primary" onClick={onOpenEmotions}>Registrar cómo me siento</button></div><div className="plant-art"><img src="/assets/figma/plant.svg" alt=""/></div></section>
    <div className="home-grid">
      <section className="home-panel"><h2>Biblioteca de bienestar</h2><p className="muted">Explora las lecturas y encuentra tus recursos favoritos.</p><button className="btn btn-secondary" onClick={()=>onOpenModule('biblioteca')}>Explorar biblioteca</button></section>
      <section className="home-panel home-panel-green"><h2>Una pausa para ti</h2><p className="muted">Encuentra un momento de calma con las actividades interactivas.</p><button className="btn btn-secondary" onClick={()=>onOpenModule('ayuda')}>Explorar ejercicios</button></section>
      <section className="home-panel"><h2>Asistente IA</h2><p className="muted">Un espacio de conversación y orientación emocional general.</p><button className="btn btn-secondary" onClick={()=>onOpenModule('chat')}>Abrir conversación</button></section>
      <section className="home-panel"><h2>Mi registro emocional</h2><p className="muted">Consulta las emociones que has registrado y tus notas personales.</p><button className="btn btn-secondary" onClick={onOpenEmotions}>Ver mi historial</button></section>
    </div>
  </main>;
}


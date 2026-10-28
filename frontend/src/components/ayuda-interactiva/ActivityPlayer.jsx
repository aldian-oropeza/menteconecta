import { useEffect,useState } from 'react';
export default function ActivityPlayer({activity}) {
  const [step,setStep]=useState(0),[running,setRunning]=useState(false),[seconds,setSeconds]=useState(activity.segundos||0);
  useEffect(()=>{if(!running)return;const timer=setInterval(()=>setSeconds(n=>Math.max(0,n-1)),1000);return()=>clearInterval(timer);},[running]);
  useEffect(()=>{if(seconds===0)setRunning(false);},[seconds]);
  function reset(){setRunning(false);setSeconds(activity.segundos||0);setStep(0);}
  return <section className="activity-player" aria-label={activity.titulo}><h2>{activity.titulo}</h2><p className="muted">Paso {step+1} de {activity.pasos.length}</p><p className="activity-instruction" aria-live="polite">{activity.pasos[step]}</p>{activity.segundos&&<><div className="pause-circle" role="timer" aria-label={`${seconds} segundos restantes`}>{seconds===0?'Pausa terminada':`${seconds}s`}</div><button className="btn btn-secondary" disabled={seconds===0} onClick={()=>setRunning(v=>!v)}>{running?'Pausar':'Iniciar temporizador'}</button></>}<div className="resource-actions"><button className="link-button" disabled={step===0} onClick={()=>setStep(n=>n-1)}>Anterior</button><button className="link-button" disabled={step===activity.pasos.length-1} onClick={()=>setStep(n=>n+1)}>Siguiente</button><button className="link-button" onClick={reset}>Reiniciar</button></div><p className="muted">Puedes parar cuando quieras. Esta actividad no guarda respuestas personales.</p></section>;
}

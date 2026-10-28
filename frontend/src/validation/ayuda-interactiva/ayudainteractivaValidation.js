export function safeWebUrl(value) { try { const u=new URL(value); return ['https:','http:'].includes(u.protocol)?u.href:null; } catch { return null; } }

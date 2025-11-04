'use client';

import { useState, useEffect } from 'react';

export default function ClientAppWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  // Este useEffect roda apenas no cliente após a montagem.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Hydration Fix: Renderização condicional simples sem estilos MUI conflitantes
  if (!hasMounted) {
    return (
      <div 
        suppressHydrationWarning
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        {/* Loading placeholder */}
      </div>
    );
  }

  // Após montar no cliente, renderizamos o conteúdo completo sem wrapper adicional
  return <div suppressHydrationWarning>{children}</div>;
}
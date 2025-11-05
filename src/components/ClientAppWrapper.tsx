'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ClientAppWrapperProps {
  children: ReactNode;
}

function ClientAppWrapper({ children }: ClientAppWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      if (process.env.NODE_ENV === 'development') {
        try {
          const { enableMocking } = await import('@/mocks');
          await enableMocking();
          console.log('MSW iniciado com sucesso');
        } catch (error) {
          console.warn('MSW não pôde ser iniciado:', error);
        }
      }
      setMswReady(true);
      setHasMounted(true);
    };
    
    initMSW();
  }, []);

  if (!hasMounted || !mswReady) {
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

  return <div suppressHydrationWarning>{children}</div>;
}

export default ClientAppWrapper;
export { ClientAppWrapper };
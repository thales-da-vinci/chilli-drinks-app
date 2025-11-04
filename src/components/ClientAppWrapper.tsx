'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

export default function ClientAppWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  // Este useEffect roda apenas no cliente após a montagem.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Hydration Fix: Se não montou (estamos no servidor ou na primeira renderização do cliente), 
  // renderizamos um placeholder seguro para evitar o erro de mismatch.
  if (!hasMounted) {
    return (
      <Box 
        suppressHydrationWarning
        sx={{ 
          flexGrow: 1, 
          minHeight: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          bgcolor: 'background.default'
        }}
      >
        {/* Loading placeholder para evitar overlay preto */}
      </Box>
    );
  }

  // Após montar no cliente, renderizamos o conteúdo completo
  return (
    <Box suppressHydrationWarning sx={{ flexGrow: 1, minHeight: '100vh' }}>
        {children}
    </Box>
  );
}
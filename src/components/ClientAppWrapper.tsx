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
  // A Box simples evita o overlay preto do null e garante o padding/layout mínimo.
  if (!hasMounted) {
    return (
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        {/* Adicione um componente de Loading simples aqui se desejar um feedback visual */}
      </Box>
    );
  }

  // Após montar no cliente, renderizamos o conteúdo completo
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        {children}
    </Box>
  );
}
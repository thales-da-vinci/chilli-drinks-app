// src/components/ThemeRegistry/ThemeRegistry.tsx (VERSÃO FINAL CORRIGIDA)
'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
// createCache e EmotionCache são importados do @emotion/cache
import createCache, { EmotionCache } from '@emotion/cache'; 
import { useServerInsertedHTML } from 'next/navigation'; 
import { chilliDrinksTheme } from '@/styles/theme';

// Configuração simples de cache para ambos os ambientes
const createEmotionCache = () => {
  // Use prepend: true para que os estilos do MUI venham antes do seu código, 
  // permitindo que você os sobrescreva.
  return createCache({ key: 'mui-css', prepend: true });
};

// O cache do lado do cliente só deve ser criado UMA VEZ.
const isBrowser = typeof document !== 'undefined';
let clientSideEmotionCache: EmotionCache | undefined = undefined;

if (isBrowser) {
    clientSideEmotionCache = createEmotionCache();
}

interface ThemeRegistryProps {
  children: React.ReactNode;
}

/**
 * ThemeRegistry: Implementação simplificada para SSR no Next.js App Router.
 * Foca na estabilidade de hydration em vez de otimização de estilos.
 */
export function ThemeRegistry({ children }: ThemeRegistryProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // No servidor, renderiza sem cache para evitar mismatch
  if (!isClient) {
    return (
      <ThemeProvider theme={chilliDrinksTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }

  // No cliente, usa cache completo
  const emotionCache = clientSideEmotionCache || createEmotionCache();

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={chilliDrinksTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
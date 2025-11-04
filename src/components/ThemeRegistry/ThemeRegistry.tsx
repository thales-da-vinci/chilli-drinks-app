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
 * ThemeRegistry: Implementação completa para SSR no Next.js App Router.
 * Coleta estilos no servidor (useServerInsertedHTML) e os injeta no <head>.
 */
export function ThemeRegistry({ children }: ThemeRegistryProps) {
  const emotionCacheRef = React.useRef<EmotionCache | undefined>(undefined);

  if (!emotionCacheRef.current) {
    if (isBrowser) {
        // Usa o cache single-instance no cliente
        emotionCacheRef.current = clientSideEmotionCache;
    } else {
        // Cria um NOVO cache por requisição no servidor para evitar vazamento de estilos
        emotionCacheRef.current = createEmotionCache();
    }
  }
  const emotionCache = emotionCacheRef.current!;


  // Hook do Next.js para injetar conteúdo no <head> no servidor.
  useServerInsertedHTML(() => {
    // CORREÇÃO: Iteramos sobre as CHAVES do objeto emotionCache.inserted no servidor.
    const styles = Object.keys(emotionCache.inserted).reduce((array, name) => {
      // O valor (selector) do cache.inserted pode ser a string CSS ou 'true'. 
      const selector = emotionCache.inserted[name];

      // Verificamos se é uma string (o estilo CSS) para injetar
      if (typeof selector === 'string') {
        array.push(
          <style
            data-emotion={`${emotionCache.key} ${name}`}
            key={name}
            // Adiciona os estilos coletados ao HTML renderizado
            dangerouslySetInnerHTML={{ __html: selector }}
          />,
        );
      }
      return array;
    }, [] as React.JSX.Element[]);

    // Limpeza: No SSR, limpamos o objeto definindo-o como vazio.
    emotionCache.inserted = {}; 
    
    return <>{styles}</>;
  });


  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={chilliDrinksTheme}>
        <CssBaseline />
        <div suppressHydrationWarning>
          {children}
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
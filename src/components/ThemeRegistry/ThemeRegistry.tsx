'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { chilliDrinksTheme } from '@/styles/theme';

interface ThemeRegistryProps {
  children: React.ReactNode;
}

/**
 * ThemeRegistry: Implementação ultra-simplificada para eliminar Hydration Mismatch.
 * Remove Emotion Cache para máxima estabilidade.
 */
export function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <ThemeProvider theme={chilliDrinksTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
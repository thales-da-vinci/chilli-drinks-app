// src/components/common/AuthLayout.tsx
'use client';

import { ReactNode } from 'react';
import { Container, Box, Paper, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

/**
 * Layout padrão para telas de Autenticação (Login, Cadastro).
 * Centraliza o conteúdo em um Card responsivo.
 */
export function AuthLayout({ children, title }: AuthLayoutProps) {
    const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'background.default',
        backgroundImage: 'url(/assets/background-pattern.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        py: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1
        },
        '& > *': {
          position: 'relative',
          zIndex: 2
        }
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: '2px solid',
            borderColor: 'primary.main',
            boxShadow: '0 8px 32px rgba(229, 0, 0, 0.3)'
        }}>
          
          {/* Título Principal */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Image 
              src="/assets/logo-chilli-padrao.png" 
              alt="Chilli Drinks" 
              width={200} 
              height={60}
              style={{ marginBottom: '16px', objectFit: 'contain' }}
            />
            <Typography 
              variant="h4" 
              component="h1" 
              align="center" 
              sx={{ 
                  fontWeight: 'bold', 
                  color: 'primary.main'
              }}
            >
              {title}
            </Typography>
          </Box>

          <Box>
            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

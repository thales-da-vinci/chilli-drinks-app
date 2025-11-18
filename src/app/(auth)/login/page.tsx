// src/app/(auth)/login/page.tsx
import React from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: '#F6F7F7',
      backgroundImage: 'url(/assets/chilli-drinks-app-login-banner-bg.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>

      {/* Back button */}
      <Box sx={{ position: 'absolute', top: 24, left: 24 }}>
        <Link href="/">
          <IconButton aria-label="Voltar" sx={{ color: '#FFB959' }}>
            <ChevronLeftIcon />
          </IconButton>
        </Link>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 460, px: 2 }}>
        <LoginForm />
      </Box>
    </Box>
  );
}
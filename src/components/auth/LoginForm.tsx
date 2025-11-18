'use client';

import { useState } from 'react';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth/useAuth';

export default function LoginForm() {
  const router = useRouter();
  const { handleLogin, isLoading } = useAuth();
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const documentWithoutMask = document.replace(/[^\d]/g, '');
    const success = handleLogin(documentWithoutMask, password);

    if (success) {
      setDocument('');
      setPassword('');
      router.replace('/dashboard');
    } else {
      alert('CPF ou senha inválidos');
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        width: '100%',
        maxWidth: 460,
        bgcolor: '#D40B28',
        borderRadius: '12px',
        p: { xs: 4, md: '48px 32px' },
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Image src="/assets/logo-chilli-branco.png" alt="Logo Chilli" width={88} height={88} />

      <Typography sx={{ color: '#FFFFFF', fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
        Faça seu Login
      </Typography>

      {/* CPF */}
      <Box width="100%">
        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
          CPF (Apenas números)
        </Typography>
        <TextField
          required
          fullWidth
          hiddenLabel
          placeholder="Digite seu CPF..."
          sx={{
            '& .MuiOutlinedInput-root': { bgcolor: '#FFFFFF', borderRadius: '1000px' },
            '& fieldset': { borderColor: '#E6E6E6' },
          }}
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          inputProps={{ maxLength: 11 }}
        />
      </Box>

      {/* Senha */}
      <Box width="100%">
        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
          Senha
        </Typography>
        <TextField
          required
          fullWidth
          hiddenLabel
          placeholder="Digite sua senha..."
          type="password"
          sx={{
            '& .MuiOutlinedInput-root': { bgcolor: '#FFFFFF', borderRadius: '1000px' },
            '& fieldset': { borderColor: '#E6E6E6' },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Button
        type="submit"
        sx={{
          width: '100%',
          borderRadius: '1000px',
          border: '1px solid #FFB959',
          color: '#FFFFFF',
          fontWeight: 700,
          py: 2
        }}
        disabled={isLoading || isSubmitting}
      >
        {(isLoading || isSubmitting) ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : 'ENTRAR'}
      </Button>

      <Box>
        <Link href="/register" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" sx={{ color: '#FFB959', fontWeight: 700 }}>
            Ainda não tem conta? Cadastre-se
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

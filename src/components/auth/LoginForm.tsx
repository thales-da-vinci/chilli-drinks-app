'use client';

import { useState } from 'react';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';

export function LoginForm() {
  const router = useRouter();
  const { handleLogin, isLoading } = useAuth();
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const documentWithoutMask = document.replace(/[^\d]/g, '');
    
    // Executa login com CPF e senha
    const success = handleLogin(documentWithoutMask, password);
    
    if (success) {
      // Reset form state
      setDocument('');
      setPassword('');
      // Força redirecionamento
      router.replace('/dashboard');
    } else {
      alert('CPF ou senha inválidos');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Entrar
      </Typography>
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="document"
        label="CPF (Apenas números)"
        name="document"
        autoComplete="document"
        autoFocus
        value={document}
        onChange={(e) => setDocument(e.target.value)}
        inputProps={{ maxLength: 11 }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Entrar'}
      </Button>
      <Box display="flex" justifyContent="flex-end">
        <Link href="/register" passHref style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="primary">
            Não tem conta? Cadastre-se
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

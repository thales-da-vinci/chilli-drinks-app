'use client';

import { useState } from 'react';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';

export function RegisterForm() {
  const router = useRouter();
  const { handleRegister, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const documentWithoutMask = document.replace(/[^\d]/g, '');
    handleRegister({ name, document: documentWithoutMask, email, password });
    setTimeout(() => {
      router.push('/dashboard');
    }, 100);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Criar Conta
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Nome Completo"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="document"
        label="CPF (Apenas números)"
        name="document"
        autoComplete="document"
        value={document}
        onChange={(e) => setDocument(e.target.value)}
        inputProps={{ maxLength: 11 }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-mail"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="new-password"
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
        {isLoading ? <CircularProgress size={24} /> : 'Cadastrar'}
      </Button>
      <Box display="flex" justifyContent="flex-end">
        <Link href="/login" passHref style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="primary">
            Já tem conta? Entrar
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

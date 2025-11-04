'use client';

import { Container, Typography, Box, Paper, TextField, Button, Divider, Alert } from '@mui/material';
import { useAuth } from '@/hooks/auth/useAuth'; 
import { useState } from 'react';

export default function MeusDadosPage() {
    const { user } = useAuth();
    
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleUpdateDados = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback({ type: 'success', message: 'Dados atualizados com sucesso!' });
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setFeedback({ type: 'error', message: 'As senhas não coincidem.' });
            return;
        }
        if (password.length < 6) {
             setFeedback({ type: 'error', message: 'A senha deve ter no mínimo 6 caracteres.' });
            return;
        }
        setFeedback({ type: 'success', message: 'Senha alterada com sucesso!' });
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="white" sx={{ mb: 4 }}>
                Meus Dados e Segurança
            </Typography>

            {feedback && <Alert severity={feedback.type} sx={{ mb: 3 }}>{feedback.message}</Alert>}

            <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'background.paper', border: '2px solid', borderColor: 'primary.main' }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Informações Pessoais
                </Typography>
                <Box component="form" onSubmit={handleUpdateDados} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Nome Completo" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
                    <TextField label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required type="email" disabled /> 
                    <TextField label="CPF" value={user?.document || 'N/A'} fullWidth disabled />
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 1, fontWeight: 'bold' }}>
                        ATUALIZAR DADOS
                    </Button>
                </Box>
            </Paper>

            <Divider sx={{ my: 4 }} />

            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper', border: '2px solid', borderColor: 'primary.main' }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">
                    Alterar Senha
                </Typography>
                <Box component="form" onSubmit={handleChangePassword} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Nova Senha" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required type="password" />
                    <TextField label="Confirmar Nova Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth required type="password" />
                    <Button type="submit" variant="contained" color="secondary" size="large" sx={{ mt: 1, fontWeight: 'bold' }}>
                        SALVAR NOVA SENHA
                    </Button>
                </Box>
            </Paper>
        </Container>
        </Box>
    );
}
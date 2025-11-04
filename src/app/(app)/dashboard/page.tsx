'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth'; 
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { 
    Container, 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    TextField, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemIcon,
    CircularProgress,
    Alert,
    Divider,
    Paper
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { LinearProgress } from '@mui/material';
import { TabsHistoryModal } from '@/components/TabsHistoryModal';

// Mock Data para polimento visual
const mockDashboardData = {
    saldo: 15.00,
    tabsCadastradas: 10,
    historicoTabs: [
        { id: 1, code: 'UUID-9f4a-4d2b-a7e8', value: 1.00, date: '2025-10-28', status: 'Resgatado' },
        { id: 2, code: 'UUID-c8e1-5e9c-b1f4', value: 1.00, date: '2025-10-29', status: 'Resgatado' },
        { id: 3, code: 'UUID-6a5d-2b7e-c9f0', value: 1.00, date: '2025-10-29', status: 'Resgatado' },
        { id: 4, code: 'UUID-f3b2-1a4c-d5e6', value: 12.00, date: '2025-10-30', status: 'Resgatado (C/ Bônus)' }
    ],
    mockSubmitTag: (code: string) => {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(!code.toLowerCase().includes('fail'));
            }, 1000);
        });
    }
};

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { openModal, updateBalance } = useGiftCardModal();
    const [tagInput, setTagInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
    const [isTabsHistoryModalOpen, setIsTabsHistoryModalOpen] = useState(false);

    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthLoading, isAuthenticated, router]);

    // Atualizar o saldo no contexto do modal
    useEffect(() => {
        updateBalance(mockDashboardData.saldo);
    }, [updateBalance]);

    if (isAuthLoading || !isAuthenticated) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    const handleSubmitTag = async () => {
        if (!tagInput || isSubmitting) return;

        setIsSubmitting(true);
        setSubmitResult(null);

        const success = await mockDashboardData.mockSubmitTag(tagInput);
        
        if (success) {
            setSubmitResult('success');
            setTagInput('');
        } else {
            setSubmitResult('error');
        }

        setIsSubmitting(false);
    };

    const totalResgatavel = mockDashboardData.saldo;
    const proximoNivelTags = 10;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary.main">
                Olá, {user?.name.split(' ')[0] || 'Cliente'}!
            </Typography>
            <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
                Seu Painel de TABS e Gift Card.
            </Typography>
            
            <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 4, 
                mb: 4 
            }}>
                <Card sx={{ 
                    bgcolor: 'background.paper', // Fundo BRANCO
                    color: 'text.primary', // Texto PRETO
                    boxShadow: '0 4px 20px rgba(229, 0, 0, 0.1)', // Sombra sutil vermelha
                    p: 2, 
                    height: '100%',
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'primary.main' // Borda VERMELHA sutil
                }}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="subtitle1" fontWeight="medium" color="text.primary">
                                SALDO TOTAL RESGATÁVEL
                            </Typography>
                            <CreditCardIcon sx={{ fontSize: 36, color: 'primary.main' }} />
                        </Box>
                        <Typography variant="h3" fontWeight="bold" color="primary.main" sx={{ mb: 3 }}>
                            R$ {totalResgatavel.toFixed(2).replace('.', ',')}
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            fullWidth 
                            size="large"
                            onClick={openModal}
                            disabled={totalResgatavel < 1}
                            endIcon={<ArrowForwardIosIcon />}
                            sx={{ 
                                py: 1.5, 
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.02)'
                                }
                            }}
                        >
                            RESGATAR SALDO AGORA
                        </Button>
                    </CardContent>
                </Card>

                <Card sx={{ 
                    bgcolor: 'background.paper', 
                    boxShadow: '0 4px 20px rgba(229, 0, 0, 0.1)', // Sombra sutil vermelha
                    p: 2, 
                    height: '100%',
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'primary.main', // Borda VERMELHA sutil
                    borderLeft: `8px solid ${mockDashboardData.tabsCadastradas >= proximoNivelTags ? '#4CAF50' : 'secondary.main'}`
                }}>

                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="subtitle1" color="text.primary" fontWeight="medium">
                                    TABS CADASTRADAS
                                </Typography>
                                <LocalOfferIcon color="primary" sx={{ fontSize: 36 }} />
                            </Box>
                            <Typography variant="h3" fontWeight="bold" color="primary.main" sx={{ mb: 2 }}>
                                {mockDashboardData.tabsCadastradas}
                            </Typography>
                            
                            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, border: '1px solid', borderColor: 'primary.main' }}>
                                <Typography variant="body2" fontWeight="medium" color="text.primary">
                                    META DE BÔNUS:
                                </Typography>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={(mockDashboardData.tabsCadastradas / proximoNivelTags) * 100} 
                                    sx={{ 
                                        height: 10, 
                                        borderRadius: 5, 
                                        mb: 1, 
                                        bgcolor: 'background.paper', 
                                        '& .MuiLinearProgress-bar': { 
                                            bgcolor: 'secondary.main' // Cor AMARELA/DOURADA
                                        } 
                                    }}
                                />
                                <Typography variant="caption" align="right" display="block" sx={{ mb: 1, color: 'text.secondary' }}>
                                    {mockDashboardData.tabsCadastradas}/{proximoNivelTags} TABS para o próximo bônus
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    fontWeight="bold" 
                                    color={mockDashboardData.tabsCadastradas >= proximoNivelTags ? 'success.main' : 'primary.main'}
                                >
                                    Faltam {Math.max(0, proximoNivelTags - mockDashboardData.tabsCadastradas)} TABS para o BÔNUS EXTRA!
                                </Typography>
                            </Box>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                fullWidth 
                                size="small"
                                startIcon={<ListAltIcon />}
                                onClick={() => setIsTabsHistoryModalOpen(true)}
                                sx={{ mt: 2 }}
                            >
                                HISTÓRICO COMPLETO DE TABS
                            </Button>
                        </CardContent>
                    </Card>
            </Box>
            
            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="primary.main" sx={{ mt: 2 }} id="cadastro-tab">
                Cadastrar Novo Código TAB
            </Typography>
            <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'background.paper', border: '2px solid', borderColor: 'primary.main' }}>
                <Box display="flex" alignItems="center" gap={2} component="form" onSubmit={(e) => { e.preventDefault(); handleSubmitTag(); }}>
                    <TextField
                        label="Código TAB (UUID Completo)"
                        variant="outlined"
                        fullWidth
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        disabled={isSubmitting}
                        sx={{ '.MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <QrCodeIcon />}
                        disabled={!tagInput || isSubmitting}
                        sx={{ py: 1.5, px: 4, minWidth: '150px', fontWeight: 'bold' }}
                    >
                        {isSubmitting ? 'ENVIANDO...' : 'CADASTRAR'}
                    </Button>
                </Box>
                
                {submitResult === 'success' && (
                    <Alert severity="success" sx={{ mt: 2 }} action={
                        <Button color="inherit" size="small" onClick={openModal}>
                            Resgatar Saldo
                        </Button>
                    }>
                        TAB cadastrada com sucesso! Seu saldo foi atualizado.
                    </Alert>
                )}
                {submitResult === 'error' && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        Erro ao cadastrar TAB. Verifique o código e tente novamente.
                    </Alert>
                )}
            </Paper>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="primary.main">
                Histórico de TABS Cadastradas
            </Typography>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper', border: '2px solid', borderColor: 'primary.main' }}>
                <List>
                    {mockDashboardData.historicoTabs.map((item) => (
                        <ListItem 
                            key={item.id} 
                            divider
                            sx={{ '&:last-child': { borderBottom: 'none' } }}
                        >
                            <ListItemIcon>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="body1" fontWeight="medium">
                                            Código: {item.code}
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            fontWeight="bold" 
                                            color={item.status.includes('Bônus') ? 'secondary.main' : 'primary.dark'}
                                        >
                                            + R$ {item.value.toFixed(2).replace('.', ',')}
                                        </Typography>
                                    </Box>
                                }
                                secondary={`Data: ${item.date} | Status: ${item.status}`}
                            />
                        </ListItem>
                    ))}
                    {mockDashboardData.historicoTabs.length === 0 && (
                        <ListItem>
                            <ListItemText primary="Nenhum código TAB cadastrado ainda." secondary="Comece a cadastrar para acumular seu Gift Card!" />
                        </ListItem>
                    )}
                </List>
            </Paper>

        </Container>
        
        {/* Modal Histórico de TABS */}
        <TabsHistoryModal 
            open={isTabsHistoryModalOpen}
            onClose={() => setIsTabsHistoryModalOpen(false)}
            tabsHistory={mockDashboardData.historicoTabs}
        />
        </Box>
    );
}

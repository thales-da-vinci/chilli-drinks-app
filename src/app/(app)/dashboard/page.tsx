'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth'; 
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { useUserCodesQuery } from '@/hooks/codes/useUserCodesQuery';
import { 
    Container, 
    Box, 
    Typography, 
    Button, 
    CircularProgress,
    Paper
} from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// Novos componentes da FASE 4.2
import { CodeRegistrationForm } from '@/components/dashboard/CodeRegistrationForm';
import { BonusProgress } from '@/components/dashboard/BonusProgress';
import { WaitingCodeList } from '@/components/dashboard/WaitingCodeList';

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { openModal, updateBalance } = useGiftCardModal();
    const { data: userCodes = [], isLoading: isCodesLoading } = useUserCodesQuery();
    
    // Mapeia os códigos do MSW para o formato do Dashboard
    const waitingCodes = userCodes.map(code => ({
        id: code.id.toString(),
        code: code.code,
        value: code.value
    }));

    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthLoading, isAuthenticated, router]);

    // Cálculo do saldo acumulado
    const accumulatedBalance = waitingCodes.reduce((sum, code) => sum + code.value, 0);

    // Atualizar o saldo no contexto do modal
    useEffect(() => {
        updateBalance(accumulatedBalance);
    }, [updateBalance, accumulatedBalance]);

    if (isAuthLoading || !isAuthenticated || isCodesLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    // Função para remover um código da lista
    const handleRemoveCode = (id: string) => {
        // Implementar delete via API
        console.log('Remover código:', id);
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
                {/* LAYOUT DE BLOCO ÚNICO - FASE 4.2 */}
                <Paper elevation={6} sx={{ 
                    p: { xs: 3, md: 5 }, 
                    borderRadius: 3,
                    bgcolor: 'grey.900',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 32px rgba(229, 0, 0, 0.4)'
                }}>
                    {/* Cabeçalho do Dashboard */}
                    <Typography variant="h4" component="h1" gutterBottom sx={{ 
                        color: 'white', 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: 2
                    }}>
                        Dashboard de Recompensas
                    </Typography>
                    <Typography variant="body1" sx={{ 
                        color: 'grey.300',
                        textAlign: 'center',
                        mb: 4 
                    }}>
                        Olá, <strong style={{ color: '#FFD700' }}>{user?.name?.split(' ')[0] || 'Cliente'}</strong>! Gerencie seus Códigos TAGs e resgate seu Gift Card.
                    </Typography>

                    {/* 1. ÁREA DE CADASTRO */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ 
                            color: 'white', 
                            fontWeight: 'medium',
                            mb: 3
                        }}>
                            1. Adicionar Códigos TAB
                        </Typography>
                        
                        <CodeRegistrationForm />
                        
                        {/* 2. BARRA DE PROGRESSO DO BÔNUS */}
                        <BonusProgress codesCount={waitingCodes.length} />
                    </Box>

                    {/* 3. LISTA DE CÓDIGOS EM ESPERA */}
                    <Box sx={{ 
                        mt: 4, 
                        pt: 3, 
                        borderTop: '1px solid', 
                        borderColor: 'divider' 
                    }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ 
                            color: 'white', 
                            fontWeight: 'medium',
                            mb: 3
                        }}>
                            2. Códigos TAB em Espera ({waitingCodes.length})
                        </Typography>
                        
                        <WaitingCodeList 
                            codes={waitingCodes} 
                            onRemoveCode={handleRemoveCode} 
                        />
                    </Box>

                    {/* 4. RODAPÉ DO BLOCO - AÇÃO DE RESGATE */}
                    <Box sx={{ 
                        mt: 5, 
                        pt: 3, 
                        borderTop: '2px solid', 
                        borderColor: 'primary.main',
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                            Saldo Acumulado para Resgate:
                        </Typography>
                        <Typography variant="h3" fontWeight="bold" sx={{ mb: 3, color: 'secondary.main' }}>
                            R$ {accumulatedBalance.toFixed(2).replace('.', ',')}
                        </Typography>
                        
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            size="large" 
                            startIcon={<CardGiftcardIcon />}
                            onClick={openModal}
                            disabled={accumulatedBalance === 0}
                            sx={{ 
                                py: 1.5, 
                                px: 5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)'
                                }
                            }}
                        >
                            RESGATAR SALDO AGORA
                        </Button>
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'grey.400' }}>
                            Mínimo de R$1,00 para resgate. Use o botão "Resgatar" no menu para acessar o Gift Card.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

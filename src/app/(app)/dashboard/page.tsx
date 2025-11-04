'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth'; 
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
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

// Mock de Códigos em Espera para a FASE 4.2
interface WaitingCode {
  id: string;
  value: number;
}

const INITIAL_WAITING_CODES: WaitingCode[] = [
  { id: 'uuid-1111-2222-3333-444444444444', value: 1.00 },
  { id: 'uuid-5555-6666-7777-888888888888', value: 1.00 },
  { id: 'uuid-9999-aaaa-bbbb-cccccccccccc', value: 1.00 },
  { id: 'uuid-dddd-eeee-ffff-000000000000', value: 1.00 },
  { id: 'uuid-1234-5678-9abc-def000000000', value: 1.00 },
];

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { openModal, updateBalance } = useGiftCardModal();
    
    // Estado dos códigos em espera (FASE 4.2)
    const [waitingCodes, setWaitingCodes] = useState<WaitingCode[]>(INITIAL_WAITING_CODES);

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

    if (isAuthLoading || !isAuthenticated) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    // Função para remover um código da lista
    const handleRemoveCode = (id: string) => {
        setWaitingCodes(prev => prev.filter(code => code.id !== id));
    };

    // Função para adicionar um novo código (será conectada ao CodeRegistrationForm)
    const handleAddCode = (newCode: string) => {
        const newCodeObj: WaitingCode = {
            id: newCode,
            value: 1.00
        };
        setWaitingCodes(prev => [...prev, newCodeObj]);
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
                {/* LAYOUT DE BLOCO ÚNICO - FASE 4.2 */}
                <Paper elevation={3} sx={{ 
                    p: { xs: 3, md: 5 }, 
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 32px rgba(229, 0, 0, 0.1)'
                }}>
                    {/* Cabeçalho do Dashboard */}
                    <Typography variant="h4" component="h1" gutterBottom sx={{ 
                        color: 'primary.main', 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: 2
                    }}>
                        Dashboard de Recompensas
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ 
                        textAlign: 'center',
                        mb: 4 
                    }}>
                        Olá, <strong>{user?.name?.split(' ')[0] || 'Cliente'}</strong>! Gerencie seus Códigos TAGs e resgate seu Gift Card.
                    </Typography>

                    {/* 1. ÁREA DE CADASTRO */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ 
                            color: 'primary.dark', 
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
                            color: 'primary.dark', 
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
                        <Typography variant="h6" gutterBottom>
                            Saldo Acumulado para Resgate:
                        </Typography>
                        <Typography variant="h3" color="primary.main" fontWeight="bold" sx={{ mb: 3 }}>
                            R$ {accumulatedBalance.toFixed(2).replace('.', ',')}
                        </Typography>
                        
                        <Button 
                            variant="contained" 
                            color="success" 
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
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                            Mínimo de R$1,00 para resgate. Use o botão "Resgatar" no menu para acessar o Gift Card.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

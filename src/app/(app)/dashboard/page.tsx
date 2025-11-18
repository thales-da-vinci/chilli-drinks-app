'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth'; 
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { useUserCodesQuery } from '@/hooks/codes/useUserCodesQuery';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
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
        console.log('Remover código:', id);
    };

    // Cálculo do progresso do bônus (ex: 10 códigos = 100%)
    const percent = Math.min(100, (waitingCodes.length % 10) * 10);

    return (
        <Box sx={{ minHeight: '100vh', width: '100%', position: 'relative', bgcolor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            {/* Background texture overlay */}
            <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/background-pattern.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.9)' }} />

            {/* Card Principal */}
            <Box sx={{ width: '100%', maxWidth: '761px', bgcolor: '#F6F7F7', borderRadius: '12px', p: { xs: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
                {/* Cabeçalho */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '32px', color: '#D40B28' }}>
                        Dashboard de Recompensas
                    </Typography>
                    <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, fontSize: '16px', color: '#2B2B2B' }}>
                        Olá, <strong>{user?.name?.split(' ')[0] || 'Cliente'}</strong>! Gerencie seus códigos e resgate seu Gift Card.
                    </Typography>
                </Box>

                {/* 01. Adicionar Códigos (Form Inline) */}
                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, mb: 2 }}>
                        <Box component="span" sx={{ color: '#D40B28', fontWeight: 900, mr: 1 }}>01.</Box>
                        <Box component="span" sx={{ color: '#000000', fontWeight: 900 }}>Adicionar Códigos TAB</Box>
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Mantemos o CodeRegistrationForm, mas envolvido para estilo inline */}
                        <Box sx={{ flex: 1, minWidth: 240 }}>
                            <CodeRegistrationForm />
                        </Box>
                    </Box>

                    {/* Bônus Progresso */}
                    <Box sx={{ bgcolor: '#FFFFFF', borderRadius: '12px', p: 3, mt: 3 }}>
                        <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, mb: 1 }}>Progresso do Bônus</Typography>
                        <Box sx={{ width: '100%', height: 12, bgcolor: '#FFB959', borderRadius: '100px', overflow: 'hidden' }}>
                            <Box sx={{ height: '100%', bgcolor: '#D40B28', width: `${percent}%`, borderRadius: '100px' }} />
                        </Box>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>{percent === 100 ? 'Bônus disponível!' : `Faltam ${10 - (waitingCodes.length % 10)} códigos para o bônus`}</Typography>
                    </Box>
                </Box>

                {/* 02. Códigos em Espera */}
                <Box sx={{ mt: 4, pt: 3, borderBottom: '2px solid #E6EAEE' }}>
                    <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, mb: 2 }}>
                        <Box component="span" sx={{ color: '#D40B28', fontWeight: 900, mr: 1 }}>02.</Box>
                        <Box component="span" sx={{ color: '#000000', fontWeight: 900 }}>Códigos TAB em Espera ({waitingCodes.length})</Box>
                    </Typography>

                    <WaitingCodeList codes={waitingCodes} onRemoveCode={handleRemoveCode} />
                </Box>

                {/* Saldo e Resgate */}
                <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
                    <Box>
                        <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: 20, color: '#000000' }}>Saldo Acumulado para Resgate:</Typography>
                        <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: 48, color: '#D40B28' }}>R$ {accumulatedBalance.toFixed(2).replace('.', ',')}</Typography>
                    </Box>

                    <Box>
                        <Button onClick={openModal} disabled={accumulatedBalance === 0} sx={{ border: '1px solid #FFB959', borderRadius: '1000px', color: '#000000', fontWeight: 700, px: 4, py: 1 }}>RESGATAR</Button>
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: '#6B6B6B' }}>Mínimo de R$1,00 para resgate.</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

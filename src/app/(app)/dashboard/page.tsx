'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { useUserCodesQuery } from '@/hooks/codes/useUserCodesQuery';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { CodeRegistrationForm } from '@/components/dashboard/CodeRegistrationForm';
import { WaitingCodeList } from '@/components/dashboard/WaitingCodeList';

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { openModal, updateBalance } = useGiftCardModal();
    const { data: userCodes = [], isLoading: isCodesLoading } = useUserCodesQuery();

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

    const accumulatedBalance = waitingCodes.reduce((sum, code) => sum + code.value, 0);

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

    const handleRemoveCode = (id: string) => {
        console.log('Remover código:', id);
    };

    const percent = Math.min(100, (waitingCodes.length % 10) * 10);

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '761px',
                bgcolor: '#F6F7F7',
                borderRadius: '12px',
                p: { xs: 3, md: 4 },
                mx: 'auto',
                // Margem superior para não ficar atrás do Header fixo (88px)
                mt: { xs: 14, md: 16 },
                mb: 8,
            }}
        >
            {/* Cabeçalho do Card */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '32px', color: '#D40B28' }}>
                    Dashboard de Recompensas
                </Typography>
                <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, fontSize: '16px', color: '#2B2B2B' }}>
                    Olá, <strong>{user?.name?.split(' ')[0] || 'Cliente'}</strong>! Gerencie seus códigos e resgate seu Gift Card.
                </Typography>
            </Box>

            {/* 01. Adicionar Códigos */}
            <Box id="cadastro-tabs" sx={{ mt: 2, scrollMarginTop: '120px' }}>
                <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, mb: 2 }}>
                    <Box component="span" sx={{ color: '#D40B28', fontWeight: 900, mr: 1 }}>01.</Box>
                    <Box component="span" sx={{ color: '#000000', fontWeight: 900 }}>Adicionar Códigos TAB</Box>
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
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
                    <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                        {percent === 100 ? 'Bônus disponível!' : `Faltam ${10 - (waitingCodes.length % 10)} códigos para o bônus`}
                    </Typography>
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

            {/* Saldo e Resgate - Centralizado */}
            <Box sx={{
                mt: 6,
                pt: 4,
                pb: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 3,
                width: '100%',
                maxWidth: '500px',
                mx: 'auto',
                px: 3
            }}>
                <Typography
                    component="h3"
                    sx={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 700,
                        fontSize: { xs: '18px', sm: '20px' },
                        color: '#000000',
                        lineHeight: 1.2
                    }}
                >
                    Saldo Acumulado para Resgate:
                </Typography>

                <Typography
                    component="p"
                    sx={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 900,
                        fontSize: { xs: '40px', sm: '48px', md: '56px' },
                        color: '#D40B28',
                        lineHeight: 1,
                        my: 1
                    }}
                >
                    R$ {accumulatedBalance.toFixed(2).replace('.', ',')}
                </Typography>

                <Button
                    onClick={openModal}
                    disabled={accumulatedBalance < 1}
                    variant="contained"
                    disableElevation
                    sx={{
                        bgcolor: '#FFE100',
                        color: '#000',
                        borderRadius: '1000px',
                        fontWeight: 700,
                        boxShadow: 'none',
                        px: 6,
                        py: 1.8,
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        border: 'none', // Sem borda
                        '&:hover': { bgcolor: '#FFD700', boxShadow: 'none', transform: 'translateY(-1px)' },
                        '&.Mui-disabled': { bgcolor: '#E0E0E0', color: '#9E9E9E' }
                    }}
                >
                    RESGATAR AGORA
                </Button>

                <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '14px', mt: 1 }}>
                    Mínimo de R$1,00 para resgate.
                </Typography>
            </Box>
        </Box>
    );
}

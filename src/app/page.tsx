'use client';

import { Box, Container, Typography, Button, Paper, Divider, keyframes } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth/useAuth';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ChilliBrandFooter from '@/components/ChilliBrand/ChilliBrandFooter';
import ChilliBrandHeader from '@/components/ChilliBrand/ChilliBrandHeader';
import { HeroBanner } from '@/components/HeroBanner';
import DrinksSection from '@/components/DrinksSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import RegulationSection from '@/components/RegulationSection';
import FAQSection from '@/components/FAQSection';
import ReadyToStartSection from '@/components/ReadyToStartSection';

// Conteúdo do Regulamento e FAQ
const REGULAMENTO_TEXTO = [
    '1. Objetivo: A promoção Chilli Drinks TABS recompensa clientes por cadastrar os códigos únicos encontrados nas embalagens de bebidas participantes. Cada código (UUID) contribui para o saldo do Gift Card.',
    '2. Acúmulo: Cada TAB cadastrada equivale a R$1,00 em saldo. O saldo é acumulativo e fica visível no "MEU GIFTCARD" no menu.',
    '3. Resgate Mínimo: O resgate do Gift Card pode ser efetuado a partir de R$1,00 e o saldo pode ser usado na rede de parceiros VTX.',
    '4. Bônus: A cada 10 TABS cadastradas, o usuário ganha valor extra (ex: 10 TABS = R$15,00). Este bônus é limitado (pode ganhar uma vez por ciclo).',
    '5. Validade: Os códigos TABS e o saldo acumulado têm validade de 12 meses. Consulte o "HISTÓRICO DE TABS".'
];



const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function LandingPage() {
    const { user } = useAuth();
    const isAuthenticated = !!user;

    // CTAs baseados no estado de autenticação
    const CTAs = isAuthenticated ? (
        <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
            <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                component={Link} 
                href="/dashboard"
                startIcon={<DashboardIcon />}
                sx={{ 
                    py: 2, 
                    px: 6,
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)'
                }}
            >
                MEUS CÓDIGOS TABS
            </Button>
        </Box>
    ) : (
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center" gap={2} sx={{ mb: 4 }}>
            <Button 
                variant="contained" 
                size="large" 
                component={Link} 
                href="/login"
                startIcon={<VpnKeyIcon />}
                sx={{ 
                    py: 2, 
                    px: 6,
                    fontSize: '1.1rem',
                    bgcolor: 'secondary.main',
                    color: 'black',
                    fontWeight: 900,
                    '&:hover': {
                        bgcolor: 'secondary.dark'
                    }
                }}
            >
                CADASTRAR TABS
            </Button>
            <Button 
                variant="outlined" 
                size="large" 
                component={Link} 
                href="/regulamento"
                sx={{ 
                    py: 2, 
                    px: 6,
                    fontSize: '1.1rem',
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 900,
                    '&:hover': {
                        borderColor: 'secondary.main',
                        color: 'secondary.main'
                    }
                }}
            >
                VER REGULAMENTO
            </Button>
        </Box>
    );

    return (
        <>
        <ChilliBrandHeader />
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', width: '100%', pt: '88px' }}>
            <HeroBanner />
            <DrinksSection />
            <HowItWorksSection />
            <RegulationSection />

            <Container maxWidth="xl">
            <Divider sx={{ my: 4 }} />

            <FAQSection />
        </Container>

        <ReadyToStartSection />
        <ChilliBrandFooter />
        </Box>
        </>
    );
}
'use client';

import { Box, Container, Typography, Button, Paper, Divider, Accordion, AccordionSummary, AccordionDetails, keyframes } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth/useAuth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ChilliBrandFooter from '@/components/ChilliBrand/ChilliBrandFooter';
import ChilliBrandHeader from '@/components/ChilliBrand/ChilliBrandHeader';
import { HeroBanner } from '@/components/HeroBanner';
import DrinksSection from '@/components/DrinksSection';

// Conteúdo do Regulamento e FAQ
const REGULAMENTO_TEXTO = [
    '1. Objetivo: A promoção Chilli Drinks TABS recompensa clientes por cadastrar os códigos únicos encontrados nas embalagens de bebidas participantes. Cada código (UUID) contribui para o saldo do Gift Card.',
    '2. Acúmulo: Cada TAB cadastrada equivale a R$1,00 em saldo. O saldo é acumulativo e fica visível no "MEU GIFTCARD" no menu.',
    '3. Resgate Mínimo: O resgate do Gift Card pode ser efetuado a partir de R$1,00 e o saldo pode ser usado na rede de parceiros VTX.',
    '4. Bônus: A cada 10 TABS cadastradas, o usuário ganha valor extra (ex: 10 TABS = R$15,00). Este bônus é limitado (pode ganhar uma vez por ciclo).',
    '5. Validade: Os códigos TABS e o saldo acumulado têm validade de 12 meses. Consulte o "HISTÓRICO DE TABS".'
];

const FAQ_ITEMS = [
    { question: 'Como eu resgato meu Gift Card?', answer: 'Seu saldo acumulado pode ser resgatado no Dashboard (botão RESGATAR SALDO AGORA) a partir de R$1,00.' },
    { question: 'Onde posso usar o Gift Card?', answer: 'O Gift Card é um cartão pré-pago da VTX e pode ser utilizado em toda a rede de parceiros credenciados.' },
    { question: 'O que é o Bônus de 10 TABS?', answer: 'É um incentivo. Ao atingir 10 códigos cadastrados, você recebe um valor extra para o seu Gift Card, incentivando o consumo.' }
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
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <HeroBanner />
            <Container maxWidth="xl">
            <DrinksSection />

            <Divider sx={{ my: 4 }} />

            {/* SEÇÃO 3: COMO FUNCIONA */}
            <Box sx={{ 
                mb: 8,
                py: 6,
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderRadius: 3,
                textAlign: 'center',
                border: '2px solid',
                borderColor: 'primary.main',
                boxShadow: '0 8px 32px rgba(229, 0, 0, 0.1)'
            }}>
                <Typography variant="h3" sx={{ mb: 6, color: 'primary.main' }}>
                    COMO FUNCIONA
                </Typography>
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: 4,
                    mb: 4
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            bgcolor: '#FF0000', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            mx: 'auto', 
                            mb: 2,
                            fontSize: '2rem',
                            fontWeight: 900
                        }}>
                            1
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 900 }}>CADASTRE</Typography>
                        <Typography variant="body2">Encontre o código TAB na embalagem e cadastre no app</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            bgcolor: '#FF0000', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            mx: 'auto', 
                            mb: 2,
                            fontSize: '2rem',
                            fontWeight: 900
                        }}>
                            2
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 900 }}>ACUMULE</Typography>
                        <Typography variant="body2">Cada TAB = R$1,00. A cada 10 TABS ganhe bônus extra!</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            bgcolor: '#FF0000', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            mx: 'auto', 
                            mb: 2,
                            fontSize: '2rem',
                            fontWeight: 900
                        }}>
                            3
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 900 }}>RESGATE</Typography>
                        <Typography variant="body2">Use seu saldo na rede VTX. Mínimo R$1,00 para resgate</Typography>
                    </Box>
                </Box>
            </Box>

            {/* SEÇÃO 4: REGULAMENTO */}
            <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>
                REGULAMENTO
            </Typography>
            <Paper elevation={3} sx={{ 
                p: 4, 
                mb: 6, 
                borderRadius: 3,
                border: '2px solid',
                borderColor: 'primary.main',
                bgcolor: 'background.paper'
            }}>
                {REGULAMENTO_TEXTO.map((item, index) => (
                    <Typography 
                        key={index} 
                        variant="body1" 
                        paragraph
                        sx={{ 
                            mb: 2,
                            '&::before': {
                                content: `"${index + 1}. "`,
                                fontWeight: 900,
                                color: 'primary.main'
                            }
                        }}
                    >
                        {item.replace(/^\d+\.\s*/, '')}
                    </Typography>
                ))}
            </Paper>

            {/* SEÇÃO 5: FAQ */}
            <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>
                PERGUNTAS FREQUENTES
            </Typography>
            <Box sx={{ mb: 6 }}>
                {FAQ_ITEMS.map((item, index) => (
                    <Accordion key={index} sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'primary.main',
                        bgcolor: 'background.paper',
                        '&:before': { display: 'none' }
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />}
                            sx={{ 
                                bgcolor: 'background.default',
                                borderRadius: '8px 8px 0 0',
                                '&.Mui-expanded': {
                                    borderRadius: '8px 8px 0 0'
                                }
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" color="primary.main">
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 3 }}>
                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                {item.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            {/* CALL TO ACTION FINAL */}
            <Box sx={{ 
                textAlign: 'center',
                py: 6,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 3,
                mb: 4,
                border: '3px solid',
                borderColor: 'secondary.main',
                boxShadow: '0 8px 32px rgba(229, 0, 0, 0.3)'
            }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    PRONTO PARA COMEÇAR?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
                    Compre seus Chilli Drinks e comece a acumular saldo agora mesmo!
                </Typography>
                <Button 
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingBagIcon />}
                    sx={{ 
                        bgcolor: 'secondary.main',
                        color: 'black',
                        py: 2,
                        px: 6,
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        '&:hover': {
                            bgcolor: 'secondary.dark',
                            transform: 'translateY(-2px)'
                        }
                    }}
                    href="https://www.mercadolivre.com.br/pagina/chillibeansdrinks"
                    target="_blank"
                >
                    COMPRAR CHILLI DRINKS
                </Button>
            </Box>
        </Container>
        <ChilliBrandFooter />
        </Box>
        </>
    );
}
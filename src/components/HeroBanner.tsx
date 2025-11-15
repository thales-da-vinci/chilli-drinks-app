'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';

export function HeroBanner() {
    const { user } = useAuth();
    const isAuthenticated = !!user;

    return (
        <Box id="top" sx={{
            backgroundImage: 'url(/assets/chilli-drinks-app-homepage-hero-banner-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            py: { xs: 6, md: 8 },
            minHeight: { xs: '70vh', md: '80vh' },
            display: 'flex',
            alignItems: 'center'
        }}>
            <Container maxWidth="lg">
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    gap: 4
                }}>
                    {/* Coluna Esquerda - Textos e CTAs */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h1" component="h1" sx={{
                            color: '#FFFFFF',
                            fontWeight: 900,
                            mb: 2,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            textTransform: 'uppercase',
                            lineHeight: 1.2
                        }}>
                            PROMOÇÃO CHILLI DRINKS
                        </Typography>
                        
                        <Typography variant="h5" sx={{
                            mb: 4,
                            fontWeight: 600,
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            lineHeight: 1.5
                        }}>
                            Cadastre seus códigos TAB e acumule saldo no seu Gift Card VTX!{' '}
                            <Box component="span" sx={{ color: '#FFB959', fontWeight: 700 }}>
                                Cada TAB = R$1,00
                            </Box>
                            {' '}
                            <Box component="span" sx={{ color: '#FFFFFF' }}>
                                + Bônus Especiais
                            </Box>
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                href={isAuthenticated ? "/dashboard" : "/login"}
                                sx={{
                                    bgcolor: '#000000',
                                    color: '#FFFFFF',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    borderRadius: '1000px',
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: '#333333',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                CADASTRAR TABS
                            </Button>
                            
                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                href="/regulamento-completo"
                                sx={{
                                    bgcolor: '#FFB959',
                                    color: '#000000',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    borderRadius: '1000px',
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: '#FFA940',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                VER REGULAMENTO
                            </Button>
                        </Box>
                    </Box>
                    
                    {/* Coluna Direita - Imagem de Produtos */}
                    <Box sx={{ 
                        flex: 1,
                        display: 'flex', 
                        justifyContent: 'center',
                        position: 'relative',
                        width: '100%',
                        maxWidth: 500,
                        height: { xs: 300, md: 400 }
                    }}>
                        <Image 
                            src="/assets/chilli-drinks-app-homepage-hero-produtos-chilli.png" 
                            alt="Produtos Chilli Drinks" 
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
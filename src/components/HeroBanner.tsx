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
                    <Box sx={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}>
                        {/* PROMOÇÃO (branco, itálico) */}
                        <Typography sx={{
                            color: '#FFFFFF',
                            fontWeight: 900,
                            fontStyle: 'italic',
                            fontSize: { xs: '3rem', md: '5rem' },
                            textTransform: 'uppercase',
                            lineHeight: 1,
                            mb: 1
                        }}>
                            PROMOÇÃO
                        </Typography>
                        
                        {/* CHILLI DRINKS TABS (preto) */}
                        <Typography sx={{
                            color: '#000000',
                            fontWeight: 700,
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            textTransform: 'uppercase',
                            lineHeight: 1.1,
                            mb: 2
                        }}>
                            CHILLI DRINKS TABS
                        </Typography>
                        
                        {/* Subtítulo (laranja) */}
                        <Typography sx={{
                            color: '#FFB959',
                            fontWeight: 900,
                            fontSize: { xs: '1rem', md: '1.5rem' },
                            textTransform: 'uppercase',
                            lineHeight: 1.3,
                            mb: 2,
                            maxWidth: 250
                        }}>
                            Cadastre seus códigos TAB e acumule saldo no seu Gift Card VTX!
                        </Typography>
                        
                        {/* Linha decorativa */}
                        <Box sx={{
                            width: 294,
                            height: 5,
                            bgcolor: '#FFB959',
                            mb: 3
                        }} />
                        
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                href={isAuthenticated ? "/dashboard" : "/login"}
                                sx={{
                                    bgcolor: '#000000 !important',
                                    color: '#FFFFFF !important',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    borderRadius: '1000px',
                                    textTransform: 'uppercase',
                                    border: 'none !important',
                                    boxShadow: 'none !important',
                                    '&:hover': {
                                        bgcolor: '#333333 !important',
                                        boxShadow: 'none !important'
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
                                    bgcolor: '#FFB959 !important',
                                    color: '#000000 !important',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    borderRadius: '1000px',
                                    textTransform: 'uppercase',
                                    border: 'none !important',
                                    boxShadow: 'none !important',
                                    '&:hover': {
                                        bgcolor: '#FFA940 !important',
                                        boxShadow: 'none !important'
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
'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';

export function HeroBanner() {
    const { user } = useAuth();
    const isAuthenticated = !!user;

    return (
        <>
            {/* Hero Banner Full-Width com Fundo Impactante */}
            <Box id="top" sx={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #E50000 100%)',
                py: { xs: 6, md: 10 },
                minHeight: { xs: '70vh', md: '80vh' },
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Textura de fundo sutil */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                    zIndex: 1
                }} />
                
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        {/* Título Principal Impactante */}
                        <Typography variant="h1" component="h1" sx={{
                            color: 'white',
                            fontWeight: 900,
                            mb: 2,
                            fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                            letterSpacing: '0.02em',
                            textTransform: 'uppercase',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}>
                            PROMOÇÃO
                        </Typography>
                        
                        <Typography variant="h2" component="h2" sx={{
                            color: 'secondary.main',
                            fontWeight: 900,
                            mb: 3,
                            fontSize: { xs: '2rem', md: '3rem', lg: '4rem' },
                            textTransform: 'uppercase',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}>
                            CHILLI DRINKS TABS
                        </Typography>
                        
                        {/* Pimenta/Eye Central */}
                        <Box sx={{ mb: 4 }}>
                            <Image
                                src="/assets/chilli-figurativa.png"
                                alt="Pimenta Chilli"
                                width={80}
                                height={80}
                                style={{
                                    filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5))'
                                }}
                            />
                        </Box>
                        
                        {/* Subtítulo */}
                        <Typography variant="h5" sx={{
                            color: 'white',
                            mb: 6,
                            fontWeight: 600,
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            lineHeight: 1.4,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                        }}>
                            Cadastre seus códigos TAB e acumule saldo no seu Gift Card VTX!<br/>
                            <Box component="span" sx={{ color: 'secondary.main', fontWeight: 900 }}>
                                Cada TAB = R$1,00 + Bônus Especiais
                            </Box>
                        </Typography>
                        
                        {/* CTAs Impactantes */}
                        <Box sx={{ 
                            display: 'flex', 
                            gap: 3, 
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                href={isAuthenticated ? "/dashboard" : "/login"}
                                sx={{
                                    bgcolor: 'secondary.main',
                                    color: 'black',
                                    fontWeight: 900,
                                    px: 6,
                                    py: 2,
                                    fontSize: '1.3rem',
                                    borderRadius: '30px',
                                    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
                                    '&:hover': {
                                        bgcolor: 'secondary.dark',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 8px 25px rgba(255, 215, 0, 0.6)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                CADASTRAR TABS
                            </Button>
                            
                            <Button
                                variant="outlined"
                                size="large"
                                component={Link}
                                href="/regulamento-completo"
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    fontWeight: 900,
                                    px: 6,
                                    py: 2,
                                    fontSize: '1.3rem',
                                    borderRadius: '30px',
                                    borderWidth: '2px',
                                    '&:hover': {
                                        bgcolor: 'white',
                                        color: 'primary.main',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                VER REGULAMENTO
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Barra Divisória com Pimenta (replicando exatamente .barra do site oficial) */}
            <Box className="barra" sx={{
                bgcolor: 'primary.main',
                py: 3,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    src="/assets/chilli-figurativa.png"
                    alt="Pimenta Chilli"
                    width={60}
                    height={60}
                    style={{
                        filter: 'brightness(0) invert(1)'
                    }}
                />
            </Box>
        </>
    );
}
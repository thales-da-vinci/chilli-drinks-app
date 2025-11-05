'use client';

import { AppBar, Toolbar, Box, Button, IconButton, Container, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth/useAuth';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export default function ChilliBrandHeader() {
    const { user, handleLogout } = useAuth();

    return (
        <AppBar 
            component="nav"
            position="sticky" 
            sx={{ 
                bgcolor: 'background.default', // Fundo BRANCO
                boxShadow: '0 4px 8px rgba(229, 0, 0, 0.2)', // Sombra vermelha marcante
                borderBottom: '3px solid',
                borderBottomColor: 'primary.main' // Faixa vermelha de destaque
            }}
        >
            <Container>
                <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
                    {/* Logo */}
                    <Box className="logo-w" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <Image 
                                src="/assets/logo-chilli-drinks.png" 
                                alt="Chilli Drinks" 
                                className="logo img-fluid"
                                width={180} 
                                height={60}
                                style={{ objectFit: 'contain' }}
                            />
                        </Link>
                    </Box>

                    {/* Menu Direita */}
                    <Box className="menu-w" sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2
                    }}>
                        <Box className="menu" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {/* Loja Oficial (replicando loja-top-link) */}
                            <Box className="loja-top-link">
                                <Button
                                    variant="text"
                                    size="small"
                                    href="https://www.mercadolivre.com.br/pagina/chillibeansdrinks"
                                    target="_blank"
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            color: 'primary.main'
                                        }
                                    }}
                                >
                                    Loja Oficial
                                </Button>
                            </Box>

                            {/* Instagram (replicando top-instagram) */}
                            <Box className="top-instagram">
                                <IconButton
                                    className="instagram"
                                    href="https://www.instagram.com/chillidrinksbrasil"
                                    target="_blank"
                                    sx={{
                                        color: 'text.primary',
                                        '&:hover': {
                                            color: 'primary.main'
                                        }
                                    }}
                                >
                                    <InstagramIcon className="svg-instagram" />
                                </IconButton>
                            </Box>

                            {/* Links Essenciais */}
                            {!user && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Button
                                        variant="text"
                                        size="small"
                                        component={Link}
                                        href="/regulamento-completo"
                                        sx={{
                                            color: 'text.primary',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            '&:hover': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        REGULAMENTO
                                    </Button>
                                </Box>
                            )}

                            {/* User Actions */}
                            {user ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        component={Link}
                                        href="/dashboard"
                                        startIcon={<AccountCircleIcon />}
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            fontWeight: 700,
                                            '&:hover': {
                                                bgcolor: 'primary.dark'
                                            }
                                        }}
                                    >
                                        DASHBOARD
                                    </Button>
                                    <IconButton
                                        onClick={handleLogout}
                                        sx={{
                                            color: 'text.primary',
                                            '&:hover': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        <LogoutIcon />
                                    </IconButton>
                                </Box>
                            ) : (
                                <Button
                                    variant="contained"
                                    size="small"
                                    component={Link}
                                    href="/login"
                                    sx={{
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
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
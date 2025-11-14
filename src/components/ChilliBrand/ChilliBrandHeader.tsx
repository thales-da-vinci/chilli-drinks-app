'use client';

import { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Container, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Image from 'next/image';

export default function ChilliBrandHeader() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navLinks = [
        { label: 'BEBIDAS & COQUETÉIS', href: '#bebidas' },
        { label: 'COMO FUNCIONA', href: '#como-funciona' },
        { label: 'REGULAMENTO', href: '#regulamento' },
        { label: 'PERGUNTAS FREQUENTES', href: '#faq' },
        { label: 'COMEÇAR', href: '#comecar' },
    ];

    return (
        <AppBar 
            position="static" 
            elevation={1}
            sx={{ 
                bgcolor: 'background.paper',
                color: 'text.primary'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
                    {/* Logo (Esquerda) */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                            <Image 
                                src="/assets/chilli-drinks-app-logo-circulo-vermelho.png" 
                                alt="Chilli Drinks" 
                                width={60} 
                                height={60}
                                style={{ objectFit: 'contain' }}
                            />
                        </Link>
                    </Box>

                    {/* Navegação (Centro) - Desktop */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    style={{ 
                                        textDecoration: 'none',
                                        color: '#6B6B6B',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    )}

                    {/* CTAs (Direita) - Desktop */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Button
                                variant="contained"
                                component={Link}
                                href="/login"
                                sx={{
                                    bgcolor: '#FFE100',
                                    color: '#000',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: '1000px',
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: '#E5CA00',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                CADASTRAR TABS
                            </Button>
                            <Button
                                variant="contained"
                                href="https://www.mercadolivre.com.br/pagina/chillibeansdrinks"
                                target="_blank"
                                sx={{
                                    bgcolor: '#D40B28',
                                    color: '#FFF',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: '1000px',
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: '#B00920',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                LOJA OFICIAL
                            </Button>
                            <IconButton
                                href="https://www.instagram.com/chillidrinksbrasil"
                                target="_blank"
                                sx={{ p: 0.5 }}
                            >
                                <Image 
                                    src="/assets/chilli-drinks-app-icon-instagram.png" 
                                    alt="Instagram" 
                                    width={32} 
                                    height={32}
                                />
                            </IconButton>
                        </Box>
                    )}

                    {/* Menu Hambúrguer - Mobile */}
                    {isMobile && (
                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                            sx={{ color: 'text.primary' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </Container>

            {/* Drawer Mobile */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 280, pt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 2 }}>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.href} disablePadding>
                                <ListItemButton 
                                    component={Link} 
                                    href={link.href}
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    <ListItemText primary={link.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Button
                            variant="contained"
                            component={Link}
                            href="/login"
                            fullWidth
                            sx={{
                                bgcolor: '#FFE100',
                                color: '#000',
                                fontWeight: 700,
                                borderRadius: '1000px',
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#E5CA00', boxShadow: 'none' }
                            }}
                        >
                            CADASTRAR TABS
                        </Button>
                        <Button
                            variant="contained"
                            href="https://www.mercadolivre.com.br/pagina/chillibeansdrinks"
                            target="_blank"
                            fullWidth
                            sx={{
                                bgcolor: '#D40B28',
                                color: '#FFF',
                                fontWeight: 700,
                                borderRadius: '1000px',
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#B00920', boxShadow: 'none' }
                            }}
                        >
                            LOJA OFICIAL
                        </Button>
                        <Button
                            variant="outlined"
                            href="https://www.instagram.com/chillidrinksbrasil"
                            target="_blank"
                            fullWidth
                            startIcon={
                                <Image 
                                    src="/assets/chilli-drinks-app-icon-instagram.png" 
                                    alt="Instagram" 
                                    width={24} 
                                    height={24}
                                />
                            }
                            sx={{
                                borderColor: '#6B6B6B',
                                color: '#6B6B6B',
                                '&:hover': { borderColor: '#000', color: '#000' }
                            }}
                        >
                            INSTAGRAM
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </AppBar>
    );
}
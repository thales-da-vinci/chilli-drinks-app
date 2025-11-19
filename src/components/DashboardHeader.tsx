'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Box, IconButton, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { useAuth } from '@/hooks/auth/useAuth';
import { AppDrawer } from '@/components/AppDrawer';
import { usePathname } from 'next/navigation';

export function DashboardHeader() {
  const { openModal } = useGiftCardModal();
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { text: 'BEBIDAS & COQUETÉIS', href: '/#bebidas-coqueteis' },
    { text: 'COMO FUNCIONA', href: '/#como-funciona' },
    { text: 'REGULAMENTO', href: '/#regulamento' },
    { text: 'PERGUNTAS FREQUENTES', href: '/#faq' },
  ];

  const isHome = pathname === '/';

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: '#FFFFFF',
          boxShadow: 'none',
          borderBottom: '1px solid #D8DCE0',
          height: '88px',
          display: 'flex',
          justifyContent: 'center',
          // FIX: Z-Index 1300 garante que fique acima de qualquer conteúdo da página
          zIndex: 1300
        }}
      >
        <Toolbar
          sx={{
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
            px: { xs: 2, md: 5 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Esquerda: Voltar + Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isHome && (
                <IconButton
                    edge="start"
                    aria-label="back"
                    component={Link}
                    href="/"
                    sx={{ color: '#000000', display: { xs: 'none', md: 'flex' } }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
            )}

            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src="/assets/chilli-drinks-app-logo-circulo-vermelho.png"
                  alt="Chilli Drinks Logo"
                  width={64}
                  height={64}
                  priority
                />
            </Link>
          </Box>

          {/* Centro: Links (Desktop) */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              gap: 4,
              mx: 4,
              flex: 1,
              justifyContent: 'center'
            }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.text}
                component={Link}
                href={link.href}
                sx={{
                  color: '#6B6B6B',
                  fontWeight: 700,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontFamily: 'Raleway, sans-serif',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#D40B28',
                  }
                }}
              >
                {link.text}
              </Typography>
            ))}
          </Box>

          {/* Direita: Ações */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* Botão Giftcard */}
            <Button
              onClick={openModal}
              variant="contained"
              disableElevation
              sx={{
                bgcolor: '#FFE100',
                color: '#000000',
                borderRadius: '1000px',
                fontWeight: 700,
                px: 3,
                py: 1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                border: 'none', // Sem borda
                boxShadow: 'none', // Sem sombra
                '&:hover': { bgcolor: '#FFCC00', boxShadow: 'none' },
                fontSize: { xs: '12px', md: '14px' },
                fontFamily: 'Raleway, sans-serif',
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              MEU GIFTCARD
            </Button>

            {/* Botão Cadastrar */}
            <Button
              component={Link}
              href={isAuthenticated ? '/dashboard#cadastro-tabs' : '/login'}
              variant="text"
              disableRipple
              sx={{
                color: '#6B6B6B',
                fontWeight: 700,
                borderRadius: '1000px',
                px: 2,
                py: 1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                border: 'none', // Sem borda
                '&:hover': { bgcolor: 'rgba(0,0,0,0.05)', color: '#D40B28' },
                fontSize: { xs: '12px', md: '14px' },
                fontFamily: 'Raleway, sans-serif',
                display: { xs: 'none', md: 'flex' }
              }}
            >
              CADASTRAR TAB
            </Button>

            {/* Menu Hambúrguer (Visível sempre em mobile, ou conforme necessidade) */}
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{
                color: '#000000',
                ml: 1,
                display: 'flex'
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <AppDrawer open={mobileOpen} onClose={handleDrawerToggle} />
    </>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Box, IconButton, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { AppDrawer } from '@/components/AppDrawer';
import { usePathname } from 'next/navigation';

export function DashboardHeader() {
  const { openModal } = useGiftCardModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => setMobileOpen((v) => !v);

  const navLinks = [
    { text: 'BEBIDAS & COQUETÉIS', href: '/#bebidas-coqueteis' },
    { text: 'COMO FUNCIONA', href: '/#como-funciona' },
    { text: 'REGULAMENTO', href: '/#regulamento' },
    { text: 'PERGUNTAS FREQUENTES', href: '/#faq' },
  ];

  const isHome = pathname === '/';

  const scrollToCadastro = () => {
    const el = document.getElementById('cadastro-tabs');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          zIndex: (theme) => theme.zIndex.drawer + 1,
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

          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              gap: 4,
              mx: 4,
              flex: 1,
              justifyContent: 'center',
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
                  '&:hover': { color: '#D40B28' },
                }}
              >
                {link.text}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              onClick={openModal}
              variant="contained"
              sx={{
                bgcolor: '#FFE100',
                color: '#000000',
                borderRadius: '1000px',
                fontWeight: 700,
                boxShadow: 'none',
                px: 3,
                py: 1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                border: 'none',
                '&:hover': { bgcolor: '#FFCC00', boxShadow: 'none' },
                fontSize: { xs: '12px', md: '14px' },
                fontFamily: 'Raleway, sans-serif',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              MEU GIFTCARD
            </Button>

            <Button
              onClick={scrollToCadastro}
              variant="text"
              sx={{
                color: '#6B6B6B',
                fontWeight: 700,
                borderRadius: '1000px',
                px: 2,
                py: 1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                border: 'none',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.05)', color: '#D40B28' },
                fontSize: { xs: '12px', md: '14px' },
                fontFamily: 'Raleway, sans-serif',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              CADASTRAR TAB
            </Button>

            <IconButton edge="end" aria-label="menu" onClick={handleDrawerToggle} sx={{ color: '#000000', ml: 1 }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <AppDrawer open={mobileOpen} onClose={handleDrawerToggle} />
    </>
  );
}
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Box, IconButton, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { AppDrawer } from '@/components/AppDrawer';
import { usePathname } from 'next/navigation';

export function DashboardHeader() {
  const { openModal } = useGiftCardModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Links de navegação apontando para a Home
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
          // Z-INDEX ALTO para ficar acima de qualquer card
          zIndex: (theme) => theme.zIndex.drawer + 1,
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
              justifyContent: 'center',
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
                  },
                }}
              >
                {link.text}
              </Typography>
            ))}
          </Box>

          {/* Direita: Ações */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              onClick={openModal}
              variant="contained"
              sx={{
                bgcolor: '#FFE100',
                color: '#000000',
                borderRadius: '1000px',
                fontWeight: 700,
                boxShadow: 'none',
                px: 3,
                py: 1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                border: 'none',
                '&:hover': { bgcolor: '#FFCC00', boxShadow: 'none' },
                fontSize: { xs: '12px', md: '14px' },
                fontFamily: 'Raleway, sans-serif',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              MEU GIFTCARD
            </Button>

            <Button
              component={Link}
              href="/dashboard#cadastro-tabs"
              variant="text"
              sx={{
                color: '#6B6B6B',
                fontWeight: 700,
                borderRadius: '1000px',
                px: 2,
                py: 1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                border: 'none',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.05)', color: '#D40B28' },
                fontSize: { xs: '12px', md: '14px' },
                fontFamily: 'Raleway, sans-serif',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              CADASTRAR TAB
            </Button>

            <IconButton
              edge="end"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ color: '#000000', ml: 1 }}
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
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Button, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { AppDrawer } from '@/components/AppDrawer'; // Make sure this import path is correct

export function DashboardHeader() {
  const theme = useTheme();
  const router = useRouter();
  const { openModal } = useGiftCardModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToCadastro = () => {
    const element = document.getElementById('cadastro-tabs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { text: 'BEBIDAS & COQUETÉIS', href: '/#bebidas-coqueteis' },
    { text: 'COMO FUNCIONA', href: '/#como-funciona' },
    { text: 'REGULAMENTO', href: '/#regulamento' },
    { text: 'PERGUNTAS FREQUENTES', href: '/faq' },
  ];

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
          zIndex: (theme) => theme.zIndex.drawer + 1
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
          {/* Left: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" passHref>
              <Image 
                src="/assets/chilli-drinks-app-logo-circulo-vermelho.png" 
                alt="Chilli Drinks Logo" 
                width={64}
                height={64}
                priority
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </Box>
          
          {/* Center: Navigation Links - Desktop Only */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
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
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontFamily: 'Raleway, sans-serif',
                  '&:hover': {
                    color: '#D40B28',
                  }
                }}
              >
                {link.text}
              </Typography>
            ))}
          </Box>
          
          {/* Right: Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={openModal}
              sx={{
                bgcolor: '#FFE100',
                color: '#000000',
                borderRadius: '1000px',
                fontWeight: 700,
                boxShadow: 'none',
                px: 4,
                py: 1.5,
                textTransform: 'uppercase',
                '&:hover': {
                  bgcolor: '#FFCC00',
                  boxShadow: 'none',
                },
                fontSize: '14px',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              MEU GIFTCARD
            </Button>
            
            <Button
              variant="contained"
              onClick={scrollToCadastro}
              sx={{
                bgcolor: '#D40B28',
                color: '#FFFFFF',
                borderRadius: '1000px',
                fontWeight: 700,
                boxShadow: 'none',
                px: 4,
                py: 1.5,
                textTransform: 'uppercase',
                '&:hover': {
                  bgcolor: '#B30000',
                  boxShadow: 'none',
                },
                fontSize: '14px',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              CADASTRAR TAB
            </Button>
          </Box>
          
          {/* Mobile Menu Button */}
          <IconButton 
            edge="end" 
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ 
              display: { xs: 'flex', md: 'none' },
              color: '#000000',
              ml: 2
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      {/* Mobile Drawer */}
      <AppDrawer 
        open={mobileOpen} 
        onClose={handleDrawerToggle}
      />
    </>
  );
}
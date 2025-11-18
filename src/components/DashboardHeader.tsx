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
        navLinks={navLinks}
      />
    </>
  );
}
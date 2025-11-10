'use client';

import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth/useAuth';
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { GiftCardModal } from '@/components/GiftCardModal';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { AppDrawer } from '@/components/AppDrawer';
import { useState } from 'react';

export function AppHeader() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !!user;
  const { openModal } = useGiftCardModal();
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isAuthLoading) {
    return null;
  }

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" elevation={1} sx={{ bgcolor: 'primary.dark' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link href="/" passHref style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Image 
                src="/assets/logo-chilli-drinks.png" 
                alt="Chilli Drinks" 
                width={150} 
                height={50}
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </Box>

          {/* Botões de Acesso Rápido */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, mr: 2 }}>
            <Button
              variant="outlined"
              size="small"
              component={Link}
              href="/dashboard"
              startIcon={<AddIcon />}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '0.8rem',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              CADASTRAR TAB
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={openModal}
              startIcon={<CardGiftcardIcon />}
              sx={{
                bgcolor: 'secondary.main',
                color: 'black',
                fontWeight: 700,
                fontSize: '0.8rem',
                '&:hover': {
                  bgcolor: 'secondary.dark'
                }
              }}
            >
              MEU GIFTCARD
            </Button>
          </Box>

          <Box>
            <IconButton
              size="large"
              edge="end"
              sx={{ color: 'white' }}
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
      
      <GiftCardModal />
      <AppDrawer open={isDrawerOpen} onClose={toggleDrawer(false)} />
    </>
  );
}
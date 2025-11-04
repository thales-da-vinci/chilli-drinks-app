'use client';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import Link from 'next/link';
import HistoryIcon from '@mui/icons-material/History'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LiveHelpIcon from '@mui/icons-material/LiveHelp'; 
import VpnKeyIcon from '@mui/icons-material/VpnKey'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd'; 
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { useAuth } from '@/hooks/auth/useAuth';
import { TabsHistoryModal } from '@/components/TabsHistoryModal';
import { useState } from 'react'; 

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function AppDrawer({ open, onClose }: AppDrawerProps) {
  const { user, isLoading, handleLogout } = useAuth();
  const { openModal } = useGiftCardModal();
  const isAuthenticated = !!user;
  const [isTabsHistoryModalOpen, setIsTabsHistoryModalOpen] = useState(false);
  
  // Mock data para o histórico (em produção viria de uma API)
  const mockTabsHistory = [
    { id: 1, code: 'UUID-9f4a-4d2b-a7e8', value: 1.00, date: '2025-10-28', status: 'Resgatado' },
    { id: 2, code: 'UUID-c8e1-5e9c-b1f4', value: 1.00, date: '2025-10-29', status: 'Resgatado' },
    { id: 3, code: 'UUID-6a5d-2b7e-c9f0', value: 1.00, date: '2025-10-29', status: 'Resgatado' },
    { id: 4, code: 'UUID-f3b2-1a4c-d5e6', value: 12.00, date: '2025-10-30', status: 'Resgatado (C/ Bônus)' }
  ];

  // Se estiver carregando, renderiza um estado de loading
  if (isLoading) {
    return (
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 250, p: 3, bgcolor: 'primary.dark', color: 'white' }}>
          <Typography variant="h6" fontWeight="bold" color="primary.light">
            MENU CHILLI DRINKS
          </Typography>
        </Box>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Carregando menu...</Typography>
        </Box>
      </Drawer>
    );
  }

  const handleGiftCardClick = () => {
    openModal();
    onClose(); 
  };
  
  const handleTabsHistoryClick = () => {
    setIsTabsHistoryModalOpen(true);
    onClose();
  };
  
  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box 
        sx={{ 
            width: 250, 
            p: 3, 
            bgcolor: 'primary.dark',
            color: 'white' 
        }} 
        role="presentation"
      >
        <Typography variant="h6" fontWeight="bold" color="primary.light">
          MENU CHILLI DRINKS
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
          {isAuthenticated ? user.name?.toUpperCase() || 'CLIENTE' : 'VISITANTE'} 
        </Typography>
      </Box>
      <List sx={{ pt: 0 }}>
        
        {!isAuthenticated && (
          <>
            <ListItem disablePadding>
              <Link href="/login" passHref style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton onClick={onClose}>
                  <ListItemIcon>
                    <VpnKeyIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="ENTRAR" />
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem disablePadding>
              <Link href="/register" passHref style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton onClick={onClose}>
                  <ListItemIcon>
                    <PersonAddIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="CRIAR CONTA" />
                </ListItemButton>
              </Link>
            </ListItem>
            
            <Divider />
          </>
        )}

        {isAuthenticated && (
            <>
                <ListItem disablePadding>
                  <Link href="/meus-dados" passHref style={{ textDecoration: 'none', width: '100%' }}>
                    <ListItemButton onClick={onClose}>
                      <ListItemIcon>
                        <AccountCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="MEUS DADOS" />
                    </ListItemButton>
                  </Link>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={handleGiftCardClick}>
                    <ListItemIcon>
                      <CreditCardIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="MEU GIFTCARD" />
                  </ListItemButton>
                </ListItem>
                
                <ListItem disablePadding>
                  <ListItemButton onClick={handleTabsHistoryClick}>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="HISTÓRICO DE TABS" />
                  </ListItemButton>
                </ListItem>
                
                <Divider />
            </>
        )}

        <ListItem disablePadding>
          <Link href="/regulamento" passHref style={{ textDecoration: 'none', width: '100%' }}>
            <ListItemButton onClick={onClose}>
              <ListItemIcon>
                <ArticleIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="REGULAMENTO" />
            </ListItemButton>
          </Link>
        </ListItem>
        
        <ListItem disablePadding>
          <Link href="/faq" passHref style={{ textDecoration: 'none', width: '100%' }}>
            <ListItemButton onClick={onClose}>
              <ListItemIcon>
                <LiveHelpIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="TIRE SUAS DÚVIDAS" />
            </ListItemButton>
          </Link>
        </ListItem>

        <Divider />

        {isAuthenticated && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemIcon>
                <ExitToAppIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="SAIR" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      
      {/* Modal Histórico de TABS */}
      <TabsHistoryModal 
        open={isTabsHistoryModalOpen}
        onClose={() => setIsTabsHistoryModalOpen(false)}
        tabsHistory={mockTabsHistory}
      />
    </Drawer>
  );
}
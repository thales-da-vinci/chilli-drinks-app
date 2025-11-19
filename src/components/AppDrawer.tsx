'use client';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography, IconButton } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';

// Icons
import HistoryIcon from '@mui/icons-material/History'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LiveHelpIcon from '@mui/icons-material/LiveHelp'; 
import VpnKeyIcon from '@mui/icons-material/VpnKey'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd'; 
import LocalBarIcon from '@mui/icons-material/LocalBar';
import InfoIcon from '@mui/icons-material/Info';

import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { useAuth } from '@/hooks/auth/useAuth';
import { TabsHistoryModal } from '@/components/TabsHistoryModal';
import { useUserCodesQuery } from '@/hooks/codes/useUserCodesQuery';
import { useState } from 'react'; 

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function AppDrawer({ open, onClose }: AppDrawerProps) {
  const { user, isLoading, handleLogout } = useAuth();
  const { openModal } = useGiftCardModal();
  const { data: userCodes = [] } = useUserCodesQuery();
  const isAuthenticated = !!user;
  const [isTabsHistoryModalOpen, setIsTabsHistoryModalOpen] = useState(false);
  
  // Mapeia os códigos do MSW para o formato do modal
  const tabsHistory = userCodes.map(code => ({
    id: code.id,
    code: code.code,
    value: code.value,
    date: code.createdAt,
    status: code.redeemedAt ? 'Resgatado' : 'Em Espera'
  }));

  const handleGiftCardClick = () => {
    openModal();
    onClose(); 
  };
  
  const handleTabsHistoryClick = () => {
    setIsTabsHistoryModalOpen(true);
  };
  
  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };

  // Estilo comum para os itens da lista
  const listItemSx = {
    my: 0.5,
    borderRadius: '8px',
    '&:hover': {
        bgcolor: '#FFF0F2', // Fundo vermelho bem claro
        '& .MuiListItemIcon-root': { color: '#D40B28' },
        '& .MuiTypography-root': { color: '#D40B28' }
    }
  };

  const listItemTextSx = {
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: '14px',
    color: '#2B2B2B'
  };

  const iconColor = '#D40B28'; // Vermelho Chilli

  return (
    <>
    <Drawer 
        anchor="right" 
        open={open} 
        onClose={onClose}
        sx={{ zIndex: 1400 }} // Z-Index alto para ficar acima do Header (1300)
        PaperProps={{
            sx: {
                width: '100%',
                maxWidth: '320px',
                bgcolor: '#FFFFFF',
                borderTopLeftRadius: { xs: '16px', md: '0' },
                borderBottomLeftRadius: { xs: '16px', md: '0' },
                boxShadow: '-4px 0 24px rgba(0,0,0,0.1)'
            }
        }}
    >
      {/* Cabeçalho do Menu */}
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <IconButton 
            onClick={onClose} 
            sx={{ position: 'absolute', top: 16, right: 16, color: '#9CA3AF' }}
        >
            <CloseIcon />
        </IconButton>

        <Box sx={{ mb: 2, mt: 2 }}>
            <Image 
                src="/assets/chilli-drinks-app-logo-circulo-vermelho.png"
                alt="Chilli Drinks"
                width={80}
                height={80}
            />
        </Box>
        
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, fontSize: '14px', color: '#6B7280' }}>
            Olá,
        </Typography>
        <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '20px', color: '#000000', textAlign: 'center' }}>
            {isAuthenticated && user?.name ? user.name.split(' ')[0].toUpperCase() : 'VISITANTE'}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#F3F4F6', mb: 2 }} />

      <Box sx={{ px: 2, pb: 4, flexGrow: 1, overflowY: 'auto' }}>
        <List>
            {/* ITENS PÚBLICOS */}
            <ListItem disablePadding sx={listItemSx}>
              <Link href="/#bebidas-coqueteis" passHref style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton onClick={onClose}>
                  <ListItemIcon sx={{ minWidth: 40, color: iconColor }}><LocalBarIcon /></ListItemIcon>
                  <ListItemText primaryTypographyProps={{ sx: listItemTextSx }} primary="BEBIDAS & COQUETÉIS" />
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem disablePadding sx={listItemSx}>
              <Link href="/#como-funciona" passHref style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton onClick={onClose}>
                  <ListItemIcon sx={{ minWidth: 40, color: iconColor }}><InfoIcon /></ListItemIcon>
                  <ListItemText primaryTypographyProps={{ sx: listItemTextSx }} primary="COMO FUNCIONA" />
                </ListItemButton>
              </Link>
            </ListItem>

            {/* ITENS DE AUTENTICAÇÃO (SE NÃO LOGADO) */}
            {!isAuthenticated && (
              <>
                <Divider sx={{ my: 2, borderColor: '#F3F4F6' }} />
                <ListItem disablePadding sx={listItemSx}>
                  <Link href="/login" passHref style={{ textDecoration: 'none', width: '100%' }}>
                    <ListItemButton onClick={onClose}>
                      <ListItemIcon sx={{ minWidth: 40, color: iconColor }}><VpnKeyIcon /></ListItemIcon>
                      <ListItemText primaryTypographyProps={{ sx: listItemTextSx }} primary="ENTRAR" />
                    </ListItemButton>
                  </Link>
                </ListItem>

                <ListItem disablePadding sx={listItemSx}>
                  <Link href="/register" passHref style={{ textDecoration: 'none', width: '100%' }}>
                    <ListItemButton onClick={onClose}>
                      <ListItemIcon sx={{ minWidth: 40, color: iconColor }}><PersonAddIcon /></ListItemIcon>
                      <ListItemText primaryTypographyProps={{ sx: listItemTextSx }} primary="CRIAR CONTA" />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            )}

            {/* ITENS DE USUÁRIO LOGADO */}
            {isAuthenticated && (
                <>
                    <Divider sx={{ my: 2, borderColor: '#F3F4F6' }} />
                    
                    <ListItem disablePadding sx={listItemSx}>
                      <Link href="/meus-dados" passHref style={{ textDecoration: 'none', width: '100%' }}>
                        <ListItemButton onClick={onClose}>
                          <ListItemIcon sx={{ minWidth: 40, color: iconColor }}><AccountCircleIcon /></ListItemIcon>
                          <ListItemText primaryTypographyProps={{ sx: listItemTextSx }} primary="MEUS DADOS" />
                        </ListItemButton>
                      </Link>
                    </ListItem>

                    <ListItem disablePadding sx={listItemSx}>
                      <ListItemButton onClick={handleGiftCardClick}>
                        <ListItemIcon sx={{ minWidth: 40, color: iconColor }}><CreditCardIcon /></ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextSx }} primary="MEU GIFTCARD" />
                      </ListItemButton>
                    </ListItem>
                    
                    <ListItem disablePadding sx={listItemSx}>
                      <ListItemButton onClick={handleTabsHistoryClick}>
                        <ListItemIcon sx={{ minWidth: 40, color: iconColor }}><HistoryIcon /></ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextSx }} primary="HISTÓRICO DE TABS" />
                      </ListItemButton>
                    </ListItem>
                </>
            )}

            <Divider sx={{ my: 2, borderColor: '#F3F4F6' }} />

            <ListItem disablePadding sx={listItemSx}>
              <Link href="/#regulamento" passHref style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton onClick={onClose}>
                  <ListItemIcon sx={{ minWidth: 40, color: iconColor }}><ArticleIcon /></ListItemIcon>
                  <ListItemText primaryTypographyProps={{ sx: listItemTextSx }} primary="REGULAMENTO" />
                </ListItemButton>
              </Link>
            </ListItem>
            
            <ListItem disablePadding sx={listItemSx}>
              <Link href="/faq" passHref style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton onClick={onClose}>
                  <ListItemIcon sx={{ minWidth: 40, color: iconColor }}><LiveHelpIcon /></ListItemIcon>
                  <ListItemText primaryTypographyProps={{ sx: listItemTextSx }} primary="TIRE SUAS DÚVIDAS" />
                </ListItemButton>
              </Link>
            </ListItem>

            {isAuthenticated && (
              <Box sx={{ mt: 4 }}>
                  <ListItem disablePadding>
                    <ListItemButton 
                        onClick={handleLogoutClick}
                        sx={{
                            borderRadius: '8px',
                            border: '1px solid #EF4444',
                            color: '#EF4444',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: '#FEF2F2',
                                border: '1px solid #DC2626',
                                color: '#DC2626'
                            }
                        }}
                    >
                      <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: 'inherit' }}><ExitToAppIcon /></ListItemIcon>
                      <ListItemText primaryTypographyProps={{ sx: { fontWeight: 700 } }} primary="SAIR DO APP" />
                    </ListItemButton>
                  </ListItem>
              </Box>
            )}
        </List>
      </Box>
      
      {/* Modal Histórico de TABS */}
      <TabsHistoryModal 
        open={isTabsHistoryModalOpen}
        onClose={() => setIsTabsHistoryModalOpen(false)}
        tabsHistory={tabsHistory}
      />
    </Drawer>
    </>
  );
}
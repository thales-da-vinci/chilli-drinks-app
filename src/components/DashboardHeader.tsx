import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Box, IconButton, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';

export function DashboardHeader() {
  return (
    <AppBar position="fixed" sx={{ bgcolor: '#D40B28', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
        {/* Esquerda: Seta + Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton edge="start" color="inherit" aria-label="back" component={Link} href="/">
            <ArrowBackIosNewIcon sx={{ color: '#FFB959' }} />
          </IconButton>
          <Image src="/assets/logo-chilli-branco.png" alt="Chilli Drinks Logo" width={120} height={30} />
        </Box>
        {/* Direita: Botões + Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', borderRadius: '1000px', fontWeight: 700, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' } }}>
            CADASTRAR TAB
          </Button>
          <Button variant="contained" sx={{ bgcolor: '#FFB959', color: '#D40B28', borderRadius: '1000px', fontWeight: 700, '&:hover': { bgcolor: '#FFCC66' } }}>
            MEU GIFTCARD
          </Button>
        </Box>
        <IconButton edge="end" color="inherit" aria-label="menu" sx={{ display: { xs: 'block', md: 'none' } }}>
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

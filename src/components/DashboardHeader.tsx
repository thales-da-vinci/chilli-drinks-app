import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Box, IconButton, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';

export function DashboardHeader() {
  return (
    <AppBar position="fixed" sx={{ 
      bgcolor: '#FFFFFF', 
      boxShadow: 'none', 
      borderBottom: '1px solid #D8DCE0',
      zIndex: (theme) => theme.zIndex.drawer + 1
    }}>
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        px: { xs: 2, md: 5 },
        minHeight: '80px' // Garante altura consistente
      }}>
        {/* Left: Back button + Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            edge="start" 
            aria-label="back" 
            component={Link} 
            href="/"
            sx={{ color: '#000000' }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Image 
            src="/assets/chilli-drinks-app-logo-circulo-vermelho.png" 
            alt="Chilli Drinks Logo" 
            width={48} 
            height={48} 
            priority
          />
        </Box>
        
        {/* Right: Buttons */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          alignItems: 'center', 
          gap: 3 
        }}>
          <Button 
            variant="text" 
            sx={{ 
              color: '#6B6B6B', 
              fontWeight: 700, 
              textTransform: 'uppercase',
              '&:hover': {
                backgroundColor: 'transparent',
                opacity: 0.8
              }
            }}
          >
            CADASTRAR TAB
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#FFB959', 
              color: '#000', 
              borderRadius: '1000px', 
              fontWeight: 700, 
              boxShadow: 'none',
              px: 4,
              '&:hover': { 
                bgcolor: '#FFCC66',
                boxShadow: 'none'
              }
            }}
          >
            MEU GIFTCARD
          </Button>
        </Box>
        
        {/* Mobile Menu */}
        <IconButton 
          edge="end" 
          aria-label="menu" 
          sx={{ 
            display: { xs: 'block', md: 'none' },
            color: '#000000'
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Box, IconButton, Button, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export function DashboardHeader() {
  useTheme(); // Theme is used by useMediaQuery internally
  
  const navLinks = [
    { text: 'BEBIDAS & COQUETÉIS', href: '#' },
    { text: 'COMO FUNCIONA', href: '#' },
    { text: 'REGULAMENTO', href: '#' },
    { text: 'PERGUNTAS FREQUENTES', href: '#' },
  ];

  return (
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
          <Image 
            src="/assets/chilli-drinks-app-logo-circulo-vermelho.png" 
            alt="Chilli Drinks Logo" 
            width={64}
            height={64}
            priority
          />
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
  );
}

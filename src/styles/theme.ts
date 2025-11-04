import { createTheme } from '@mui/material/styles';

// Cores oficiais da identidade visual Chilli Beans Drinks (TEMA CLARO)
const CHILLI_RED = '#E50000';      // Vermelho vibrante da marca
const CHILLI_BLACK = '#000000';     // Preto da marca
const CHILLI_WHITE = '#FFFFFF';     // Branco (fundo principal)
const CHILLI_GOLD = '#FFD700';      // Dourado para CTAs e bônus

// Cores dos produtos
const PRODUCT_RED = '#E50000';     // +ENERGIA, +BELEZA
const PRODUCT_PURPLE = '#8B00FF';  // +DEFESA, +SALVAÇÃO
const PRODUCT_BLUE = '#0066FF';    // +FOCO
const PRODUCT_GREEN = '#00CC66';   // +RELAX
const PRODUCT_ORANGE = '#FF6B00';  // Alcoólicos

export const chilliDrinksTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: CHILLI_RED,
      light: '#FF3333',
      dark: '#CC0000',
      contrastText: CHILLI_WHITE,
    },
    secondary: {
      main: CHILLI_GOLD,
      light: '#FFED4E',
      dark: '#B8860B',
      contrastText: CHILLI_BLACK,
    },
    background: {
      default: CHILLI_WHITE,
      paper: CHILLI_WHITE,
    },
    text: {
      primary: CHILLI_BLACK,
      secondary: '#666666',
    },
    error: {
      main: PRODUCT_RED,
    },
    warning: {
      main: PRODUCT_ORANGE,
    },
    info: {
      main: PRODUCT_BLUE,
    },
    success: {
      main: PRODUCT_GREEN,
    },
  },
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: '3rem',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    h2: {
      fontWeight: 900,
      fontSize: '2.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    h3: {
      fontWeight: 800,
      fontSize: '2rem',
      textTransform: 'uppercase',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      textTransform: 'uppercase',
    },
    button: {
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 700,
          textTransform: 'uppercase',
          padding: '12px 24px',
        },
        contained: {
          background: CHILLI_RED,
          color: CHILLI_WHITE,
          border: `2px solid ${CHILLI_BLACK}`,
          borderRadius: '25px',
          fontWeight: 900,
          fontSize: '1rem',
          padding: '12px 30px',
          '&:hover': {
            background: CHILLI_BLACK,
            color: CHILLI_WHITE,
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          },
          transition: 'all 0.3s ease',
        },
        outlined: {
          border: `2px solid ${CHILLI_RED}`,
          color: CHILLI_RED,
          borderRadius: '25px',
          fontWeight: 900,
          fontSize: '1rem',
          padding: '12px 30px',
          '&:hover': {
            background: CHILLI_RED,
            color: CHILLI_WHITE,
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&.Mui-focused fieldset': {
              borderColor: CHILLI_RED,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: CHILLI_WHITE,
          color: CHILLI_BLACK,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          borderBottom: `2px solid ${CHILLI_RED}`,
        },
      },
    },
  },
});

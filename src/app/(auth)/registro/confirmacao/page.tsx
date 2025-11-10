import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';

export default function ConfirmacaoPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <CheckCircleOutlineIcon
          sx={{
            fontSize: 80,
            color: 'success.main',
            mb: 2,
          }}
        />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro Realizado!
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Verifique seu e-mail para validar sua conta e começar a cadastrar seus códigos TAB.
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Não recebeu o e-mail? Verifique sua caixa de spam ou entre em contato com o suporte.
        </Typography>
        
        <Link href="/login" passHref style={{ textDecoration: 'none' }}>
          <Button variant="contained" size="large" fullWidth>
            Voltar para o Login
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}

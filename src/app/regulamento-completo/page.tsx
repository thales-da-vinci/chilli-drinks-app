import { Box, Typography, Container, Paper, Button } from '@mui/material';
import Link from 'next/link';

export default function RegulamentoCompleto() {
  return (
    <Box sx={{ minHeight: '100vh', py: 4, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', textAlign: 'center' }}>
            🌶️ Regulamento Completo - Chilli Drinks Rewards
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }}>
            <strong>1. SOBRE O PROGRAMA</strong><br />
            O Chilli Drinks Rewards é um programa de fidelidade que permite acumular créditos através do cadastro de códigos únicos (UUIDs) encontrados em produtos participantes.
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.8 }}>
            <strong>2. COMO FUNCIONA</strong><br />
            • Cada código válido cadastrado equivale a R$ 1,00 de crédito<br />
            • Os créditos são acumulados em sua conta pessoal<br />
            • O saldo pode ser resgatado através do botão "Resgatar" no sistema<br />
            • O valor é creditado em seu Gift Card Pré-Pago VTEX
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.8 }}>
            <strong>3. REGRA DE BÔNUS</strong><br />
            • A cada 10 códigos cadastrados, você recebe um bônus adicional<br />
            • O bônus é aplicado automaticamente em sua conta<br />
            • Acompanhe seu progresso através da barra de progresso no dashboard
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.8 }}>
            <strong>4. TERMOS E CONDIÇÕES</strong><br />
            • Cada código pode ser usado apenas uma vez<br />
            • Códigos inválidos ou já utilizados não geram crédito<br />
            • O programa pode ser alterado ou encerrado a qualquer momento<br />
            • Consulte sempre este regulamento para atualizações
          </Typography>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              component={Link} 
              href="/" 
              variant="contained" 
              color="primary" 
              size="large"
            >
              Voltar ao Início
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
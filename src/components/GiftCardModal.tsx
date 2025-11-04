'use client';

import { Dialog, DialogTitle, DialogContent, Button, Typography, Box, Paper, Divider, CircularProgress } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useGiftCardModal } from '@/contexts/GiftCardModalContext';
import { useState } from 'react';

export function GiftCardModal() {
  const { isModalOpen, closeModal, accumulatedBalance } = useGiftCardModal();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUseGiftCard = async () => {
    setIsProcessing(true);
    
    console.log(`Chamando API VTEX com valor: R$${accumulatedBalance.toFixed(2)}`);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    alert('Sucesso! O Gift Card VTEX foi gerado e o ID será exibido aqui. Você será redirecionado para a VTEX para utilizá-lo.');
    closeModal();
  };

  return (
    <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <CreditCardIcon sx={{ mr: 1 }} />
        SEU GIFT CARD PRÉ-PAGO
      </DialogTitle>
      <DialogContent sx={{ py: 4 }}>
        
        <Paper elevation={6} sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3, 
            background: 'linear-gradient(45deg, #FF0000 30%, #FF8C00 90%)',
            color: 'white' 
        }}>
            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                SALDO DISPONÍVEL
            </Typography>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                R$ {accumulatedBalance.toFixed(2).replace('.', ',')}
            </Typography>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">
                    CARTÃO PRÉ-PAGO
                </Typography>
                <Typography variant="body2">
                    CPF: ***.***.***-**
                </Typography>
            </Box>
        </Paper>

        <Typography variant="body1" gutterBottom>
            Seu saldo de **R$ {accumulatedBalance.toFixed(2).replace('.', ',')}** está pronto para ser convertido em um Gift Card VTEX e utilizado em nossa loja.
        </Typography>

        <Divider sx={{ my: 3 }} />
        
        <Box textAlign="center">
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleUseGiftCard}
                disabled={accumulatedBalance === 0 || isProcessing}
                sx={{ py: 1.5, px: 5 }}
            >
                {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'UTILIZAR NA VTEX'}
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Ao clicar, você gera o Gift Card e será redirecionado para a loja.
            </Typography>
        </Box>

      </DialogContent>
    </Dialog>
  );
}
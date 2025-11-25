// src/components/dashboard/CodeRegistrationForm.tsx

'use client';

import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useCouponMutation, CouponSchema } from '@/hooks/codes/useCouponMutation';

type CodeFormInputs = { code: string };

export function CodeRegistrationForm() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState('');
  const [successCode, setSuccessCode] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CodeFormInputs>({
    resolver: zodResolver(CouponSchema),
  });

  const { mutate: registerCode, isPending } = useCouponMutation();

  const onSubmit: SubmitHandler<CodeFormInputs> = (data) => {
    console.log('Form submit:', data);
    registerCode(data, {
      onSuccess: (response) => {
        console.log('Sucesso ao registrar:', response);
        setSuccessCode(data.code);
        setModalType('success');
        setModalMessage(`Código TAB ${data.code} adicionado com sucesso!`);
        setOpenModal(true);
        reset();
      },
      onError: (error: any) => {
        console.error('Erro ao registrar:', error);
        setModalType('error');
        setModalMessage(error?.response?.data?.message || 'Erro ao adicionar o Código TAB. Verifique se o código é válido.');
        setOpenModal(true);
      }
    });
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', mb: 2 }}
    >
      <TextField
        {...register('code')}
        label="Insira o Código TAB (UUID)"
        fullWidth
        error={!!errors.code}
        helperText={errors.code ? errors.code.message : 'O código de 12 caracteres está localizado no lacre da lata. Exemplo: A1B2C3D4E5F6'}
        variant="outlined"
        disabled={isPending}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        endIcon={<SendIcon />}
        disabled={isPending}
        sx={{ minWidth: 150, height: '56px', mt: 0, mb: 0 }}
      >
        {isPending ? 'Adicionando...' : 'ADICIONAR'}
      </Button>
      
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {modalType === 'success' ? (
            <>
              <CheckCircleIcon color="success" />
              Sucesso!
            </>
          ) : (
            <>
              <CheckCircleIcon color="error" />
              Erro
            </>
          )}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {modalMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenModal(false)} 
            variant="contained"
            color={modalType === 'success' ? 'primary' : 'error'}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
// src/components/forms/ControlledTextField.tsx
'use client';

import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

// Define as props que o componente aceita, combinando as do RHF com as do MUI
// Omitimos props que serão injetadas pelo RHF
type ControlledTextFieldProps<T extends FieldValues> = Omit<
    TextFieldProps, 
    'name' | 'defaultValue' 
> & 
    UseControllerProps<T>;

/**
 * Componente TextField do MUI conectado ao React Hook Form via Controller.
 * Garante que a validação (Zod) e o estado do formulário sejam sincronizados.
 */
export function ControlledTextField<T extends FieldValues>({
  name,
  control,
  ...rest
}: ControlledTextFieldProps<T>) {
  return (
    // Controller: É o "controlador" do RHF
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <TextField
          {...rest}
          name={name}
          // Garante que o valor seja string vazia em vez de null/undefined para o input MUI
          value={value === null || value === undefined ? '' : value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref} 
          fullWidth
          variant="outlined"
          
          // Tratamento de Erro: Recebe a mensagem do Zod via RHF
          error={!!error}
          helperText={error ? error.message : rest.helperText}
          
          // Estilo: Margem inferior para espaçamento consistente
          sx={{ mb: 2, ...rest.sx }} 
        />
      )}
    />
  );
}

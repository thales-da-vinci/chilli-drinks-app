// src/components/dashboard/WaitingCodeList.tsx

'use client';

import { List, ListItem, ListItemText, IconButton, Box, Divider, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface WaitingCode {
  id: string;
  value: number;
}

interface WaitingCodeListProps {
  codes: WaitingCode[];
  onRemoveCode: (id: string) => void;
}

export function WaitingCodeList({ codes, onRemoveCode }: WaitingCodeListProps) {
  if (codes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
        <Typography variant="body2">
          Nenhum Código TAB em espera. Adicione códigos acima para começar a acumular saldo.
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
      {codes.map((code, index) => (
        <Box key={code.id}>
          <ListItem
            secondaryAction={
              <IconButton 
                edge="end" 
                aria-label="remover" 
                onClick={() => onRemoveCode(code.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`Código TAB: ${code.id.substring(0, 8)}...`}
              secondary={`Valor acumulado: R$${code.value.toFixed(2).replace('.', ',')}`}
            />
          </ListItem>
          {index < codes.length - 1 && <Divider component="li" />}
        </Box>
      ))}
    </List>
  );
}
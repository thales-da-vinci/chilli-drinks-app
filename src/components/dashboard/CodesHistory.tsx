// src/components/dashboard/CodesHistory.tsx
'use client';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  CircularProgress, 
  Box 
} from '@mui/material';
import { useUserCodesQuery } from '@/hooks/codes/useUserCodesQuery';

export function CodesHistory() {
  const { data: userCodes, isLoading, isError } = useUserCodesQuery();

  if (isLoading) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
          Histórico de Códigos
        </Typography>
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (isError) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
          Histórico de Códigos
        </Typography>
        <Typography variant="body2" color="error">
          Erro ao carregar histórico de códigos
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
        Histórico de Códigos
      </Typography>
      
      {!userCodes || userCodes.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Nenhum código registrado ainda
        </Typography>
      ) : (
        <List>
          {userCodes.map((code) => (
            <ListItem key={code.id} divider>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1" component="span" fontWeight="bold">
                      {code.code}
                    </Typography>
                    <Chip 
                      label={code.redeemedAt ? 'Resgatado' : 'Disponível'} 
                      color={code.redeemedAt ? 'success' : 'primary'}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Box component="span">
                    <Typography variant="body2" component="span" color="text.secondary" sx={{ display: 'block' }}>
                      Valor: R$ {(code.value / 100).toFixed(2)}
                    </Typography>
                    <Typography variant="caption" component="span" color="text.secondary" sx={{ display: 'block' }}>
                      Registrado em: {new Date(code.createdAt).toLocaleDateString('pt-BR')}
                    </Typography>
                    {code.redeemedAt && (
                      <Typography variant="caption" component="span" color="text.secondary" sx={{ display: 'block' }}>
                        Resgatado em: {new Date(code.redeemedAt).toLocaleDateString('pt-BR')}
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
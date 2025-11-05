'use client';

import { useState } from 'react';
import { useCouponMutation } from '@/hooks/codes/useCouponMutation';
import { 
  Paper, 
  Typography, 
  Tabs, 
  Tab, 
  Box, 
  TextField, 
  Button,
  Card,
  CardContent
} from '@mui/material';
import { QrCodeScanner } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function RegisterTabsForm() {
  const [tabValue, setTabValue] = useState(0);
  const [manualCode, setManualCode] = useState('');
  const { mutate: registerCode, isPending } = useCouponMutation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmitManual = () => {
    if (!manualCode.trim()) return;
    
    registerCode({ code: manualCode }, {
      onSuccess: () => {
        alert('Código registrado com sucesso!');
        setManualCode('');
      },
      onError: () => {
        alert('Erro ao registrar código. Verifique se é válido.');
      }
    });
  };

  const handleActivateQR = () => {
    console.log('Ativando câmera QR Code...');
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Cadastrar Nova TAB
        </Typography>
        
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Código Manual" />
          <Tab label="QR Code" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Código da TAB"
              placeholder="Ex: XX12345678"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmitManual}
              disabled={!manualCode.trim() || isPending}
              sx={{ mt: 1 }}
            >
              {isPending ? 'Cadastrando...' : 'Cadastrar TAB'}
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Card sx={{ textAlign: 'center', py: 4 }}>
            <CardContent>
              <QrCodeScanner sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Escaneie o QR Code da TAB
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Posicione a câmera sobre o código QR
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleActivateQR}
              >
                Ativar Câmera
              </Button>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Paper>
  );
}
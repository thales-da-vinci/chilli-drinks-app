'use client';

import { Box, Typography, LinearProgress, IconButton, Tooltip, Modal, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { BonusRulesModal } from './BonusRulesModal';

interface BonusProgressProps {
  codesCount: number;
  targetCodes?: number;
}

export function BonusProgress({ codesCount, targetCodes = 10 }: BonusProgressProps) {
  const [showRulesModal, setShowRulesModal] = useState(false);
  
  const progress = (codesCount % targetCodes) / targetCodes * 100;
  const codesInCurrentCycle = codesCount % targetCodes;
  const codesRemaining = targetCodes - codesInCurrentCycle;

  return (
    <>
      <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Progresso do Bônus
          </Typography>
          <Tooltip title="Ver regras do bônus">
            <IconButton size="small" onClick={() => setShowRulesModal(true)}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {codesInCurrentCycle} de {targetCodes} Códigos TABS
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'medium' }}>
          {codesRemaining === 0 ? 
            '🎉 Bônus disponível!' : 
            `Faltam ${codesRemaining} Códigos TABS para o próximo bônus`
          }
        </Typography>
      </Box>

      <BonusRulesModal open={showRulesModal} onClose={() => setShowRulesModal(false)} />
    </>
  );
}
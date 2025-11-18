 'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const steps = [
  { number: '01', title: 'CADASTRE-SE', text: 'Encontre o código TAB na embalagem e cadastre no app' },
  { number: '02', title: 'ACUMULE', text: 'Cada TAB = R$1,00. A cada 10 TABS ganhe bônus extra!' },
  { number: '03', title: 'RESGATE', text: 'Use seu saldo na rede VTX. Mínimo R$1,00 para resgate' },
];

const HowItWorksSection: React.FC = () => {
  return (
    <Box component="section" id="como-funciona" sx={{ backgroundColor: '#E6EAEE', py: 10, width: '100%' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 4, md: '10%', lg: '12%' } }}>
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 6, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
          <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, fontSize: { xs: '2rem', md: '3rem' }, color: '#D40B28', textTransform: 'uppercase' }}>
            COMO
          </Typography>
          <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: { xs: '3rem', md: '4rem' }, color: '#000000', lineHeight: 0.9, textTransform: 'uppercase' }}>
            FUN-
          </Typography>
          <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: { xs: '3rem', md: '4rem' }, color: '#000000', lineHeight: 0.9, textTransform: 'uppercase' }}>
            CIONA
          </Typography>
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
          {steps.map((step) => (
            <Box key={step.number} sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', p: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', minHeight: 220 }}>
              <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: '#D40B28', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '2rem' }}>{step.number}</Typography>
              </Box>
              <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: '1.5rem', mt: 2, textTransform: 'uppercase' }}>{step.title}</Typography>
              <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, fontSize: '1.1rem', mt: 1 }}>{step.text}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;

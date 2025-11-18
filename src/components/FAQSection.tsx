"use client";

import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ_DATA = [
  { q: 'Como eu resgato meu Gift Card?', a: 'Seu saldo acumulado pode ser resgatado no Dashboard (botão RESGATAR SALDO AGORA) a partir de R$1,00.' },
  { q: 'Onde posso usar o Gift Card?', a: 'O Gift Card é um cartão pré-pago da VTX e pode ser utilizado em toda a rede de parceiros credenciados.' },
  { q: 'O que é o Bônus de 10 TABS?', a: 'É um incentivo. Ao atingir 10 códigos cadastrados, você recebe um valor extra para o seu Gift Card, incentivando o consumo.' }
];

const FAQSection: React.FC = () => {
  return (
    <Box component="section" id="faq" sx={{ bgcolor: '#FFFFFF', py: 10 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 4, md: '10%' } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography sx={{ color: '#D40B28', fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 0.9, textTransform: 'uppercase' }}>
            PERGUNTAS
          </Typography>
          <Typography sx={{ color: '#000000', fontFamily: 'Raleway, sans-serif', fontWeight: 500, fontSize: { xs: '2rem', md: '3.5rem' }, textTransform: 'uppercase' }}>
            FREQUENTES
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {FAQ_DATA.map((item, idx) => (
            <Accordion key={idx} disableGutters sx={{ boxShadow: 'none', borderBottom: '1px solid #E6E6E6', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#000000' }} />} sx={{ bgcolor: 'transparent' }}>
                <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 500, fontSize: '1.3rem', color: '#000000' }}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontFamily: 'Raleway, sans-serif', color: '#2B2B2B', fontSize: '1.1rem' }}>{item.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;

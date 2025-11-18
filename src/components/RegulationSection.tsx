'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

const rules = [
  { num: '01', title: 'Objetivo:', text: 'A promoção Chilli Drinks TABS recompensa clientes por cadastrar os códigos únicos encontrados nas embalagens de bebidas participantes. Cada código (UUID) contribui para o saldo do Gift Card.' },
  { num: '02', title: 'Acúmulo:', text: 'Cada TAB cadastrada equivale a R$1,00 em saldo. O saldo é acumulativo e fica visível no "MEU GIFTCARD" no menu.' },
  { num: '03', title: 'Resgate Mínimo:', text: 'O resgate do Gift Card pode ser efetuado a partir de R$1,00 e o saldo pode ser usado na rede de parceiros VTX.' },
  { num: '04', title: 'Bônus:', text: 'A cada 10 TABS cadastradas, o usuário ganha valor extra (ex: 10 TABS = R$15,00). Este bônus é limitado.' },
  { num: '05', title: 'Validade:', text: 'Os códigos TABS e o saldo acumulado têm validade de 12 meses. Consulte o "HISTÓRICO DE TABS".' },
];

const RegulationSection: React.FC = () => {
  const chilliImg = '/assets/chilli-drinks-app-homepage-regulamento-pimenta-eye.png';

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: '#FFFFFF', pb: 10, overflow: 'hidden', width: '100%' }}>
      {/* Faixa colorida */}
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 180, background: 'linear-gradient(180deg, #E6EAEE 50%, #FFFFFF 50%)' }}>
        <Box sx={{ display: 'flex', width: '100%', maxWidth: '1200px', position: 'relative', alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 0', display: 'flex', height: 16 }}>
            <Box sx={{ width: '16.66%', bgcolor: '#BE0822', height: '100%' }} />
            <Box sx={{ width: '16.66%', bgcolor: '#FF6895', height: '100%' }} />
            <Box sx={{ width: '16.66%', bgcolor: '#E6EAEE', height: '100%' }} />
            <Box sx={{ width: '16.66%', bgcolor: '#071218', height: '100%' }} />
            <Box sx={{ width: '16.66%', bgcolor: '#00AAA0', height: '100%' }} />
            <Box sx={{ width: '16.66%', bgcolor: '#FFB959', height: '100%' }} />
          </Box>
        </Box>

        {/* Pimenta posicionada sobre a faixa, à esquerda */}
        <Box sx={{ position: 'absolute', left: 24, top: 40 }}>
          {/* se a imagem existir, renderiza */}
          <Image src={chilliImg} alt="pimenta" width={140} height={140} />
        </Box>
      </Box>

      {/* Conteúdo */}
      <Container maxWidth="xl" sx={{ px: { xs: 4, md: '10%' }, mt: 8 }}>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
          {/* Título na primeira célula */}
          <Box>
            <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: { xs: '2.5rem', md: '5rem' }, lineHeight: 0.8, color: '#000000', textTransform: 'uppercase' }}>
              REGU<br/>LAME<br/>NTO
            </Typography>
          </Box>

          {/* Regras - 2..6 (map 5 itens) */}
          {rules.map((rule) => (
            <Box key={rule.num} sx={{ borderBottom: '1px solid #D8DCE0', pb: 4 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'baseline' }}>
                <Typography sx={{ color: '#D40B28', fontWeight: 900, fontSize: '1.5rem' }}>{rule.num}.</Typography>
                <Typography sx={{ color: '#000000', fontWeight: 900, fontSize: '1.25rem' }}>{rule.title}</Typography>
              </Box>
              <Typography sx={{ color: '#2B2B2B', fontSize: '1.1rem', lineHeight: 1.5, fontFamily: 'Raleway, sans-serif' }}>{rule.text}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default RegulationSection;

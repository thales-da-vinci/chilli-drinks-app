"use client";

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Image from 'next/image';

const ReadyToStartSection: React.FC = () => {
  const bg = '/assets/chilli-drinks-app-homepage-pronto-para-comecar-banner-bg.jpg';
  const appImg = '/assets/chilli-drinks-app-homepage-pronto-para-comecar-app-mercadolivre.png';

  return (
    <Box component="section" sx={{ width: '100%', bgcolor: '#D40B28', backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 4, md: '10%' } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 6,
            alignItems: 'center',
            width: '100%'
          }}
        >
          {/* Coluna Esquerda - Imagem do App */}
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Image src={appImg} alt="App Chilli Drinks" style={{ width: '100%', height: 'auto', maxWidth: 420 }} width={420} height={420} />
          </Box>

          {/* Coluna Direita - Texto e CTA */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', color: '#FFFFFF' }}>
            <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: { xs: '3rem', md: '4rem' }, lineHeight: 1, color: '#FFFFFF' }}>
              PRONTO PARA
            </Typography>
            <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: { xs: '4rem', md: '8rem' }, lineHeight: 0.8, color: '#FFB959', textTransform: 'uppercase' }}>
              COMEÇAR
            </Typography>

            <Typography sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 500, fontSize: { xs: '1.5rem', md: '2rem' }, mt: 4, mb: 4, color: '#FFFFFF' }}>
              Compre seus Chilli Drinks e comece<br/>a acumular saldo agora mesmo!
            </Typography>

            <Button
              variant="contained"
              href="https://www.mercadolivre.com.br/pagina/chillibeansdrinks"
              target="_blank"
              sx={{ bgcolor: '#0080FF', color: '#FFFFFF', borderRadius: '1000px', py: 2, px: 6, fontSize: '1.5rem', fontWeight: 700, width: '100%', maxWidth: '420px', boxShadow: 'none', border: 'none', '&:hover': { bgcolor: '#0066cc', boxShadow: 'none' } }}
            >
              COMPRAR CHILLI DRINKS
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ReadyToStartSection;

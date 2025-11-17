'use client';

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import Image from 'next/image';

// --- GIP TEHKNÉ MASTER INSTRUCTION: FASE 7.1 (Seção Bebidas) ---
// CONTEXTO: A Hero Section está concluída. Agora iniciaremos a Seção 1 "Bebidas & Coquetéis".
// OBJETIVO: Criar o componente `DrinksSection.tsx` implementando o design de grid de produtos (Figma) com responsividade e animações de "Shake" no hover.

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

const drinks = [
  { title: '+ENERGIA', img: '/assets/chilli-drinks-app-homepage-bebidas-e-coqueteis-chilli-beans-energia.png' },
  { title: '+BELEZA', img: '/assets/chilli-drinks-app-homepage-bebidas-e-coqueteis-chilli-beans-beleza.png' },
  { title: '+FOCO', img: '/assets/chilli-drinks-app-homepage-bebidas-e-coqueteis-chilli-beans-foco.png' },
  { title: '+RELAX', img: '/assets/chilli-drinks-app-homepage-bebidas-e-coqueteis-chilli-beans-relax.png' },
  { title: '+DEFESA', img: '/assets/chilli-drinks-app-homepage-bebidas-e-coqueteis-chilli-beans-defesa.png' },
  { title: '+SALVAÇÃO', img: '/assets/chilli-drinks-app-homepage-bebidas-e-coqueteis-chilli-beans-salvacao.png' },
];

const DrinksSection: React.FC = () => {
  return (
    <Box component="section" id="bebidas-coqueteis" sx={{ backgroundColor: '#FFFFFF', py: 10 }}>
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontFamily: 'Raleway',
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '3.5rem' },
            color: '#000000',
            textTransform: 'uppercase',
            textAlign: 'center',
            mb: 6,
          }}
        >
          BEBIDAS FUNCIONAIS & COQUETÉIS
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {drinks.map((drink, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  border: '1px solid #D40B28',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover .drink-image': {
                    animation: `${shake} 0.5s ease-in-out`,
                  },
                }}
              >
                <Box className="drink-image" sx={{ mb: 2 }}>
                  <Image src={drink.img} alt={drink.title} width={250} height={250} style={{ objectFit: 'contain' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Raleway',
                    fontWeight: 700,
                    fontSize: '2rem',
                    color: '#000000',
                    marginTop: 2,
                  }}
                >
                  {drink.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DrinksSection;
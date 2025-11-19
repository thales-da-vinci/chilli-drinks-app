'use client';

import Image from 'next/image';
import { Box, Typography, IconButton, Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function ChilliBrandFooter() {
  return (
    <Box component="footer" sx={{ bgcolor: '#F6F7F7', py: 6, px: { xs: 4, md: 10 } }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4
      }}>
        {/* Coluna 1 - Logo */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Image src="/assets/chilli-drinks-app-logo-circulo-vermelho.png" alt="Logo Chilli Beans" width={100} height={100} />
        </Box>

        {/* Coluna 2 - Links */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, pl: { xs: 4, md: 0 } }}>
          <Button href="#bebidas-coqueteis" variant="text" sx={{ color: '#6B6B6B', fontFamily: 'Raleway, sans-serif', fontWeight: 700, textTransform: 'uppercase' }}>BEBIDAS & COQUETÉIS</Button>
          <Button href="#como-funciona" variant="text" sx={{ color: '#6B6B6B', fontFamily: 'Raleway, sans-serif', fontWeight: 700, textTransform: 'uppercase' }}>COMO FUNCIONA</Button>
          <Button href="/regulamento" variant="text" sx={{ color: '#6B6B6B', fontFamily: 'Raleway, sans-serif', fontWeight: 700, textTransform: 'uppercase' }}>REGULAMENTO</Button>
          <Button href="#faq" variant="text" sx={{ color: '#6B6B6B', fontFamily: 'Raleway, sans-serif', fontWeight: 700, textTransform: 'uppercase' }}>PERGUNTAS FREQUENTES</Button>
          <Button href="/login" variant="text" sx={{ color: '#6B6B6B', fontFamily: 'Raleway, sans-serif', fontWeight: 700, textTransform: 'uppercase' }}>COMEÇAR</Button>
        </Box>

        {/* Coluna 3 - Social & Copyright */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' }, gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton href="https://www.instagram.com/chillidrinksbrasil" target="_blank" sx={{ p: 0 }}>
              <InstagramIcon sx={{ color: '#000000' }} />
            </IconButton>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ textAlign: { xs: 'center', md: 'right' }, color: '#000000', fontFamily: 'Raleway, sans-serif', display: 'block' }}>
              © 2024 Chilli Beans. Todos os direitos reservados.
            </Typography>
            <Typography variant="caption" sx={{ textAlign: { xs: 'center', md: 'right' }, color: '#000000', fontFamily: 'Raleway, sans-serif', display: 'block' }}>
              'Se não provoca, não é Chilli Beans'
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
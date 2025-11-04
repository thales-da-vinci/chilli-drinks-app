'use client';

import { Box, Container, Typography, Link, IconButton, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EmailIcon from '@mui/icons-material/Email';

export default function ChilliBrandFooter() {
    return (
        <Box 
            component="footer" 
            sx={{ 
                bgcolor: '#000000',
                color: 'white',
                py: 6,
                mt: 8
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 2fr 1fr' },
                    gap: 4,
                    alignItems: 'center'
                }}>
                    {/* Logo */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 900,
                                color: '#FF0000',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                mb: 2
                            }}
                        >
                            CHILLI
                        </Typography>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 900,
                                color: 'white',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}
                        >
                            DRINKS
                        </Typography>
                    </Box>

                    {/* Links */}
                    <Box sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        gap: { xs: 2, md: 4 },
                        textAlign: 'center'
                    }}>
                        <Link
                            href="mailto:falecom@evonix.com.br"
                            sx={{
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                '&:hover': {
                                    color: '#FF0000',
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Fale Conosco
                        </Link>
                        <Link
                            href="https://www.mercadolivre.com.br/pagina/chillibeansdrinks"
                            target="_blank"
                            sx={{
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                '&:hover': {
                                    color: '#FF0000',
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Loja Online
                        </Link>
                    </Box>

                    {/* Social */}
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-end' },
                        gap: 2
                    }}>
                        <IconButton
                            href="https://www.instagram.com/chillidrinksbrasil"
                            target="_blank"
                            sx={{
                                color: 'white',
                                bgcolor: '#FF0000',
                                '&:hover': {
                                    bgcolor: 'white',
                                    color: '#FF0000',
                                    transform: 'scale(1.1)'
                                }
                            }}
                        >
                            <InstagramIcon />
                        </IconButton>
                        <IconButton
                            href="https://www.mercadolivre.com.br/pagina/chillibeansdrinks"
                            target="_blank"
                            sx={{
                                color: 'white',
                                bgcolor: '#FF0000',
                                '&:hover': {
                                    bgcolor: 'white',
                                    color: '#FF0000',
                                    transform: 'scale(1.1)'
                                }
                            }}
                        >
                            <ShoppingBagIcon />
                        </IconButton>
                        <IconButton
                            href="mailto:falecom@evonix.com.br"
                            sx={{
                                color: 'white',
                                bgcolor: '#FF0000',
                                '&:hover': {
                                    bgcolor: 'white',
                                    color: '#FF0000',
                                    transform: 'scale(1.1)'
                                }
                            }}
                        >
                            <EmailIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Divider sx={{ my: 4, bgcolor: '#333333' }} />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: '#818181',
                            fontSize: '0.8rem'
                        }}
                    >
                        © 2024 Chilli Beans. Todos os direitos reservados.
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: '#818181',
                            fontSize: '0.8rem',
                            mt: 1,
                            fontStyle: 'italic'
                        }}
                    >
                        "Se não provoca, não é Chilli Beans"
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
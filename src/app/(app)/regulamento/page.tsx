'use client';

import { Container, Typography, Paper, Box, Button } from '@mui/material';
import Link from 'next/link';

const REGULAMENTO_TEXTO = [
    '1. Objetivo: A promoção Chilli Drinks TAB recompensa clientes por cadastrar os códigos únicos encontrados nas embalagens de bebidas participantes. Cada código (UUID) contribui para o saldo do Gift Card.',
    '2. Acúmulo: Cada TAB cadastrada equivale a R$1,00 em saldo. O saldo é acumulativo e fica visível no "MEU GIFTCARD" no menu.',
    '3. Resgate Mínimo: O resgate do Gift Card pode ser efetuado a partir de R$1,00 e o saldo pode ser usado na rede de parceiros VTX.',
    '4. Bônus: A cada 10 TABS cadastradas, o usuário ganha valor extra (ex: 10 TABS = R$15,00). Este bônus é limitado (pode ganhar uma vez por ciclo).',
    '5. Validade: Os códigos TAB e o saldo acumulado têm validade de 12 meses a partir da data de cadastro/acúmulo. Consulte sempre o "HISTÓRICO DE TABS" para ver detalhes de validade.',
];

export default function RegulamentoPage() {
    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="white" sx={{ mb: 4 }}>
                Regulamento Completo da Promoção
            </Typography>
            
            <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'background.paper', border: '2px solid', borderColor: 'primary.main' }}>
                {REGULAMENTO_TEXTO.map((item, index) => (
                    <Typography 
                        key={index} 
                        variant="body1" 
                        paragraph
                        sx={{ mb: 1.5, fontWeight: index === 0 ? 'bold' : 'regular' }}
                    >
                        {item}
                    </Typography>
                ))}
            </Paper>
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button 
                    component={Link} 
                    href="/" 
                    variant="outlined" 
                    color="primary" 
                    size="large" 
                >
                    Voltar para a Home
                </Button>
            </Box>
        </Container>
        </Box>
    );
}
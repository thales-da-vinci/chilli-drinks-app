'use client';

import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ_ITEMS = [
    { question: '1. Como eu resgato meu Gift Card?', answer: 'Seu saldo acumulado pode ser resgatado no Dashboard (botão RESGATAR SALDO AGORA) a partir de R$1,00. O valor será creditado no seu Gift Card digital.' },
    { question: '2. Onde posso usar o Gift Card?', answer: 'O Gift Card é um cartão pré-pago da VTX e pode ser utilizado em toda a rede de parceiros credenciados que aceitam a bandeira VTX, em território nacional.' },
    { question: '3. O que é o Bônus de 10 TABS?', answer: 'É um incentivo. Ao atingir 10 códigos TABs cadastrados, você recebe um valor extra fixo para o seu Gift Card, incentivando o consumo e o cadastro de TABS. Este bônus é limitado.' },
    { question: '4. Qual a validade dos meus códigos TABs?', answer: 'Os códigos TABs e o saldo acumulado têm validade de 12 meses a partir da data de cadastro. Consulte o "HISTÓRICO DE TABS" para ver detalhes de validade.' },
    { question: '5. Tentei cadastrar um código, mas deu erro. O que fazer?', answer: 'Verifique se o código (UUID) foi digitado corretamente, sem espaços ou caracteres especiais. Se o problema persistir, o código pode ter sido usado por outro cliente ou ser inválido. Entre em contato com nosso suporte.' },
    { question: '6. Posso transferir meu saldo para outra pessoa?', answer: 'O saldo do Gift Card é pessoal e intransferível, vinculado ao CPF cadastrado na plataforma.' },
    { question: '7. Como faço para alterar meus dados cadastrais?', answer: 'Você pode alterar seu nome e senha na seção "MEUS DADOS" no menu lateral. O CPF e E-mail não podem ser alterados diretamente.' },
];

export default function FaqPage() {
    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="white" sx={{ mb: 4 }}>
                Tire Suas Dúvidas (FAQ)
            </Typography>
            
            <Box sx={{ mb: 6 }}>
                {FAQ_ITEMS.map((item, index) => (
                    <Accordion key={index} sx={{ mb: 1, boxShadow: 1, borderRadius: 1, bgcolor: 'background.paper', border: '1px solid', borderColor: 'primary.main' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon color="primary" />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{ bgcolor: 'background.default' }}
                        >
                            <Typography variant="subtitle1" fontWeight="medium">
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2" color="text.secondary">
                                {item.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Container>
        </Box>
    );
}
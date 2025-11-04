import { Container, Box } from '@mui/material';
import RegisterTabsForm from '@/components/RegisterTabsForm';

export default function RegisterTabsPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <RegisterTabsForm />
      </Box>
    </Container>
  );
}
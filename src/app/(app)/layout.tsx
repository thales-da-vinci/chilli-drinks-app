import { ReactNode } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { AppHeader } from '@/components/layout/AppHeader';
import { Box } from '@mui/material';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthGuard>
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'grey.100'
      }}>
        <AppHeader />
        <Box component="main" sx={{ 
          flexGrow: 1, 
          pt: 8,
        }}>
          {children}
        </Box>
      </Box>
    </AuthGuard>
  );
}
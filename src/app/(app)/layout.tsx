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
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/assets/background-pattern.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 0,
        }
      }}>
        <Box sx={{ 
          position: 'relative', 
          zIndex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          overflowY: 'auto'
        }}>
          <AppHeader />
          <Box component="main" sx={{ 
            flexGrow: 1, 
            pt: 4,
            pb: 4
          }}>
            {children}
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
}
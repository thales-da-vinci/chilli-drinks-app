
"use client";
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Box } from '@mui/material';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';
  return (
    <AuthGuard>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: isDashboard
            ? 'url(/assets/chilli-drinks-app-dashboard-banner-bg.jpg)'
            : 'url(/assets/background-pattern.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: isDashboard ? 'rgba(0,0,0,0.60)' : 'rgba(0,0,0,0.85)',
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <DashboardHeader />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            position: 'relative',
            zIndex: 1,
            pt: '88px',
            pb: 4,
          }}
        >
          {children}
        </Box>
      </Box>
    </AuthGuard>
  );
}
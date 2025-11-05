import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ThemeRegistry } from '@/components/ThemeRegistry/ThemeRegistry';
import { QueryProvider } from '@/components/providers/QueryProvider';
import ClientAppWrapper from '@/components/ClientAppWrapper';
import { GiftCardModalProvider } from '@/contexts/GiftCardModalContext';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'CHILLI DRINKS TAG',
  description: 'Cadastre seus códigos TAG e troque por saldo no seu Gift Card VTX!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <AuthProvider>
            <GiftCardModalProvider>
              <ClientAppWrapper>
                <QueryProvider>
                  {children}
                </QueryProvider>
              </ClientAppWrapper>
            </GiftCardModalProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ThemeRegistry } from '@/components/ThemeRegistry/ThemeRegistry';
import { QueryProvider } from '@/components/providers/QueryProvider';
import ClientAppWrapper from '@/components/ClientAppWrapper';
import { GiftCardModalProvider } from '@/contexts/GiftCardModalContext';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'CHILLI DRINKS TAG - Bebidas Funcionais & Coquetéis Alcoólicos',
  description: 'Cadastre seus códigos TAG e troque por saldo no seu Gift Card VTX! Chilli Beans Drinks é mais que bebida, é movimento.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <GiftCardModalProvider>
            <AuthProvider>
              <ClientAppWrapper>
                <QueryProvider>
                  {children}
                </QueryProvider>
              </ClientAppWrapper>
            </AuthProvider>
          </GiftCardModalProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
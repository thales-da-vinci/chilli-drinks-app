import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Raleway } from 'next/font/google';
import { ThemeRegistry } from '@/components/ThemeRegistry/ThemeRegistry';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { GiftCardModalProvider } from '@/contexts/GiftCardModalContext';
import { TabsHistoryModalProvider } from '@/contexts/TabsHistoryModalContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ClientAppWrapper from '@/components/ClientAppWrapper';

export const metadata: Metadata = {
  title: 'CHILLI DRINKS TAG',
  description: 'Cadastre seus códigos TAG e troque por saldo no seu Gift Card VTX!',
};

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-raleway',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={raleway.className} suppressHydrationWarning>
        <ThemeRegistry>
          <AuthProvider>
            <GiftCardModalProvider>
              <TabsHistoryModalProvider>
                <ClientAppWrapper>
                  <QueryProvider>
                    {children}
                  </QueryProvider>
                </ClientAppWrapper>
              </TabsHistoryModalProvider>
            </GiftCardModalProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
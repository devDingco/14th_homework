import './globals.css';
import ConditionalHeader from '../commons/header/conditional-header';
import { ReactNode } from 'react';
import ApolloSetting from '../providers/apollo-setting';
import { AuthProvider } from '../contexts/AuthContext';

export const metadata = {
  title: 'Trip Talk',
  description: '여행 커뮤니티 플랫폼',
  icons: {
    icon: '/images/logo.png',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ApolloSetting>
          <AuthProvider>
            <ConditionalHeader />
            {children}
          </AuthProvider>
        </ApolloSetting>
      </body>
    </html>
  );
}

import { Metadata } from 'next';
import './globals.css';
import 'antd/dist/antd.variable.min.css';
import { StyledComponentsRegistry } from '@/shared/ui/AntdRegistry';

export const metadata: Metadata = {
  title: 'Главная страница',
  description: '123',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body>
        <StyledComponentsRegistry>
            {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
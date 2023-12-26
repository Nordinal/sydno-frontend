import { Metadata } from 'next';
import { StyledComponentsRegistry } from '@/shared/ui/AntdRegistry';
import { MainLayoutServer } from '@/layout/MainLayout/layout-server';
import 'antd/dist/reset.css';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Главная страница',
  description: 'Продажа и аренда судна',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  }
};

export default async function RootLayout(props: {
  children: React.ReactNode;
}) {

  return (
    <html>
      <head />
      <body>
        <StyledComponentsRegistry>
            <MainLayoutServer>
              {props.children}
            </MainLayoutServer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
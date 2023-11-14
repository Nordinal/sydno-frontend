
import { Metadata } from 'next';
import './globals.css';
import 'antd/dist/antd.variable.min.css';
import { StyledComponentsRegistry } from '@/shared/ui/AntdRegistry';
import { instanceApi } from '@/shared/configs/instanceAxios';
import { AxiosError, AxiosPromise } from 'axios';
import { MainLayoutServer } from '@/layout/MainLayout/layout-server';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Главная страница',
  description: '123',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  }
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: {
    user: object
  }
}) {

  return (
    <html lang='ru'>
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
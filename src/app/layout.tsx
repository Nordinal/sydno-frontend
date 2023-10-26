
import { Metadata } from 'next';
import './globals.css';
import 'antd/dist/antd.variable.min.css';
import { StyledComponentsRegistry } from '@/shared/ui/AntdRegistry';
import { instanceApi } from '@/shared/configs/instanceAxios';
import { AxiosError, AxiosPromise } from 'axios';
import { MainLayoutServer } from '@/main/Layout/layout-server';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Главная страница',
  description: '123',
  icons: {
    icon: '/favicon.ico',
  }
};

const getUser = async (): Promise<object | AxiosError | void> => {
  try {
    return await instanceApi.get('/api/user')
  }
  catch (e: unknown) {
    if(e instanceof AxiosError) {
      return e;
    }
  }
}

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
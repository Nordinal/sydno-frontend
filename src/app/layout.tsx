import { Metadata } from 'next';
import './globals.css';
import 'antd/dist/antd.variable.min.css';
import { StyledComponentsRegistry } from '@/shared/ui/AntdRegistry';
import { instanceApi } from '@/shared/configs/instanceAxios';

export const metadata: Metadata = {
  title: 'Главная страница',
  description: '123',
  icons: {
    icon: '/favicon.ico',
  }
};

const getUser = async () => {
  try {
    return await instanceApi.get('/user')
  }
  catch (e) {
    return e;
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    user: object
  }
}) {
  const user = await getUser();
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
'use client';
import { useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Header } from '@/layout/MainLayout/Header/ui';
import { useUser } from '@/entities/user/model';
import { useShallow } from 'zustand/react/shallow';
import s from './styles.module.css';
import ruRU from 'antd/lib/locale/ru_RU';
import 'antd/dist/antd.variable.min.css';
import '@/app/globals.css';

// ConfigProvider.config({
//     theme: {
//         primaryColor: '#34A8FF'
//     }
// })

const theme = {
    token: {
      fontSize: 38,
      colorPrimary: '#52c41a',
    },
  };

export const MainLayoutClient = ({children}: {children: React.ReactNode}) => {
    const { fetch, hasUser } = useUser(useShallow(state => ({fetch: state.fetch, hasUser: state.hasUser })));

    useEffect(() => {
        if(!hasUser()) fetch();
    });

    return (
        <ConfigProvider locale={ruRU} theme={theme}>
            <Layout style={{background: 'white', minHeight: '100vh'}}>
                <Header />
                <Layout.Content className={s['sydno-container']}>
                    {children}
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    );
} 
'use client';
import { useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Header } from '@/layout/MainLayout/Header/ui';
import { useUser } from '@/entities/user/model';
import { useShallow } from 'zustand/react/shallow';
import './styles.css';
import ruRU from 'antd/lib/locale/ru_RU';

ConfigProvider.config({
    theme: {
        primaryColor: '#34A8FF'
    }
})

export const MainLayoutClient = ({children}: {children: React.ReactNode}) => {
    const { fetch, hasUser } = useUser(useShallow(state => ({fetch: state.fetch, hasUser: state.hasUser })));

    useEffect(() => {
        if(!hasUser()) fetch();
    });

    return (
        <ConfigProvider locale={ruRU}>
            <Layout style={{background: 'white', minHeight: '100vh'}}>
                <Header />
                <Layout.Content className='sudno-container'>
                    {children}
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    );
} 
'use client';
import { useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Header } from '@/layout/MainLayout/Header/ui';
import { useUser } from '@/entities/user/model';
import { useShallow } from 'zustand/react/shallow';

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
        <Layout style={{background: 'white', minHeight: '100vh'}}>
            <Header />
            <Layout.Content style={{margin: '0 auto', width: '75%'}}>
                {children}
            </Layout.Content>
        </Layout>
    );
} 
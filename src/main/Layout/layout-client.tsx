'use client';
import { useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Header } from '@/main/Layout/Header';
import { Footer } from '@/main/Layout/Footer';
import { instanceApi } from '@/shared/configs/instanceAxios';
import { useUser } from '@/entities/user/model';
import { useShallow } from 'zustand/react/shallow';

ConfigProvider.config({
    theme: {
        primaryColor: '#34A8FF'
    }
})

export const MainLayoutClient = ({children}: {children: React.ReactNode}) => {
    const { fetch } = useUser(useShallow(state => ({fetch: state.fetch})));
    
    useEffect(() => {
        fetch();
    }, [])

    return (
        <Layout style={{background: 'white', minHeight: '100vh'}}>
            <Header />
                <Layout.Content style={{margin: '0 50px'}}>
                    {children}
                </Layout.Content>
            <Footer />
        </Layout>
    );
} 
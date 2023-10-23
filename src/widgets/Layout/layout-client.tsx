'use client';
import { useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Header } from '@/widgets/Layout/Header';
import { Footer } from '@/widgets/Layout/Footer';
import { instanceApi } from '@/shared/configs/instanceAxios';

ConfigProvider.config({
    theme: {
        primaryColor: '#34A8FF'
    }
})

export const MainLayoutClient = ({children, user}: {children: React.ReactNode, user: object}) => {
    
    useEffect(() => {
        // instanceApi.get('/api/user').then(res => console.log(res));
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
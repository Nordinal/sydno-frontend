import { Layout, ConfigProvider } from 'antd';
import { Header } from '@/widgets/Layout/Header';
import { Footer } from '@/widgets/Layout/Footer';

ConfigProvider.config({
    theme: {
        primaryColor: '#34A8FF'
    }
})

export const MainLayout = ({children, createAd = true}: {children: React.ReactNode, createAd?: boolean}) => {
    return (
        <Layout style={{background: 'white', minHeight: '100vh'}}>
            <Header createAd={createAd}/>
                <Layout.Content style={{margin: '0 50px'}}>
                    {children}
                </Layout.Content>
            <Footer />
        </Layout>
    );
} 
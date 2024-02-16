import { MainAdvertPage } from 'Advert/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Главная страница',
    description: 'Продажа и аренда судна',
    icons: {
        icon: ['/favicon.ico?v=4'],
        apple: ['/apple-touch-icon.png?v=4'],
        shortcut: ['/apple-touch-icon.png']
    }
};

export default function Index() {
    return (
        <>
            <MainAdvertPage />
        </>
    );
}

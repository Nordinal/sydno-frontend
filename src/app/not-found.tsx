import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404'
};

export default function NotFound() {
    return <div>Страница не найдена</div>;
}

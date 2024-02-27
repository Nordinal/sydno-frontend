import type { Metadata, ResolvingMetadata } from 'next';
import AdvertPage from './PageClient';
import { IReceivedAdvert } from './IAdvertListItemReady';

type Props = {
    params: { advert_id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const getAdvert = async (id?: string | number) => {
    if(!id) return;
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/adverts/${id}`);
    } catch (e) {
        return;
    }
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const advert = await getAdvert(params.advert_id);
    const advertData: IReceivedAdvert = await advert?.json();
    if (advert?.ok) {
        return {
            title: advertData.header,
            description: advertData.description
        };
    } else {
        return {
            title: 'Объявление не найдено'
        };
    }
}

export default async function Page({ params }: Props) {
    const advert = await getAdvert(params.advert_id);
    const advertData: IReceivedAdvert = await advert?.json();
    if (advert?.ok) {
        return <AdvertPage advert={advertData} />;
    } else {
        return <AdvertPage error={advertData || null} />;
    }
}

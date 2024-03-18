import { Segmented, Select, Typography } from "antd";
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { BasicList } from "SydnoComponents/lists";
import { IAdvertCard } from "../AdvertBaseCard/AdvertBaseCard";
import { AdvertSmallCard } from "../AdvertSmallCard/AdvertSmallCard";

export type TSort = 'price_asc' | 'price_desc' | 'date' | 'views' | undefined;

export const RecentlyWatched = () => {
    return (
        <div
            className='p-4 flex justify-between items-center'
            style={{
                boxShadow: '0 0 20px rgba(128, 128, 128, 0.2)',
                overflow: 'hidden',
                borderRadius: 'var(--main-app-br)'
            }}
        >
            <div className='mb-6 w-full'>
                <Typography.Title level={3}>Вы недавно смотрели</Typography.Title>
                <div className="w-full">
                    <BasicList
                        mode={'kanban'}
                        action='/api/adverts/recentlyviews'
                        renderItem={(item: IAdvertCard) => {
                            return <AdvertSmallCard advert={item}/>
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
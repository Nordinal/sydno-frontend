import React, { useEffect } from 'react';
import AdvertCard from "@/entities/advert-list/ui/AdvertCard";
import { IAdvertListItem, useAdvertList } from '../../model';
import { Skeleton, Typography } from 'antd';
import { useRouter } from "next/navigation";

const AdvertList: React.FC = () => {
    const { advertList, getAdvertList, isLoading, loadError } = useAdvertList();
    const router = useRouter();

    const handleAdvertClick = (item: IAdvertListItem): void => { }

    useEffect(() => {
        getAdvertList();
    }, []);

    if (isLoading) {
        return (
            <Skeleton
                active={true}
            />
        );
    }

    if (loadError) {
        return (
            <>
                <Typography.Title level={3}>
                    Ошибка загрузки. Повторите попытку позже
                </Typography.Title>
            </>
        );
    }

    return (
        <>
            {advertList && advertList.map((item) => (
                <div
                    key={item.id}
                    className="pb-4"
                >
                    <AdvertCard
                        {...item}
                        onClick={() => handleAdvertClick(item)}
                    />
                </div>
            ))}
        </>
    );
}

export default AdvertList;

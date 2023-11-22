import React, { useEffect, useState } from "react";
import { AdvertCard, useAdvert, IAdvertListItem } from "@/entities/advert";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton, Typography } from "antd";
import { useShallow } from "zustand/react/shallow";
import getUrlQueryParams from "@/shared/helpers/getUrlQueryParams";
import { Pagination } from 'antd';

const PAGINATION_LIMIT_PAGE = 10;

const SearchLayoutContent: React.FC = () => {
    const router = useRouter();
    const { getAdvertList } = useAdvert(useShallow(state => ({ getAdvertList: state.getAdvertList })));
    const [advertList, setAdvertList] = useState<IAdvertListItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isErrorLoad, setIsErrorLoad] = useState<boolean>(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoading(true);
        getAdvertList({
            ...getUrlQueryParams(searchParams),
            limit: PAGINATION_LIMIT_PAGE,
        }).then((response) => {
            setAdvertList(response);
            setIsLoading(false);
            setIsErrorLoad(false);
        }).catch(() => {
            setIsLoading(false);
            setIsErrorLoad(true);
        });
    }, [searchParams])

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    }

    if (isLoading) {
        return <Skeleton />
    }

    if (isErrorLoad) {
        return (
            <>
                Ошибка загрузки, повторите позже
            </>
        );
    }

    if (advertList.length === 0) {
        return (
            <Typography.Title level={3}>
                По вашему запросу ничего не нашлось
            </Typography.Title>
        );
    }

    return (
        <>
            {advertList && advertList.map((item) => (
                <AdvertCard
                    key={item.id}
                    {...item}
                    onClick={() => onAdvertCardClick(item.id)}
                />
            ))}
            {
                advertList.length > 0 ? 
                <div className="flex justify-center pt-8">
                    <Pagination
                        defaultCurrent={1}
                        total={50}
                    />
                </div>
                : <></>
            }
        </>
    );
}

export default SearchLayoutContent;

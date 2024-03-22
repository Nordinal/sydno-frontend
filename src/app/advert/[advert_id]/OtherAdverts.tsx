'use client';
import { useAdvert } from 'Advert/entities';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { sydnoServiceJson } from 'SydnoService/service';
import { IAdvertCard } from 'Advert/widgets';
import { SmallAdvertsList } from '../../../resources/SydnoComponents/lists/SmallAdvertsList/SmallAdvertsList';

interface OtherAdvertsProps {
    userId: string | number;
    advertId: string | number;
}
export const OtherAdverts: React.FC<OtherAdvertsProps> = ({ userId, advertId }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allAdvertsLoaded, setAllAdvertsLoaded] = useState<boolean>(false);
    const [curruntPage, setCurruntPage] = useState<number>(1);
    const [shouldScroll, setShouldScroll] = useState<boolean>(false);
    const lastAdvertRef = useRef<HTMLDivElement>(null);
    const { getOtherAdverts } = useAdvert(
        useShallow((state) => ({
            getOtherAdverts: state.getOtherAdverts
        }))
    );
    const [otherAdverts, setOtherAdverts] = useState<IAdvertCard[] | undefined>();
    const handleLoadMoreAdverts = () => {
        if (!isLoading && !allAdvertsLoaded) {
            setIsLoading(true);
            setCurruntPage((page) => page + 1);
        }
    };

    useEffect(() => {
        getOtherAdverts(Number(userId), Number(advertId)).then((data) => {
            if (data === false) {
                setAllAdvertsLoaded(true);
            } else {
                setOtherAdverts(data.data);
            }
        });
    }, [userId, advertId]);
    useEffect(() => {
        const fetchNextPageData = async () => {
            try {
                if (curruntPage > 1) {
                    const nextPageUrl = `/api/otheruseradverts?page=${curruntPage}&user_id=${Number(
                        userId
                    )}&advertId=${Number(advertId)}`;
                    const response = await sydnoServiceJson.get(nextPageUrl);
                    const nextPageData = response.data.data;
                    const advertsTo = response.data.to;
                    const advertsTotal = response.data.total;

                    setOtherAdverts((prevOtherAdverts) => {
                        if (nextPageData.length && prevOtherAdverts) {
                            setIsLoading(false);
                            if (curruntPage > 1) {
                                setShouldScroll(true);
                            }
                            if (advertsTo === advertsTotal) {
                                setAllAdvertsLoaded(true);
                            }

                            return [...prevOtherAdverts, ...nextPageData];
                        } else {
                            return prevOtherAdverts;
                        }
                    });
                    if (nextPageData && nextPageData.length === 0) {
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching next page data:', error);
            }
        };

        fetchNextPageData();
    }, [curruntPage]);

    useEffect(() => {
        if (shouldScroll && lastAdvertRef.current) {
            const additionalPixels = 150;
            const { top } = lastAdvertRef.current.getBoundingClientRect();
            const targetScrollTop = window.scrollY + top + additionalPixels;

            window.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
            });

            setShouldScroll(false);
        }
    }, [shouldScroll]);

    if (!otherAdverts) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20vh'
                }}
            >
                <Spin size='large' />
            </div>
        );
    }

    return (
        otherAdverts.length > 0 && (
            <SmallAdvertsList
                adverts={otherAdverts || []}
                isLoading={isLoading}
                allAdvertsLoaded={allAdvertsLoaded}
                onLoadMore={handleLoadMoreAdverts}
                title='Другие объявления этого продавца'
                lastAdvertRef={lastAdvertRef}
            />
        )
    );
};

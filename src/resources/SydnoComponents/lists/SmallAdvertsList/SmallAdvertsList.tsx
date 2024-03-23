import React, { ForwardedRef, useRef } from 'react';
import { Spin, Typography, Button, Col } from 'antd';
import { AdvertSmallCard } from 'Advert/widgets/AdvertSmallCard/AdvertSmallCard';
import { IAdvertCard } from 'Advert/widgets';
import './OtherAdverts.css';

interface SmallAdvertsListProps {
    adverts: IAdvertCard[];
    isLoading: boolean;
    allAdvertsLoaded: boolean;
    onLoadMore: () => void;
    title?: string;
    lastAdvertRef?: ForwardedRef<HTMLDivElement> | undefined;
}

export const SmallAdvertsList: React.FC<SmallAdvertsListProps> = ({
    adverts,
    isLoading,
    allAdvertsLoaded,
    onLoadMore,
    title,
    lastAdvertRef
}) => {
    return (
        <Col span={24}>
            <Typography.Title level={4}>{title}</Typography.Title>
            <div className='other-adverts-container'>
                {adverts &&
                    adverts.map((advert, index) => (
                        <AdvertSmallCard
                            key={index}
                            advert={advert}
                            forwardedRef={index === adverts.length - 1 ? lastAdvertRef : null}
                        />
                    ))}
            </div>
            {isLoading && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Spin size='large' />
                </div>
            )}
            <div className='other-adverts-button'>
                {!isLoading && !allAdvertsLoaded && (
                    <Button
                        type='default'
                        onClick={() => {
                            onLoadMore();
                        }}
                    >
                        Загрузить ещё
                    </Button>
                )}
            </div>
        </Col>
    );
};

'use client';
import React, { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import { IAdvertListItem, useAdvert } from "@/entities/advert";
import { useShallow } from "zustand/react/shallow";
import SmallImageSlider from "@/shared/ui/SmallImageSlider";
import Price from "@/shared/ui/Price";

interface IAdvertPageProps {
    params?: {
        advert_id?: string;
    }
}

const PRICE_LOCALE = 'ru';

const NUMBER_FORMAT_OPTIONS = {
    style: 'currency',
    currency: 'RUB'
}

const AdvertPage: React.FC<IAdvertPageProps> = ({params}) => {
    const { getAdvert } = useAdvert(useShallow(state => ({ getAdvert: state.getAdvert })));
    const [advertData, setAdvertData] = useState<IAdvertListItem>();

    useEffect(() => {
        getAdvert(Number(params?.advert_id)).then((data) => {
            setAdvertData(data);
        });
    }, []);

    return (
        <div className="pt-6">
            <Typography.Title level={1}>
                {advertData?.title}
            </Typography.Title>
            <Row gutter={16}>
                <Col span={12}>
                    <SmallImageSlider
                        items={advertData?.images || []}
                        maxItems={5}
                        showLabels={true}
                        imageClass='rounded-xl'
                    />
                </Col>
                <Col span={12}>
                    <Typography.Title level={2}>
                        <Price
                            locale={PRICE_LOCALE}
                            options={NUMBER_FORMAT_OPTIONS}
                            price={advertData?.price || 0}
                        />
                    </Typography.Title>
                </Col>
            </Row>
        </div>
    );
}

export default AdvertPage;

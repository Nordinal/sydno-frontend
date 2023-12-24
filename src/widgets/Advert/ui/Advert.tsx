'use client';
import React, { useEffect, useState } from "react";
import { IAdvertListItem, useAdvert } from "@/entities/advert";
import { useShallow } from "zustand/react/shallow";
import { Col, Row, Typography } from "antd";
import Price from "@/shared/ui/Price";
import { AdvertImageSlider } from "./AdvertImageSlider";
import { Breadcrumb } from 'antd';
import { useRouter } from "next/navigation";
import { Descriptions } from 'antd';

export interface IAdvertWidget {
    id: number | string;
}

const PRICE_LOCALE = 'ru';

const NUMBER_FORMAT_OPTIONS = {
    style: 'currency',
    currency: 'RUB'
}

export const Advert: React.FC<IAdvertWidget> = ({
    id
}) => {
    const { getAdvert } = useAdvert(useShallow(state => ({ getAdvert: state.getAdvert })));
    const [advert, setAdvert] = useState<IAdvertListItem | null>();
    const router = useRouter();

    useEffect(() => {
        getAdvert(id)
            .then((data) => {
                setAdvert(data);
            });
    }, [id]);

    if (advert === null) {
        return <></>;
    }

    return (
        <div className="pt-6">
            <div>
                <Breadcrumb
                    items={[
                        {
                            title: <a onClick={() => router.back()}>Назад</a>
                        }
                    ]}
                />
            </div>
            <Typography.Title level={1}>
                {advert?.header}
            </Typography.Title>
            <Row gutter={[16, 24]} className="pb-4">
                <Col 
                    xs={24}
                    sm={12}
                >
                    <AdvertImageSlider
                        images={advert?.images || []}
                    />
                </Col>
                <Col 
                    xs={24}
                    sm={12}
                >
                    <Typography.Title level={2}>
                        <Price
                            locale={PRICE_LOCALE}
                            options={NUMBER_FORMAT_OPTIONS}
                            price={(advert as any)?.price || 0}
                        />
                    </Typography.Title>
                    <Descriptions column={2}>
                        <Descriptions.Item label="Тип">{(advert as any)?.advert_legal_information.type}</Descriptions.Item>
                        <Descriptions.Item label="Номер телефона">{(advert as any)?.phone_number}</Descriptions.Item>
                        <Descriptions.Item label="Назначение">{(advert as any)?.advert_legal_information.purpose}</Descriptions.Item>
                        <Descriptions.Item label="Тип эксплуатации">{(advert as any)?.advert_legal_information.exploitation_type}</Descriptions.Item>
                        <Descriptions.Item label="Год постройки">{(advert as any)?.advert_legal_information.building_year}</Descriptions.Item>
                        <Descriptions.Item label="Страна постройки">
                            <img
                                width={30}
                                height={20}
                                src={'/flags/' + (advert as any)?.advert_legal_information.building_country + '.svg'}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Флаг">
                            <img
                                width={30}
                                height={20}
                                src={'/flags/' + (advert as any)?.advert_legal_information.flag + '.svg'}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
            <Row gutter={[16, 24]}>
                <Col span={24}>
                    <Typography.Title level={2}>
                        Описание
                    </Typography.Title>
                    <Typography.Paragraph>
                        {(advert as any)?.description}
                    </Typography.Paragraph>
                </Col>
            </Row>
            <Row gutter={[16, 24]}>
                <Col span={24}>
                    <Typography.Title level={2}>
                        Характеристики
                    </Typography.Title>
                </Col>
            </Row>
        </div>
    );
}

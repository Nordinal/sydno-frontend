import React, { SyntheticEvent, useState } from "react";
import { Row, Col, Typography, Space, Tag} from "antd";
import './styles.css';
import SmallImageSlider from "@/shared/ui/SmallImageSlider";
import isTouchDevice from "@/shared/helpers/isTouchDevice";
import { IAdvertListItem } from "../../types/main";
import { useAdvert } from "../../model";
import { useShallow } from "zustand/react/shallow";
import Price from "@/shared/ui/Price";
import Link from "next/link";

export interface IAdvertCard extends IAdvertListItem {
    onClick?: () => void;
    size?: 'small' | 'big';
}

const FALLBACK_IMAGE_SRC = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/European_shorthair_TUROK_cat_show_Turku_2010-03-27.JPG';

const PRICE_LOCALE = 'ru';

const NUMBER_FORMAT_OPTIONS = {
    style: 'currency',
    currency: 'RUB'
}

const leftColBigMode = {
    className: 'sm:pr-4 sm:pb-0 pb-4',
    xs: 24,
    sm: 6,
}

const middleColBigMode = {
    flex: '1',
}

const rightColBigMode = {
    className: 'sm:pl-4',
    xs: 24,
    sm: 4,
}

const leftColSmallMode = {
    className: 'pb-4',
    span: 24
}

const AdvertCard: React.FC<IAdvertCard> = ({
    onClick,
    header, 
    price,
    advert_legal_information,
    advert_technical_information,
    description,
    phone_number,
    images,
    id,
    size,
}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showNumber, setShowNumber] = useState<boolean>(false);
    const [isLocalFavorite, setIsLocalFavorite] = useState<boolean>(false);
    const { addToFavorites } = useAdvert(useShallow(state => ({ addToFavorites: (state as any).addToFavorites })));
    const isTouch = isTouchDevice();

    const showNumberBtnHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        setShowNumber(true);
    }

    const onMouseLeave = () => {
        setShowDetails(false);
    }

    const onMouseEnter = () => {
        setShowDetails(true);
    }

    const likeButtonClickhandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        addToFavorites(id).then(() => {
            setIsLocalFavorite(!isLocalFavorite);
        });
    }

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="sudno-AdvertCard"
            onClick={onClick}
        >
            <Row>
                <Col {...leftColBigMode} >
                    <SmallImageSlider
                        items={images}
                        maxItems={5}
                        showLabels={showDetails}
                        fallbackImageSrc={FALLBACK_IMAGE_SRC}
                        imageClass='rounded-xl'
                    />
                </Col>
                <Col {...middleColBigMode}>
                    <div className="flex flex-col h-full">
                        <Typography.Title
                            level={3}
                        >

                            <Link href={'advert/' + id}>
                                {header}
                           </Link>
                        </Typography.Title>
                        <Typography.Title
                            level={4}
                            style={{marginTop: 0}}
                        >
                            <Price
                                locale={PRICE_LOCALE}
                                options={NUMBER_FORMAT_OPTIONS}
                                price={price}                                
                            />
                        </Typography.Title>
                        <div className="flex flex-col flex-auto">
                            <Typography.Paragraph
                                className="sudno-AdvertCard-labels flex a-items-center"
                            >
                                <Space size={[0, 8]} wrap>
                                    <Tag>{advert_legal_information.type}</Tag>
                                    <Tag>{advert_legal_information.class_formula}</Tag>
                                    <Tag>{advert_legal_information.purpose}</Tag>
                                    <Tag>{advert_legal_information.exploitation_type}</Tag>
                                    <Tag>{advert_legal_information.building_year}</Tag>
                                </Space>
                            </Typography.Paragraph>
                            <Typography.Paragraph
                                className="sudno-AdvertCard-description"
                            >
                                {description}
                            </Typography.Paragraph>
                        </div>
                    </div>
                </Col>
                <Col {...rightColBigMode}>
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <Typography.Paragraph style={{
                                opacity: showDetails || isTouch ? '1' : '0'
                            }}>
                                {
                                    showNumber ?
                                        phone_number :
                                        <div onClick={showNumberBtnHandler}>
                                            Показать телефон
                                        </div>
                                }
                            </Typography.Paragraph>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AdvertCard;

import React, { SyntheticEvent, useState } from "react";
import { Row, Col, Typography, Space, Tag, Button, Tooltip } from "antd";
import './styles.css';
import SmallImageSlider from "@/shared/ui/SmallImageSlider";
import isTouchDevice from "@/shared/helpers/isTouchDevice";
import { IAdvertListItem } from "../../types/main";
import { useAdvert } from "../../model";
import { useShallow } from "zustand/react/shallow";

export interface IAdvertCard extends IAdvertListItem {
    onClick?: () => void;
}

const FALLBACK_IMAGE_SRC = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/European_shorthair_TUROK_cat_show_Turku_2010-03-27.JPG';

const PRICE_LOCALE = 'ru';

const NUMBER_FORMAT_OPTIONS = {
    style: 'currency',
    currency: 'RUB'
}

const AdvertCard: React.FC<IAdvertCard> = ({ onClick, title, price, tags, phone, addres, images, isFavorite, id }) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showNumber, setShowNumber] = useState<boolean>(false);
    const [isLocalFavorite, setIsLocalFavorite] = useState<boolean>(isFavorite || false);
    const { addToFavorites } = useAdvert(useShallow(state => ({ addToFavorites: state.addToFavorites })));
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
            className="sudno-AdvertCard rounded-xl"
            onClick={onClick}
        >
            <Row>
                <Col
                    className="sm:pr-4 sm:pb-0 pb-4"
                    xs={24}
                    sm={6}
                >
                    <SmallImageSlider
                        items={images}
                        maxItems={5}
                        showLabels={showDetails}
                        fallbackImageSrc={FALLBACK_IMAGE_SRC}
                        imageClass='rounded-xl'
                    />
                </Col>
                <Col
                    xs={24}
                    sm={14}
                >
                    <div className="flex flex-col h-full">
                        <Typography.Title
                            level={3}
                        >
                            {title}
                        </Typography.Title>
                        <div className="flex flex-col flex-auto justify-between">
                            <Typography.Paragraph
                                className="sudno-AdvertCard-labels flex a-items-center"
                            >
                                <Space size={[0, 8]} wrap>
                                    {tags && tags.map(item => (
                                        <Tag
                                            key={item}
                                        >
                                            {item}
                                        </Tag>
                                    ))}
                                </Space>
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                {addres}
                            </Typography.Paragraph>
                        </div>
                    </div>
                </Col>
                <Col
                    className="sm:pl-4"
                    xs={24}
                    sm={4}
                >
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <Typography.Title
                                level={4}
                            >
                                {new Intl.NumberFormat(PRICE_LOCALE, NUMBER_FORMAT_OPTIONS).format(price)}
                            </Typography.Title>
                            <Typography.Paragraph style={{
                                opacity: showDetails || isTouch ? '1' : '0'
                            }}>
                                {
                                    showNumber ?
                                        phone :
                                        <Button onClick={showNumberBtnHandler}>
                                            Показать телефон
                                        </Button>
                                }
                            </Typography.Paragraph>
                        </div>
                        <Tooltip
                            title="Добавить в избранное"
                            color={'red'}
                        >
                            <Button
                                style={{ opacity: showDetails || isTouch || isLocalFavorite ? '1' : '0',
                            width: 'auto' }}
                                onClick={likeButtonClickhandler}
                            >
                                ♥
                            </Button>
                        </Tooltip>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AdvertCard;

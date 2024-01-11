import React, { SyntheticEvent, useState } from "react";
import { IAdvertListItem, IAdvertLegalInformation } from "Advert/entities";
import { Flag, Price } from "SydnoComponents/commons";
import { SmallImageSlider } from "SydnoComponents/sliders";
import { isTouchDevice } from "SydnoHelpers/commons";
import { Button, Col, Row, Typography } from "antd";
import Link from "next/link";
import styles from './styles.module.css'
import { AddToFavoriteButton } from "../../features/AddToFavoriteButton";

export interface IAdvertCard extends IAdvertListItem {
    onClick?: () => void;
    size?: 'small' | 'big';
    featureWrapperClass?: string;
    customFeature?: React.ReactNode;
    disableNumberButton?: boolean;
}

const FALLBACK_IMAGE_SRC = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/European_shorthair_TUROK_cat_show_Turku_2010-03-27.JPG';

const PRICE_LOCALE = 'ru';

const NUMBER_FORMAT_OPTIONS = {
    style: 'currency',
    currency: 'RUB'
}

const leftCol = {
    'small': {
        className: 'pb-4',
        span: 24
    },
    'big': {
        className: 'sm:pr-4 sm:pb-0 pb-4',
        lg: {
            flex: '0 1 300px',
        },
    }
}

const middleCol = {
    'small': {
        flex: 'auto',
    },
    'big': {
        lg: {
            flex: '300',
        },
    }
}

const rightCol =  {
    'small': {
        span: 24
    },
    'big': {
        className: 'sm:pl-4',
        lg: {
            flex: '0 1 250',
        },
    }
}

export const BaseAdvertCard: React.FC<IAdvertCard> = ({
    onClick,
    header, 
    price,
    advert_legal_information,
    description,
    phone_number,
    images,
    id,
    size,
    customFeature,
    featureWrapperClass,
    disableNumberButton,
}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showNumber, setShowNumber] = useState<boolean>(false);
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

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={styles['sudno-AdvertCard']}
            onClick={onClick}
        >
            <Row>
                <Col {...leftCol[size || 'big']} >
                    <SmallImageSlider
                        items={images}
                        maxItems={5}
                        showLabels={showDetails}
                        fallbackImageSrc={FALLBACK_IMAGE_SRC}
                        imageStyle={{ borderRadius: 'var(--main-app-br)' }}
                    />
                </Col>
                <Col {...middleCol[size || 'big']}>
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
                                className={styles['sudno-AdvertCard-labels'] + ' flex items-center'}
                            >
                                <DetailsInfo
                                    size={size || 'big'}
                                    {...advert_legal_information}
                                />
                            </Typography.Paragraph>
                            <Typography.Paragraph
                                className={styles['sudno-AdvertCard-description']}
                            >
                                {description}
                            </Typography.Paragraph>
                        </div>
                    </div>
                </Col>
                <Col {...rightCol[size || 'big']}>
                    <div className={featureWrapperClass || 'flex flex-col justify-between items-end h-full'}>
                        {
                            <>
                                {
                                    (disableNumberButton === false) || 
                                    <div className="pb-2 sm:pb-0">
                                        {
                                            showNumber ?
                                                phone_number :
                                                <Button style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    opacity: showDetails || isTouch ? '1' : '0'
                                                }} onClick={showNumberBtnHandler}>
                                                    Показать телефон
                                                </Button>
                                        }
                                    </div>
                                }
                                <div>
                                    <AddToFavoriteButton
                                        id={id}
                                        isFavorite={false}
                                    />
                                </div>
                            </>
                        }
                        {customFeature}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

const DetailsItem: React.FC<{
    label: string;
    children: React.ReactNode;
    
}> = ({
    label,
    children,
}) => {
        return (
            <div className="flex pr-4">
                <div
                    className={styles['sudno-AdvertCard-details-label'] + ' pr-2'}
                >
                    {label}:
                </div>
                <div
                    className={styles['sudno-AdvertCard-details-value'] + ' flex justify-center items-center'}
                >
                    {children}
                </div>
            </div>
        );
}

const DetailsInfo: React.FC<IAdvertLegalInformation & {
    size: 'small' | 'big';
}> = (props) => {
    return (
        <div className={'flex flex-wrap justify-start items-center ' + (props.size === 'small' ? 'flex-col' : '')}>
            <DetailsItem label="Тип">{props.type}</DetailsItem>
            <DetailsItem label="Класс">{props.class_formula}</DetailsItem>
            <DetailsItem label="Назначение">{props.purpose}</DetailsItem>
            <DetailsItem label="Тип эксплуатации">{props.exploitation_type}</DetailsItem>
            <DetailsItem label="Год постройки">{props.building_year}</DetailsItem>
            <DetailsItem label="Флаг">
                <Flag
                    country_code={props.flag}
                />
            </DetailsItem>
        </div>
    );
}

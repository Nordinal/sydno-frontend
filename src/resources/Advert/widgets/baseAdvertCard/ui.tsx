import React, { SyntheticEvent, useState } from 'react';
import { IAdvertListItem, IAdvertLegalInformation } from 'Advert/entities';
import { Flag, Price } from 'SydnoComponents/commons';
import { SmallImageSlider } from 'SydnoComponents/sliders';
import { isTouchDevice } from 'SydnoHelpers/commons';
import { Button, Col, Row, Typography } from 'antd';
import Link from 'next/link';
import styles from './styles.module.css';
import { AddToFavoriteButton } from '../../features/AddToFavoriteButton';
import { UserButton } from 'Users/features';

export interface IAdvertCard extends IAdvertListItem {
    onClick?: () => void;
    size?: 'small' | 'big';
    featureWrapperClass?: string;
    customFeature?: React.ReactNode;
    disableNumberButton?: boolean;
    isDraft: boolean;
    isMiniCard: boolean;
}

const FALLBACK_IMAGE_SRC = '/sheep-icon.png';

const PRICE_LOCALE = 'ru';

const NUMBER_FORMAT_OPTIONS = {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: '0'
};

const leftCol = {
    small: {
        className: 'pb-4',
        span: 24
    },
    big: {
        className: 'sm:pr-4 xl:pb-0 ',
        flex: '1 1 150px'
    }
};

const middleCol = {
    small: {
        flex: 'auto'
    },
    big: {
        xl: 12,
        md: 10
    }
};

const rightCol = {
    small: {
        span: 24
    },
    big: {
        className: 'sm:pl-4',
        flex: '1 1 100px'
    }
};

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
    isDraft,
    advert_technical_information,
    registration_number,
    user,
    isMiniCard,
    created_at
}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showNumber, setShowNumber] = useState<boolean>(false);

    const isTouch = isTouchDevice();

    const showNumberBtnHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        setShowNumber(true);
    };

    const onMouseLeave = () => {
        setShowDetails(false);
    };

    const onMouseEnter = () => {
        setShowDetails(true);
    };

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={
                styles['sudno-AdvertCard'] +
                ' ' +
                (isTouch && styles['sudno-AdvertCard-shadow']) +
                ' ' +
                (isDraft && styles['sudno-AdvertCard-draft'])
            }
            onClick={onClick}
        >
            <Row>
                <Col {...leftCol[size || 'big']}>
                    <SmallImageSlider
                        items={images}
                        maxItems={5}
                        showLabels={showDetails}
                        fallbackImageSrc={FALLBACK_IMAGE_SRC}
                        imageStyle={{ borderRadius: 'var(--main-app-br)' }}
                        flag={advert_legal_information ? advert_legal_information.flag : ''}
                        isMiniCard={isDraft ? true : isMiniCard}
                    />
                </Col>
                <Col {...middleCol[size || 'big']}>
                    <div className='flex flex-col h-full'>
                        <Typography.Title level={3}>
                            <Link href={'advert/' + id}>{header}</Link>
                        </Typography.Title>
                        <Typography.Title level={4} style={{ marginTop: '-3px' }}>
                            <Price locale={PRICE_LOCALE} options={NUMBER_FORMAT_OPTIONS} price={price} />
                        </Typography.Title>

                        <Typography.Paragraph>
                            <span style={{ display: 'block' }}>
                                {advert_legal_information && advert_legal_information.port_address.value}
                            </span>
                            Дата размещения: {created_at.split('T')[0].split('-').join('.')}
                        </Typography.Paragraph>
                        <div className='flex flex-col flex-auto'>
                            <Typography.Paragraph className={styles['sudno-AdvertCard-labels'] + ' flex items-center'}>
                                <DetailsInfo
                                    size={size || 'big'}
                                    {...advert_legal_information}
                                    registration_number={registration_number}
                                    length={advert_technical_information && advert_technical_information.overall_length}
                                />
                            </Typography.Paragraph>
                            <Typography.Paragraph className={styles['sudno-AdvertCard-description']}>
                                {description}
                            </Typography.Paragraph>
                        </div>
                    </div>
                </Col>
                <Col {...rightCol[size || 'big']} className='flex flex-col items-end h-74  '>
                    <div className={featureWrapperClass || 'flex flex-col items-end  h-full justify-between '}>
                        <div className={'flex  items-start justify-start'}>
                            <AddToFavoriteButton id={id} isFavorite={false} />
                            {user && (
                                <UserButton
                                    className='ml-1'
                                    id={user.id}
                                    src={user.avatar}
                                    name={user.name}
                                    advertCount={user.adverts_count}
                                />
                            )}
                        </div>
                        {disableNumberButton === false || (
                            <div className='flex flex-col gap-3 w-40'>
                                {showNumber ? (
                                    phone_number
                                ) : (
                                    <Button
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto'
                                        }}
                                        onClick={showNumberBtnHandler}
                                    >
                                        Показать телефон
                                    </Button>
                                )}
                            </div>
                        )}

                        {customFeature}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const DetailsItem: React.FC<{
    label: string;
    children: React.ReactNode;
}> = ({ label, children }) => {
    return (
        <div className='flex pr-4'>
            <div className={styles['sudno-AdvertCard-details-label'] + ' pr-2'}>{label}:</div>
            <div className={styles['sudno-AdvertCard-details-value'] + ' flex justify-center items-center'}>
                {children}
            </div>
        </div>
    );
};

const DetailsInfo: React.FC<
    IAdvertLegalInformation & {
        size: 'small' | 'big';
        registration_number: string;
        length: number;
    }
> = (props) => {
    return (
        <div className={'flex flex-wrap justify-start items-center ' + (props.size === 'small' ? 'flex-col' : '')}>
            <DetailsItem label='Название'>{props.name}</DetailsItem>
            <DetailsItem label='Тип'>{props.type}</DetailsItem>
            <DetailsItem label='Год постройки'>{props.building_year}</DetailsItem>
            <DetailsItem label='Класс'>{props.class_formula}</DetailsItem>
            <DetailsItem label='Длина'>{props.length}</DetailsItem>
            <DetailsItem label='Регистровый номер'>{props.imo_number}</DetailsItem>
        </div>
    );
};

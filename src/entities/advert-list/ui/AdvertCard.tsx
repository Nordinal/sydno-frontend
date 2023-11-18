import React, { SyntheticEvent, useState } from "react";
import { Row, Col, Typography } from "antd";
import './styles.css';
import SmallImageSlider from "@/shared/ui/SmallImageSlider";

export interface IAdvertCard {
    images: string[];
    title: string;
    price: number;
    desc: string;
    phone: string;
    addres: string;
    onClick?: () => void;
}

const PRICE_LOCALE = 'ru';

const NUMBER_FORMAT_OPTIONS = {
    style: 'currency',
    currency: 'RUB'
}

const AdvertCard: React.FC<IAdvertCard> = ({ onClick, title, price, desc, phone, addres, images }) => {
    const [showDetails, setShowDetails ] = useState<boolean>(false);

    const onNumberClick = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(`tel:${phone}`);
    }

    const onMouseLeave= () => {
        setShowDetails(false);
    }

    return (
        <div onMouseEnter={() => setShowDetails(true)} onMouseLeave={onMouseLeave} className="sudno-AdvertCard" onClick={onClick}>
            <Row>
                <Col className="sm:pr-4 sm:pb-0 pb-4" xs={24} sm={6}>
                    <SmallImageSlider
                        items={images}
                        maxColItems={4}
                        showLabels={showDetails}
                    />
                </Col>
                <Col xs={24} sm={14}>
                    <Typography.Title level={3}>
                        {title}
                    </Typography.Title>
                    <Typography.Paragraph
                        className="sudno-AdvertCard-description"
                    >
                        {desc}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        {addres}
                    </Typography.Paragraph>
                </Col>
                <Col className="sm:pl-4" xs={24} sm={4}>
                    <Typography.Title level={4}>
                        {new Intl.NumberFormat(PRICE_LOCALE, NUMBER_FORMAT_OPTIONS).format(price)}
                    </Typography.Title>
                    <Typography.Paragraph>
                        <a onClick={onNumberClick}>
                            {phone}
                        </a>
                    </Typography.Paragraph>
                </Col>
            </Row>
        </div>
    );
}

export default AdvertCard;

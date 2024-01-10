"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Col, Descriptions, Image, Row, Spin, Typography } from "antd";
import { useAdvert } from "@/entities/advert";
import { useShallow } from "zustand/react/shallow";
import { Carousel } from "antd";
import "./styles.css";
import { ConvertData } from "./DataConverter";
import { IAdvertListItem } from "@/entities/advert/types/main";
import { Price } from "SydnoComponents/commons";
import ContactButton from "./button";
import Specs from "./Specs";
import useMobileView from "./useMobileView";
interface IAdvertPageProps {
  params?: {
    advert_id?: string;
  };
}
const PRICE_LOCALE = "ru";

const NUMBER_FORMAT_OPTIONS = {
  style: "currency",
  currency: "RUB",
};

/**
 * Компонент страницы объявления.
 * Отображает страницу объявления с контактной информацией, изображениями и описанием.
 * @param params Объект параметров с идентификатором объявления `advert_id`.
 *
 * Author: [Gleb]
 */

const AdvertPage: React.FC<IAdvertPageProps> = ({ params }) => {
  const { getAdvert } = useAdvert(
    useShallow((state) => ({ getAdvert: state.getAdvert }))
  );
  const [isLocalFavorite, setIsLocalFavorite] = useState<boolean>(false);
  // const { addToFavorites } = useAdvert(
  //   useShallow((state) => ({ addToFavorites: (state as any).addToFavorites }))
  // );
  const [advertData, setAdvertData] = useState<IAdvertListItem | undefined>();
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const mobileView = useMobileView();

  const showNumberBtnHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    setShowNumber(true);
  };

  const likeButtonClickhandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    // Использовать когда будет метод для добавления в избранное
    // addToFavorites(Number(params?.advert_id)).then(() => {
    //   setIsLocalFavorite(!isLocalFavorite);
    // });
    setIsLocalFavorite(!isLocalFavorite);
  };

  useEffect(() => {
    getAdvert(Number(params?.advert_id)).then((data) => {
      if (data === false) {
      } else {
        setAdvertData(data);
        console.log(data);
      }
    });
  }, []);

  const ConvertedAdvertData = advertData && ConvertData(advertData);

  if (!advertData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="pt-6">
      <Row gutter={mobileView ? 24 : 21} className="header-with-price">
        <Col span={mobileView ? 24 : 14}>
          <Typography.Title level={mobileView ? 2 : 1} className="header">
            {advertData.header}
          </Typography.Title>
        </Col>
        <Col span={mobileView ? 24 : 7}>
          <Typography.Title level={mobileView ? 3 : 1} className="price">
            <Price
              locale={PRICE_LOCALE}
              options={NUMBER_FORMAT_OPTIONS}
              price={advertData.price || 0}
            />
          </Typography.Title>
        </Col>
      </Row>

      <Row gutter={mobileView ? 24 : 14} className="main-content">
        <Col span={mobileView ? 24 : 14}>
          <Carousel className="custom-carousel">
            {advertData &&
              (advertData?.images || []).map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={`Image ${index}`}
                    className="full-width-image"
                  />
                </div>
              ))}
          </Carousel>
        </Col>

        <Col span={mobileView ? 24 : 7} className="contacts-wrapper">
          <div className="contacts">
            <Typography.Title level={2} className="owner-name">
              {advertData.user.name}
            </Typography.Title>
            <div className="contacts-buttons">
              <Typography.Paragraph>
                {showNumber ? (
                  <ContactButton
                    type="tel"
                    phone={advertData.phone_number}
                    onClick={showNumberBtnHandler}
                  />
                ) : (
                  <ContactButton type="show" onClick={showNumberBtnHandler} />
                )}
                <ContactButton type="email" />
                <ContactButton
                  type="favorite"
                  isFavorite={isLocalFavorite}
                  onClick={likeButtonClickhandler}
                />
                <ContactButton type="share" />
              </Typography.Paragraph>
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={mobileView ? 24 : 14}>
          <Typography.Title level={4} className="description">
            Описание
          </Typography.Title>
          <Typography.Paragraph>{advertData.description}</Typography.Paragraph>
        </Col>

        <Col span={mobileView ? 24 : 14} className="specs">
          <Specs ConvertedAdvertData={ConvertedAdvertData} />
        </Col>
      </Row>
    </div>
  );
};

export default AdvertPage;

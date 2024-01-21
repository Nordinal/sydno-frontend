"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Col, Image, Row, Spin, Typography, notification } from "antd";
import { useShallow } from "zustand/react/shallow";
import { Carousel } from "antd";
import "./styles.css";
import { ConvertData } from "./DataConverter";
import { useAdvert } from "Advert/entities";
import { Price } from "SydnoComponents/commons";
import ContactButton from "./button";
import Specs from "./Specs";
import useMobileView from "./useMobileView";
import { useUser } from "Auth/entities";
import { IReceivedAdvert } from "./IAdvertListItemReady";
interface IAdvertPageProps {
  params?: {
    advert_id: string;
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
  const { getAdvert, addToFavourite, deleteFromFavourite } = useAdvert(
    useShallow((state) => ({
      getAdvert: state.getAdvert,
      addToFavourite: state.addToFavourite,
      deleteFromFavourite: state.deleteFromFavourite,
    }))
  );
  const { auth } = useUser(useShallow((state) => ({ auth: state.auth })));
  const [isLoading, setIsLoading] = useState(false);
  const [isLocalFavorite, setIsLocalFavorite] = useState<boolean>(false);
  const [advertData, setAdvertData] = useState<IReceivedAdvert | undefined>();
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const mobileView = useMobileView();

  const showNumberBtnHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    setShowNumber(true);
  };

  const likeButtonClickhandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (!auth) {
      notification.warning({
        message: "Необходимо авторизоваться на сайте",
        placement: "bottomRight",
      });
      return;
    }
    if (params?.advert_id !== undefined) {
      if (!isLocalFavorite) {
        setIsLoading(true);
        addToFavourite(params?.advert_id).then((res) => {
          if (res) {
            notification.success({
              message: 'Добавлено в "Избранные"',
              placement: "bottomRight",
            });
            setIsLocalFavorite(res);
          } else {
            notification.error({
              message: "Ошибка",
              placement: "bottomRight",
            });
          }
          setIsLoading(false);
        });
      } else {
        setIsLoading(true);
        deleteFromFavourite(params?.advert_id).then((res) => {
          if (res) {
            notification.success({
              message: 'Удалено из "Избранные"',
              placement: "bottomRight",
            });
            setIsLocalFavorite(!res);
          } else {
            notification.error({
              message: "Ошибка",
              placement: "bottomRight",
            });
          }
          setIsLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    getAdvert(Number(params?.advert_id)).then((data) => {
      if (data === false) {
      } else {
        setAdvertData(data);
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
                  isLoading={isLoading}
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

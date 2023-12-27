"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Col, Image, Row, Spin, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useAdvert } from "@/entities/advert";
import { useShallow } from "zustand/react/shallow";
import { Carousel } from "antd";
import "./styles.css";
import { DetailsPair } from "./DetailsPair";
import { ConvertData } from "./DataConverter";
import { IAdvertListItem } from "@/entities/advert/types/main";
import { Price } from "SydnoComponents/commons";
import { SmallImageSlider } from "SydnoComponents/sliders";
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

const AdvertPage: React.FC<IAdvertPageProps> = ({ params }) => {
  const { getAdvert } = useAdvert(
    useShallow((state) => ({ getAdvert: state.getAdvert }))
  );
  const [advertData, setAdvertData] = useState<IAdvertListItem | false>();
  const [showAllCharacteristics, setShowAllCharacteristics] = useState(false);
  const [showNumber, setShowNumber] = useState<boolean>(false);

  const showNumberBtnHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    setShowNumber(true);
  };

  useEffect(() => {
    getAdvert(Number(params?.advert_id)).then((data) => {
      if (data === false) {
      } else {
        setAdvertData(data);
      }
    });
  }, []);

  //Готовим данные для отрисовки
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
      <Row gutter={14}>
        <Col span={12}>
          <Typography.Title level={1}>
            <StarFilled className="favorite-star" />
            {advertData.header}
          </Typography.Title>
        </Col>

        <Col span={9} className="price-phone">
          <Typography.Title level={2} className="price">
            <Price
              locale={PRICE_LOCALE}
              options={NUMBER_FORMAT_OPTIONS}
              price={advertData.price || 0}
            />
          </Typography.Title>
          <Typography.Paragraph>
            {showNumber ? (
              <Button
                type="primary"
                href={`tel:${advertData.phone_number}`}
              >{`Позвонить +${advertData.phone_number}`}</Button>
            ) : (
              <Button onClick={showNumberBtnHandler}>Показать телефон</Button>
            )}
          </Typography.Paragraph>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
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
          <SmallImageSlider
            items={advertData.images || []}
            maxItems={5}
            showLabels={true}
            // imageClass="rounded-xl"
          />
          <Typography.Title level={4} className="description">
            Описание
          </Typography.Title>
          <Typography.Paragraph>{advertData.description}</Typography.Paragraph>
        </Col>

        <Col span={12}>
          <div>
            <Row gutter={24}>
              <Col span={16}>
                <div>
                  {ConvertedAdvertData &&
                    ConvertedAdvertData.mainInfo.map(
                      (field, index) =>
                        field.value && (
                          <DetailsPair
                            key={index}
                            title={field.title}
                            value={field.value}
                          />
                        )
                    )}
                  <div>
                    {!showAllCharacteristics && ConvertedAdvertData && (
                      <Button
                        className="all-button"
                        onClick={() => setShowAllCharacteristics(true)}
                      >
                        Показать все характеристики
                      </Button>
                    )}

                    {showAllCharacteristics && ConvertedAdvertData && (
                      <>
                        <Typography.Title level={4} className="info-title">
                          Юридическая информация
                        </Typography.Title>
                        {ConvertedAdvertData.legalInfo.map(
                          (field, index) =>
                            field.value && (
                              <DetailsPair
                                key={index}
                                title={field.title}
                                value={field.value}
                              />
                            )
                        )}
                        <Typography.Title level={4} className="info-title">
                          Техническая информация
                        </Typography.Title>
                        {ConvertedAdvertData.technicalInfo.map(
                          (field, index) =>
                            field !== null && (
                              <DetailsPair
                                key={index}
                                title={field.title}
                                value={field.value}
                              />
                            )
                        )}
                        <Button
                          className="all-button"
                          onClick={() => setShowAllCharacteristics(false)}
                        >
                          Скрыть
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdvertPage;

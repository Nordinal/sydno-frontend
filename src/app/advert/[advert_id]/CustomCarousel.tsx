import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/controller";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import "./CustomCarousel.css";

import { SyntheticEvent, useEffect, useState } from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

/**
 * Кастомный компонент для отображения изображений в виде карусели и модального окна с каруселью.
 *
 * @param slides Изображения карусели.
 * @param isLoading Промежуточное состояние кнопки пока не получен ответ о том было ли объявление добавлено в избранное.
 * @param isLocalFavorite Состояние кнопки, добавлено ли объявление в избранное.
 * @param likeButtonClickhandler Функция для добавления/удаления объявления из избранного.
 *
 * Author: [Gleb]
 */

interface CustomSliderProps {
  slides: string[];
  isLocalFavorite?: boolean;
  isLoading: boolean;
  likeButtonClickhandler: (e: SyntheticEvent) => void;
}

export const CustomCarousel: React.FC<CustomSliderProps> = ({
  slides,
  isLocalFavorite,
  isLoading,
  likeButtonClickhandler,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [visible, setVisible] = useState(isModalOpen);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(
    null
  );

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      showModal();
    } else {
      handleCancel();
    }
  }, [isModalOpen]);
  return (
    <div>
      <Swiper
        style={{ zIndex: "0" }}
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Controller,
          Keyboard,
        ]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{ enabled: true }}
        pagination={{ clickable: true }}
        onSwiper={setControlledSwiper}
        onSlideChange={(swiper) => {
          console.log("slide change", swiper.realIndex);
          setCurrentSlide(swiper.realIndex);
        }}
        keyboard={{
          enabled: true,
        }}
      >
        <Button
          loading={isLoading}
          style={{ zIndex: 20 }}
          className={`fav-button ${
            isLocalFavorite ? "favorite" : "not-favorite"
          }`}
          type="default"
          onClick={likeButtonClickhandler}
        >
          {isLocalFavorite && !isLoading && (
            <StarFilled style={{ fontSize: "24px" }} />
          )}
          {!isLocalFavorite && !isLoading && (
            <StarOutlined style={{ fontSize: "24px" }} />
          )}
        </Button>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              className="slide"
              src={slide}
              alt={`Slide ${index + 1}`}
              onClick={() => setIsModalOpen(true)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <Modal
          visible={visible}
          onCancel={handleCancel}
          style={{ padding: "0px" }}
          footer={null}
          maskClosable={true}
          destroyOnClose={true}
          className="modal-wrapper"
        >
          <Swiper
            style={{ zIndex: "0" }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{ enabled: true }}
            pagination={{ clickable: true }}
            initialSlide={currentSlide}
            controller={{ control: controlledSwiper }}
          >
            <Button
              loading={isLoading}
              className={`fav-button-modal ${
                isLocalFavorite ? "favorite" : "not-favorite"
              }`}
              type="default"
              onClick={likeButtonClickhandler}
            >
              {isLocalFavorite && !isLoading && (
                <StarFilled style={{ fontSize: "24px" }} />
              )}
              {!isLocalFavorite && !isLoading && (
                <StarOutlined style={{ fontSize: "24px" }} />
              )}
            </Button>
            <div className="slider">
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="modal-slide"
                    src={slide}
                    alt={`Slide ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </Modal>
      </div>
    </div>
  );
};

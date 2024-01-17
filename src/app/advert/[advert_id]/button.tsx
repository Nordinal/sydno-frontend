import React, { FC, MouseEventHandler, useState } from "react";
import s from "./button.module.css";
import {
  CheckOutlined,
  MailOutlined,
  PhoneOutlined,
  ShareAltOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";

interface CallButtonProps {
  type: "show" | "tel" | "email" | "favorite" | "share";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  phone?: string;
  email?: string;
  isFavorite?: boolean;
  isLoading?: boolean;
}

/**
 * Кнопка для работы с контактами.
 * Принимает тип кнопки и опциональные обработчики событий для работы с контактами.
 * @param type Тип кнопки: "show" (показать номер), "tel" (набрать номер), "email" (написать письмо) или "favorite" (добавить в избранное).
 * @param onClick Обработчик нажатия на кнопку.
 * @param phone Номер телефона для кнопки "tel".
 * @param email Электронная почта для кнопки "email".
 * @param isFavorite Флаг для кнопки "favorite" (true - добавлено в избранное, false - не добавлено).
 * @returns Возвращает кнопку для работы с контактами.
 *
 * Author: [Gleb]
 */

const ContactButton: FC<CallButtonProps> = ({
  type,
  onClick,
  phone,
  email,
  isFavorite,
  isLoading,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  let buttonText = "";
  let buttonIcon = null;
  let buttonAction: string | null = null;

  switch (type) {
    case "tel":
      buttonText = phone ? phone : "";
      buttonIcon = <PhoneOutlined />;
      buttonAction = `tel:${phone}`;
      break;
    case "email":
      buttonText = "Написать";
      buttonIcon = <MailOutlined />;
      buttonAction = `mailto:${email}`;
      break;
    case "favorite":
      buttonIcon = isFavorite ? (
        <StarFilled style={{ fontSize: "20px" }} />
      ) : (
        <StarOutlined style={{ fontSize: "20px" }} />
      );
      buttonText = isFavorite
        ? "Удалить из избранного"
        : "Добавить в избранное";

      break;
    case "share":
      buttonText = isCopied ? "Скопировано" : "Поделиться";
      buttonIcon = isCopied ? <CheckOutlined /> : <ShareAltOutlined />;
      buttonAction = "share";
      break;
    case "show":
      buttonText = "Показать номер";
      break;
    default:
      break;
  }

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }

    if (buttonAction) {
      switch (type) {
        case "share":
          navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 800);
            })
            .catch((err) => {
              console.error("Ошибка копирования URL:", err);
            });
          break;
        default:
          window.location.href = buttonAction;
          break;
      }
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${s.callButton} ${s[type]} ${isFavorite ? s.selected : ""} ${
        isCopied ? s.copiedAnimation : ""
      } ${isLoading ? s.disabled : ""}`}
      disabled={isLoading}
    >
      {buttonText}
      {buttonIcon && buttonIcon}
    </button>
  );
};

export default ContactButton;

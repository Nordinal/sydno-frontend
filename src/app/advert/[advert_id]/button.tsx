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
      buttonText = "Избранное";

      break;
    case "share":
      buttonText = isCopied ? "Скопировано" : "Поделиться";
      // buttonIcon = <ShareAltOutlined />;
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
    if (onClick) {
      onClick(event);
    }
    // if (buttonAction) {
    //   window.location.href = buttonAction;
    // }

    if (buttonAction) {
      if (type === "share") {
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => {
            console.log("URL скопирован!");
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 800);
          })
          .catch((err) => {
            console.error("Ошибка копирования URL:", err);
          });
      } else {
        window.location.href = buttonAction;
      }
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${s.callButton} ${s[type]} ${isFavorite ? s.selected : ""} ${
        isCopied ? s.copiedAnimation : ""
      }`}
    >
      {buttonText}
      {buttonIcon && buttonIcon}
    </button>
  );
};

export default ContactButton;

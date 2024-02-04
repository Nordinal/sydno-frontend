"use client";
import React, { ForwardedRef, Ref } from "react";
import { IReceivedAdvert } from "./IAdvertListItemReady";
import countriesJson from "../../../resources/SydnoComponents/selectors/CountriesSelector/countries.json";

import "./otherAdvert.css";
import { Price } from "SydnoComponents/commons";
import Link from "next/link";
interface OtherAdvertsProps {
  advert: IReceivedAdvert;
  forwardedRef?: ForwardedRef<HTMLDivElement>;
}
export const OtherAdvert: React.FC<OtherAdvertsProps> = ({
  advert,
  forwardedRef,
}) => {
  const flagCode = advert.advert_legal_information.flag;
  const flagData =
    countriesJson.data[flagCode as keyof typeof countriesJson.data];
  const PRICE_LOCALE = "ru";

  const NUMBER_FORMAT_OPTIONS = {
    style: "currency",
    currency: "RUB",
  };
  return (
    <div className="other-advert-container" ref={forwardedRef}>
      <Link href={String(advert.id)}>
        <div className="image-block">
          <img alt={advert.header} src={advert.images[0]} />
          <img
            className="other-flag"
            alt={`Флаг ${flagData}`}
            width={30}
            height={20}
            src={`/flags/${flagCode}.svg`}
          />
          <span className="other-sell-rent">продажа</span>
        </div>
      </Link>
      <div className="other-info-block">
        <div className="other-info-block-title">
          <Link href={String(advert.id)}>
            <p>
              {advert.advert_legal_information.name.substring(
                0,
                advert.advert_legal_information.name.length - 1
              )}{" "}
              {" | "}
              {advert.advert_legal_information.building_year}
            </p>
          </Link>
        </div>

        <div>
          <p
            style={{
              color: "black",
              fontWeight: "500",
              fontSize: "15px",
            }}
          >
            {advert.advert_legal_information.type}
          </p>
          <p
            style={{
              color: "#40A9FF",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            <Price
              locale={PRICE_LOCALE}
              options={NUMBER_FORMAT_OPTIONS}
              price={advert.price || 0}
            />
          </p>
          <p
            style={{
              color: "#7F7F7F",
              fontSize: "15px",
            }}
          >
            г. {advert.advert_legal_information.port_address.city}
          </p>
        </div>
      </div>
    </div>
  );
};

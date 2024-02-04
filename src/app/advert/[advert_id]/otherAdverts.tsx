"use client";
import { useAdvert } from "Advert/entities";
import "./otherAdverts.css";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useRef, useState } from "react";
import { IReceivedAdvert } from "./IAdvertListItemReady";
import { Button, Col, Spin, Typography } from "antd";
import { OtherAdvert } from "./otherAdvert";
import axios from "axios";

interface OtherAdvertsProps {
  user_id: string | number;
  advert_id: string | number;
}
export const OtherAdverts: React.FC<OtherAdvertsProps> = ({
  user_id,
  advert_id,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allAdvertsLoaded, setAllAdvertsLoaded] = useState<boolean>(false);
  const [curruntPage, setCurruntPage] = useState<number>(1);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  const lastAdvertRef = useRef<HTMLDivElement>(null);
  const { getOtherAdverts } = useAdvert(
    useShallow((state) => ({
      getOtherAdverts: state.getOtherAdverts,
    }))
  );
  const [otherAdverts, setOtherAdverts] = useState<
    IReceivedAdvert[] | undefined
  >();
  const handleLoadMoreAdverts = () => {
    if (!isLoading && !allAdvertsLoaded) {
      setIsLoading(true);
      setCurruntPage((page) => page + 1);
    }
  };

  useEffect(() => {
    getOtherAdverts(Number(user_id), Number(advert_id)).then((data) => {
      if (data === false) {
        console.log("no data");
      } else {
        setOtherAdverts(data.data);
      }
    });
  }, [getOtherAdverts, user_id, advert_id]);
  useEffect(() => {
    const fetchNextPageData = async () => {
      try {
        const nextPageUrl = `http://localhost/api/otheruseradverts?page=${curruntPage}&user_id=${Number(
          user_id
        )}&advert_id=${Number(advert_id)}`;
        const response = await axios.get(nextPageUrl);
        const nextPageData = response.data.data;
        setOtherAdverts((prevOtherAdverts) => {
          if (nextPageData.length && prevOtherAdverts) {
            setIsLoading(false);
            if (curruntPage > 1) {
              setShouldScroll(true);
            }
            return [...prevOtherAdverts, ...nextPageData];
          } else {
            return prevOtherAdverts;
          }
        });
        if (nextPageData && nextPageData.length === 0) {
          setAllAdvertsLoaded(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching next page data:", error);
      }
    };

    fetchNextPageData();
  }, [curruntPage]);

  useEffect(() => {
    if (shouldScroll && lastAdvertRef.current) {
      const additionalPixels = 150;
      const { top } = lastAdvertRef.current.getBoundingClientRect();
      const targetScrollTop = window.scrollY + top + additionalPixels;

      window.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });

      setShouldScroll(false);
    }
  }, [shouldScroll]);

  if (!otherAdverts) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Col span={24}>
      <Typography.Title level={4}>
        Другие объявления этого продавца
      </Typography.Title>
      <div className="other-adverts-container">
        {otherAdverts &&
          otherAdverts.map((advert, index) => (
            <OtherAdvert
              key={index}
              advert={advert}
              forwardedRef={
                index === otherAdverts.length - 1 ? lastAdvertRef : null
              }
            />
          ))}
      </div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <div className="other-adverts-button">
        {!isLoading && !allAdvertsLoaded && (
          <Button
            type="default"
            onClick={() => {
              handleLoadMoreAdverts();
            }}
          >
            Загрузить ещё
          </Button>
        )}
      </div>
    </Col>
  );
};

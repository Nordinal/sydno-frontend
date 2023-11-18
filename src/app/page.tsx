'use client';
import AdvertCard from "@/entities/advert-list/ui/AdvertCard";
import testData from "@/entities/advert-list/testData";
import { Col, Row } from "antd";
import { Input } from 'antd';

const { Search } = Input;

export default function Index() {
  const handleAdvertClick = () => { console.log('onCardClick'); }

  const onSearch = () => { }

  return (
    <>
      <div className="pt-10 pb-10">
        <Search
          placeholder="Найти"
          enterButton="Search"
          onSearch={onSearch}
        />
      </div>
      <Row>
        <Col lg={0} xl={6}>
          Тут будут фильтры
        </Col>
        <Col lg={24} xl={18}>
          {testData && testData.map((item, index) => (
            <div key={index} className="pb-4">
              <AdvertCard
                key={index}
                {...item}
                onClick={handleAdvertClick}
              />
            </div>
          ))}
        </Col>
      </Row>
    </>
  )
}

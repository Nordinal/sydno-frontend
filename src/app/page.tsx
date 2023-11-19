'use client';
import AdvertList from "@/entities/advert-list/ui/AdvertList";
import { Col, Row } from "antd";
import { Input } from 'antd';

const { Search } = Input;

export default function Index() {
  const onSearch = () => { }

  return (
    <>
      <div
        className="pt-10 pb-10"
      >
        <Search
          placeholder="Найти"
          enterButton="Search"
          onSearch={onSearch}
        />
      </div>
      <Row>
        <Col
          span={24}
        >
          Тут будут фильтры
        </Col>
        <Col
          span={24}
        >
          <AdvertList />
        </Col>
      </Row>
    </>
  )
}

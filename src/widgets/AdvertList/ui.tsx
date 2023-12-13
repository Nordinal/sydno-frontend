'use client';
import { Col, Row } from "antd";
import React from "react";
import List from "./List/ui";
import Filter from "./Filter/ui";

const AdvertList: React.FC = () => {
    return (
        <>
            <Row className="pt-6 pb-16">
                <Col className="pb-6" span={24}>
                    <Filter/>
                </Col>
                <Col span={24}>
                    <List/>
                </Col>
            </Row>
        </>
    );
}

export default AdvertList;

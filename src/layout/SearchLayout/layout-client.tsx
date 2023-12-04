'use client';
import { Col, Row } from "antd";
import React from "react";
import SearchLayoutContent from "./SearchLayoutContent";
import SearchLayoutFilter from "./SearchLayoutFilter";

const SearchLayout: React.FC = () => {
    return (
        <>
            <Row className="pt-6 pb-16">
                <Col className="pb-6" span={24}>
                    <SearchLayoutFilter/>
                </Col>
                <Col span={24}>
                    <SearchLayoutContent/>
                </Col>
            </Row>
        </>
    );
}

export default SearchLayout;

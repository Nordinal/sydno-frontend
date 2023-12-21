import React from "react";
import { TChangeConfigProperty } from "../types";
import { Col, InputNumber, Row } from "antd";

export const OverallWidth: React.FC<{
    min_overall_width?: number | null;
    max_overall_width?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_overall_width,
    max_overall_width,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Ширина судна</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        value={min_overall_width}
                        min={1}
                        max={100000}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_overall_width', value || undefined)}
                        formatter={(value) => value ? `от ${value} м` : ''}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        value={max_overall_width}
                        min={1}
                        max={100000}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_overall_width', value || undefined)}
                        formatter={(value) => value ? `до ${value} м` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

import React from "react";
import { TChangeConfigProperty } from "../types";
import { Col, InputNumber, Row } from "antd";

export const OverallLength: React.FC<{
    min_overall_length?: number | null;
    max_overall_length?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_overall_length,
    max_overall_length,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Длинна судна</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        value={min_overall_length}
                        min={1}
                        max={100000}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_overall_length', value || undefined)}
                        formatter={(value) => value ? `от ${value} м` : ''}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        value={max_overall_length}
                        min={1}
                        max={100000}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_overall_length', value || undefined)}
                        formatter={(value) => value ? `до ${value} м` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

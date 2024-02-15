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
            <p>Ширина судна, м</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        placeholder="От"
                        value={min_overall_width}
                        min={1}
                        max={100000}
                        style={{width: '98%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_overall_width', value || undefined)}
                        formatter={(value) => value ? `от ${value}` : ''}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        placeholder="До"
                        value={max_overall_width}
                        min={1}
                        max={100000}
                        style={{width: '98%', marginLeft:'2%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_overall_width', value || undefined)}
                        formatter={(value) => value ? `до ${value}` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

import React from "react";
import { TChangeConfigProperty } from "../types";
import { Col, InputNumber, Row } from "antd";

export const NumEngines: React.FC<{
    min_num_engines?: number | null;
    max_num_engines?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_num_engines,
    max_num_engines,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Количество главных двигателей</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        value={min_num_engines}
                        min={1}
                        style={{width: '100%'}}
                        max={8}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_num_engines', value || undefined)}
                        formatter={(value) => value ? `от ${value} шт` : ''}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        value={max_num_engines}
                        min={1}
                        max={8}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_num_engines', value || undefined)}
                        formatter={(value) => value ? `до ${value} шт` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

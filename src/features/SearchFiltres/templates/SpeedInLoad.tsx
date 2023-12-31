import { Col, InputNumber, Row } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../types";

export const SpeedInLoad: React.FC<{
    min_maximum_speed_in_load?: number | null;
    max_maximum_speed_in_load?: number | null;
    changeConfigProperty: TChangeConfigProperty
}> = ({
    min_maximum_speed_in_load,
    max_maximum_speed_in_load,
    changeConfigProperty
}) => {
    return (
        <>
            <p>Максимальная скорость в грузу</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        value={min_maximum_speed_in_load}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_maximum_speed_in_load', value || undefined)}
                        formatter={(value) => value ? `${value} ` : ''}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        value={max_maximum_speed_in_load}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_maximum_speed_in_load', value || undefined)}
                        formatter={(value) => value ? `${value}` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

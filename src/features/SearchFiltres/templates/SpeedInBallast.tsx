import { Col, InputNumber, Row } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../types";

export const SpeedInBallast: React.FC<{
    min_maximum_speed_in_ballast?: number | null;
    max_maximum_speed_in_ballast?: number | null;
    changeConfigProperty: TChangeConfigProperty
}> = ({
    min_maximum_speed_in_ballast,
    max_maximum_speed_in_ballast,
    changeConfigProperty
}) => {
    return (
        <>
            <p>Максимальная скорость в балласте</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        value={min_maximum_speed_in_ballast}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_maximum_speed_in_ballast', value || undefined)}
                        formatter={(value) => value ? `${value} ` : ''}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        value={max_maximum_speed_in_ballast}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_maximum_speed_in_ballast', value || undefined)}
                        formatter={(value) => value ? `${value}` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";
import { Col, InputNumber, Row } from "antd";

const Engine: React.FC<{
    num_engines?: number;
    min_power?: number;
    max_power?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    num_engines,
    min_power,
    max_power,
    changeConfigProperty,
}) => {
    return (
        <>
            <Row>
                <Col span={6}>
                    <p>Количество двигателей</p>
                    <InputNumber
                        value={num_engines}
                        min={1}
                        max={8}
                        onChange={(value) => changeConfigProperty<number | undefined>('num_engines', value || undefined)}
                        formatter={(value) => value ? `${value} шт` : ''}
                    />
                </Col>
                <Col span={6}>
                    <p>Мощность двигателей</p>
                    <InputNumber
                        value={min_power}
                        min={1}
                        max={100000}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_power', value || undefined)}
                        formatter={(value) => value ? `от ${value} кВт` : ''}
                    />
                    <InputNumber
                        value={max_power}
                        min={1}
                        max={100000}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_power', value || undefined)}
                        formatter={(value) => value ? `до ${value} кВт` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Engine;

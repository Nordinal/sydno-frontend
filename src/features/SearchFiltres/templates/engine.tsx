import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";
import { Col, InputNumber, Row } from "antd";

const Engine: React.FC<{
    num_engines?: number;
    power?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    num_engines,
    power,
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
                        value={power}
                        min={1}
                        max={100000}
                        onChange={(value) => changeConfigProperty<number | undefined>('power', value || undefined)}
                        formatter={(value) => value ? `${value} кВт` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Engine;

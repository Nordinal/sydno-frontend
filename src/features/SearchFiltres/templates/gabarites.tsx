import { Col, InputNumber, Row } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const Gabarites: React.FC<{
    length?: number;
    width?: number;
    sideHeight?: number;
    maxFreeBoard?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    length,
    width,
    sideHeight,
    maxFreeBoard,
    changeConfigProperty
}) => {
    return (
        <>
            <Row>
                <Col span={6}>
                    <p>Длинна</p>
                    <InputNumber
                        value={length}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('length', value || undefined)}
                        formatter={(value) => `${value} м`}
                    />
                </Col>
                <Col span={6}>
                    <p>Ширина</p>
                    <InputNumber
                        value={width}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('width', value || undefined)}
                        formatter={(value) => `${value} м`}
                    />
                </Col>
                <Col span={6}>
                    <p>Высота борта</p>
                    <InputNumber
                        value={sideHeight}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('sideHeight', value || undefined)}
                        formatter={(value) => `${value} м`}
                    />
                </Col>
                <Col span={6}>
                    <p>Максимальный надводный борт</p>
                    <InputNumber
                        value={maxFreeBoard}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('maxFreeBoard', value || undefined)}
                        formatter={(value) => `${value} м`}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Gabarites;

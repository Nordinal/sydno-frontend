import { Col, InputNumber, Row } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const Gabarites: React.FC<{
    overall_length?: number;
    overall_width?: number;
    board_height?: number;
    maximum_freeboard?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    overall_length,
    overall_width,
    board_height,
    maximum_freeboard,
    changeConfigProperty
}) => {
    return (
        <>
            <Row>
                <Col span={6}>
                    <p>Длинна</p>
                    <InputNumber
                        value={overall_length}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('overall_length', value || undefined)}
                        formatter={(value) => value ? `${value} м` : ''}
                    />
                </Col>
                <Col span={6}>
                    <p>Ширина</p>
                    <InputNumber
                        value={overall_width}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('overall_width', value || undefined)}
                        formatter={(value) => value ? `${value} м` : ''}
                    />
                </Col>
                <Col span={6}>
                    <p>Высота борта</p>
                    <InputNumber
                        value={board_height}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('board_height', value || undefined)}
                        formatter={(value) => value ? `${value} м` : ''}
                    />
                </Col>
                <Col span={6}>
                    <p>Максимальный надводный борт</p>
                    <InputNumber
                        value={maximum_freeboard}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('maximum_freeboard', value || undefined)}
                        formatter={(value) => value ? `${value} м` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Gabarites;

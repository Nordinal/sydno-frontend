import { Col, InputNumber, Row } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const Gabarites: React.FC<{
    min_overall_length?: number;
    max_overall_length?: number;
    min_overall_width?: number;
    max_overall_width?: number;
    min_board_height?: number;
    max_board_height?: number;
    min_maximum_freeboard?: number;
    max_maximum_freeboard?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_overall_length,
    max_overall_length,
    min_overall_width,
    max_overall_width,
    min_board_height,
    max_board_height,
    min_maximum_freeboard,
    max_maximum_freeboard,
    changeConfigProperty
}) => {
    return (
        <>
            <Row>
                <Col span={6}>
                    <p>Длинна</p>
                    <InputNumber
                        value={min_overall_length}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_overall_length', value || undefined)}
                        formatter={(value) => value ? `от ${value}` : ''}
                    />
                    <InputNumber
                        value={max_overall_length}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_overall_length', value || undefined)}
                        formatter={(value) => value ? `до ${value}` : ''}
                    />
                </Col>
                <Col span={6}>
                    <p>Ширина</p>
                    <InputNumber
                        value={min_overall_width}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_overall_width', value || undefined)}
                        formatter={(value) => value ? `от ${value}` : ''}
                    />
                    <InputNumber
                        value={max_overall_width}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_overall_width', value || undefined)}
                        formatter={(value) => value ? `до ${value}` : ''}
                    />
                </Col>
                <Col span={6}>
                    <p>Высота борта</p>
                    <InputNumber
                        value={min_board_height}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_board_height', value || undefined)}
                        formatter={(value) => value ? `от ${value}` : ''}
                    />
                    <InputNumber
                        value={max_board_height}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_board_height', value || undefined)}
                        formatter={(value) => value ? `до ${value}` : ''}
                    />
                </Col>
                <Col span={6}>
                    <p>Максимальный надводный борт</p>
                    <InputNumber
                        value={min_maximum_freeboard}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_maximum_freeboard', value || undefined)}
                        formatter={(value) => value ? `от ${value}` : ''}
                    />
                    <InputNumber
                        value={max_maximum_freeboard}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_maximum_freeboard', value || undefined)}
                        formatter={(value) => value ? `до ${value}` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Gabarites;

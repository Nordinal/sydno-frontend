import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Col, InputNumber, Row } from 'antd';

export const BoardHeight: React.FC<{
    min_board_height?: number | null;
    max_board_height?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_board_height,
    max_board_height,
    changeConfigProperty
}) => {
  return (
    <>
        <p>Высота борта, м</p>
        <Row>
            <Col span={12}>
                <InputNumber
                    placeholder="От"
                    value={min_board_height}
                    min={0.05}
                    max={74}
                    step={0.01}
                    style={{width: '98%'}}
                    onChange={(value) => changeConfigProperty<number | undefined>('min_board_height', value || undefined)}
                    formatter={(value) => value ? `от ${value}` : ''}
                />
            </Col>
            <Col span={12}>
                <InputNumber
                    placeholder="До"
                    value={max_board_height}
                    min={0.05}
                    max={74}
                    step={0.01}
                    style={{width: '98%', marginLeft:'2%'}}
                    onChange={(value) => changeConfigProperty<number | undefined>('max_board_height', value || undefined)}
                    formatter={(value) => value ? `до ${value}` : ''}
                />
            </Col>
        </Row>
    </>
  )
}

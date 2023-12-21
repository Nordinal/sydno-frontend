import React from 'react';
import { Col, InputNumber, Row } from 'antd';
import { TChangeConfigProperty } from '../types';

export const MaxCarrying: React.FC<{
    min_carrying?: number | null;
    max_carrying?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_carrying,
    max_carrying,
    changeConfigProperty
}) => {
    return (
        <div>
            <p>Грузоподъемность</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        value={min_carrying}
                        min={0}
                        step={0.01}
                        max={Infinity}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_carrying', value || undefined)}
                        formatter={(value) => value ? `от ${value} т` : ''}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        value={max_carrying}
                        min={0}
                        step={0.01}
                        max={Infinity}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_carrying', value || undefined)}
                        formatter={(value) => value ? `до ${value} т` : ''}
                    />
                </Col>
            </Row>
        </div>
    );
}

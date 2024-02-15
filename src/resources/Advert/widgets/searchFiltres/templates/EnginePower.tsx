import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Col, InputNumber, Row } from 'antd';

export const EnginePower: React.FC<{
    min_power?: number | null;
    max_power?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ min_power, max_power, changeConfigProperty }) => {
    return (
        <>
            <p>Мощность двигателей, кВт</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        placeholder='От'
                        value={min_power}
                        min={1}
                        max={100000}
                        style={{ width: '98%' }}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_power', value || undefined)}
                        formatter={(value) => (value ? `от ${value}` : '')}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        placeholder='До'
                        value={max_power}
                        min={1}
                        max={100000}
                        style={{ width: '98%', marginLeft: '2%' }}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_power', value || undefined)}
                        formatter={(value) => (value ? `до ${value}` : '')}
                    />
                </Col>
            </Row>
        </>
    );
};

import { Col, InputNumber, Row } from 'antd';
import React from 'react';
import { TChangeConfigProperty } from '../types';

export const SpeedInLoad: React.FC<{
    min_maximum_speed_in_load?: number | null;
    max_maximum_speed_in_load?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ min_maximum_speed_in_load, max_maximum_speed_in_load, changeConfigProperty }) => {
    return (
        <>
            <p>Максимальная скорость в грузу, кн</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        placeholder='От'
                        value={min_maximum_speed_in_load}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        style={{ width: '98%' }}
                        onChange={(value) =>
                            changeConfigProperty<number | undefined>('min_maximum_speed_in_load', value || undefined)
                        }
                        formatter={(value) => (value ? `от ${value}` : '')}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        placeholder='До'
                        value={max_maximum_speed_in_load}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        style={{ width: '98%', marginLeft: '2%' }}
                        onChange={(value) =>
                            changeConfigProperty<number | undefined>('max_maximum_speed_in_load', value || undefined)
                        }
                        formatter={(value) => (value ? `до ${value}` : '')}
                    />
                </Col>
            </Row>
        </>
    );
};

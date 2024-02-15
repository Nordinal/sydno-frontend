import { Col, InputNumber, Row } from 'antd';
import React from 'react';
import { TChangeConfigProperty } from '../types';

export const SpeedInBallast: React.FC<{
    min_maximum_speed_in_ballast?: number | null;
    max_maximum_speed_in_ballast?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ min_maximum_speed_in_ballast, max_maximum_speed_in_ballast, changeConfigProperty }) => {
    return (
        <>
            <p>Максимальная скорость в балласте, кн</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        placeholder='От'
                        value={min_maximum_speed_in_ballast}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        style={{ width: '98%' }}
                        onChange={(value) =>
                            changeConfigProperty<number | undefined>('min_maximum_speed_in_ballast', value || undefined)
                        }
                        formatter={(value) => (value ? `от ${value}` : '')}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        placeholder='До'
                        value={max_maximum_speed_in_ballast}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        style={{ width: '98%', marginLeft: '2%' }}
                        onChange={(value) =>
                            changeConfigProperty<number | undefined>('max_maximum_speed_in_ballast', value || undefined)
                        }
                        formatter={(value) => (value ? `до ${value}` : '')}
                    />
                </Col>
            </Row>
        </>
    );
};

import React from 'react';
import { Col, InputNumber, Row } from 'antd';
import { TChangeConfigProperty } from '../types';

export const PassangersAvialable: React.FC<{
    min_passangers_avialable?: number | null;
    max_passangers_avialable?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_passangers_avialable,
    max_passangers_avialable,
    changeConfigProperty
}) => {
    return (
        <div>
            <p>Пассажировмещаемость</p>
            <Row>
                <Col span={12}>
                    <InputNumber
                        value={min_passangers_avialable}
                        style={{width: '100%'}}
                        min={0}
                        step={1}
                        max={Infinity}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_passangers_avialable', value || undefined)}
                        formatter={(value) => value ? `от ${value} чел.` : ''}
                    />
                </Col>
                <Col span={12}>
                    <InputNumber
                        value={max_passangers_avialable}
                        min={0}
                        step={1}
                        max={Infinity}
                        style={{width: '100%'}}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_passangers_avialable', value || undefined)}
                        formatter={(value) => value ? `до ${value} чел.` : ''}
                    />
                </Col>
            </Row>
        </div>
    );
}

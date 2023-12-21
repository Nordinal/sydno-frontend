import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Col, InputNumber, Row } from 'antd';

export const GrossTonnage: React.FC<{
    min_gross_tonnage?: number | null;
    max_gross_tonnage?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_gross_tonnage,
    max_gross_tonnage,
    changeConfigProperty
}) => {
  return (
    <div>
        <p>Валовая вместимость</p>
        <Row>
            <Col span={12}>
                <InputNumber
                    value={min_gross_tonnage}
                    min={0}
                    max={Infinity}
                    step={0.01}
                    style={{width: '100%'}}
                    onChange={(value) => changeConfigProperty<number | undefined>('min_gross_tonnage', value || undefined)}
                    formatter={(value) => value ? `${value} рег. т.` : ''}
                />
            </Col>
            <Col span={12}>
                <InputNumber
                    value={max_gross_tonnage}
                    min={0}
                    max={Infinity}
                    step={0.01}
                    style={{width: '100%'}}
                    onChange={(value) => changeConfigProperty<number | undefined>('max_gross_tonnage', value || undefined)}
                    formatter={(value) => value ? `${value} рег. т.` : ''}
                />
            </Col>
        </Row>
    </div>
  )
}

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
        <p>Валовая вместимость, рег. т.</p>
        <Row>
            <Col span={12}>
                <InputNumber
                    placeholder="От"
                    value={min_gross_tonnage}
                    min={0}
                    max={Infinity}
                    step={0.01}
                    style={{width: '98%'}}
                    onChange={(value) => changeConfigProperty<number | undefined>('min_gross_tonnage', value || undefined)}
                    formatter={(value) => value ? `от ${value}` : ''}
                />
            </Col>
            <Col span={12}>
                <InputNumber
                    placeholder="До"
                    value={max_gross_tonnage}
                    min={0}
                    max={Infinity}
                    step={0.01}
                    style={{width: '98%', marginLeft:'2%'}}
                    onChange={(value) => changeConfigProperty<number | undefined>('max_gross_tonnage', value || undefined)}
                    formatter={(value) => value ? `до ${value}` : ''}
                />
            </Col>
        </Row>
    </div>
  )
}

import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Col, InputNumber, Row } from 'antd';

export const Deadweight: React.FC<{
    min_deadweight?: number | null;
    max_deadweight?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_deadweight,
    max_deadweight,
    changeConfigProperty
}) => {
  return (
    <>
        <p>Предельная масса (дедвейт), т</p>
        <Row>
          <Col span={12}>
            <InputNumber
                value={min_deadweight}
                min={0}
                max={600000}
                step={0.01}
                style={{width: '100%'}}
                onChange={(value) => changeConfigProperty<number | undefined>('min_deadweight', value || undefined)}
                formatter={(value) => value ? `от ${value}` : ''}
            />
          </Col>
          <Col span={12}>
            <InputNumber
                value={max_deadweight}
                min={0}
                max={600000}
                step={0.01}
                style={{width: '100%'}}
                onChange={(value) => changeConfigProperty<number | undefined>('max_deadweight', value || undefined)}
                formatter={(value) => value ? `до ${value}` : ''}
            />
          </Col>
        </Row>
    </>
  )
}

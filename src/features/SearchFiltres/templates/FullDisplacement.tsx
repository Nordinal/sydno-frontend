import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Col, InputNumber, Row } from 'antd';

export const FullDisplacement: React.FC<{
    min_full_displacement?: number | null;
    max_full_displacement?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_full_displacement,
    max_full_displacement,
    changeConfigProperty
}) => {
  return (
    <>
      <p>Водоизмещение полное</p>
      <Row>
        <Col span={12}>
          <InputNumber
              value={min_full_displacement}
              min={0}
              max={Infinity}
              step={0.01}
              style={{width: '100%'}}
              onChange={(value) => changeConfigProperty<number | undefined>('min_full_displacement', value || undefined)}
              formatter={(value) => value ? `${value} т` : ''}
          />
        </Col>
        <Col span={12}>
          <InputNumber
              value={max_full_displacement}
              min={0}
              max={Infinity}
              step={0.01}
              style={{width: '100%'}}
              onChange={(value) => changeConfigProperty<number | undefined>('max_full_displacement', value || undefined)}
              formatter={(value) => value ? `${value} т` : ''}
          />
        </Col>
      </Row>
    </>
  )
}

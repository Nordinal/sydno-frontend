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
      <p>Водоизмещение полное, т</p>
      <Row>
        <Col span={12}>
          <InputNumber
              placeholder="От"
              value={min_full_displacement}
              min={0}
              max={Infinity}
              step={0.01}
              style={{width: '98%'}}
              onChange={(value) => changeConfigProperty<number | undefined>('min_full_displacement', value || undefined)}
              formatter={(value) => value ? `от ${value}` : ''}
          />
        </Col>
        <Col span={12}>
          <InputNumber
              placeholder="До"
              value={max_full_displacement}
              min={0}
              max={Infinity}
              step={0.01}
              style={{width: '98%', marginLeft:'2%'}}
              onChange={(value) => changeConfigProperty<number | undefined>('max_full_displacement', value || undefined)}
              formatter={(value) => value ? `до ${value}` : ''}
          />
        </Col>
      </Row>
    </>
  )
}

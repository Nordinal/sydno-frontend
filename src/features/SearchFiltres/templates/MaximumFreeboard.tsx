import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Col, InputNumber, Row } from 'antd';

export const MaximumFreeboard: React.FC<{
    min_maximum_freeboard?: number | null;
    max_maximum_freeboard?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_maximum_freeboard,
    max_maximum_freeboard,
    changeConfigProperty
}) => {
  return (
    <>
      <p>Максимальный надводный борт</p>
        <Row>
          <Col span={12}>
            <InputNumber
                value={min_maximum_freeboard}
                min={0}
                max={47}
                step={0.01}
                style={{width: '100%'}}
                onChange={(value) => changeConfigProperty<number | undefined>('min_maximum_freeboard', value || undefined)}
                formatter={(value) => value ? `${value} м` : ''}
            />
          </Col>
          <Col span={12}>
            <InputNumber
                value={max_maximum_freeboard}
                min={0}
                max={47}
                step={0.01}
                style={{width: '100%'}}
                onChange={(value) => changeConfigProperty<number | undefined>('max_maximum_freeboard', value || undefined)}
                formatter={(value) => value ? `${value} м` : ''}
            />
          </Col>
        </Row>
    </>
  )
}

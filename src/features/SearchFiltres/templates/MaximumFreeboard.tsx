import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { InputNumber } from 'antd';

const MaximumFreeboard: React.FC<{
    min_maximum_freeboard?: number | null;
    max_maximum_freeboard?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_maximum_freeboard,
    max_maximum_freeboard,
    changeConfigProperty
}) => {
  return (
    <div>
      <p>Максимальный надводный борт</p>
        <InputNumber
            value={min_maximum_freeboard}
            min={0}
            max={47}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('min_maximum_freeboard', value || undefined)}
            formatter={(value) => value ? `${value} м` : ''}
        />
        <InputNumber
            value={max_maximum_freeboard}
            min={0}
            max={47}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('max_maximum_freeboard', value || undefined)}
            formatter={(value) => value ? `${value} м` : ''}
        />
    </div>
  )
}

export default MaximumFreeboard

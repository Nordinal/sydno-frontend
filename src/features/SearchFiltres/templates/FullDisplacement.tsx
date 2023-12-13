import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { InputNumber } from 'antd';

const FullDisplacement: React.FC<{
    min_full_displacement?: number;
    max_full_displacement?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_full_displacement,
    max_full_displacement,
    changeConfigProperty
}) => {
  return (
    <div>
      <p>Водоизмещение полное</p>
        <InputNumber
            value={min_full_displacement}
            min={0}
            max={Infinity}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('min_full_displacement', value || undefined)}
            formatter={(value) => value ? `${value} т` : ''}
        />
        <InputNumber
            value={max_full_displacement}
            min={0}
            max={Infinity}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('max_full_displacement', value || undefined)}
            formatter={(value) => value ? `${value} т` : ''}
        />
    </div>
  )
}

export default FullDisplacement

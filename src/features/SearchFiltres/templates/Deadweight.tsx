import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { InputNumber } from 'antd';

const Deadweight: React.FC<{
    min_deadweight?: number | null;
    max_deadweight?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_deadweight,
    max_deadweight,
    changeConfigProperty
}) => {
  return (
    <div>
      <p>Предельная масса (дедвейт)</p>
        <InputNumber
            value={min_deadweight}
            min={0}
            max={600000}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('min_deadweight', value || undefined)}
            formatter={(value) => value ? `${value} т` : ''}
        />
        <InputNumber
            value={max_deadweight}
            min={0}
            max={600000}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('max_deadweight', value || undefined)}
            formatter={(value) => value ? `${value} т` : ''}
        />
    </div>
  )
}

export default Deadweight

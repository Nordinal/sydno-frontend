import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { InputNumber } from 'antd';

const GrossTonnage: React.FC<{
    min_gross_tonnage?: number;
    max_gross_tonnage?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_gross_tonnage,
    max_gross_tonnage,
    changeConfigProperty
}) => {
  return (
    <div>
        <p>Валовая вместимость</p>
        <InputNumber
            value={min_gross_tonnage}
            min={0}
            max={Infinity}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('min_gross_tonnage', value || undefined)}
            formatter={(value) => value ? `${value} рег. т.` : ''}
        />
        <InputNumber
            value={max_gross_tonnage}
            min={0}
            max={Infinity}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('max_gross_tonnage', value || undefined)}
            formatter={(value) => value ? `${value} рег. т.` : ''}
        />
    </div>
  )
}

export default GrossTonnage

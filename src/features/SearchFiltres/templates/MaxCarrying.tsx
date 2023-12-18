import React from 'react';
import { InputNumber } from 'antd';
import { TChangeConfigProperty } from '../ui/SearhFiltres';

const MaxCarrying: React.FC<{
    min_carrying?: number;
    max_carrying?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_carrying,
    max_carrying,
    changeConfigProperty
}) => {
    return (
        <div>
            <p>Грузоподъемность</p>
            <InputNumber
                value={min_carrying}
                min={0}
                step={0.01}
                max={Infinity}
                onChange={(value) => changeConfigProperty<number | undefined>('min_carrying', value || undefined)}
                formatter={(value) => value ? `от ${value} т` : ''}
            />
            <InputNumber
                value={max_carrying}
                min={0}
                step={0.01}
                max={Infinity}
                onChange={(value) => changeConfigProperty<number | undefined>('max_carrying', value || undefined)}
                formatter={(value) => value ? `до ${value} т` : ''}
            />
        </div>
    );
}

export default MaxCarrying;

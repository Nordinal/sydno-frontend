import React from 'react';
import { InputNumber } from 'antd';
import { TChangeConfigProperty } from '../ui/SearhFiltres';

const PassangersAvialable: React.FC<{
    min_passangers_avialable?: number;
    max_passangers_avialable?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_passangers_avialable,
    max_passangers_avialable,
    changeConfigProperty
}) => {
    return (
        <div>
            <p>Пассажировмещаемость</p>
            <InputNumber
                value={min_passangers_avialable}
                min={0}
                step={1}
                max={Infinity}
                onChange={(value) => changeConfigProperty<number | undefined>('min_passangers_avialable', value || undefined)}
                formatter={(value) => value ? `от ${value} чел.` : ''}
            />
            <InputNumber
                value={max_passangers_avialable}
                min={0}
                step={1}
                max={Infinity}
                onChange={(value) => changeConfigProperty<number | undefined>('max_passangers_avialable', value || undefined)}
                formatter={(value) => value ? `до ${value} чел.` : ''}
            />
        </div>
    );
}

export default PassangersAvialable;

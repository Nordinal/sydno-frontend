import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { InputNumber, Switch } from 'antd';

const FillingTank: React.FC<{
    liquid_tanks?: boolean;
    total_capacity_liquid_tanks?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    liquid_tanks,
    total_capacity_liquid_tanks,
    changeConfigProperty
}) => {
    return (
        <div className='flex'>
            <div className="">
                <p>Наливной танк</p>
                <Switch
                    onChange={(checked) => changeConfigProperty<boolean | undefined>('cargo_tanks', checked || undefined)}
                    checked={liquid_tanks}
                    size='small'
                />
            </div>
            {
                liquid_tanks ? 
                <div className="">
                    <p>Cуммарная вместимость</p>
                    <InputNumber
                        value={total_capacity_liquid_tanks}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        onChange={(value) => changeConfigProperty<number | undefined>('total_capacity_cargo_tanks', value || undefined)}
                        formatter={(value) => value ? `${value} т ` : ''}
                    /> 
                </div>
                : <></>
            }
        </div>
    );
}

export default FillingTank;

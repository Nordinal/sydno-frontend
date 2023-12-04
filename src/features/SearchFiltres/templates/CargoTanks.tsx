import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { InputNumber, Switch } from 'antd';

const CargoTanks: React.FC<{
    cargo_tanks?: boolean;
    total_capacity_cargo_tanks?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    cargo_tanks,
    total_capacity_cargo_tanks,
    changeConfigProperty
}) => {
    return (
        <div className='flex'>
            <div className="">
                <p>Грузовой танк</p>
                <Switch
                    onChange={(checked) => changeConfigProperty<boolean | undefined>('cargo_tanks', checked || undefined)}
                    checked={cargo_tanks}
                    size='small'
                />
            </div>
            {
                cargo_tanks ? 
                <div className="">
                    <p>Cуммарная вместимость</p>
                    <InputNumber
                        value={total_capacity_cargo_tanks}
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

export default CargoTanks;

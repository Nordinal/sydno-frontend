import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Select } from 'antd';

const OPTIONS = [
    {value: true, label: 'Да'},
    {value: false, label: 'Нет'},
    {value: null, label: 'Не важно'},
]

const IcePower: React.FC<{
    ice_power?: boolean;
    changeConfigProperty: TChangeConfigProperty
}> = ({
    ice_power,
    changeConfigProperty
}) => {
  return (
    <Select
        style={{width: '100%'}}
        value={ice_power}
        options={OPTIONS}
        onChange={(value) => changeConfigProperty<boolean>('ice_power', value === null ? undefined : value)}
    />
  )
}

export default IcePower;

import React from 'react';
import { Select } from 'antd';
import { TChangeConfigProperty } from '../ui/SearhFiltres';

const SELECT_OPTIONS = [
    {value: true, label: 'да'},
    {value: false, label: 'нет'},
    {value: null, label: 'не важно'},
]

const WasRegistered: React.FC<{
    was_registered?: boolean;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    was_registered,
    changeConfigProperty
}) => {
  return (
    <Select
        style={{ width: '100%' }}
        value={was_registered}
        onChange={(value) => changeConfigProperty<boolean>('was_registered', value === null ? undefined : value)}
        options={SELECT_OPTIONS}
    />
  )
}

export default WasRegistered;

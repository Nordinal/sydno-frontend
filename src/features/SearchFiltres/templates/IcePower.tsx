import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Select } from 'antd';

const OPTIONS = [
  {value: true, label: 'Да'},
  {value: false, label: 'Нет'},
]

const IcePower: React.FC<{
    ice_power?: boolean | null;
    changeConfigProperty: TChangeConfigProperty
}> = ({
    ice_power,
    changeConfigProperty
}) => {
  return (
    <>
      <p>Ледовое усиление</p>
      <Select
        style={{width: '100%'}}
        value={ice_power}
        options={OPTIONS}
        allowClear
        onChange={(value) => changeConfigProperty<boolean>('ice_power', value)}
      />
    </>
  )
}

export default IcePower;

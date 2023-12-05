import React from 'react';
import { Select } from 'antd';
import { TChangeConfigProperty } from '../ui/SearhFiltres';

const SELECT_OPTIONS = [
    {value: true, label: 'да'},
    {value: false, label: 'нет'},
]

const WasRegistered: React.FC<{
    was_registered?: boolean;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    was_registered,
    changeConfigProperty
}) => {
  return (
    <>
      <p>Находилось ли на учете</p>
      <Select
          style={{ width: '100%' }}
          value={was_registered}
          allowClear
          onChange={(value) => changeConfigProperty<boolean>('was_registered', value)}
          options={SELECT_OPTIONS}
      />
    </>
  )
}

export default WasRegistered;

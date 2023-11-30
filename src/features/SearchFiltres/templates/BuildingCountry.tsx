import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Input } from 'antd';

const BuildingCountry: React.FC<{
    building_country?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    building_country,
    changeConfigProperty
}) => {
  return (
    <Input
        value={building_country}
        style={{width: '100%'}}
        onChange={(event) => changeConfigProperty<string>('building_country', event.target.value)}
    />
  )
}

export default BuildingCountry;

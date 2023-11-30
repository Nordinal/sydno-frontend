import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { DatePicker } from 'antd';

const BuildingYear: React.FC<{
    building_year?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    building_year,
    changeConfigProperty
}) => {
  return (
    <DatePicker
        style={{width: '100%'}}
    />
  )
}

export default BuildingYear;

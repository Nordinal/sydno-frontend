import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { DatePicker, DatePickerProps } from 'antd';
import moment from 'moment';

const BuildingYear: React.FC<{
    building_year?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    building_year,
    changeConfigProperty
}) => {
  const onDateChanged = (
    _: DatePickerProps['value'],
    dateString?: string,
  ) => {
    changeConfigProperty<string>('building_year', dateString || undefined);
  }
  return (
    <>
      <p>Год постройки</p>
      <DatePicker
          picker="year"
          value={building_year ? moment(building_year) : undefined}
          onChange={onDateChanged}
          style={{width: '100%'}}
      />
    </>
  )
}

export default BuildingYear;

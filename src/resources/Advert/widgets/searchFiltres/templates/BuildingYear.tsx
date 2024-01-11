import React from 'react';
import { TChangeConfigProperty } from '../types';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';

export const BuildingYear: React.FC<{
    building_year?: string | null;
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
          value={building_year ? dayjs(building_year) : undefined}
          onChange={onDateChanged}
          style={{width: '100%'}}
      />
    </>
  )
}

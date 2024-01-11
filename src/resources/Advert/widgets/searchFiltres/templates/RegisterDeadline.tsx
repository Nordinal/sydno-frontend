import React from 'react';
import { TChangeConfigProperty } from '../types';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';

export const RegisterDeadline: React.FC<{
    register_valid_until?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    register_valid_until,
    changeConfigProperty
}) => {
  const onDateChanged = (
    _: DatePickerProps['value'],
    dateString?: string,
  ) => {
    changeConfigProperty<string>('register_valid_until', dateString || undefined);
  }

  return (
    <>
      <p>Учет действует до</p>
      <DatePicker
        value={ register_valid_until ? dayjs(register_valid_until) : undefined}
        onChange={onDateChanged}
        allowClear
        style={{width: '100%'}}
      />
    </>
  )
}

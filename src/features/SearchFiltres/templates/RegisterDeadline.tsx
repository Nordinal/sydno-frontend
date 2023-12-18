import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { DatePicker, DatePickerProps } from 'antd';
import moment from 'moment';

const RegisterDeadline: React.FC<{
    register_valid_until?: string;
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
        value={ register_valid_until ? moment(register_valid_until) : undefined}
        onChange={onDateChanged}
        allowClear
        style={{width: '100%'}}
      />
    </>
  )
}

export default RegisterDeadline;

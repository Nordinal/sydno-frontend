import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const RegisterDeadline: React.FC<{
    register_valid_until?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    register_valid_until,
    changeConfigProperty
}) => {
  return (
    <>
      <p>Учет действует до</p>
      <DatePicker
          style={{width: '100%'}}
      />
    </>
  )
}

export default RegisterDeadline;

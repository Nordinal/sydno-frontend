import React from 'react';
import { TChangeConfigProperty } from '../types';
import { DatePicker, Typography} from 'antd';
import dayjs from 'dayjs';

export const DateRangePickerFilter: React.FC<{
    value: [(string | null), (string | null)];
    placeholder?: string;
    keyProperties: [string, string];
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperties, onChange, placeholder }) => {

    return (
        <div className='w-full'>
            <Typography.Text type='secondary'>{placeholder}</Typography.Text>
            <DatePicker.RangePicker
                picker='year'
                style={{ width: '100%' }}
                value={[value[0] ? dayjs(value[0]) : null, value[1] ? dayjs(value[1]) : null]}
                onChange={(value, formatValue) => {
                    onChange(formatValue[0], keyProperties[0]);
                    onChange(formatValue[1], keyProperties[1]);
                }}
            />
        </div>
    );
};
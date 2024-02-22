import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Input, Typography } from 'antd';

export const InputTextFilter: React.FC<{
    value: string;
    placeholder?: string;
    keyProperty: string;
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperty, onChange, placeholder }) => {
    return (
        <div>
            <Typography.Text type='secondary'>{placeholder}</Typography.Text>
            <Input
                placeholder={placeholder}
                value={value || undefined}
                onChange={(event) => onChange(event.target.value, keyProperty)}
            />
        </div>
    );
};

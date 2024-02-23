import React from 'react';
import { TChangeConfigProperty } from '../types';
import { InputNumber, Space, Typography } from 'antd';

export const InputNumberRangeFilter: React.FC<{
    value: [number | undefined | null, number | undefined | null];
    placeholder?: string;
    keyProperties: [string, string];
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperties, onChange, placeholder }) => {
    return (
        <div>
            <Typography.Text type='secondary'>{placeholder}</Typography.Text>
            <Space.Compact className='w-full'>
                <InputNumber
                    style={{ width: '50%' }}
                    placeholder={'от'}
                    value={value[0]}
                    onChange={(val) =>
                        onChange(value[1] && (val || 0) > (value[1] || 0) ? value[1] : val, keyProperties[0])
                    }
                />
                <InputNumber
                    style={{ width: '50%' }}
                    placeholder={'до'}
                    value={value[1]}
                    onChange={(val) => {
                        if (value[1] && (val || 0) < (value[0] || 0)) {
                            onChange(value[1] && (val || 0) > (value[1] || 0) ? value[1] : val, keyProperties[1]);
                        }
                        onChange(val, keyProperties[1]);
                    }}
                />
            </Space.Compact>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import { TChangeConfigProperty } from '../types';
import { Select, Typography } from 'antd';
import { sydnoServiceFormData } from 'SydnoService/service';

export const SelectorServiceFilter: React.FC<{
    value?: string | null;
    placeholder?: string;
    keyProperty: string;
    adress: string;
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperty, onChange, adress, placeholder }) => {
    const [typeList, setTypeList] = useState<{ value: string; label: string }[]>();

    useEffect(() => {
        sydnoServiceFormData.get(`/api/selector?${adress}`).then((res) => {
            const data = res.data.message;
            setTypeList(
                Object.entries(data[adress] as { [x in string]: string }).map(([value, label]: [string, string]) => ({
                    value,
                    label
                }))
            );
        });
    }, []);

    return (
        <div>
            <Typography.Text type='secondary'>{placeholder}</Typography.Text>
            <Select
                value={value}
                style={{ width: '100%' }}
                onChange={(value) => onChange(value, keyProperty)}
                allowClear
                placeholder={placeholder}
                options={typeList}
            />
        </div>
    );
};

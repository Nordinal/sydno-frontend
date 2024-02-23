import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Typography } from 'antd';
import { RegionSelector } from 'SydnoComponents/selectors';

export const RegionSelectorFilter: React.FC<{
    value?: string | null;
    placeholder?: string;
    keyProperty: string;
    onChange: TChangeConfigProperty;
}> = ({ value, keyProperty, onChange, placeholder }) => {
    return (
        <div>
            <Typography.Text type='secondary'>{placeholder}</Typography.Text>
            <RegionSelector
                value={value ? { value } : undefined}
                style={{ width: '100%' }}
                onChange={({ city }: { city: any }) => onChange<string>(city, keyProperty)}
            />
        </div>
    );
};

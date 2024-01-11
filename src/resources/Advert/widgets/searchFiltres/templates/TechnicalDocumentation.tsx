import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Select } from 'antd';

const OPTIONS = [
    {value: true, label: 'да'},
    {value: false, label: 'нет'}
];

export const TechnicalDocumentation: React.FC<{
    technical_documentation?: boolean | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    technical_documentation,
    changeConfigProperty
}) => {
    return (
        <div>
            <p>Техническая документация</p>
            <Select
                value={technical_documentation}
                style={{ width: '100%' }}
                onChange={(value) => changeConfigProperty<boolean>('technical_documentation', value)}
                allowClear
                options={OPTIONS}
            />
        </div>
    )
}

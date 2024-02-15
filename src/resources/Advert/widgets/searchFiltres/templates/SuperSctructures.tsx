import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Select } from 'antd';

const OPTIONS = [
    { value: true, label: 'да' },
    { value: false, label: 'нет' }
];

export const SuperSctructures: React.FC<{
    superstructures?: boolean | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ superstructures, changeConfigProperty }) => {
    return (
        <div>
            <p>Надстройки</p>
            <Select
                value={superstructures}
                style={{ width: '100%' }}
                onChange={(value) => changeConfigProperty<boolean>('superstructures', value)}
                allowClear
                options={OPTIONS}
            />
        </div>
    );
};

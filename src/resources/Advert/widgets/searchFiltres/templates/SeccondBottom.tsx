import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Select } from 'antd';

const OPTIONS = [
    { value: true, label: 'да' },
    { value: false, label: 'нет' }
];

export const SeccondBottom: React.FC<{
    seccond_bottom?: boolean | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ seccond_bottom, changeConfigProperty }) => {
    return (
        <div>
            <p>Второе дно</p>
            <Select
                value={seccond_bottom}
                style={{ width: '100%' }}
                onChange={(value) => changeConfigProperty<boolean>('seccond_bottom', value)}
                allowClear
                options={OPTIONS}
            />
        </div>
    );
};

import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Select } from 'antd';

const OPTIONS = [
    {value: true, label: 'да'},
    {value: false, label: 'нет'}
];

export const SecondSides: React.FC<{
    second_sides?: boolean | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    second_sides,
    changeConfigProperty
}) => {
    return (
        <div>
            <p>Вторые борта</p>
            <Select
                value={second_sides}
                style={{ width: '100%' }}
                onChange={(value) => changeConfigProperty<boolean>('second_sides', value)}
                allowClear
                options={OPTIONS}
            />
        </div>
    )
}

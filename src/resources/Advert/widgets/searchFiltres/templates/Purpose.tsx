import React from 'react';
import { Input } from 'antd';
import { TChangeConfigProperty } from '../types';

export const Purpose: React.FC<{
    purpose?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ purpose, changeConfigProperty }) => {
    return (
        <>
            <p>Назначение</p>
            <Input
                value={purpose || undefined}
                onChange={(event) => changeConfigProperty<string>('purpose', event.target.value)}
            />
        </>
    );
};

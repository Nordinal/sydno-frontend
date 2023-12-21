import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Input } from 'antd';

export const ImoNumber: React.FC<{
    imo_number?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    imo_number,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Номер IMO</p>
            <Input
                value={imo_number || undefined}
                style={{width: '100%'}}
                onChange={(e) => changeConfigProperty<string>('imo_number', e.target.value)}
            />
        </>
    )
}

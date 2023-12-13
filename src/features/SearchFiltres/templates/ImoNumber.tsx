import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Input } from 'antd';

const ImoNumber: React.FC<{
    imo_number?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    imo_number,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Номер IMO</p>
            <Input
                value={imo_number}
                style={{width: '100%'}}
                onChange={(e) => changeConfigProperty<string>('imo_number', e.target.value)}
            />
        </>
    )
}

export default ImoNumber;

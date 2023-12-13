import React from 'react';
import { Input } from 'antd';
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const Type: React.FC<{
    type?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    type,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Тип</p>
            <Input 
                value={type}
                onChange={(event) => changeConfigProperty<string>('type', event.target.value)}
            />
        </>
    )
}

export default Type;

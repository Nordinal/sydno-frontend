import React from 'react';
import { Input } from 'antd';
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const Purpose: React.FC<{
    purpose?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    purpose,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Назначение</p>
            <Input 
                value={purpose}
                onChange={(event) => changeConfigProperty<string>('purpose', event.target.value)}
            />
        </>
    )
}

export default Purpose;

import React from 'react';
import { Input } from 'antd';
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const Purpose: React.FC<{
    purpose?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    purpose,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Назначение</p>
            <Input 
                value={purpose || undefined}
                onChange={(event) => changeConfigProperty<string>('purpose', event.target.value)}
            />
        </>
    )
}

export default Purpose;

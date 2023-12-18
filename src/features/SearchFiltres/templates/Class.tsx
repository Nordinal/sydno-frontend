import React from 'react';
import { Input } from 'antd';
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const Class: React.FC<{
    class_formula?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    class_formula,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Класс</p>
            <Input 
                value={class_formula}
                onChange={(event) => changeConfigProperty<string>('class_formula', event.target.value)}
            />
        </>
    )
}

export default Class;

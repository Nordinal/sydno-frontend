import React from 'react';
import { Input } from 'antd';
import { TChangeConfigProperty } from "../types";

export const Class: React.FC<{
    class_formula?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    class_formula,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Класс</p>
            <Input 
                value={class_formula || undefined}
                onChange={(event) => changeConfigProperty<string>('class_formula', event.target.value)}
            />
        </>
    )
}

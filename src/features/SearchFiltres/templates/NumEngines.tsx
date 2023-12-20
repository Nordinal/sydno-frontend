import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";
import { InputNumber } from "antd";

const NumEngines: React.FC<{
    num_engines?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    num_engines,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Количество двигателей</p>
            <InputNumber
                value={num_engines}
                min={1}
                max={8}
                onChange={(value) => changeConfigProperty<number | undefined>('num_engines', value || undefined)}
                formatter={(value) => value ? `${value} шт` : ''}
            />
        </>
    );
}

export default NumEngines;

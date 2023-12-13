import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";
import { InputNumber } from "antd";

const EnginePower: React.FC<{
    min_power?: number;
    max_power?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_power,
    max_power,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Мощность двигателей</p>
            <InputNumber
                value={min_power}
                min={1}
                max={100000}
                onChange={(value) => changeConfigProperty<number | undefined>('min_power', value || undefined)}
                formatter={(value) => value ? `от ${value} кВт` : ''}
            />
            <InputNumber
                value={max_power}
                min={1}
                max={100000}
                onChange={(value) => changeConfigProperty<number | undefined>('max_power', value || undefined)}
                formatter={(value) => value ? `до ${value} кВт` : ''}
            />
        </>
    );
}

export default EnginePower;

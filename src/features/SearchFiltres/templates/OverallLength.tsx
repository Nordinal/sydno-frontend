import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";
import { InputNumber } from "antd";

const OverallLength: React.FC<{
    min_overall_length?: number | null;
    max_overall_length?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_overall_length,
    max_overall_length,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Длинна судна</p>
            <InputNumber
                value={min_overall_length}
                min={1}
                max={100000}
                onChange={(value) => changeConfigProperty<number | undefined>('min_overall_length', value || undefined)}
                formatter={(value) => value ? `от ${value} м` : ''}
            />
            <InputNumber
                value={max_overall_length}
                min={1}
                max={100000}
                onChange={(value) => changeConfigProperty<number | undefined>('max_overall_length', value || undefined)}
                formatter={(value) => value ? `до ${value} м` : ''}
            />
        </>
    );
}

export default OverallLength;

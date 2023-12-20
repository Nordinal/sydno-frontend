import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";
import { InputNumber } from "antd";

const OverallWidth: React.FC<{
    min_overall_width?: number | null;
    max_overall_width?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_overall_width,
    max_overall_width,
    changeConfigProperty,
}) => {
    return (
        <>
            <p>Ширина судна</p>
            <InputNumber
                value={min_overall_width}
                min={1}
                max={100000}
                onChange={(value) => changeConfigProperty<number | undefined>('min_overall_width', value || undefined)}
                formatter={(value) => value ? `от ${value} м` : ''}
            />
            <InputNumber
                value={max_overall_width}
                min={1}
                max={100000}
                onChange={(value) => changeConfigProperty<number | undefined>('max_overall_width', value || undefined)}
                formatter={(value) => value ? `до ${value} м` : ''}
            />
        </>
    );
}

export default OverallWidth;

import { Input } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../types";

export const BuildingNumber: React.FC<{
    building_number?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    building_number,
    changeConfigProperty
}) => {
    return (
        <>
            <p>Строительный номер</p>
            <Input
                value={building_number || undefined}
                onChange={(event) => changeConfigProperty<string>('building_number', event.target.value)}
            />
        </>
    );
}

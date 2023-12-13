import { Input } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../types";

const BuildingNumber: React.FC<{
    building_number?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    building_number,
    changeConfigProperty
}) => {
    return (
        <>
            <p>Строительный номер</p>
            <Input
                value={building_number}
                onChange={(event) => changeConfigProperty<string>('building_number', event.target.value)}
            />
        </>
    );
}

export default BuildingNumber;

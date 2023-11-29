import { Select } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const OPTIONS = [
    { value: 'древесина', label: 'древесина' },
    { value: 'сталь', label: 'сталь' },
    { value: 'железобетонный', label: 'железобетонный' },
    { value: 'композитный', label: 'композитный' },
    { value: null, label: 'не важно' },
];

const CorpusMaterial: React.FC<{
    material?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    material,
    changeConfigProperty
}) => {
        return (
            <Select
                style={{ width: '100%' }}
                value={material}
                onChange={(value) => changeConfigProperty<string>('material', value === null ? undefined : value)}
                options={OPTIONS}
            />
        );
    }

export default CorpusMaterial;
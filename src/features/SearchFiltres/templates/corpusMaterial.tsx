import { Select } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const OPTIONS = [
    { value: 'древесина', label: 'древесина' },
    { value: 'сталь', label: 'сталь' },
    { value: 'железобетонный', label: 'железобетонный' },
    { value: 'композитный', label: 'композитный' },
];

const CorpusMaterial: React.FC<{
    material?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    material,
    changeConfigProperty
}) => {
        return (
            <>
                <p>Материал корпуса</p>
                <Select
                    style={{ width: '100%' }}
                    value={material}
                    allowClear
                    onChange={(value) => changeConfigProperty<string>('material', value)}
                    options={OPTIONS}
                />
            </>
        );
    }

export default CorpusMaterial;
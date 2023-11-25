import { Select } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";

const OPTIONS = [
    { value: 'деревянный', label: 'деревянный' },
    { value: 'сталь', label: 'сталь' },
    { value: 'сплав', label: 'сплав' },
    { value: 'железобетонные', label: 'железобетонные', },
    { value: 'пластическая масса', label: 'пластическая масса', },
    { value: 'композитные', label: 'композитные', },
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
                placeholder={material || 'Материал корпуса'}
                style={{ width: '100%' }}
                defaultValue={material}
                onChange={(value) => changeConfigProperty<string>('material', value)}
                options={OPTIONS}
            />
        );
    }

export default CorpusMaterial;
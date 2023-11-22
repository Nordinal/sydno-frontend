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
    defaultValue?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    defaultValue,
    changeConfigProperty
}) => {
        return (
            <Select
                placeholder={defaultValue || 'Материал корпуса'}
                style={{ width: '100%' }}
                defaultValue={defaultValue}
                onChange={(value) => changeConfigProperty<string>('corpusMaterial', value)}
                options={OPTIONS}
            />
        );
    }

export default CorpusMaterial;
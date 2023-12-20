import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";
import { instanceApi } from '@/shared/configs/instanceAxios';

const CorpusMaterial: React.FC<{
    material?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    material,
    changeConfigProperty
}) => {
        const [materialList, setMaterialList] = useState<{value: string, label: string}[]>();

        useEffect(() => {
            instanceApi.get('/api/selector?materials').then(res => {
                const data = res.data.message
                setMaterialList(
                    Object.entries(data.materials as {[x in string]: string})
                        .map(([value, label] : [string, string]) => ({
                            value,
                            label
                        }))
                );
            });
        }, []);

        return (
            <>
                <p>Материал корпуса</p>
                <Select
                    style={{ width: '100%' }}
                    value={material}
                    allowClear
                    onChange={(value) => changeConfigProperty<string>('material', value)}
                    options={materialList}
                />
            </>
        );
    }

export default CorpusMaterial;
import React, { useEffect, useState } from 'react';
import { TChangeConfigProperty } from '../types';
import { Select } from 'antd';
import { sydnoServiceFormData } from 'SydnoService/service';

export const Type: React.FC<{
    type?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    type,
    changeConfigProperty
}) => {
    const [typeList, setTypeList] = useState<{value: string, label: string}[]>();

    useEffect(() => {
        sydnoServiceFormData.get('/api/selector?vesseltypes').then(res => {
            const data = res.data.message
            setTypeList(
                Object.entries(data.vessel_types as {[x in string]: string})
                    .map(([value, label] : [string, string]) => ({
                        value,
                        label
                    }))
            );
        });
    }, []);

    return (
        <>
            <p>Тип</p>
            <Select
                value={type}
                style={{ width: '100%' }}
                onChange={(value) => changeConfigProperty<string>('type', value)}
                allowClear
                options={typeList}
            />
        </>
    )
}

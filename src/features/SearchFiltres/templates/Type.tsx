import React, { useEffect, useState } from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Select } from 'antd';
import { instanceApi } from '@/shared/configs/instanceAxios';

const Type: React.FC<{
    type?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    type,
    changeConfigProperty
}) => {
    const [typeList, setTypeList] = useState<{value: string, label: string}[]>();

    useEffect(() => {
        instanceApi.get('/api/selector?vesseltypes').then(res => {
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

export default Type;

import React, { useEffect, useState } from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Select } from 'antd';
import { instanceApi } from '@/shared/configs/instanceAxios';

const VesselStatus: React.FC<{
    vessel_status?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    vessel_status,
    changeConfigProperty
}) => {
    const [statusList, setStatusList] = useState<{value: string, label: string}[]>();

    useEffect(() => {
        instanceApi.get('/api/selector?vesselstatuses').then(res => {
            const data = res.data.message
            setStatusList(
                Object.entries(data.vessel_statuses as {[x in string]: string})
                    .map(([value, label] : [string, string]) => ({
                        value,
                        label
                    }))
            );
        });
    }, []);

    return (
        <>
            <p>Статус судна</p>
            <Select
                value={vessel_status}
                style={{ width: '100%' }}
                onChange={(value) => changeConfigProperty<string>('vessel_status', value)}
                allowClear
                options={statusList}
            />
        </>
    )
}

export default VesselStatus;

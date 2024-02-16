import React, { useEffect, useState } from 'react';
import { TChangeConfigProperty } from '../types';
import { Select } from 'antd';
import { sydnoServiceFormData } from 'SydnoService/service';

export const VesselStatus: React.FC<{
    vessel_status?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ vessel_status, changeConfigProperty }) => {
    const [statusList, setStatusList] = useState<{ value: string; label: string }[]>();

    useEffect(() => {
        sydnoServiceFormData.get('/api/selector?vesselstatuses').then((res) => {
            const data = res.data.message;
            setStatusList(
                Object.entries(data.vessel_statuses as { [x in string]: string }).map(
                    ([value, label]: [string, string]) => ({
                        value,
                        label
                    })
                )
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
    );
};

import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Select } from 'antd';

const OPTIONS = [
    {value: 'эксплуатируется', label: 'эксплуатируется'},
    {value: 'на холодном отстое', label: 'на холодном отстое'},
    {value: 'прекращено действие документов', label: 'прекращено действие документов'},
];

const VesselStatus: React.FC<{
    vessel_status?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    vessel_status,
    changeConfigProperty
}) => {
    return (
        <>
            <p>Статус судна</p>
            <Select
                value={vessel_status}
                style={{ width: '100%' }}
                onChange={(value) => changeConfigProperty<string>('vessel_status', value)}
                allowClear
                options={OPTIONS}
            />
        </>
    )
}

export default VesselStatus;

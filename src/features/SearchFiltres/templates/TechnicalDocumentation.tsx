import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Select } from 'antd';

const OPTIONS = [
    {value: true, label: 'да'},
    {value: false, label: 'нет'}
];

const TechnicalDocumentation: React.FC<{
    technical_documentation?: boolean;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    technical_documentation,
    changeConfigProperty
}) => {
    return (
        <div>
            <p>Надстройки</p>
            <Select
                value={technical_documentation}
                style={{ width: '100%' }}
                onChange={(value) => changeConfigProperty<boolean>('technical_documentation', value)}
                allowClear
                options={OPTIONS}
            />
        </div>
    )
}

export default TechnicalDocumentation;

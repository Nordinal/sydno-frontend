import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Select } from 'antd';

const OPTIONS = [
    {value: true, label: 'да'},
    {value: false, label: 'нет'}
];

const DeckHouse: React.FC<{
    deckhouses?: boolean;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    deckhouses,
    changeConfigProperty
}) => {
    return (
        <div>
            <p>Рубки</p>
            <Select
                value={deckhouses}
                style={{ width: '100%' }}
                onChange={(value) => changeConfigProperty<boolean>('deckhouses', value)}
                allowClear
                options={OPTIONS}
            />
        </div>
    )
}

export default DeckHouse;

import React from 'react';
import { TChangeConfigProperty } from '../types';
import { CountriesSelector } from 'SydnoComponents/selectors';

export const Flag: React.FC<{
    flag?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ flag, changeConfigProperty }) => {
    return (
        <>
            <p>Флаг</p>
            <CountriesSelector
                value={flag || undefined}
                style={{ width: '100%' }}
                placeholder='Выберите флаг'
                onChange={(value: string) => changeConfigProperty<string>('flag', value)}
                allowClear={true}
            />
        </>
    );
};

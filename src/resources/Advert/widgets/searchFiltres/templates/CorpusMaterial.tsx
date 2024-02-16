import React from 'react';
import { TChangeConfigProperty } from '../types';
import { BackendSelector } from 'SydnoComponents/selectors';

export const CorpusMaterial: React.FC<{
    material?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ material, changeConfigProperty }) => {
    return (
        <>
            <p>Материал корпуса</p>
            <BackendSelector
                selector='materials'
                style={{ width: '100%' }}
                value={material}
                allowClear
                onChange={(value) => changeConfigProperty<string>('material', value as any)}
            />
        </>
    );
};

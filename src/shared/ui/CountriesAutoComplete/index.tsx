import { AutoComplete, Select } from 'antd';
import countriesJson from './countries.json';
import { useState } from 'react';
import { CSSProperties } from '@ant-design/cssinjs/lib/hooks/useStyleRegister';

const countriesSelectOptions = Object.entries(countriesJson.data).map(item => {
    return ({
        name: item[1],
        value: item[0],
        label:
        <span className='flex items-center'>
            <img alt={`флаг ${item[1]}`} width={30} height={20} src={'/flags/' + item[0] + '.svg'} />
            <span className='ml-2'>{item[1]}</span>
        </span>
    })
});


export const CountriesAutoComplete = ({
    placeholder,
    value,
    onChange,
    style
}: {
    placeholder?: string,
    value?: string,
    onChange?: Function,
    style?: CSSProperties
}) => {

    return (
        <Select
            value={value}
            onChange={onChange}
            showSearch
            style={style}
            className='w-full'
            placeholder={placeholder  || 'Флаг'}
            options={countriesSelectOptions}
            filterOption={(inputValue, option) =>
                option!.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
        />
    )
}
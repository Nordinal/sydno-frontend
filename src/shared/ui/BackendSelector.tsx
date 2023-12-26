import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { instanceApi } from '@/shared/configs/instanceAxios';

/**
 * Общий компонент выборки селектора с бэка
 * Необходимо передать название селекора и с бэка подтянутся список значений для данного селектора(пример - список материаов корпуса в компоненте фильтров)
 * @author Burtsev Ilysha
 * @returns 
 */
const BackendSelector: React.FC<{
    selector: string;
    value: unknown;
    onChange: (value: unknown) => void;
    style?: React.CSSProperties;
    allowClear?: boolean;
    className?: string;
}> = ({
    selector,
    value,
    onChange,
    style,
    allowClear,
    className,
}) => {
    const [selectorList, setSelectorList] = useState<{value: string, label: string}[]>();

    useEffect(() => {
        instanceApi.get('/api/selector?' + selector).then(res => {
            const data = res.data.message
            setSelectorList(
                Object.entries(data[selector] as {[x in string]: string})
                    .map(([value, label] : [string, string]) => ({
                        value,
                        label
                    }))
            );
        });
    }, []);

    return (
        <Select
            value={value}
            style={style}
            className={className}
            onChange={onChange}
            allowClear={allowClear}
            options={selectorList}
        />
    )
}

export default BackendSelector;

import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { instanceApi } from '@/shared/configs/instanceAxios';

const BackendSelector: React.FC<{
    selector: string;
    value: unknown;
    onChange: () => void;
    style?: React.CSSProperties;
    allowClear?: boolean;
}> = ({
    selector,
    value,
    onChange,
    style,
    allowClear,
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
        <>
            <Select
                value={value}
                style={style}
                onChange={onChange}
                allowClear={allowClear}
                options={selectorList}
            />
        </>
    )
}

export default BackendSelector;

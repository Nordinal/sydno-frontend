import { useDebounce } from "@/shared/helpers/useDebounce";
import { AutoComplete, Select, Spin, notification } from "antd"
import axios from "axios";
import { CSSProperties, useEffect, useState } from "react";

const TOKEN = 'ee0b1f2261bdb7bf2866d601059950bdb1e39792';


export const RegionAutoComplete = ({placeholder, value, onChange, style}: {placeholder?: string, value?: {value: string}, onChange?: Function, style?: CSSProperties}) => {
    const [options, setOptions] = useState<{value: string, data: {
        city: string,
        country: string,
        region: string
    }}[]>();
    const [search, setSearch] = useState<string>('');
    const [fetching, setFetching] = useState<boolean>(false);

    const debounceSearch = useDebounce(search, 500);

    const onSearch = async (search: string) => {
        setSearch(search);
    }

    const handleChange = (value: string) => {
        const valueObj = options?.find(item => item.value === value);
        onChange?.({
            value,
            city: valueObj?.data.city,
            country: valueObj?.data.country,
            region: valueObj?.data.region
        });
    }

    useEffect(() => {
        if(!search) return;
        try {
            setOptions([]);
            setFetching(true);
            axios.post(
                'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
                {
                    query: search,
                    from_bound: { value: "country" },
                    to_bound: { value: "city" },
                    constraints: {
                        locations: { country: "*" }
                    }
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': "application/json",
                        "Authorization": "Token " + TOKEN
                    }
                }
            )
            .then(res => {
                setOptions(res.data.suggestions)
                setFetching(false);
            })
            .catch(error => setFetching(false))
        }
        catch (e) {
            notification.error({ message: 'Произошла какая-то ошбика'});
        }
    }, [debounceSearch]);

    return (
        <Select
            showSearch
            value={value?.value}
            style={style}
            filterOption={false}
            onChange={handleChange}
            onSearch={onSearch}
            options={options}
            placeholder={placeholder || 'Порт приписки'}
            notFoundContent={fetching ? <Spin size="small" /> : null}
        />
    )
}
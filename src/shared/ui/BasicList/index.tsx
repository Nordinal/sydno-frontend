import { instanceApi } from '@/shared/configs/instanceAxios';
import { List, ListProps, notification } from 'antd';
import { useEffect, useState } from 'react';

export interface IBasicList<T> extends ListProps<T> {
    action: string;
    filters?: IFilters;
}

export type IFilters = {
    [x in string]: string | number;
} & {
    page?: number;
}

interface IBasicListService<T> {
    current_page: number,
    data: T[]
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
}

export const BasicList = <T, >(props: IBasicList<T>) => {
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState<IBasicListService<T>>();

    const getData = async (page?: number) => {
        setLoading(true);
        try {
            const filtersObj = {
                ...(props.filters || {})
            }
            if(page) filtersObj.page = page;

            const filters = Object.entries(filtersObj)
                .map(item => {
                    return `${item[0]}=${item[1]}`;
                })
                .join('&')
            const result = await instanceApi.get<IBasicListService<T>>(props.action + '?' + filters);
            setService(result.data);
        }
        catch (e) {
            notification.error({message: 'Ошибка загрузки списка', placement: 'bottomRight'});
        }
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [props.action, props.filters]);

    return (
        <List
            {...props}
            loading={props.loading || loading}
            pagination={{
                total: service?.total,
                ...(props.pagination || {}),
                defaultCurrent: props.filters?.page,
                onChange: (page, pageSize) => {
                    if(
                        props.pagination instanceof Object &&
                        props.pagination.onChange
                    ) props.pagination.onChange(page, pageSize);
                    else getData(page);
                },
            }}
            dataSource={service?.data}
        />
    );
};
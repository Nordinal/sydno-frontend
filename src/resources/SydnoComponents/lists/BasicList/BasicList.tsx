import { List, ListProps, notification } from 'antd';
import { useEffect, useState } from 'react';
import {convertObjectToPathname} from 'SydnoHelpers/commons';
import { sydnoServiceJson } from 'SydnoService/service';

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

            const result = await sydnoServiceJson.get<IBasicListService<T>>(props.action + '?' + convertObjectToPathname(filtersObj));
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
            {...{...props, action: null}}
            loading={props.loading || loading}
            pagination={Number(service?.total) > 10 && {
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
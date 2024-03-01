import { List, ListProps, notification, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { convertObjectToPathname, getDeclination } from 'SydnoHelpers/commons';
import { sydnoServiceJson } from 'SydnoService/service';

export interface IBasicList<T> extends ListProps<T> {
    action: string;
    filters?: IFilters;
    showTotalCount?: boolean;
}

export type IFilters = {
    [x in string]: string | number;
} & {
    page?: number;
};

interface IBasicListService<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export const BasicList = <T,>(props: IBasicList<T>) => {
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState<IBasicListService<T>>();
    const [localPage, setLocalPage] = useState<number>(props.filters?.page || 1);

    const getData = async (page?: number) => {
        setLoading(true);
        try {
            const filtersObj = {
                ...(props.filters || {})
            };
            if (page) filtersObj.page = page;

            const result = await sydnoServiceJson.get<IBasicListService<T>>(
                props.action + '?' + convertObjectToPathname(filtersObj)
            );
            setService(result.data);
        } catch (e) {
            notification.error({
                message: 'Ошибка загрузки списка',
                placement: 'bottomRight'
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        setLocalPage(props.filters?.page || 1);
        getData();
    }, [props.action, props.filters]);

    const getListProps = (props: IBasicList<T>) => {
        const listProps: Partial<IBasicList<T>> = { ...props };
        delete listProps.showTotalCount;
        delete listProps.action;
        return listProps;
    };

    const listProps = getListProps(props);

    return (
        <div>
            {props.showTotalCount ? (
                <Typography.Title level={4}>
                    Найдено {service?.total || 0}{' '}
                    {getDeclination(service?.total || 0, 'объявление', 'объявления', 'объявлений')}
                </Typography.Title>
            ) : null}
            <List
                {...listProps}
                loading={props.loading || loading}
                pagination={
                    Number(service?.total) > 10 && {
                        total: service?.total,
                        ...(props.pagination || {}),
                        current: localPage,
                        showSizeChanger: false,
                        onChange: (page, ...args) => {
                            if (props.pagination instanceof Object && props.pagination.onChange)
                                props.pagination.onChange.apply(this, [page, ...args]);
                            else getData(page);

                            setLocalPage(page);
                        }
                    }
                }
                dataSource={service?.data}
            />
        </div>
    );
};

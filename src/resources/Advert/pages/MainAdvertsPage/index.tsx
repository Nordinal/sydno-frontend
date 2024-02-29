'use client';
import React, { Suspense } from 'react';
import { BaseAdvertCard, IAdvertCard } from 'Advert/widgets';
import { SearchFiltres } from '../../widgets/searchFiltres/SearchFiltres';
import { BasicList } from 'SydnoComponents/lists';
import { Col, Row } from 'antd';
import { convertObjectToPathname, getUrlQueryParams } from 'SydnoHelpers/commons';
import { useRouter, useSearchParams } from 'next/navigation';
import { smoothScrollToAnchor } from 'SydnoHelpers/commons';
import { TFilterOptions } from 'Advert/widgets/searchFiltres/types';

export const MainAdvertPage = () => {
    return (
        <Suspense>
            <MainAdvertPageUI />
        </Suspense>
    );
};
/**
 * Компонент страницы с поиском обьявлений по фильтрам
 * @author Burtseff Ilysha
 */
export const MainAdvertPageUI = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const scrollToAnchor = () => {
        // делаем искусственную задержку, чтобы сначала данны грузились, а потом скролл
        setTimeout(() => {
            smoothScrollToAnchor('advert-list-anchor');
        }, 500);
    };

    const changeUrlByOptions = (filterParams: object) => {
        const currentSearchParams = getUrlQueryParams(searchParams);

        const newSearchParams = {
            ...currentSearchParams,
            ...filterParams
        };

        //@ts-ignore
        delete newSearchParams['page'];

        //@ts-ignore
        delete newSearchParams['page'];

        router.push(location.pathname + '?' + convertObjectToPathname(newSearchParams), { scroll: false });
        scrollToAnchor();
    };

    const paginationChange = (page: number) => {
        const params = new URLSearchParams(searchParams);

        params.set('page', page.toString());

        router.push(location.pathname + '?' + params.toString(), { scroll: false });
        scrollToAnchor();
    };

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    };

    return (
        <Row className='pt-4 pb-16'>
            <Col className='pb-6' span={24}>
                <SearchFiltres
                    filterOptions={getUrlQueryParams<TFilterOptions>(searchParams)}
                    onFindButtonClick={changeUrlByOptions}
                />
            </Col>
            <Col span={24}>
                <div className='sydno-anchor' id='advert-list-anchor'></div>
            </Col>
            <Col span={24}>
                <BasicList
                    action='/api/alladverts'
                    showTotalCount={true}
                    filters={getUrlQueryParams(searchParams) as any}
                    pagination={{
                        onChange: paginationChange
                    }}
                    renderItem={(item: IAdvertCard) => (
                        <BaseAdvertCard key={item.id} {...item} onClick={() => onAdvertCardClick(item.id)} />
                    )}
                />
            </Col>
        </Row>
    );
};

'use client';
import React, { Suspense, useState } from 'react';
import { BaseAdvertCard, IAdvertCard } from 'Advert/widgets';
import { SearchFiltres } from '../../widgets/SearchFiltres/SearchFiltres';
import { BasicList } from 'SydnoComponents/lists';
import { Col, Row } from 'antd';
import { convertObjectToPathname, getUrlQueryParams } from 'SydnoHelpers/commons';
import { useRouter, useSearchParams } from 'next/navigation';
import { smoothScrollToAnchor } from 'SydnoHelpers/commons';
import { TFilterOptions } from 'Advert/widgets/SearchFiltres/types';
import { SortedFilters } from 'Advert/widgets/SortedFilters/SortedFiters';
import { SearchInput } from 'Advert/widgets/SearchInput/SearchInput';
import { AdvertSmallCard } from 'Advert/widgets/AdvertSmallCard/AdvertSmallCard';

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
    const [mode, setMode] = useState<'list' | 'kanban'>('list');

    const scrollToAnchor = () => {
        smoothScrollToAnchor('advert-list-anchor');
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
            <Col span={24} className='pb-6'>
                <SortedFilters mode={mode} setMode={(value) => setMode(value)}/>
            </Col>
            <Col span={24}>
                <div id='advert-list-anchor'></div>
            </Col>
            <Col span={24}>
                <BasicList
                    mode={mode}
                    action='/api/alladverts'
                    showTotalCount
                    filters={getUrlQueryParams(searchParams) as any}
                    pagination={{
                        onChange: paginationChange
                    }}
                    renderItem={(item: IAdvertCard) => {
                        switch(mode) {
                            case 'list':
                                return (
                                    <BaseAdvertCard key={item.id} {...item} onClick={() => onAdvertCardClick(item.id)} />
                                )
                            case 'kanban':
                                return (
                                    <AdvertSmallCard advert={item}/>
                                )
                        }
                    }}
                />
            </Col>
        </Row>
    );
};

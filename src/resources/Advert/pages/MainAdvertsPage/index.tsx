'use client';
import React from "react";
import { BaseAdvertCard, IAdvertCard } from "Advert/widgets";
import { SearchFiltres } from "../../widgets/searchFiltres";
import { BasicList } from "SydnoComponents/lists";
import { Col, Row } from "antd";
import { convertObjectToPathname, getUrlQueryParams } from "SydnoHelpers/commons";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Компонент страницы с поиском обьявлений по фильтрам
 * @author Burtseff Ilysha
 */
export const MainAdvertPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changeUrlByOptions = (filterParams: object) => {
        const currentSearchParams = getUrlQueryParams(searchParams);

        const newSearchParams = {
            ...currentSearchParams,
            ...filterParams
        }

        router.push(location.pathname + '?' + convertObjectToPathname(newSearchParams), { scroll: false });
    }

    const paginationChange = (page: number) => {
        const params = new URLSearchParams(searchParams);

        params.set('page', page.toString());

        router.push(location.pathname + '?' + params.toString(), { scroll: false });
    }

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    }

    return (
        <Row className="pt-4 pb-16">
            <Col className="pb-6" span={24}>
                <SearchFiltres
                    filterOptions={getUrlQueryParams(searchParams)}
                    onFindButtonClick={changeUrlByOptions}
                />
            </Col>
            <Col span={24}>
                <BasicList
                    action="/api/alladverts"
                    filters={getUrlQueryParams(searchParams) as any}
                    pagination={{
                        onChange: paginationChange
                    }}
                    renderItem={(item: IAdvertCard) => (
                        <BaseAdvertCard
                            key={item.id}
                            {...item}
                            onClick={() => onAdvertCardClick(item.id)}
                        />
                    )}
                />
            </Col>
        </Row>
    );
}

import React from "react";
import { AdvertCard } from "@/entities/advert";
import { useRouter, useSearchParams } from "next/navigation";
import { smoothScrollToAnchor } from "SydnoHelpers/commons";
import { BasicList } from "SydnoComponents/lists";
import {getUrlQueryParams} from "SydnoHelpers/commons";
import { IAdvertCard } from "@/entities/advert/ui/AdvertCard";
import {convertObjectToPathname} from "SydnoHelpers/commons";

const List: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    }

    const paginationChange = (page: number) => {
        const params = getUrlQueryParams(searchParams);

        (params as any).page = page;

        router.push(location.pathname + '?' + convertObjectToPathname(params), {scroll: false});
    }

    return (
        <>
            <BasicList
                action="/api/alladverts"
                filters={getUrlQueryParams(searchParams) as any}
                pagination={{
                    onChange: paginationChange
                }}
                renderItem={(item: IAdvertCard) => {
                    return (
                        <AdvertCard
                            key={item.id}
                            {...item}
                            onClick={() => onAdvertCardClick(item.id)}
                        />
                    );
                }}
            />
        </>
    );
}

export default List;

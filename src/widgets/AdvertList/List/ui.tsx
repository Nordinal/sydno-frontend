import React from "react";
import { AdvertCard } from "@/entities/advert";
import { useRouter, useSearchParams } from "next/navigation";
import { smoothScrollToAnchor } from "@/shared/helpers/scroll";
import { BasicList } from "@/shared/ui/BasicList";
import getUrlQueryParams from "@/shared/helpers/getUrlQueryParams";
import { IAdvertCard } from "@/entities/advert/ui/AdvertCard";
import {convertObjectToPathname} from "@/shared/helpers/convertObjectToPathname";

const List: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    }

    const paginationChange = (page: number) => {
        const params = getUrlQueryParams(searchParams);

        params.page = page;

        router.push(location.pathname + '?' + convertObjectToPathname(params), {scroll: false});
    }

    return (
        <>
            <BasicList
                action="/api/alladverts"
                filters={getUrlQueryParams(searchParams)}
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

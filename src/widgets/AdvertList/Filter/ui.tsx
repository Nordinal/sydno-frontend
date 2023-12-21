import React from "react";
import { SearchFiltres } from "@/features/SearchFiltres";
import { useRouter, useSearchParams } from "next/navigation";
import {convertObjectToPathname} from "@/shared/helpers/convertObjectToPathname";
import getUrlQueryParams from "@/shared/helpers/getUrlQueryParams";

const Filter: React.FC = () => {
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

    return (
        <>
            <SearchFiltres
                filterOptions={getUrlQueryParams(searchParams)}
                onFindButtonClick={changeUrlByOptions}
            />
        </>
    );
}

export default Filter;

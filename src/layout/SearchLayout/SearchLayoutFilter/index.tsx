import React from "react";
import { SearchFiltres } from "@/features/SearchFiltres";
import { useRouter, useSearchParams } from "next/navigation";
import convertObjectToPathname from "@/shared/helpers/convertObjectToPathname";
import getUrlQueryParams from "@/shared/helpers/getUrlQueryParams";

const SearchLayoutFilter: React.FC = () => {
    const router = useRouter();
    const searchParams = getUrlQueryParams(useSearchParams());

    const changeUrlByOptions = (searchParams: object) => {
        router.replace(location.pathname + '?' + convertObjectToPathname(searchParams));
    }

    return (
        <>
            <SearchFiltres
                filterOptions={searchParams}
                onFindButtonClick={changeUrlByOptions}
            />
        </>
    );
}

export default SearchLayoutFilter;

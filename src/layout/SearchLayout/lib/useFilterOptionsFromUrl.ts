import { TFilterOptions } from "@/entities/advert";

export const getFilterOtionsFromQueryParams = (queryParams: object): TFilterOptions => {
    let result: TFilterOptions = {};

    for (const [key, value] of Object.entries(queryParams)) {
        if (key in result) {
            
        }
    }

    return {};
}
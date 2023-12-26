import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Хелпер для преобразования ReadonlyURLSearchParams в обьект
 * ```
 *  const searchParams = useSearchParams();
 *  const objectFromParams = getUrlQueryParams(searchParams);
 * ```
 * @param ReadonlyURLSearchParams 
 * @author Burtsev Ilysha
 */
export default function(searchParams: ReadonlyURLSearchParams): object {
    let resultObject = {};

    searchParams.forEach((value, key) => {
        //@ts-ignore
        resultObject[key] = value;
    });

    return resultObject;
}

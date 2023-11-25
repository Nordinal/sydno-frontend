import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Хелпер для преобразования ReadonlyURLSearchParams в обьект
 * @param ReadonlyURLSearchParams 
 */
export default function(searchParams: ReadonlyURLSearchParams): object {
    let resultObject = {};

    searchParams.forEach((value, key) => {
        //@ts-ignore
        resultObject[key] = value;
    });

    return resultObject;
}

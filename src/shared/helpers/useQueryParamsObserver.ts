import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import getUrlQueryParams from "./getUrlQueryParams";

/**
 * Хелпер для отслеживания изменений query-параметров страницы. Принимает колбэк, в который отправляет query-параметры в виде объекта.
 * @param callback 
 * @author Burtsev Ilysha
 */
export default function (callback: (searchParams: object) => void) {
    const searchParams = useSearchParams();

    useEffect(() => {
        callback(getUrlQueryParams(searchParams));
    }, [searchParams]);
}

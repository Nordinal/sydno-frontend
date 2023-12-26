/**
 * Хелпер для преобразовывания объекта в строку с query-параметрами
 * Если значаение null или undefined то оно не попадает в итоговую строку
 * @param object 
 * @author Burtsev Ilysha
 */
export function convertObjectToPathname(object: object): string {
    return Object.entries(object)
        .filter(([_, value]) => {
            return value !== undefined && value !== null;
        })
        .map(([key, value]) => {
            return `${key}=${value}`
        })
        .join('&');
}

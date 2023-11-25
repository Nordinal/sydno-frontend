/**
 * Хелпер для преобразовывания объекта в строку с query-параметрами
 * @param object 
 * @returns 
 */
export default function (object: object) {
    let result = '';
    Object.entries(object).forEach(([key, value]) => {
        result = result + '&' + key + '=' + value;
    });
    return result.slice(1, result.length);
}

/**
 * Метод для определения touch-устройства у пользователя. Вызывать только на клиенте!!!!
 * @returns 
 */
export default function () {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
}

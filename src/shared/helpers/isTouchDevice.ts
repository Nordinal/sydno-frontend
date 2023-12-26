/**
 * хелпер для определения touch-устройства у пользователя. Вызывать только на клиенте!!!!
 * @author Burtsev Ilysha
 */
export default function () {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
}

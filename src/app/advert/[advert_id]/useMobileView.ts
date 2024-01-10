import { useWindowSize } from "react-use";

/**
 * Хук useMobileView.
 * Определяет, находится ли приложение в мобильном представлении (ширина экрана <= 810).
 * Возвращает:
 * @returns {boolean} Флаг, указывающий, является ли текущий вид мобильным.
 *
 * Author: [Gleb]
 */

const useMobileView = () => {
  const { width } = useWindowSize();
  const isMobileView = width <= 810;

  return isMobileView;
};

export default useMobileView;

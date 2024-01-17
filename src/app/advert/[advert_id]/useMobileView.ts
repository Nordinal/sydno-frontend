import { useEffect, useState } from "react";

/**
 * Хук useMobileView.
 * Определяет, находится ли приложение в мобильном представлении (ширина экрана <= 810).
 * Возвращает:
 * @returns {boolean} Флаг, указывающий, является ли текущий вид мобильным.
 *
 * Author: [Gleb]
 */

const useMobileView = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const mobileThreshold = 810;
      setIsMobileView(currentWidth <= mobileThreshold);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobileView;
};

export default useMobileView;

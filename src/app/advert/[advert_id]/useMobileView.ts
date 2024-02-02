import { useEffect, useState } from "react";

/**
 * Хук useMobileView.
 * Определяет, находится ли приложение в мобильном представлении (ширина экрана <= 810).
 * Возвращает:
 * @returns {boolean} Флаг, указывающий, является ли текущий вид мобильным.
 *
 * Author: [Gleb]
 */

// const useMobileView = () => {
//   const [isMobileView, setIsMobileView] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const currentWidth = window.innerWidth;
//       const mobileThreshold = 810;
//       setIsMobileView(currentWidth <= mobileThreshold);
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return isMobileView;
// };

// export default useMobileView;

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("big"); // 'small', 'middle', 'big'

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const mobileThreshold = 840;
      const middleThreshold = 1150;

      if (currentWidth <= mobileThreshold) {
        setScreenSize("small");
      } else if (currentWidth <= middleThreshold) {
        setScreenSize("middle");
      } else {
        setScreenSize("big");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  return screenSize;
};

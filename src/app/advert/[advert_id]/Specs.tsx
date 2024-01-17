import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";
import useMobileView from "./useMobileView";

type DescriptionItem = {
  key: string;
  label: string;
  children: React.ReactNode | number | string | JSX.Element | undefined;
};

type DescriptionsPropsObject = {
  mainInfo: DescriptionItem[];
  legalInfo: DescriptionItem[];
  technicalInfo: DescriptionItem[];
};

interface SpecsProps {
  ConvertedAdvertData: DescriptionsPropsObject | undefined;
}

/**
 * Компонент Характеристик.
 * Отображает характеристики объявления в виде Descriptions из Ant Design.
 * @param ConvertedAdvertData Данные объявления, которые должны быть сконвертированы для отображения.
 *
 * Author: [Gleb]
 */

const Specs: React.FC<SpecsProps> = ({ ConvertedAdvertData }) => {
  const [showAllCharacteristics, setShowAllCharacteristics] = useState(false);
  const mobileView = useMobileView();
  const columns = mobileView ? 1 : 2;

  useEffect(() => {
    if (showAllCharacteristics) {
      const descriptionsElement = document.getElementById("descriptions");
      if (descriptionsElement) {
        const offsetTop = descriptionsElement.offsetTop;

        window.scrollTo({
          top: window.scrollY + offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [showAllCharacteristics]);

  return (
    <div className="specs">
      <Descriptions
        bordered
        title="Характеристики:"
        size={"small"}
        items={ConvertedAdvertData && ConvertedAdvertData.mainInfo}
        className="descriptions"
        column={columns}
      />

      {!showAllCharacteristics && ConvertedAdvertData && (
        <button
          onClick={() => setShowAllCharacteristics(true)}
          className="show-close"
        >
          Показать все характеристики...
        </button>
      )}

      {showAllCharacteristics && ConvertedAdvertData && (
        <>
          <Descriptions
            bordered
            title="Юридическая информация:"
            size={"small"}
            items={ConvertedAdvertData.legalInfo}
            className="descriptions"
            column={columns}
          />
          <Descriptions
            bordered
            title="Техническая информация:"
            size={"small"}
            items={ConvertedAdvertData.technicalInfo}
            className="descriptions"
            column={columns}
            id="descriptions"
          />

          {/* <Button
            className="show-close"
            onClick={() => setShowAllCharacteristics(false)}
          >
            Скрыть
          </Button> */}
          <button
            onClick={() => setShowAllCharacteristics(false)}
            className="show-close"
          >
            Скрыть
          </button>
        </>
      )}
    </div>
  );
};

export default Specs;

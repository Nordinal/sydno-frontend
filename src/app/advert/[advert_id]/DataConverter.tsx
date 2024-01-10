// import { IAdvertListItem } from "@/entities/advert/types/main";
import { IAdvertListItem } from "@/entities/advert/types/main";
import countriesJson from "../../../resources/SydnoComponents/selectors/CountriesSelector/countries.json";

type DescriptionItem = {
  key: string;
  label: string;
  children: React.ReactNode | number | string | undefined;
};

type DescriptionsPropsObject = {
  mainInfo: DescriptionItem[];
  legalInfo: DescriptionItem[];
  technicalInfo: DescriptionItem[];
};

/**
 * Функция, которая конвертирует данные объявления в объект с характеристиками для отображения с помощью компонента Descriptions от AntDesign.
 *
 * @param advertData Данные объявления для конвертации.
 * @returns {DescriptionsPropsObject} Объект с характеристиками для отображения.
 *
 * Author: [Gleb]
 */

export function ConvertData(
  advertData: IAdvertListItem
): DescriptionsPropsObject {
  const legalInformation = advertData.advert_legal_information;
  const technicalInformation = advertData.advert_technical_information;

  const flagCode = legalInformation?.flag;
  const flagData =
    countriesJson.data[flagCode as keyof typeof countriesJson.data];

  return {
    mainInfo: [
      {
        key: crypto.randomUUID(),
        label: "Местонахождение судна",
        children: legalInformation.vessel_location?.value,
      },
      {
        key: crypto.randomUUID(),
        label: "Тип судна",
        children: legalInformation.type,
      },
      {
        key: crypto.randomUUID(),
        label: "Применение",
        children: legalInformation?.exploitation_type,
      },
      {
        key: crypto.randomUUID(),
        label: "Статус судна",
        children: legalInformation.vessel_status,
      },
      {
        key: crypto.randomUUID(),
        label: "Действие документов до",
        children: legalInformation.register_valid_until,
      },
      {
        key: crypto.randomUUID(),
        label: "Год постройки",
        children: legalInformation.building_year,
      },
      {
        key: crypto.randomUUID(),
        label: "Место постройки",
        children:
          countriesJson.data[
            legalInformation.building_country as keyof typeof countriesJson.data
          ],
      },
      {
        key: crypto.randomUUID(),
        label: "Находилась ли на учете?",
        children: legalInformation.was_registered === false ? "Нет" : "Да",
      },
      {
        key: crypto.randomUUID(),
        label: "Материал корпуса",
        children: technicalInformation.material,
      },
      {
        key: crypto.randomUUID(),
        label: "Назначение",
        children: legalInformation?.purpose,
      },
      {
        key: crypto.randomUUID(),
        label: "Длина, метры",
        children: technicalInformation.overall_length,
      },
      {
        key: crypto.randomUUID(),
        label: "Ширина, метры",
        children: technicalInformation.overall_width,
      },
    ],
    legalInfo: [
      {
        key: crypto.randomUUID(),
        label: "Строительный номер",
        children: legalInformation.building_number,
      },

      {
        key: crypto.randomUUID(),
        label: "Регистрационный номер",
        children: advertData.registration_number,
      },
      {
        key: crypto.randomUUID(),
        label: "Ледовое Усиление",
        children: legalInformation.ice_strengthening === false ? "Нет" : "Да",
      },
      {
        key: crypto.randomUUID(),
        label: "Номер IMO",
        children: legalInformation.imo_number,
      },
      {
        key: crypto.randomUUID(),
        label: "Ограничения по высоте волны",
        children: legalInformation.wave_limit,
      },
      {
        key: crypto.randomUUID(),
        label: "Номер проекта",
        children: legalInformation.project_number,
      },
      {
        key: crypto.randomUUID(),
        label: "Флаг",
        children: flagData ? (
          <span
            className="flex items-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt={`Флаг ${flagData}`}
              width={30}
              height={20}
              src={`/flags/${flagCode}.svg`}
            />
          </span>
        ) : undefined,
      },
      {
        key: crypto.randomUUID(),
        label: "Страна приписки",
        children: legalInformation.port_address.country,
      },
      {
        key: crypto.randomUUID(),
        label: "Формула класса",
        children: legalInformation.class_formula,
      },
    ],
    technicalInfo: [
      {
        key: crypto.randomUUID(),
        label: "Высота борта, метры",
        children: technicalInformation.board_height,
      },
      {
        key: crypto.randomUUID(),
        label: "Максимальный надводный борт, метры",
        children: technicalInformation.maximum_freeboard,
      },
      {
        key: crypto.randomUUID(),
        label: "Дедвейт, тонны",
        children: technicalInformation.deadweight,
      },
      {
        key: crypto.randomUUID(),
        label: "Доковый вес, тонны",
        children: technicalInformation.dock_weight,
      },
      {
        key: crypto.randomUUID(),
        label: "Водоизмещение полное, рег.тонны",
        children: technicalInformation.full_displacement,
      },
      {
        key: crypto.randomUUID(),
        label: "Валовая вместимость, рег.тонны",
        children: technicalInformation.gross_tonnage,
      },
      {
        key: crypto.randomUUID(),
        label: "Количество главных двигателей",
        children: technicalInformation.num_engines,
      },
      {
        key: crypto.randomUUID(),
        label: "Количество вспомогательных двигателей",
        children: technicalInformation.num_additional_engines,
      },

      {
        key: crypto.randomUUID(),
        label: "Мощность двигателей, кВт",
        children: technicalInformation.power,
      },
      {
        key: crypto.randomUUID(),
        label: "Максимальная скорость в балласте, км/ч",
        children: technicalInformation.maximum_speed_in_ballast,
      },
      {
        key: crypto.randomUUID(),
        label: "Максимальная скорость в грузу, км/ч",
        children: technicalInformation.maximum_speed_when_loaded,
      },
      {
        key: crypto.randomUUID(),
        label: "Наличие грузовых танков",
        children: technicalInformation.cargo_tanks === false ? "Нет" : "Да",
      },
      {
        key: crypto.randomUUID(),
        label: "Общая вместимость грузовых танков",
        children: technicalInformation.cargo_tanks
          ? technicalInformation.total_capacity_cargo_tanks
          : "—",
      },
      {
        key: crypto.randomUUID(),
        label: "Наличие второго дна",
        children: technicalInformation.second_bottom === false ? "Нет" : "Да",
      },
      {
        key: crypto.randomUUID(),
        label: "Наличие вторых бортов",
        children: technicalInformation.second_sides === false ? "Нет" : "Да",
      },
      {
        key: crypto.randomUUID(),
        label: "Грузоподъемность, тонны",
        children: technicalInformation.carrying,
      },
      {
        key: crypto.randomUUID(),
        label: "Наличие надстроек",
        children: technicalInformation.superstructures === false ? "Нет" : "Да",
      },
      {
        key: crypto.randomUUID(),
        label: "Наличие наливных танков",
        children: technicalInformation.liquid_tanks === false ? "Нет" : "Да",
      },
      {
        key: crypto.randomUUID(),
        label: "Cуммарная вместимость наливных танков, тонны",
        children: technicalInformation.liquid_tanks
          ? technicalInformation.total_capacity_liquid_tanks
          : "—",
      },
      {
        key: crypto.randomUUID(),
        label: "Пассажировместимость",
        children:
          technicalInformation.passangers_avialable === false ? "Нет" : "Да",
      },
      {
        key: crypto.randomUUID(),
        label: "Количество человек",
        children: technicalInformation.passangers_avialable
          ? technicalInformation.num_passangers
          : "—",
      },

      {
        key: crypto.randomUUID(),
        label: "Техническая документация",
        children:
          technicalInformation.technical_documentation === false ? "Нет" : "Да",
      },
    ],
  };
}

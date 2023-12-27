import { IAdvertListItem } from "@/entities/advert/types/main";
import countriesJson from "../../../resources/SydnoComponents/selectors/CountriesSelector/countries.json";

export function ConvertData(advertData: IAdvertListItem) {
  const legalInformation = advertData.advert_legal_information;
  const technicalInformation = advertData.advert_technical_information;

  return {
    mainInfo: [
      {
        title: "Местонахождение судна",
        value: legalInformation.vessel_location?.value,
      },
      {
        title: "Тип судна",
        value: legalInformation.type,
      },
      {
        title: "Применение",
        value:
          legalInformation?.exploitation_type === 0
            ? "Некоммереческое"
            : "Коммереческое",
      },
      {
        title: "Статус судна",
        value:
          legalInformation.vessel_status === 0
            ? "Действующие документы"
            : legalInformation.vessel_status === 1
            ? "Без документов"
            : legalInformation.vessel_status === 2
            ? "Холодный отстой"
            : null,
      },
      {
        title: "Действие документов до",
        value: legalInformation.register_valid_until,
      },
      {
        title: "Год постройки",
        value: legalInformation.building_year,
      },
      {
        title: "Место постройки",
        value:
          countriesJson.data[
            legalInformation.building_country as keyof typeof countriesJson.data
          ],
      },
      {
        title: "Находилась ли на учете?",
        value: legalInformation.was_registered === false ? "Нет" : "Да",
      },
      { title: "Материал корпуса", value: technicalInformation.material },
      {
        title: "Назначение",
        value: legalInformation?.purpose,
      },
      { title: "Длина, метры", value: technicalInformation.overall_length },
      { title: "Ширина, метры", value: technicalInformation.overall_width },
    ],
    legalInfo: [
      {
        title: "Строительный номер",
        value: legalInformation.building_number,
      },

      {
        title: "Регистрационный номер",
        value: advertData.registration_number,
      },
      {
        title: "Страна приписки",
        value: legalInformation.port_address?.value,
      },
      {
        title: "Формула класса",
        value: legalInformation.class_formula,
      },
      {
        title: "Флаг",
        value:
          countriesJson.data[
            legalInformation?.flag as keyof typeof countriesJson.data
          ],
      },
      {
        title: "Ледовое Усиление",
        value:
          (legalInformation.ice_strengthening as unknown as boolean) === false
            ? "Нет"
            : "Да",
      },
      {
        title: "Номер IMO",
        value: legalInformation.imo_number,
      },
      {
        title: "Ограничения по высоте волны",
        value: legalInformation.wave_limit,
      },
      {
        title: "Номер проекта",
        value: legalInformation.project_number,
      },
    ],
    technicalInfo: [
      {
        title: "Высота борта, метры",
        value: technicalInformation.board_height,
      },
      {
        title: "Максимальный надводный борт, метры",
        value: technicalInformation.maximum_freeboard,
      },
      { title: "Дедвейт, тонны", value: technicalInformation.deadweight },
      { title: "Доковый вес, тонны", value: technicalInformation.dock_weight },
      {
        title: "Водоизмещение полное, рег.тонны",
        value: technicalInformation.full_displacement,
      },
      {
        title: "Валовая вместимость, рег.тонны",
        value: technicalInformation.gross_tonnage,
      },
      {
        title: "Количество главных двигателей",
        value: technicalInformation.num_engines,
      },
      {
        title: "Количество вспомогательных двигателей",
        value: technicalInformation.num_additional_engines,
      },
      { title: "Мощность двигателей, кВт", value: technicalInformation.power },
      {
        title: "Максимальная скорость в балласте, км/ч",
        value: technicalInformation.maximum_speed_in_ballast,
      },
      {
        title: "Максимальная скорость в грузу, км/ч",
        value: technicalInformation.maximum_speed_when_loaded,
      },
      {
        title: "Наличие грузовых танков",
        value:
          (technicalInformation.cargo_tanks as unknown as boolean) === false
            ? "Нет"
            : "Да",
      },
      (technicalInformation.cargo_tanks as unknown as boolean)
        ? {
            title: "Общая вместимость грузовых танков",
            value: technicalInformation.total_capacity_cargo_tanks,
          }
        : null,
      {
        title: "Наличие второго дна",
        value:
          (technicalInformation.second_bottom as unknown as boolean) === false
            ? "Нет"
            : "Да",
      },
      {
        title: "Наличие вторых бортов",
        value:
          (technicalInformation.second_sides as unknown as boolean) === false
            ? "Нет"
            : "Да",
      },
      {
        title: "Грузоподъемность, тонны",
        value: technicalInformation.carrying,
      },
      {
        title: "Наличие надстроек",
        value:
          (technicalInformation.superstructures as unknown as boolean) === false
            ? "Нет"
            : "Да",
      },
      {
        title: "Наличие наливных танков",
        value:
          (technicalInformation.liquid_tanks as unknown as boolean) === false
            ? "Нет"
            : "Да",
      },
      (technicalInformation.liquid_tanks as unknown as boolean)
        ? {
            title: "Cуммарная вместимость наливных танков, тонны",
            value: technicalInformation.total_capacity_liquid_tanks,
          }
        : null,
      {
        title: "Пассажировместимость",
        value:
          (technicalInformation.passangers_avialable as unknown as boolean) ===
          false
            ? "Нет"
            : "Да",
      },
      (technicalInformation.passangers_avialable as unknown as boolean)
        ? {
            title: "Количество человек",
            value: technicalInformation.num_passangers,
          }
        : null,
      {
        title: "Техническая документация",
        value:
          (technicalInformation.technical_documentation as unknown as boolean) ===
          false
            ? "Нет"
            : "Да",
      },
    ],
  };
}

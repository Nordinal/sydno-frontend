import { IAdvertListItem } from 'Advert/entities';
import countriesJson from '../../../resources/SydnoComponents/selectors/CountriesSelector/countries.json';
import { IReceivedAdvert } from './IAdvertListItemReady';
import crypto from 'crypto';

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

export function ConvertData(advertData: IReceivedAdvert): DescriptionsPropsObject {
    const legalInformation = advertData.advert_legal_information;
    const technicalInformation = advertData.advert_technical_information;

    const flagCode = legalInformation?.flag;
    const flagData = countriesJson.data[flagCode as keyof typeof countriesJson.data];

    const formatField = (value: string | number | null | undefined | boolean, unit: string | null = ''): string => {
        return value ? `${value} ${unit && unit}` : 'Не указано';
    };

    return {
        mainInfo: [
            {
                key: crypto.randomUUID(),
                label: 'Название судна',
                children: formatField(legalInformation.name)
            },
            {
                key: crypto.randomUUID(),
                label: 'Тип судна',
                children: formatField(legalInformation.type)
            },

            {
                key: crypto.randomUUID(),
                label: 'Год постройки',
                children: formatField(legalInformation.building_year)
            },
            {
                key: crypto.randomUUID(),
                label: 'Класс',
                children: formatField(legalInformation.class_formula)
            },
            {
                key: crypto.randomUUID(),
                label: 'Флаг',
                children: flagData ? (
                    <span className='flex items-center gap-2'>
                        <span>{flagData}</span>
                        <img alt={`Флаг ${flagData}`} width={30} height={20} src={`/flags/${flagCode}.svg`} />
                    </span>
                ) : undefined
            },
            {
                key: crypto.randomUUID(),
                label: 'Длина',
                children: formatField(technicalInformation.overall_length, 'м')
            },
            {
                key: crypto.randomUUID(),
                label: 'Регистровый номер',
                children: formatField(advertData.registration_number)
            },
            {
                key: crypto.randomUUID(),
                label: 'Номер IMO',
                children: formatField(legalInformation.imo_number)
            }
        ],
        legalInfo: [
            {
                key: crypto.randomUUID(),
                label: 'Тип эксплуатации',
                children: formatField(legalInformation?.exploitation_type)
            },
            {
                key: crypto.randomUUID(),
                label: 'Назначение',
                children: formatField(legalInformation?.purpose)
            },
            {
                key: crypto.randomUUID(),
                label: 'Статус судна',
                children: formatField(legalInformation.vessel_status)
            },
            {
                key: crypto.randomUUID(),
                label: 'Находилась ли на учете?',
                children: legalInformation.was_registered === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID(),
                label: 'Формула класса',
                children: formatField(legalInformation.class_formula)
            },
            {
                key: crypto.randomUUID(),
                label: 'Ограничения по высоте волны',
                children: formatField(legalInformation.wave_limit, 'м')
            },
            {
                key: crypto.randomUUID(),
                label: 'Регистровый номер',
                children: formatField(advertData.registration_number)
            },
            {
                key: crypto.randomUUID(),
                label: 'Действие документов до',
                children: legalInformation.register_valid_until
                    ? legalInformation.register_valid_until.split('-').slice(0, 2).reverse().join('.')
                    : 'Не указано'
            },
            {
                key: crypto.randomUUID(),
                label: 'Номер проекта',
                children: formatField(legalInformation.project_number)
            },
            {
                key: crypto.randomUUID(),
                label: 'Год постройки',
                children: formatField(legalInformation.building_year)
            },
            {
                key: crypto.randomUUID(),
                label: 'Место постройки',
                children: formatField(legalInformation.building_place)
            },
            {
                key: crypto.randomUUID(),
                label: 'Строительный номер',
                children: formatField(legalInformation.building_number)
            },
            {
                key: crypto.randomUUID(),
                label: 'Флаг',
                children: flagData ? (
                    <span className='flex items-center gap-2'>
                        <span>{flagData}</span>
                        <img alt={`Флаг ${flagData}`} width={30} height={20} src={`/flags/${flagCode}.svg`} />
                    </span>
                ) : undefined
            },

            {
                key: crypto.randomUUID(),
                label: 'Наличие технической документации',
                children: technicalInformation.technical_documentation === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID(),
                label: 'Порт приписки',
                children: formatField(legalInformation.port_address.city)
            }
        ],
        technicalInfo: [
            {
                key: crypto.randomUUID(),
                label: 'Длина',
                children: formatField(technicalInformation.overall_length, 'м')
            },
            {
                key: crypto.randomUUID(),
                label: 'Ширина',
                children: formatField(technicalInformation.overall_width, 'м')
            },
            {
                key: crypto.randomUUID(),
                label: 'Высота борта',
                children: formatField(technicalInformation.board_height, 'м')
            },
            {
                key: crypto.randomUUID(),
                label: 'Материал корпуса',
                children: formatField(technicalInformation.material)
            },
            {
                key: crypto.randomUUID(),
                label: 'Количество главных двигателей',
                children: formatField(technicalInformation.num_engines)
            },
            {
                key: crypto.randomUUID(),
                label: 'Мощность двигателей',
                children: formatField(technicalInformation.power, 'кВт')
            },
            {
                key: crypto.randomUUID(),
                label: 'Максимальная скорость',
                children: formatField(technicalInformation.maximum_speed, 'уз')
            },
            {
                key: crypto.randomUUID(),
                label: 'Количество вспомогательных двигателей',
                children: formatField(technicalInformation.num_additional_engines)
            },
            {
                key: crypto.randomUUID(),
                label: 'Доковый вес',
                children: formatField(technicalInformation.dock_weight, 'т')
            },
            {
                key: crypto.randomUUID(),
                label: 'Грузоподъемность',
                children: formatField(technicalInformation.carrying, 'т')
            },
            {
                key: crypto.randomUUID(),
                label: 'Дедвейт',
                children: formatField(technicalInformation.deadweight, 'т')
            },
            {
                key: crypto.randomUUID(),
                label: 'Полное водоизмещение',
                children: formatField(technicalInformation.full_displacement, 'т')
            },
            {
                key: crypto.randomUUID(),
                label: 'Валовая вместимость',
                children: formatField(technicalInformation.gross_tonnage, 'рег.т')
            },
            {
                key: crypto.randomUUID(),
                label: 'Наличие грузовых танков',
                children: technicalInformation.cargo_tanks === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID(),
                label: 'Общая вместимость грузовых танков',
                children: technicalInformation.cargo_tanks
                    ? technicalInformation.total_capacity_cargo_tanks + ' куб/м'
                    : 'Не указано'
            },
            {
                key: crypto.randomUUID(),
                label: 'Пассажировместимость',
                children: technicalInformation.passangers_avialable === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID(),
                label: 'Количество человек',
                children: formatField(technicalInformation.passangers_avialable)
            },
            {
                key: crypto.randomUUID(),
                label: 'Максимальный надводный борт',
                children: formatField(technicalInformation.maximum_freeboard, 'м')
            },

            {
                key: crypto.randomUUID(),
                label: 'Наличие второго дна',
                children: technicalInformation.second_bottom === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID(),
                label: 'Наличие вторых бортов',
                children: technicalInformation.second_sides === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID(),
                label: 'Наличие наливных танков',
                children: technicalInformation.liquid_tanks === false ? 'Нет' : 'Да'
            },
            {
                key: crypto.randomUUID(),
                label: 'Cуммарная вместимость наливных танков',
                children: formatField(technicalInformation.total_capacity_liquid_tanks, 'т')
            },
            {
                key: crypto.randomUUID(),
                label: 'Наличие надстроек',
                children: technicalInformation.superstructures === false ? 'Нет' : 'Да'
            }
        ]
    };
}

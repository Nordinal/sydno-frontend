import { IntRange } from "@/shared/types";

/**
 * Юридические опции
 */
export interface ILegalFilterOptions {
    /**
     * Тип эксплуатации
     */
    operationType?: 'комерческое' | 'некоммерческое';

    /**
     * Тип
     */
    type?: string;

    /**
     * Назначение
     */
    appointment?: string;

    /**
     * Номер IMO
     */
    IMO?: number;
}

/**
 * Технические опции
 */
export interface ITechnicalFilterOptions {
    /**
     * Длинна судна
     */
    length?: number;

    /**
     * Ширина судна
     */
    width?: number;

    /**
     * Высота борта
     */
    sideHeight?: number;

    /**
     * Максимальный надводный борт
     */
    maxFreeBoard?: number;

    /**
     * Материал корпуса
     */
    corpusMaterial?: 'деревянный' | 'сталь' | 'сплав' | 'железобетонные' | 'пластическая масса' | 'композитные',

    /**
     * Предельная масса (дедвейт)
     */
    deadWeight?: number,

    /**
     * Доковый вес
     */
    dockWeight?: number;

    /**
     * Водоизмещение полное
     */
    fullDisplacement?: number;

    /**
     * Валовая вместимость
     */
    grossCapacity?: number;

    /**
     * Количество двигателей 1 - 8
     */
    enginesCol?: IntRange<1, 9>;

    /**
     * Мощность двигателей
     */
    enginePower?: number;

    /**
     * Максимальная скорость в балласте км/ч
     */
    maxSpeedInBallast?: number;

    /**
     * Максимальная скорость в грузу
     */
    maxSpeedInCargo?: number;

    /**
     * Грузовой танк
     */
    cargoTank?: boolean;

    /**
     * Cуммарная вместимость если грузовой танк
     */
    cargoTankTotalCapacity?: number;

    /**
     * Наливные танки
     */
    liquidTanks?: boolean;

    /**
     * Cуммарная вместимость если наливной танк
     */
    liquidTanksTotalCapacity?: number;

    /**
     * Второе дно
     */
    seccondBottom?: number;

    /**
     * Вторые борта
     */
    secondSides?: boolean;

    /**
     * Грузоподъемность
     */
    loadCapacity?: number;

    /**
     * Надстройки
     */
    addOns?: boolean;

    /**
     * Рубки
     */
    cabins?: boolean;

    /**
     * Пассажировместимость
     */
    passangerCapacity?: number;

    /**
     * Техническая документация
     */
    technicalDocumentation?: boolean;
}

export type TFilterOptions = ILegalFilterOptions & ITechnicalFilterOptions & {
    /**
     * Лимит для получения с бэка
     */
    limit?: number;
};
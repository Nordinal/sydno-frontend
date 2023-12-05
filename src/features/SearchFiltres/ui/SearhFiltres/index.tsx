import React, { useState } from 'react';
import { TFilterOptions } from '@/entities/advert';
import {
    Button,
    Col,
    Input,
    Row,
    Typography 
} from 'antd';
import {
    CorpusMaterial,
    Engine,
    MainFiltres,
    ExploitationType,
    IcePower,
    WasRegistered,
    RegisterDeadline,
    BuildingYear,
    BuildingCountry,
    PortAdress,
    VesselLocation,
    BoardHeight,
    CargoTanks,
    MaximumFreeboard,
    Deadweight,
    FullDisplacement,
    GrossTonnage,
    SeccondBottom,
    SecondSides,
    MaxCarrying,
    SuperSctructures,
    DeckHouse,
    PassangersAvialable,
    TechnicalDocumentation,
} from '../../templates';
import './styles.css';

export interface ISearchFiltresProps {
    filterOptions: TFilterOptions;
    onFindButtonClick: (filterOptions: TFilterOptions) => void;
}

export type TChangeConfigProperty = <T>(name: string, value: T | undefined) => void;

/**
 * Фича для изменения параметров фильтров.
 * Компонент принимает объект с фильтрами и по нажатию на кнопку "Показать результаты", вызывает колбэк, передавая в него измененные фильтры
 * @param filterOptions начальнаое значение фильтров
 * @param onFindButtonClick колбэк, прнимающий новый объект с фильтрами
 * @returns 
 */
const SearchFiltres: React.FC<ISearchFiltresProps> = ({ filterOptions, onFindButtonClick }) => {
    const [filterConfig, setFilterConfig] = useState<TFilterOptions>(filterOptions);
    const [showHiddenBlock, setShowHiddenBlock] = useState<boolean>(false);

    const onButtonClickHandler = () => {
        onFindButtonClick(filterConfig);
    }

    const resetFiltres = () => {
        setFilterConfig({});
    }

    const toggleShowAll = () => {
        setShowHiddenBlock(!showHiddenBlock);
    }

    /**
     * Функция для изменения основного конфига, если вторым значением передать undefined, то свойство удалиться из конфига
     * @param name название фильтра
     * @param value новое значение
     */
    const changeConfigProperty: TChangeConfigProperty = (name, value) => {
        if (value === undefined) {
            //@ts-ignore
            delete filterConfig[name];

            setFilterConfig({
                ...filterConfig,
            });
        } else {
            setFilterConfig({
                ...filterConfig,
                [name]: value
            });
        }
    }

    return (
        <div
            className="rounded-xl p-4" 
            style={{ boxShadow: '0 0 20px rgba(128, 128, 128, 0.2)', overflow: 'hidden' }}
        >
            <Typography.Title level={3}>
                Фильтры
            </Typography.Title>
            <MainFiltres
                type={filterConfig.type}
                purpose={filterConfig.purpose}
                class_formula={filterConfig.class_formula}
                vessel_status={filterConfig.vessel_status}
                min_overall_length={filterConfig.min_overall_length}
                max_overall_length={filterConfig.max_overall_length}
                min_overall_width={filterConfig.min_overall_width}
                max_overall_width={filterConfig.max_overall_width}
                changeConfigProperty={changeConfigProperty}                  
            />
            <div
                className={showHiddenBlock ? 'sudno-SearhFiltres-hiddenBlock-active pb-4' : 'sudno-SearhFiltres-hiddenBlock'}
            >
                <Row gutter={[16, 24]} className='pb-4'>
                    <Col span={6}>
                        <ExploitationType
                            exploitations_type={filterConfig.exploitations_type}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <IcePower
                            ice_power={filterConfig.ice_power}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <WasRegistered
                            was_registered={filterConfig.was_registered}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <RegisterDeadline
                            register_valid_until={filterConfig.register_valid_until}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <p>Номер проекта</p>
                        <Input
                            value={filterConfig.project_number}
                            onChange={(event) => changeConfigProperty<string>('project_number', event.target.value)}
                        />
                    </Col>
                    <Col span={6}>
                        <p>Строительный номер</p>
                        <Input
                            value={filterConfig.building_number}
                            onChange={(event) => changeConfigProperty<string>('building_number', event.target.value)}
                        />
                    </Col>
                    <Col span={6}>
                        <BuildingYear
                            building_year={filterConfig.building_year}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <BuildingCountry
                            building_country={filterConfig.building_country}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <PortAdress
                            port_adress_city={filterConfig.port_adress_city}
                            port_adress_country={filterConfig.port_adress_country}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <VesselLocation
                            vessel_location_country={filterConfig.vessel_location_country}
                            vessel_location_city={filterConfig.vessel_location_city}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <CargoTanks
                            cargo_tanks={filterConfig.cargo_tanks}
                            total_capacity_cargo_tanks={filterConfig.total_capacity_cargo_tanks}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                </Row>
                <Row className='pb-4'>
                    <Col span={12}>
                        <Engine
                            min_power={filterConfig.min_power}
                            max_power={filterConfig.max_power}
                            num_engines={filterConfig.num_engines}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                </Row>
                <Row className='pb-4' gutter={[16, 24]}>
                    <Col span={6}>
                        <CorpusMaterial
                            material={filterConfig.material}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                </Row>
                <Row gutter={[16, 24]}>
                    <Col span={6}>
                        <BoardHeight
                            max_board_height={filterConfig.max_board_height}
                            min_board_height={filterConfig.min_board_height}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <MaximumFreeboard
                            max_maximum_freeboard={filterConfig.max_maximum_freeboard}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <Deadweight
                            min_deadweight={filterConfig.min_deadweight}
                            max_deadweight={filterConfig.max_deadweight}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <FullDisplacement
                            min_full_displacement={filterConfig.min_full_displacement}
                            max_full_displacement={filterConfig.max_full_displacement}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <GrossTonnage
                            min_gross_tonnage={filterConfig.min_gross_tonnage}
                            max_gross_tonnage={filterConfig.max_gross_tonnage}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <SeccondBottom
                            seccond_bottom={filterConfig.seccond_bottom}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <SecondSides
                            second_sides={filterConfig.second_sides}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <MaxCarrying
                            min_carrying={filterConfig.min_carrying}
                            max_carrying={filterConfig.max_carrying}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <SuperSctructures
                            superstructures={filterConfig.superstructures}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <DeckHouse
                            deckhouses={filterConfig.deckhouses}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <PassangersAvialable
                            min_passangers_avialable={filterConfig.min_passangers_avialable}
                            max_passangers_avialable={filterConfig.max_passangers_avialable}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col span={6}>
                        <TechnicalDocumentation
                            technical_documentation={filterConfig.technical_documentation}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                </Row>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <Button
                        onClick={toggleShowAll}
                        type="link"
                    >
                        {showHiddenBlock ? 'Свернуть' : 'Все параметры'}
                    </Button>
                    <Button
                        onClick={resetFiltres}
                        type="link"
                    >
                        Сбросить фильтры
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={onButtonClickHandler}
                        shape="round"
                        type="primary"
                    >
                        Показать результаты
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SearchFiltres;

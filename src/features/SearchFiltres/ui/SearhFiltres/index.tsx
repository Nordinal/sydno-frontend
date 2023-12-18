import React, { useState } from 'react';
import { TFilterOptions } from '@/entities/advert';
import {
    Button,
    Col,
    Row,
    Typography 
} from 'antd';
import {
    CorpusMaterial,
    EnginePower,
    NumEngines,
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
    FillingTanks,
    Type,
    Purpose,
    Class,
    VesselStatus,
    OverallLength,
    OverallWidth,
    ProjectNumber,
    BuildingNumber,
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
            <Row gutter={[16, 24]} className="pb-4">
                <Col
                    xs={24}              
                    sm={6}
                >
                    <Type
                        type={filterConfig.type}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col
                    xs={24}              
                    sm={6}
                >
                    <Purpose
                        purpose={filterConfig.purpose}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col
                    xs={24}              
                    sm={6}
                >
                    <Class
                        class_formula={filterConfig.class_formula}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col
                    xs={24}              
                    sm={6}
                >
                    <VesselStatus
                        vessel_status={filterConfig.vessel_status}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col
                    xs={24}              
                    sm={6}
                >
                    <OverallLength
                        min_overall_length={filterConfig.min_overall_length}
                        max_overall_length={filterConfig.max_overall_length}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col
                    xs={24}              
                    sm={6}
                >
                    <OverallWidth
                        min_overall_width={filterConfig.min_overall_width}
                        max_overall_width={filterConfig.max_overall_width}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col
                    xs={24}              
                    sm={6}
                >
                    <GrossTonnage
                        min_gross_tonnage={filterConfig.min_gross_tonnage}
                        max_gross_tonnage={filterConfig.max_gross_tonnage}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
            </Row>
            <div
                className={showHiddenBlock ? 'sudno-SearhFiltres-hiddenBlock-active pb-4' : 'sudno-SearhFiltres-hiddenBlock'}
            >
                <Row gutter={[16, 24]} className='pb-4'>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <ExploitationType
                            exploitations_type={filterConfig.exploitations_type}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <IcePower
                            ice_power={filterConfig.ice_power}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <WasRegistered
                            was_registered={filterConfig.was_registered}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <RegisterDeadline
                            register_valid_until={filterConfig.register_valid_until}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <ProjectNumber
                            project_number={filterConfig.project_number}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <BuildingNumber
                            building_number={filterConfig.building_number}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <BuildingYear
                            building_year={filterConfig.building_year}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <BuildingCountry
                            building_country={filterConfig.building_country}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <PortAdress
                            port_adress_city={filterConfig.port_adress_city}
                            port_adress_country={filterConfig.port_adress_country}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <VesselLocation
                            vessel_location_country={filterConfig.vessel_location_country}
                            vessel_location_city={filterConfig.vessel_location_city}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <CargoTanks
                            cargo_tanks={filterConfig.cargo_tanks}
                            total_capacity_cargo_tanks={filterConfig.total_capacity_cargo_tanks}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <FillingTanks
                            filling_tanks={filterConfig.filling_tanks}
                            total_capacity_filling_tanks={filterConfig.total_capacity_filling_tanks}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <NumEngines
                            num_engines={filterConfig.num_engines}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <EnginePower
                            min_power={filterConfig.min_power}
                            max_power={filterConfig.max_power}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <CorpusMaterial
                            material={filterConfig.material}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <BoardHeight
                            max_board_height={filterConfig.max_board_height}
                            min_board_height={filterConfig.min_board_height}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <MaximumFreeboard
                            max_maximum_freeboard={filterConfig.max_maximum_freeboard}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <Deadweight
                            min_deadweight={filterConfig.min_deadweight}
                            max_deadweight={filterConfig.max_deadweight}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <FullDisplacement
                            min_full_displacement={filterConfig.min_full_displacement}
                            max_full_displacement={filterConfig.max_full_displacement}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <SeccondBottom
                            seccond_bottom={filterConfig.seccond_bottom}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <SecondSides
                            second_sides={filterConfig.second_sides}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <MaxCarrying
                            min_carrying={filterConfig.min_carrying}
                            max_carrying={filterConfig.max_carrying}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <SuperSctructures
                            superstructures={filterConfig.superstructures}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <DeckHouse
                            deckhouses={filterConfig.deckhouses}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
                        <PassangersAvialable
                            min_passangers_avialable={filterConfig.min_passangers_avialable}
                            max_passangers_avialable={filterConfig.max_passangers_avialable}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col
                        xs={24}              
                        sm={6}
                    >
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

import React, { useLayoutEffect, useRef, useState } from 'react';
import { TFilterOptions } from '../../types';
import { Button, Col, Row, Typography } from 'antd';
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
    PassangersAvialable,
    TechnicalDocumentation,
    Type,
    Purpose,
    Class,
    VesselStatus,
    OverallLength,
    OverallWidth,
    ProjectNumber,
    BuildingNumber,
    Flag,
    SpeedInBallast,
    SpeedInLoad,
    NumAdditionalEngines
} from '../../templates';
import './styles.css';
import { initialFilterOptions } from '../../utils';
import { TChangeConfigProperty } from '../../types';

export interface ISearchFiltresProps {
    filterOptions: TFilterOptions;
    onFindButtonClick: (filterOptions: TFilterOptions) => void;
}

/**
 * Фича для изменения параметров фильтров.
 * Компонент принимает объект с фильтрами и по нажатию на кнопку "Показать результаты", вызывает колбэк, передавая в него измененные фильтры
 * @param filterOptions начальнаое значение фильтров
 * @param onFindButtonClick колбэк, прнимающий новый объект с фильтрами
 * @returns
 */
const SearchFiltres: React.FC<ISearchFiltresProps> = ({ filterOptions, onFindButtonClick }) => {
    const [filterConfig, setFilterConfig] = useState<TFilterOptions>({
        ...initialFilterOptions,
        ...filterOptions
    });
    const [showHiddenBlock, setShowHiddenBlock] = useState<boolean>(false);
    const hiddenBlockRef = useRef<HTMLDivElement>(null);

    const onButtonClickHandler = () => {
        onFindButtonClick(filterConfig);
    };

    const resetFiltres = () => {
        setFilterConfig(initialFilterOptions);
    };

    const toggleShowAll = () => {
        setShowHiddenBlock(!showHiddenBlock);
    };

    const changeConfigProperty: TChangeConfigProperty = (name, value) => {
        const newValue = value === undefined ? null : value;

        setFilterConfig((prevValue) => ({
            ...prevValue,
            [name]: newValue
        }));
    };

    // useLayoutEffect(() => {
    //     let height = 1140;

    //     if (hiddenBlockRef.current) {
    //         height = hiddenBlockRef.current.getBoundingClientRect().height;
    //     }

    //     hiddenBlockRef.current?.style.setProperty('--search-filter-hidden-block-height',  `${height}px`);
    //     setShowHiddenBlock(false);
    // }, []);

    return (
        <div
            className='sudno-SearhFiltres p-4'
            style={{
                boxShadow: '0 0 20px rgba(128, 128, 128, 0.2)',
                overflow: 'hidden',
                borderRadius: 'var(--main-app-br)'
            }}
        >
            <Typography.Title level={3}>Фильтры</Typography.Title>
            <Row gutter={[16, 24]} className='pb-4'>
                <Col xs={24} sm={6}>
                    <Type type={filterConfig.type} changeConfigProperty={changeConfigProperty} />
                </Col>
                <Col xs={24} sm={6}>
                    <Purpose purpose={filterConfig.purpose} changeConfigProperty={changeConfigProperty} />
                </Col>
                <Col xs={24} sm={6}>
                    <Class class_formula={filterConfig.class_formula} changeConfigProperty={changeConfigProperty} />
                </Col>
                <Col xs={24} sm={6}>
                    <VesselStatus
                        vessel_status={filterConfig.vessel_status}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col
                    xs={24}
                    sm={6}
                    // style={{display:"flex", flexDirection:'column', gap:'5px'}}
                >
                    <OverallLength
                        min_overall_length={filterConfig.min_overall_length}
                        max_overall_length={filterConfig.max_overall_length}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col xs={24} sm={6}>
                    <OverallWidth
                        min_overall_width={filterConfig.min_overall_width}
                        max_overall_width={filterConfig.max_overall_width}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col xs={24} sm={6}>
                    <GrossTonnage
                        min_gross_tonnage={filterConfig.min_gross_tonnage}
                        max_gross_tonnage={filterConfig.max_gross_tonnage}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col xs={24} sm={6}>
                    <Flag flag={filterConfig.flag} changeConfigProperty={changeConfigProperty} />
                </Col>
            </Row>
            <div
                className={
                    showHiddenBlock ? 'sudno-SearhFiltres-hiddenBlock-active pb-4' : 'sudno-SearhFiltres-hiddenBlock'
                }
                ref={hiddenBlockRef}
            >
                <Row gutter={[16, 24]} className='pb-4'>
                    <Col xs={24} sm={6}>
                        <ExploitationType
                            exploitation_type={filterConfig.exploitation_type}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <IcePower ice_power={filterConfig.ice_power} changeConfigProperty={changeConfigProperty} />
                    </Col>
                    <Col xs={24} sm={6}>
                        <WasRegistered
                            was_registered={filterConfig.was_registered}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <RegisterDeadline
                            register_valid_until={filterConfig.register_valid_until}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <ProjectNumber
                            project_number={filterConfig.project_number}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <BuildingNumber
                            building_number={filterConfig.building_number}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <BuildingYear
                            building_year={filterConfig.building_year}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <BuildingCountry
                            building_country={filterConfig.building_country}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <PortAdress
                            port_adress_city={filterConfig.port_adress_city}
                            port_adress_country={filterConfig.port_adress_country}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <VesselLocation
                            vessel_location_country={filterConfig.vessel_location_country}
                            vessel_location_city={filterConfig.vessel_location_city}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <CargoTanks
                            cargo_tanks={filterConfig.cargo_tanks}
                            min_total_capacity_cargo_tanks={filterConfig.min_total_capacity_cargo_tanks}
                            max_total_capacity_cargo_tanks={filterConfig.max_total_capacity_cargo_tanks}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <NumEngines
                            min_num_engines={filterConfig.min_num_engines}
                            max_num_engines={filterConfig.max_num_engines}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <NumAdditionalEngines
                            min_num_additional_engines={filterConfig.min_num_additional_engines}
                            max_num_additional_engines={filterConfig.max_num_additional_engines}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <EnginePower
                            min_power={filterConfig.min_power}
                            max_power={filterConfig.max_power}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <SpeedInBallast
                            min_maximum_speed_in_ballast={filterConfig.min_maximum_speed_in_ballast}
                            max_maximum_speed_in_ballast={filterConfig.max_maximum_speed_in_ballast}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <SpeedInLoad
                            min_maximum_speed_in_load={filterConfig.min_maximum_speed_in_load}
                            max_maximum_speed_in_load={filterConfig.max_maximum_speed_in_load}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <CorpusMaterial material={filterConfig.material} changeConfigProperty={changeConfigProperty} />
                    </Col>
                    <Col xs={24} sm={6}>
                        <BoardHeight
                            max_board_height={filterConfig.max_board_height}
                            min_board_height={filterConfig.min_board_height}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <MaximumFreeboard
                            max_maximum_freeboard={filterConfig.max_maximum_freeboard}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <Deadweight
                            min_deadweight={filterConfig.min_deadweight}
                            max_deadweight={filterConfig.max_deadweight}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <FullDisplacement
                            min_full_displacement={filterConfig.min_full_displacement}
                            max_full_displacement={filterConfig.max_full_displacement}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <SeccondBottom
                            seccond_bottom={filterConfig.seccond_bottom}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <SecondSides
                            second_sides={filterConfig.second_sides}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <MaxCarrying
                            min_carrying={filterConfig.min_carrying}
                            max_carrying={filterConfig.max_carrying}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <SuperSctructures
                            superstructures={filterConfig.superstructures}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <PassangersAvialable
                            min_passangers_avialable={filterConfig.min_passangers_avialable}
                            max_passangers_avialable={filterConfig.max_passangers_avialable}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <TechnicalDocumentation
                            technical_documentation={filterConfig.technical_documentation}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </Col>
                </Row>
            </div>
            <div className='flex items-end justify-between flex-wrap'>
                <div className='sm:pb-0 pb-2 width-full-sm flex justify-between'>
                    <Button onClick={toggleShowAll} type='link'>
                        {showHiddenBlock ? 'Свернуть' : 'Все параметры'}
                    </Button>
                    <Button onClick={resetFiltres} type='link'>
                        Сбросить фильтры
                    </Button>
                </div>
                <div className='width-full-sm'>
                    <Button onClick={onButtonClickHandler} type='primary' className='w-full'>
                        Показать результаты
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchFiltres;

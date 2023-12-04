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
            <Row>
                <Col span={24}>
                    <Typography.Title level={3}>
                        Фильтры
                    </Typography.Title>
                </Col>
                <Col span={24}>
                    <MainFiltres
                        type={filterConfig.type}
                        purpose={filterConfig.purpose}
                        class_formula_right={filterConfig.class_formula_right}
                        vessel_status={filterConfig.vessel_status}
                        min_overall_length={filterConfig.min_overall_length}
                        max_overall_length={filterConfig.max_overall_length}
                        min_overall_width={filterConfig.min_overall_width}
                        max_overall_width={filterConfig.max_overall_width}
                        changeConfigProperty={changeConfigProperty}                  
                    />
                </Col>
                <Col span={24} className={showHiddenBlock ? 'pb-4' : ''}>
                    <div className={showHiddenBlock ? 'sudno-SearhFiltres-hiddenBlock-active' : 'sudno-SearhFiltres-hiddenBlock'}>
                        <Row className='pb-4'>
                            <Col className='pb-2' span={6}>
                                <p>Тип эксплуатации</p>
                                <ExploitationType
                                    exploitations_type={filterConfig.exploitations_type}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
                                <p>Ледовое усиление</p>
                                <IcePower
                                    ice_power={filterConfig.ice_power}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
                                <p>Находилось ли на учете</p>
                                <WasRegistered
                                    was_registered={filterConfig.was_registered}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
                                <p>Учет действует до</p>
                                <RegisterDeadline
                                    register_valid_until={filterConfig.register_valid_until}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
                                <p>Номер проекта</p>
                                <Input
                                    value={filterConfig.project_number}
                                    onChange={(event) => changeConfigProperty<string>('project_number', event.target.value)}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
                                <p>Строительный номер</p>
                                <Input
                                    value={filterConfig.building_number}
                                    onChange={(event) => changeConfigProperty<string>('building_number', event.target.value)}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
                                <p>Год постройки</p>
                                <BuildingYear
                                    building_year={filterConfig.building_year}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
                                <p>Страна постройки</p>
                                <BuildingCountry
                                    building_country={filterConfig.building_country}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
                                <Typography.Title level={5}>
                                    Порт приписки
                                </Typography.Title>
                                <PortAdress
                                    port_adress_city={filterConfig.port_adress_city}
                                    port_adress_country={filterConfig.port_adress_country}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
                                <Typography.Title level={5}>
                                    Местонахождение судна
                                </Typography.Title>
                                <VesselLocation
                                    vessel_location_country={filterConfig.vessel_location_country}
                                    vessel_location_city={filterConfig.vessel_location_city}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                            <Col className='pb-2' span={6}>
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
                        <Row>
                            <Col span={6}>
                                <CorpusMaterial
                                    material={filterConfig.material}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <BoardHeight
                                    max_board_height={filterConfig.max_board_height}
                                    min_board_height={filterConfig.min_board_height}
                                    changeConfigProperty={changeConfigProperty}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={24}>
                    <div className="flex items-end justify-between">
                        <div className="">
                            <Button onClick={toggleShowAll} type="link">
                                {showHiddenBlock ? 'Свернуть' : 'Все параметры'}
                            </Button>
                            <Button onClick={resetFiltres} type="link">Сбросить фильтры</Button>
                        </div>
                        <div className="">
                            <Button onClick={onButtonClickHandler} shape="round" type="primary">
                                Показать результаты
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SearchFiltres;

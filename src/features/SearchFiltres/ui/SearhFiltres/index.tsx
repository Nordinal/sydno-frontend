import React, { useState } from 'react';
import { TFilterOptions } from '@/entities/advert';
import { Button, Col, InputNumber, Row, Typography } from 'antd';
import { CorpusMaterial, Engine, Gabarites } from '../../templates';
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
        <div className="rounded-xl p-4" style={{ boxShadow: '0 0 20px rgba(128, 128, 128, 0.2)', overflow: 'hidden' }}>
            <Row>
                <Col span={24}>
                    <Typography.Title level={3}>
                        Фильтры
                    </Typography.Title>
                </Col>
                <Col span={24} className='pb-4'>
                    <Typography.Title level={5}>
                        Габариты
                    </Typography.Title>
                    <Gabarites
                        overall_length={filterConfig.overall_length}
                        overall_width={filterConfig.overall_width}
                        board_height={filterConfig.board_height}
                        maximum_freeboard={filterConfig.maximum_freeboard}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col span={24} className='pb-4'>
                    <Typography.Title level={5}>
                        Материал корпуса
                    </Typography.Title>
                    <div style={{ width: '25%' }}>
                        <CorpusMaterial
                            material={filterConfig.material}
                            changeConfigProperty={changeConfigProperty}
                        />
                    </div>
                </Col>
                <Col span={6} className='pb-4'>
                    <p>Предельная масса (дедвейт)</p>
                    <InputNumber
                        value={filterConfig.deadweight}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('deadweight', value || undefined)}
                        formatter={(value) => value ? `${value} т` : ''}
                    />
                </Col>
                <Col span={6} className='pb-4'>
                    <p>Доковый вес</p>
                    <InputNumber
                        value={filterConfig.dock_weight}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('dock_weight', value || undefined)}
                        formatter={(value) => value ? `${value} т` : ''}
                    />
                </Col>
                <Col span={6} className='pb-4'>
                    <p>Водоизмещение полное</p>
                    <InputNumber
                        value={filterConfig.full_displacement}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('full_displacement', value || undefined)}
                        formatter={(value) => value ? `${value} т` : ''}
                    />
                </Col>
                <Col span={6} className='pb-4'>
                    <p>Валовая вместимость</p>
                    <InputNumber
                        value={filterConfig.gross_tonnage}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('gross_tonnage', value || undefined)}
                    />
                </Col>
                <Col span={24} className={showHiddenBlock ? 'pb-4' : ''}>
                    <div className={showHiddenBlock ? 'sudno-SearhFiltres-hiddenBlock-active' : 'sudno-SearhFiltres-hiddenBlock'}>
                        <Typography.Title level={5}>
                            Двигатель
                        </Typography.Title>
                        <Engine
                            power={filterConfig.power}
                            num_engines={filterConfig.num_engines}
                            changeConfigProperty={changeConfigProperty}
                        />
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

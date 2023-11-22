import React, { useState } from 'react';
import { TFilterOptions } from '@/entities/advert';
import { Button, Col, InputNumber, Row, Select, Typography } from 'antd';
import CorpusMaterial from '../../templates/corpusMaterial';
import Gabarites from '../../templates/gabarites';

export interface ISearchFiltresProps {
    filterOptions: TFilterOptions;
    onFindButtonClick: (filterOptions: TFilterOptions) => void;
}

export type TChangeConfigProperty = <T>(name: string, value: T | undefined) => void;

const SearchFiltres: React.FC<ISearchFiltresProps> = ({ filterOptions, onFindButtonClick }) => {
    const [filterConfig, setFilterConfig] = useState<TFilterOptions>(filterOptions);

    const onButtonClickHandler = () => {
        onFindButtonClick(filterConfig);
    }

    const resetFiltres = () => {
        setFilterConfig({});
    }

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
        <div className="rounded-xl p-4" style={{boxShadow: '0 0 20px rgba(128, 128, 128, 0.2)'}}>
            <Row>
                <Col span={24} className='pb-4'>
                    <Gabarites
                        length={filterConfig.length}
                        width={filterConfig.width}
                        sideHeight={filterConfig.sideHeight}
                        maxFreeBoard={filterConfig.maxFreeBoard}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col span={24} className='pb-4'>
                    <CorpusMaterial
                        defaultValue={filterConfig.corpusMaterial}
                        changeConfigProperty={changeConfigProperty}
                    />
                </Col>
                <Col span={6} className='pb-4'>
                    <p>Предельная масса (дедвейт)</p>
                    <InputNumber
                        value={filterConfig.deadWeight}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('deadWeight', value || undefined)}
                        formatter={(value) => `${value} т`}
                    />
                </Col>
                <Col span={6} className='pb-4'>
                    <p>Доковый вес</p>
                    <InputNumber
                        value={filterConfig.dockWeight}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('dockWeight', value || undefined)}
                        formatter={(value) => `${value} т`}
                    />
                </Col>
                <Col span={6} className='pb-4'>
                    <p>Водоизмещение полное</p>
                    <InputNumber
                        value={filterConfig.fullDisplacement}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('fullDisplacement', value || undefined)}
                        formatter={(value) => `${value} т`}
                    />
                </Col>
                <Col span={6} className='pb-4'>
                    <p>Валовая вместимость</p>
                    <InputNumber
                        value={filterConfig.grossCapacity}
                        min={1}
                        max={10000}
                        onChange={(value) => changeConfigProperty<number | undefined>('grossCapacity', value || undefined)}
                        formatter={(value) => `${value} рег. т.`}
                    />
                </Col>
                <Col span={6} className='pb-4'>
                    <p>Количество двигателей</p>
                    <InputNumber
                        value={filterConfig.enginesCol}
                        min={1}
                        max={8}
                        onChange={(value) => changeConfigProperty<number | undefined>('enginesCol', value || undefined)}
                        formatter={(value) => `${value} шт`}
                    />
                </Col>
                <Col span={24}>
                    <div className="flex items-end justify-between">
                        <div className="">
                            <Button type="link">Все параметры</Button>
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

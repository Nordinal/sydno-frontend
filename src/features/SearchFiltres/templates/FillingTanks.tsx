import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Col, InputNumber, Row, Switch } from 'antd';

const FillingTanks: React.FC<{
    filling_tanks?: boolean;
    total_capacity_filling_tanks?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    filling_tanks,
    total_capacity_filling_tanks,
    changeConfigProperty
}) => {
    const handleSwitchClick = (checked?: boolean) => {
        // Если скрываем фильтр, то и значение лучше удалить
        if (!checked) {
            changeConfigProperty<undefined>('filling_tanks', undefined);
            changeConfigProperty<undefined>('total_capacity_filling_tanks', undefined);
        } else {
            changeConfigProperty<boolean>('filling_tanks', checked);
        }
    }

    return (
        <Row gutter={[8, 16]}>
            <Col span={12}>
                <p>Наливной танк</p>
                <Switch
                    onChange={handleSwitchClick}
                    checked={filling_tanks}
                    size='small'
                />
            </Col>
            {
                filling_tanks ? 
                <Col span={12}>
                    <p>Cуммарная вместимость</p>
                    <InputNumber
                        value={total_capacity_filling_tanks}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        onChange={(value) => changeConfigProperty<number | undefined>('total_capacity_filling_tanks', value || undefined)}
                        formatter={(value) => value ? `${value} т ` : ''}
                    /> 
                </Col>
                : <></>
            }
        </Row>
    );
}

export default FillingTanks;

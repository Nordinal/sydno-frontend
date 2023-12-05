import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Col, InputNumber, Row, Switch } from 'antd';

const CargoTanks: React.FC<{
    cargo_tanks?: boolean;
    total_capacity_cargo_tanks?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    cargo_tanks,
    total_capacity_cargo_tanks,
    changeConfigProperty
}) => {
    const handleSwitchClick = (checked?: boolean) => {
        // Если скрываем фильтр, то и значение лучше удалить
        if (!checked) {
            changeConfigProperty<undefined>('cargo_tanks', undefined);
            changeConfigProperty<undefined>('total_capacity_cargo_tanks', undefined);
        } else {
            changeConfigProperty<boolean>('cargo_tanks', checked);
        }
    }

    return (
        <Row gutter={[8, 16]}>
            <Col span={12}>
                <p>Грузовой танк</p>
                <Switch
                    onChange={handleSwitchClick}
                    checked={cargo_tanks}
                    size='small'
                />
            </Col>
            {
                cargo_tanks ? 
                <Col span={12}>
                    <p>Cуммарная вместимость</p>
                    <InputNumber
                        value={total_capacity_cargo_tanks}
                        min={0}
                        max={Infinity}
                        step={0.01}
                        onChange={(value) => changeConfigProperty<number | undefined>('total_capacity_cargo_tanks', value || undefined)}
                        formatter={(value) => value ? `${value} т ` : ''}
                    /> 
                </Col>
                : <></>
            }
        </Row>
    );
}

export default CargoTanks;

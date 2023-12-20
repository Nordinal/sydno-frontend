import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Col, InputNumber, Row, Switch } from 'antd';

const CargoTanks: React.FC<{
    cargo_tanks?: boolean | null;
    min_total_capacity_cargo_tanks?: number | null;
    max_total_capacity_cargo_tanks?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    cargo_tanks,
    min_total_capacity_cargo_tanks,
    max_total_capacity_cargo_tanks,
    changeConfigProperty
}) => {
    const handleSwitchClick = (checked?: boolean) => {
        if (!checked) {
            changeConfigProperty<null>('min_total_capacity_cargo_tanks', null);
            changeConfigProperty<null>('max_total_capacity_cargo_tanks', null);
            changeConfigProperty<null>('cargo_tanks', null);
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
                    checked={cargo_tanks || undefined}
                    size='small'
                />
            </Col>
            {
                cargo_tanks ? 
                <Col span={12}>
                    <p>Cуммарная вместимость</p>
                    <InputNumber
                        value={min_total_capacity_cargo_tanks}
                        min={1}
                        max={100000}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_total_capacity_cargo_tanks', value || undefined)}
                        formatter={(value) => value ? `от ${value} т` : ''}
                    />
                    <InputNumber
                        value={max_total_capacity_cargo_tanks}
                        min={1}
                        max={100000}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_total_capacity_cargo_tanks', value || undefined)}
                        formatter={(value) => value ? `до ${value} т` : ''}
                    />
                </Col>
                : <></>
            }
        </Row>
    );
}

export default CargoTanks;

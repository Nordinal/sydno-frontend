import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Col, InputNumber, Row, Switch } from 'antd';

const FillingTanks: React.FC<{
    filling_tanks?: boolean | null;
    min_total_capacity_filling_tanks?: number | null;
    max_total_capacity_filling_tanks?: number | null;
    total_capacity_filling_tanks?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    filling_tanks,
    min_total_capacity_filling_tanks,
    max_total_capacity_filling_tanks,
    changeConfigProperty
}) => {
    const handleSwitchClick = (checked?: boolean) => {
        if (!checked) {
            changeConfigProperty<undefined>('filling_tanks', undefined);
            changeConfigProperty<undefined>('min_total_capacity_filling_tanks', undefined);
            changeConfigProperty<undefined>('max_total_capacity_filling_tanks', undefined);
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
                    checked={filling_tanks || undefined}
                    size='small'
                />
            </Col>
            {
                filling_tanks ? 
                <Col span={12}>
                    <p>Cуммарная вместимость</p>
                    <InputNumber
                        value={min_total_capacity_filling_tanks}
                        min={1}
                        max={100000}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_total_capacity_filling_tanks', value || undefined)}
                        formatter={(value) => value ? `от ${value} т` : ''}
                    />
                    <InputNumber
                        value={max_total_capacity_filling_tanks}
                        min={1}
                        max={100000}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_total_capacity_filling_tanks', value || undefined)}
                        formatter={(value) => value ? `до ${value} т` : ''}
                    />
                </Col>
                : <></>
            }
        </Row>
    );
}

export default FillingTanks;

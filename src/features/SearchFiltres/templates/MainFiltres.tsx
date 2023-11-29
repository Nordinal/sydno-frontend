import React from "react";
import { TChangeConfigProperty } from "../ui/SearhFiltres";
import { Col, Input, InputNumber, Row, Select, Typography } from "antd";

const VESSEL_STATUS_OPTIIONS = [
    {value: 'эксплуатируется', label: 'эксплуатируется'},
    {value: 'на холодном отстое', label: 'на холодном отстое'},
    {value: 'прекращено действие документов', label: 'прекращено действие документов'},
    {value: null, label: 'не важно'},
]

/**
 * Главные фильтры, изначально видимые пользователю
 * @returns 
 */
const MainFiltres: React.FC<{
    type?: string;
    purpose?: string;
    class_formula_right?: string;
    vessel_status?: 'эксплуатируется' | 'на холодном отстое' | 'прекращено действие документов';
    min_overall_length?: number;
    max_overall_length?: number;
    min_overall_width?: number;
    max_overall_width?: number;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    type,
    purpose,
    class_formula_right,
    vessel_status,
    min_overall_length,
    max_overall_length,
    min_overall_width,
    max_overall_width,
    changeConfigProperty,
}) => {
    return (
        <>
            <Row className="pb-4">
                <Col span={6}>
                    <p>Тип</p>
                    <Input 
                        value={type}
                        onChange={(event) => changeConfigProperty<string>('type', event.target.value)}
                    />
                </Col>
                <Col span={6}>
                    <p>Назначание</p>
                    <Input 
                        value={purpose}
                        onChange={(event) => changeConfigProperty<string>('purpose', event.target.value)}
                    />
                </Col>
                <Col span={6}>
                    <p>Класс</p>
                    <Input 
                        value={class_formula_right}
                        onChange={(event) => changeConfigProperty<string>('class_formula_right', event.target.value)}
                    />
                </Col>
                <Col span={6}>
                    <p>Статус судна</p>
                    <Select
                        style={{width: '100%'}}
                        value={vessel_status}
                        options={VESSEL_STATUS_OPTIIONS}
                        onChange={(value) => changeConfigProperty<string>('vessel_status', value === null ? undefined : value)}
                    />
                </Col>
            </Row>
            <Row className="pb-4">
                <Col span={6}>
                    <p>Длинна судна</p>
                    <InputNumber
                        value={min_overall_length}
                        min={0.6}
                        max={500}
                        step={0.1}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_overall_length', value || undefined)}
                        formatter={(value) => value ? `от ${value}` : ''}
                    />
                    <InputNumber
                        value={max_overall_length}
                        min={0.6}
                        max={500}
                        step={0.1}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_overall_length', value || undefined)}
                        formatter={(value) => value ? `до ${value}` : ''}
                    />
                </Col>
                <Col span={6}>
                    <p>Ширина судна</p>
                    <InputNumber
                        value={min_overall_width}
                        min={0.3}
                        max={70}
                        step={0.1}
                        onChange={(value) => changeConfigProperty<number | undefined>('min_overall_width', value || undefined)}
                        formatter={(value) => value ? `от ${value}` : ''}
                    />
                    <InputNumber
                        value={max_overall_width}
                        min={0.3}
                        max={70}
                        step={0.1}
                        onChange={(value) => changeConfigProperty<number | undefined>('max_overall_width', value || undefined)}
                        formatter={(value) => value ? `до ${value}` : ''}
                    />
                </Col>
            </Row>
        </>
    );
}

export default MainFiltres;

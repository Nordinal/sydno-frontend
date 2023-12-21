'use client';
import { UploadAvatars } from '@/shared/ui/UploadAvatars';
import { Form, Button, Input, Typography, InputNumber, Timeline, Col, Row, Select } from 'antd';
import { onFinishStep } from '../ui';
import { useEffect, useState } from 'react';
import { ICreateAdStepThree } from '@/entities/createAd/model';
import { instanceApi } from '@/shared/configs/instanceAxios';

export default function CreateAdStepThree({onFinish}: {onFinish: onFinishStep}) {
    const [isTanks, setIsTanks] = useState(false);
    const [isBulkTanks, setIsBulkTanks] = useState(false);
    const [isCapacity, setIsCapacity] = useState(false);

    const [materials, setMaterials] = useState<{value: string, label: string}[]>();

    const _onFinish = (values: ICreateAdStepThree) => {
        onFinish({type: 'StepThree', data: values});
    }

    useEffect(() => {
        instanceApi.get('/api/selector?materials').then(res => {
            const data = res.data.message
            setMaterials(
                Object.entries(data.materials as {[x in string]: string})
                    .map(([value, label] : [string, string]) => ({
                        value,
                        label
                    }))
            );
        });
    }, []);

    return (
        <Form
            id='StepThree'
            labelWrap
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15, offset: 1 }}
            initialValues={{ remember: true }}
            onFinish={_onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Габариты"
                labelAlign='left'
                required
            >
                <Input.Group compact>
                    <Form.Item
                        noStyle
                        name="overall_length"
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <InputNumber style={{width: '50%'}} placeholder='Длина' addonAfter='м.' step="0.01" />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        name="overall_width"
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <InputNumber style={{width: '50%'}} placeholder='Ширина' addonAfter='м.' step="0.01" />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item
                label="Высота борта"
                labelAlign='left'
                name="board_height"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}} placeholder='Высота борта (метры)' addonAfter='метры' step="0.01" />
            </Form.Item>

            <Form.Item
                label="Макс. надводный борт"
                labelAlign='left'
                name="maximum_freeboard"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}} placeholder='Максимальный надводный борт' addonAfter='метры' />
            </Form.Item>

            <Form.Item
                label="Материал корпуса"
                labelAlign='left'
                name="material"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Материал корпуса'
                    options={materials}
                />
            </Form.Item>

            <Form.Item
                label="Дедвейт"
                labelAlign='left'
                name="deadweight"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}} placeholder='Дедвейт (тонны)' addonAfter='тонны' />
            </Form.Item>

            <Form.Item
                label="Доковый вес"
                labelAlign='left'
                name="dock_weight"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}} placeholder='Доковый вес (тонны)' addonAfter='тонны'/>
            </Form.Item>

            <Form.Item
                label="Водоизмещение полное"
                labelAlign='left'
                name="full_displacement"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}} placeholder='Водоизмещение полное (Рег. тонны)' addonAfter='рег. тонны' />
            </Form.Item>

            <Form.Item
                label="Валовая вместимость"
                labelAlign='left'
                name="gross_tonnage"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}}  placeholder='Количество двигателей (Рег. тонны)' addonAfter='рег. тонны' />
            </Form.Item>

            <Form.Item
                label="Количество главных двигателей"
                labelAlign='left'
                name="num_engines"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}}  placeholder='Количество главных двигателей' min={1} max={8} addonAfter='шт.' />
            </Form.Item>
            <Form.Item
                label="Количество вспомогательных двигателей"
                labelAlign='left'
                name="num_additional_engines"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}}  placeholder='Количество вспомогательных двигателей' min={1} max={8} addonAfter='шт.' />
            </Form.Item>

            <Form.Item
                label="Мощность двигателей"
                labelAlign='left'
                name="power"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}}  placeholder='Мощность двигателей кВт' step="0.1" addonAfter='кВт' />
            </Form.Item>

            <Form.Item
                label="Максимальная скорость в балласте"
                labelAlign='left'
                name="maximum_speed_in_ballast"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}}  placeholder='Максимальная скорость в балласте (км/ч)' addonAfter='км/ч' step="0.1"/>
            </Form.Item>

            <Form.Item
                label="Максимальная скорость в грузу"
                labelAlign='left'
                name="maximum_speed_when_loaded"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}}  placeholder='Максимальная скорость в грузу (км/ч)' addonAfter='км/ч' step="0.1"/>
            </Form.Item>

            <Form.Item
                label="Грузовые танки"
                labelAlign='left'
                name="cargo_tanks"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Грузовые танки'
                    value={isTanks}
                    onChange={(val) => setIsTanks(val)}
                    options={[
                        {
                            value: true,
                            label: 'Да',
                        },
                        {
                            value: false,
                            label: 'Нет',
                        }
                    ]}
                />
            </Form.Item>

            {
                isTanks &&
                <Form.Item
                    label="Суммарная вместимость"
                    labelAlign='left'
                    name="total_capacity_cargo_tanks"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <InputNumber style={{width: '100%'}}  placeholder='Суммарная вместимость'/>
                </Form.Item>
            }

            <Form.Item
                label="Второе дно"
                labelAlign='left'
                name="second_bottom"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Второе дно'
                    options={[
                        {
                            value: true,
                            label: 'Да',
                        },
                        {
                            value: false,
                            label: 'Нет',
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                label="Вторые борта"
                labelAlign='left'
                name="second_sides"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Вторые борта'
                    options={[
                        {
                            value: true,
                            label: 'Да',
                        },
                        {
                            value: false,
                            label: 'Нет',
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                label="Грузоподъемность"
                labelAlign='left'
                name="carrying"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '100%'}}  placeholder='Грузоподъемность'/>
            </Form.Item>

            <Form.Item
                label="Надстройки"
                labelAlign='left'
                name="superstructures"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Надстройки'
                    options={[
                        {
                            value: true,
                            label: 'Да',
                        },
                        {
                            value: false,
                            label: 'Нет',
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                label="Наливные танки"
                labelAlign='left'
                name="liquid_tanks"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Наливные танки'
                    value={isBulkTanks}
                    onChange={(val) => setIsBulkTanks(val)}
                    options={[
                        {
                            value: true,
                            label: 'Да',
                        },
                        {
                            value: false,
                            label: 'Нет',
                        }
                    ]}
                />
            </Form.Item>

            {
                isBulkTanks &&
                <Form.Item
                    label="Cуммарная вместимость"
                    labelAlign='left'
                    name="total_capacity_liquid_tanks"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <InputNumber style={{width: '100%'}} placeholder='Cуммарная вместимость'/>
                </Form.Item>
            }

            <Form.Item
                label="Пассажировместимость"
                labelAlign='left'
                name="passangers_avialable"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Пассажировместимость'
                    value={isCapacity}
                    onChange={(val) => setIsCapacity(val)}
                    options={[
                        {
                            value: true,
                            label: 'Да',
                        },
                        {
                            value: false,
                            label: 'Нет',
                        }
                    ]}
                />
            </Form.Item>

            {
                isCapacity &&
                <Form.Item
                    label="Количество человек"
                    labelAlign='left'
                    name="num_passangers"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <InputNumber style={{width: '100%'}} placeholder='Количество человек'/>
                </Form.Item>
            }

            <Form.Item
                label="Техническая документация"
                labelAlign='left'
                name="technical_documentation"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Техническая документация'
                    options={[
                        {
                            value: true,
                            label: 'Да',
                        },
                        {
                            value: false,
                            label: 'Нет',
                        }
                    ]}
                />
            </Form.Item>

        </Form>
    )
}
'use client';
import { UploadAvatars } from '@/shared/ui/UploadAvatars';
import { Form, Button, Input, Typography, InputNumber, Timeline, Col, Row, Select } from 'antd';
import { onFinishStep } from '../ui';
import { useState } from 'react';

export default function CreateAdStepThree({onFinish}: {onFinish: onFinishStep}) {
    const [isTanks, setIsTanks] = useState(false);
    const [isBulkTanks, setIsBulkTanks] = useState(false);
    const [isCapacity, setIsCapacity] = useState(false);

    const _onFinish = (values) => {
        onFinish({type: 'StepThree', data: values})
    }
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
                name="ds33452345"
                required
            >
                <Input.Group compact>
                    <Form.Item
                        noStyle
                        name="vd"
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <InputNumber style={{width: '30%'}} placeholder='Длина' step="0.01" />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        name="sdf"
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <InputNumber style={{width: '30%'}} placeholder='Ширина' step="0.01" />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item
                label="Высота борта"
                labelAlign='left'
                name="ds1444444"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '40%'}} placeholder='Высота борта (метры)' step="0.01" />
            </Form.Item>

            <Form.Item
                label="Макс. надводный борт"
                labelAlign='left'
                name="ds21234235"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '40%'}} placeholder='Максимальный надводный борт' />
            </Form.Item>

            <Form.Item
                label="Материал корпуса"
                labelAlign='left'
                name="dfsdfsd1234234"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <Select
                    placeholder='Материал корпуса'
                    options={[
                        {
                            value: '1',
                            label: 'Железобетонный',
                        },
                        {
                            value: '2',
                            label: 'Композитный материал',
                        },
                        {
                            value: '3',
                            label: 'Сталь',
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                label="Дедвейт"
                labelAlign='left'
                name="ds224"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '40%'}} placeholder='Дедвейт (тонны)' />
            </Form.Item>

            <Form.Item
                label="Доковый вес"
                labelAlign='left'
                name="ds2123"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '40%'}} placeholder='Доковый вес (тонны)' />
            </Form.Item>

            <Form.Item
                label="Водоизмещение полное"
                labelAlign='left'
                name="ds21117"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '40%'}} placeholder='одоизмещение полное (Рег. тонны)' />
            </Form.Item>

            <Form.Item
                label="Количество двигателей"
                labelAlign='left'
                name="ds211116"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber placeholder='Количество двигателей' min={1} max={8} />
            </Form.Item>

            <Form.Item
                label="Мощность двигателей"
                labelAlign='left'
                name="ds21111315"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber placeholder='Мощность двигателей кВт' step="0.1"/>
            </Form.Item>

            <Form.Item
                label="Максимальная скорость в балласте"
                labelAlign='left'
                name="ds21111214"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '60%'}}  placeholder='Максимальная скорость в балласте (км/ч)' step="0.1"/>
            </Form.Item>

            <Form.Item
                label="Максимальная скорость в грузу"
                labelAlign='left'
                name="ds21111113"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber style={{width: '60%'}}  placeholder='Максимальная скорость в грузу (км/ч)' step="0.1"/>
            </Form.Item>

            <Form.Item
                label="Грузовые танки"
                labelAlign='left'
                name="dfsdfsd231123"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 3, offset: 1 }}
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
                    name="ds21111112"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <InputNumber placeholder='Суммарная вместимость'/>
                </Form.Item>
            }

            <Form.Item
                label="Второе дно"
                labelAlign='left'
                name="dfsdfsd231211"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 3, offset: 1 }}
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
                name="dfsdfsd23139"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 3, offset: 1 }}
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
                name="ds21111128"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber placeholder='Грузоподъемность'/>
            </Form.Item>

            <Form.Item
                label="Надстройки"
                labelAlign='left'
                name="dfsdfsd23137"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 3, offset: 1 }}
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
                label="Рубки"
                labelAlign='left'
                name="dfsdfsd23136"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 3, offset: 1 }}
            >
                <Select
                    placeholder='Рубки'
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
                name="dfsdfsd23135"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 3, offset: 1 }}
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
                    name="ds211111234"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <InputNumber placeholder='Cуммарная вместимость'/>
                </Form.Item>
            }

            <Form.Item
                label="Пассажировместимость"
                labelAlign='left'
                name="dfsdfsd23132343"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 3, offset: 1 }}
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
                    name="ds2111112342"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <InputNumber placeholder='Количество человек'/>
                </Form.Item>
            }

            <Form.Item
                label="Техническая документация"
                labelAlign='left'
                name="dfsdfsd231331"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 3, offset: 1 }}
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
'use client';
import { UploadAvatars } from '@/shared/ui/UploadAvatars';
import { Form, Button, Input, Typography, InputNumber, Timeline, Col, Row, Select, AutoComplete, Checkbox, DatePicker } from 'antd';
import { onFinishStep } from '../ui';
import { useState } from 'react';

export default function CreateAdStepTwo({onFinish}: {onFinish: onFinishStep}) {
    const [checkboxAccounting, setCheckboxAccounting] = useState(false);
    const [statusVessel, setStatusVessel] = useState<string | null>(null);

    const _onFinish = (values) => {
        onFinish({type: 'StepTwo', data: values})
    }

    const onStatusVesselChange = (value: string) => {
        setStatusVessel(value)
    }

    return (
        <Form
            id='StepTwo'
            labelWrap
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15, offset: 1 }}
            initialValues={{ remember: true }}
            onFinish={_onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Флаг"
                labelAlign='left'
                name="flag"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Тип эксплуатации"
                labelAlign='left'
                name="dfsdfsd1"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <Select
                    placeholder='Тип эксплуатации'
                    options={[
                        {
                            value: '1',
                            label: 'Коммерческое',
                        },
                        {
                            value: '2',
                            label: 'Некоммерческое',
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                label="Тип и назначение"
                labelAlign='left'
                name='typeappointment'
                required
            >
                <Input.Group compact>
                    <Form.Item
                        name='type'
                        noStyle
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <Select
                            style={{ width: '70%' }}
                            placeholder="Выбрать тип"
                            options={[
                                {
                                    value: '1',
                                    label: 'Полноразмерное самоходное',
                                },
                                {
                                    value: '2',
                                    label: 'Не полноразмерное самоходное',
                                },
                                {
                                    value: '3',
                                    label: 'Маломерное самоходное',
                                },
                                {
                                    value: '4',
                                    label: 'Не маломерное самоходное',
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'appointment'}
                        noStyle
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <AutoComplete
                            style={{ width: '30%' }}
                            options={[
                                { value: 'Баржа' },
                                { value: 'Буксир' },
                                { value: 'Танкер' },
                            ]}
                            placeholder="Выбрать назначение"
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item
                label="Статус судна"
                labelAlign='left'
                name="dfsdfsd"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Статус судна'
                    onChange={onStatusVesselChange}
                    options={[
                        {
                            value: '1',
                            label: 'Действующие документы',
                        },
                        {
                            value: '2',
                            label: 'Без документов',
                        },
                        {
                            value: '3',
                            label: 'Холодный отстой',
                        }
                    ]}
                />
            </Form.Item>

            {
                statusVessel === '2' &&
                <Form.Item
                    label='Находилась ли на учете?'
                    labelAlign='left'
                    name='sd'
                >
                    <Checkbox onChange={() => setCheckboxAccounting(!checkboxAccounting)} checked={checkboxAccounting}/>
                </Form.Item>
            }

            {
                ((statusVessel === '2' && checkboxAccounting) || statusVessel !== '2' && statusVessel !== null) &&
                <Form.Item
                    label='Действие документов до'
                    labelAlign='left'
                    name='sd1'
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <DatePicker />
                </Form.Item>
            }

            <Form.Item
                name={'port'}
                label='Порт приписки'
                labelAlign='left'
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <AutoComplete
                    options={[
                        { value: 'Сочи' },
                        { value: 'Москва' },
                        { value: 'хуй' },
                    ]}
                    placeholder="Порт приписки"
                    filterOption={(inputValue, option) =>
                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </Form.Item>

            <Form.Item
                name={'place'}
                label='Место и год постройки'
                labelAlign='left'
            >
                <Input.Group compact>
                    <Form.Item
                        name={'place'}
                        noStyle
                    >
                        <AutoComplete
                            style={{ width: '40%' }}
                            options={[
                                { value: 'Сочи' },
                                { value: 'Москва' },
                                { value: 'хуй' },
                            ]}
                            placeholder="Место постройки"
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name={'place'}
                        noStyle
                    >
                        <DatePicker placeholder='Год постройки' picker="year"/>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item
                label="Номер IMO"
                labelAlign='left'
                name="imo"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Номер проекта"
                labelAlign='left'
                name="project"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Строительный номер"
                labelAlign='left'
                name="project"
            >
                <Input />
            </Form.Item>
        </Form>
    )
}
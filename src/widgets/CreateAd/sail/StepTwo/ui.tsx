'use client';
import { Form, Input, Select, AutoComplete, Checkbox, DatePicker, InputNumber } from 'antd';
import { onFinishStep } from '../ui';
import { useState, useEffect } from 'react';
import { CountriesAutoComplete } from '@/shared/ui/CountriesAutoComplete';
import { RegionAutoComplete } from '@/shared/ui/RegionAutoComplete';
import { instanceApi } from '@/shared/configs/instanceAxios';
import { ICreateAdStepThree, ICreateAdStepTwo, useCreateAd } from '@/entities/createAd/model';
import { useShallow } from 'zustand/react/shallow';
import dayjs from 'dayjs';


export default function CreateAdStepTwo({onFinish}: {onFinish: onFinishStep}) {
    const { advert_legal_information } = useCreateAd(useShallow(state => ({advert_legal_information: state.instance.advert_legal_information})))
    const [checkboxAccounting, setCheckboxAccounting] = useState<boolean | undefined>(advert_legal_information?.was_registered);
    const [statusVessel, setStatusVessel] = useState<string | undefined>(advert_legal_information?.vessel_status.toString());

    const [vesseltypes, setVesseltypes] = useState<{value: string, label: string}[]>();
    const [exploitationTypes, setExploitationTypes] = useState<{value: string, label: string}[]>();

    const _onFinish = (values: any) => {
        const result = {...values}
        if(values.register_valid_until)
            result.register_valid_until = values.register_valid_until.format().split('T')[0]
        if(values.building_year)
            result.building_year = values.building_year.year()
        if(values.port_address) {
            result.port_address = {
                value: values.port_address.value,
                city: values.port_address.city,
                country: values.port_address.country,
                region: values.port_address.region
            }
        }
        if(values.vessel_location) {
            result.vessel_location = {
                value: values.vessel_location.value,
                city: values.vessel_location.city,
                country: values.vessel_location.country,
                region: values.vessel_location.region
            }
        }
        onFinish({type: 'StepTwo', data: result})
    }

    const onStatusVesselChange = (value: string) => {
        setStatusVessel(value)
    }

    useEffect(() => {
        instanceApi.get('/api/selector?vesseltypes&exploitationtypes').then(res => {
            const data = res.data.message
            setVesseltypes(
                Object.entries(data.vessel_types as {[x in string]: string})
                    .map(([value, label] : [string, string]) => ({
                        value,
                        label
                    }))
            );
            setExploitationTypes(
                Object.entries(data.exploitation_types as {[x in string]: string})
                    .map(([value, label] : [string, string]) => ({
                        value,
                        label
                    }))
            );
        })
    }, []);

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
                initialValue={ advert_legal_information?.flag }
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <CountriesAutoComplete />
            </Form.Item>

            <Form.Item
                label="Тип эксплуатации"
                labelAlign='left'
                name="exploitation_type"
                initialValue={ advert_legal_information?.exploitation_type.toString() }
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <Select
                    placeholder='Тип эксплуатации'
                    options={exploitationTypes}
                />
            </Form.Item>

            <Form.Item
                label="Формула класса"
                labelAlign='left'
                name="class_formula"
                initialValue={ advert_legal_information?.class_formula }
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input placeholder='Формула класса'/>
            </Form.Item>

            <Form.Item
                label="Ограничения по высоте волны"
                labelAlign='left'
                name="wave_limit"
                initialValue={ advert_legal_information?.wave_limit }
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber step={0.1} max={3.5} min={0}/>
            </Form.Item>

            <Form.Item
                label='Ледовое усиление'
                labelAlign='left'
                name='ice_strengthening'
                initialValue={ advert_legal_information?.ice_strengthening || false }
                valuePropName="checked"
            >
                <Checkbox />
            </Form.Item>

            <Form.Item
                label="Тип и назначение"
                labelAlign='left'
                required
            >
                <Input.Group compact>
                    <Form.Item
                        name='type'
                        initialValue={ advert_legal_information?.type.toString() }
                        noStyle
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <Select
                            style={{ width: '60%' }}
                            placeholder="Выбрать тип"
                            options={vesseltypes}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'purpose'}
                        initialValue={ advert_legal_information?.purpose }
                        noStyle
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <Input style={{ width: '40%' }} placeholder='Назначение'/>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item
                label="Статус судна"
                labelAlign='left'
                initialValue={ advert_legal_information?.vessel_status.toString() }
                name="vessel_status"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Select
                    placeholder='Статус судна'
                    onChange={onStatusVesselChange}
                    options={[
                        {
                            value: '0',
                            label: 'Действующие документы',
                        },
                        {
                            value: '1',
                            label: 'Без документов',
                        },
                        {
                            value: '2',
                            label: 'Холодный отстой',
                        }
                    ]}
                />
            </Form.Item>

            {
                statusVessel === '1' &&
                <Form.Item
                    label='Находилась ли на учете?'
                    labelAlign='left'
                    name='was_registered'
                    initialValue={ advert_legal_information?.was_registered }
                    valuePropName="checked"
                >
                    <Checkbox onChange={() => setCheckboxAccounting(!checkboxAccounting)} checked={checkboxAccounting}/>
                </Form.Item>
            }

            {
                ((statusVessel === '1' && checkboxAccounting) || statusVessel !== '1' && statusVessel !== null) &&
                <Form.Item
                    label='Действие документов до'
                    labelAlign='left'
                    name='register_valid_until'
                    initialValue={
                        advert_legal_information?.register_valid_until && 
                        dayjs(advert_legal_information.register_valid_until)
                    }
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <DatePicker />
                </Form.Item>
            }

            <Form.Item
                name={'port_address'}
                initialValue={ advert_legal_information?.port_address }
                label='Страна приписки'
                labelAlign='left'
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <RegionAutoComplete />
            </Form.Item>

            <Form.Item
                name={'vessel_location'}
                initialValue={ advert_legal_information?.vessel_location }
                label='Местонахождение судна'
                labelAlign='left'
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <RegionAutoComplete placeholder='Местонахождение судна'/>
            </Form.Item>

            <Form.Item
                label='Место и год постройки'
                labelAlign='left'
            >
                <Input.Group compact>
                    <Form.Item
                        name={'building_country'}
                        initialValue={ advert_legal_information?.building_country }
                        noStyle
                    >
                        <CountriesAutoComplete style={{width: '50%'}} placeholder='Страна постройки'/>   
                    </Form.Item>
                    <Form.Item
                        name={'building_year'}
                        initialValue={
                            advert_legal_information?.building_year &&
                            dayjs(advert_legal_information?.building_year.toString())
                        }
                        noStyle
                    >
                        <DatePicker style={{width: '50%'}} placeholder='Год постройки' picker="year"/>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item
                label="Номер IMO"
                labelAlign='left'
                name="imo_number"
                initialValue={ advert_legal_information?.imo_number }
            >
                <Input placeholder='Номер IMO'/>
            </Form.Item>

            <Form.Item
                label="Номер проекта"
                labelAlign='left'
                name="project_number"
                initialValue={ advert_legal_information?.project_number }
            >
                <Input placeholder='Номер проекта'/>
            </Form.Item>

            <Form.Item
                label="Строительный номер"
                labelAlign='left'
                name="building_number"
                initialValue={ advert_legal_information?.building_number }
            >
                <Input placeholder='Строительный номер'/>
            </Form.Item>
        </Form>
    )
}
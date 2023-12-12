'use client';
import { UploadAvatars } from '@/shared/ui/UploadAvatars';
import { Form, Input, InputNumber } from 'antd';
import { onFinishStep } from '../ui';
import { useState } from 'react';
import { UploadFile } from 'antd/es/upload';
import { ICreateAdStepOne, useCreateAd } from '@/entities/createAd/model';
import { MaskedInput } from 'antd-mask-input';
import { useShallow } from 'zustand/react/shallow';
import { useUser } from '@/entities/user/model';

export default function CreateAdStepOne({onFinish}: {onFinish: onFinishStep}) {
    const { instance } = useCreateAd(useShallow(state => ({instance: state.instance})));
    const { phone_number } = useUser(useShallow(state => ({phone_number: state.instance?.phone_number})));
    const [images, setImages] = useState<UploadFile<any>[]>([]);
    const _onFinish = (values: ICreateAdStepOne) => {
        onFinish({type: 'StepOne', data: {...values, images}})
    }
    return (
        <Form
            id='StepOne'
            labelWrap
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15, offset: 1 }}
            onFinish={_onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Заголовок объявления"
                labelAlign='left'
                name="header"
                initialValue={instance.header}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input placeholder='Заголовок объявления'/>
            </Form.Item>

            <Form.Item
                label="Регистрационный номер"
                labelAlign='left'
                name="registration_number"
                initialValue={instance.registration_number}
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <Input placeholder='Регистрационный номер'/>
            </Form.Item>

            <Form.Item
                label="Цена"
                labelAlign='left'
                name="price"
                initialValue={instance.price}
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber placeholder='Цена' style={{width: '40%'}}/>
            </Form.Item>

            <Form.Item
                label="Фото"
                labelAlign='left'
            >
                <UploadAvatars defaultImages={instance.images} onChange={(images) => setImages(images)} />
            </Form.Item>

            <Form.Item
                label="Номер телефона"
                labelAlign='left'
                name="phone_number"
                initialValue={instance.phone_number || phone_number}
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <MaskedInput
                    mask={'+7(000)000-00-00'}
                    placeholder='Номер телефона'
                />
            </Form.Item>

            <Form.Item
                label="Описание"
                labelAlign='left'
                name="description"
                initialValue={instance.description}
            >
                <Input.TextArea placeholder='Описание' rows={8} />
            </Form.Item>
        </Form>
    )
}
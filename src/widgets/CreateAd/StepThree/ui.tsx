'use client';
import { UploadAvatars } from '@/shared/ui/UploadAvatars';
import { Form, Button, Input, Typography, InputNumber, Timeline, Col, Row } from 'antd';
import { onFinishStep } from '../ui';

export default function CreateAdStepThree({onFinish}: {onFinish: onFinishStep}) {
    const _onFinish = (values) => {
        onFinish({type: 'StepThree', data: values})
    }
    return (
        <Form
            id='create-ad'
            name="create-ad"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15, offset: 1 }}
            initialValues={{ remember: true }}
            onFinish={_onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Заголовок объявления"
                labelAlign='left'
                name="title"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Регистрационный номер"
                labelAlign='left'
                name="register"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Цена"
                labelAlign='left'
                name="sale"
                rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                label="Фото"
                labelAlign='left'
                name="images"
            >
                <UploadAvatars />
            </Form.Item>

            <Form.Item
                label="Номер телефона"
                labelAlign='left'
                name="phone"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                wrapperCol={{ span: 6, offset: 1 }}
            >
                <Input  />
            </Form.Item>

            <Form.Item
                label="Описание"
                labelAlign='left'
                name="description"
            >
                <Input.TextArea rows={8} />
            </Form.Item>
        </Form>
    )
}
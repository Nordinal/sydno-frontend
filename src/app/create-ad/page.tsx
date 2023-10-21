'use client';
import { UploadAvatars } from '@/shared/ui/UploadAvatars';
import { MainLayout } from '@/widgets/Layout';
import { Form, Button, Input, Typography, InputNumber, Timeline, Col, Row } from 'antd';

export default function CreateAd() {
    return (
        <MainLayout
            createAd={false}
        >
            <Row>
                <Col span={24}>
                    <Typography.Title
                        level={2}
                        style={{
                            marginTop: '18px',
                            marginBottom: '48px'
                        }}
                    >
                        Создание объявления
                    </Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col span={18}>
                    <Form
                        name="create-ad"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
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
                            wrapperCol={{ span: 6 }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Цена"
                            labelAlign='left'
                            name="sale"
                            rules={[{ required: true, message: 'Обязательное поле' }]}
                            wrapperCol={{ span: 6 }}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Фото"
                            labelAlign='left'
                            name="avatar"
                        >
                            <UploadAvatars />
                        </Form.Item>

                        <Form.Item
                            label="Номер телефона"
                            labelAlign='left'
                            name="phone"
                            rules={[{ required: true, message: 'Обязательное поле' }]}
                            wrapperCol={{ span: 6 }}
                        >
                            <Input  />
                        </Form.Item>

                        <Form.Item
                            label="Электронная почта"
                            labelAlign='left'
                            name="number"
                            rules={[{ required: true, message: 'Обязательное поле' }]}
                            wrapperCol={{ span: 6 }}
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

                        <Form.Item wrapperCol={{ offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Перейти ко второму шагу →
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <Timeline>
                        <Timeline.Item>Создание объявления</Timeline.Item>
                        <Timeline.Item>Какой-то следующий пункт</Timeline.Item>
                        <Timeline.Item>Какой-то следующий пункт</Timeline.Item>
                    </Timeline>
                </Col>
            </Row>
        </MainLayout>
    )
}
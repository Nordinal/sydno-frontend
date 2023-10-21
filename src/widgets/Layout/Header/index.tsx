'use client';
import {useState} from 'react';
import { Layout, Button, Typography, Modal, Form, Input, Tabs, Checkbox  } from "antd";
import Link from "next/link";
import axios from 'axios';
import { instanceApi } from '@/shared/configs/instanceAxios';

export const Header = ({createAd}: {createAd: boolean}) => {
    return (
        <Layout.Header className="flex justify-between items-center" style={{height: '48px'}}>
            <Link href={'/'}>
                <Typography.Title
                    style={{
                        color: 'white',
                        margin: 0
                    }}
                    level={4}
                >
                    Судно
                </Typography.Title>
            </Link>
            <div>
                <SingButton />
                {createAd && <Link href={'/create-ad'}><Button type='primary'>Разместить объявление</Button></Link>}
            </div>
        </Layout.Header>
    );
}

const SingButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleOpen = () => {
        setIsModalOpen(true);
    }

    return (
        <>
            <Button type='link' onClick={handleOpen}>Вход/Регистрация</Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                <ContentModal />
            </Modal>
        </>
    )
}

const ContentModal = () => {
    const [mode, setMode] = useState<'singin' | 'singout' | 'forgotpass'>('singin');

    if(mode === 'singin') return <SingInForm onToggleForm={(val) => setMode(val)}/>
    if(mode === 'singout') return <SingOutForm onToggleForm={(val) => setMode(val)}/>
    if(mode === 'forgotpass') return <ForgotPasswordForm onToggleForm={(val) => setMode(val)} />
    return null;
}

const SingInForm = ({onToggleForm}: {onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void}) => {

    const onFinish = (values) => {

        instanceApi.post('/login', {
            email: values.email,
            password: values.pass,
        })
        .then((res) => {
            instanceApi.get('/user');
        })
    }

    return (
        <>
            <Typography.Title level={2} style={{marginBottom: '2rem'}}>Вход</Typography.Title>
            <Form
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="email"
                    initialValue=''
                    // rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Input
                        readOnly
                        name='email'
                        placeholder='Электронная почта'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item
                    name="pass"
                    initialValue=''
                    style={{marginBottom: '1rem'}}
                    // rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Input.Password
                        readOnly
                        name='pass'
                        placeholder='Пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete="false"
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <div className='flex justify-between align-center'>
                        <Checkbox>Запомнить меня</Checkbox>
                        <Button type='link' onClick={() => onToggleForm('forgotpass')}>Забыли пароль?</Button>
                    </div>
                </Form.Item>

                <Form.Item className='justify-end'>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                    <Button type='link' onClick={() => onToggleForm('singout')}>
                        или зарегистрируйтесь
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

const SingOutForm = ({onToggleForm}: {onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void}) => {

    const onFinish = (values) => {
        console.log(values)
        instanceApi.post('/register', {
            name: values.name,
            email: values.email,
            password: values.pass,
            password_confirmation: values.repeatPass
        })
        .then((res) => {
            console.log(res);
        })
    }

    return (
        <>
            <Typography.Title level={2} style={{marginBottom: '2rem'}}>Регистрация</Typography.Title>
            <Form
                name="auth"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: false }}
                
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Input
                        readOnly
                        name='name'
                        placeholder='Имя'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Input
                        readOnly
                        name='email'
                        placeholder='Электронная почта'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item
                    name="pass"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Input.Password
                        readOnly
                        name='pass'
                        placeholder='Пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete="false"
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item
                    name="repeatPass"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Input.Password
                        readOnly
                        name='repeatPass'
                        placeholder='Повторите пароль'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete="false"
                        onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                    <Button type='link' onClick={() => onToggleForm('singin')}>
                        или войдите
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
}

const ForgotPasswordForm = ({onToggleForm}: {onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void}) => {

    return (
        <>
        <Typography.Title level={2} style={{marginBottom: '2rem'}}>Восстановление пароля</Typography.Title>
        <Form
            wrapperCol={{ span: 24 }}
            autoComplete="off"
            
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="email"
                initialValue=''
                // rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input
                    readOnly
                    name='email'
                    placeholder='Электронная почта'
                    spellCheck='false'
                    autoCorrect='off'
                    autoComplete='off'
                    onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
                />
            </Form.Item>

            <Form.Item className='justify-end'>
                <Button type="primary" htmlType="submit">
                    Сбросить пароль
                </Button>
                <Button type='link' onClick={() => onToggleForm('singin')}>
                    или войти
                </Button>
            </Form.Item>
        </Form>
    </>
    );
}
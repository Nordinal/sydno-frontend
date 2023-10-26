'use client';
import {useState} from 'react';
import { Button, Typography, Modal, Form, Input, Tabs, Checkbox  } from "antd";
import { instanceApi } from '@/shared/configs/instanceAxios';
import { useUser } from '@/entities/user/model';
import { useShallow } from 'zustand/react/shallow';

export const SingButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { resetError } = useUser(useShallow(state => ({resetError: state.resetError})));

    const handleCancel = () => {
        setIsModalOpen(false);
        resetError();
    }

    const handleOpen = () => {
        setIsModalOpen(true);
        resetError();
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
    const { error, resetError } = useUser(useShallow(state => ({error: state.error, resetError: state.resetError})));

    const onChangeMode = (val: 'singin' | 'singout' | 'forgotpass') => {
        setMode(val);
        resetError();
    }

    if(mode === 'singin') return <SingInForm errorMessage={error?.response?.data?.message} onToggleForm={onChangeMode}/>
    if(mode === 'singout') return <SingOutForm errorMessage={error?.response?.data?.message} onToggleForm={onChangeMode}/>
    if(mode === 'forgotpass') return <ForgotPasswordForm errorMessage={error?.response?.data?.message} onToggleForm={onChangeMode} />
    return null;
}

const SingInForm = ({onToggleForm, errorMessage}: {onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void, errorMessage: string}) => {
    const { login } = useUser(useShallow((state) => ({login: state.login})));

    const onFinish = (values: {email: string, pass: string, remember: boolean}) => {
        login(values);
    }

    return (
        <>
            <Typography.Title level={2} style={{marginBottom: errorMessage ? '1rem' :'2rem'}}>Вход</Typography.Title>
            <Form
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                
                {
                    errorMessage &&
                    <Form.Item>
                        <Typography.Text type="danger">{errorMessage}</Typography.Text>
                    </Form.Item>
                }

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

                <Form.Item name="remember">
                    <div className='flex justify-between align-center'>
                        <Checkbox defaultChecked>Запомнить меня</Checkbox>
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

const SingOutForm = ({onToggleForm, errorMessage}: {onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void, errorMessage: string}) => {
    const { registration } = useUser(useShallow((state) => ({registration: state.registration})));

    const onFinish = (values: {email: string, name: string, pass: string, confirmationPass: string}) => {
        registration(values);
    }

    return (
        <>
            <Typography.Title level={2} style={{marginBottom: errorMessage ? '1rem' :'2rem'}}>Регистрация</Typography.Title>
            <Form
                name="auth"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: false }}
                
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                { 
                    errorMessage &&
                    <Form.Item>
                        <Typography.Text type="danger">{errorMessage}</Typography.Text>
                    </Form.Item>
                }


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
                    name="confirmationPass"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Input.Password
                        readOnly
                        name='confirmationPass'
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

const ForgotPasswordForm = ({onToggleForm, errorMessage}: {onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void, errorMessage: string}) => {

    return (
        <>
        <Typography.Title level={2} style={{marginBottom: errorMessage ? '1rem' :'2rem'}}>Восстановление пароля</Typography.Title>
        <Form
            wrapperCol={{ span: 24 }}
            autoComplete="off"
            
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
        >

                {
                    errorMessage &&
                    <Form.Item>
                        <Typography.Text type="danger">{errorMessage}</Typography.Text>
                    </Form.Item>
                }

            <Form.Item
                name="email"
                initialValue=''
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
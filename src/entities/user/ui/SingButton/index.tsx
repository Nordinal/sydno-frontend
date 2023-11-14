'use client';
import {useState} from 'react';
import { Button, Typography, Modal, Form, Input, Tabs, Checkbox  } from "antd";
import { useUser } from '@/entities/user/model';
import { useShallow } from 'zustand/react/shallow';
import { MailOutlined } from '@ant-design/icons';

export const SingButton = ({type = 'link', caption = 'Вход/Регистрация'}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<'singin' | 'singout' | 'forgotpass'>('singin');
    const { resetError, auth } = useUser(useShallow(state => ({resetError: state.resetError, auth: state.auth})));

    const handleCancel = () => {
        setIsModalOpen(false);
        setMode('singin');
        resetError();
    }

    const handleOpen = () => {
        setIsModalOpen(true);
        setMode('singin');
        resetError();
    }

    return (
        <>
            <Button type={type} onClick={handleOpen}>{caption}</Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                {
                    !auth
                        ? <ContentModal handleCancel={handleCancel} mode={mode} setMode={setMode}/>
                        : <AlreadyAuth />
                }
            </Modal>
        </>
    )
}

const AlreadyAuth = () => {
    const { name, logout } = useUser(useShallow(state => ({name: state.name, logout: state.logout})));

    return (
        <>
            <div className='flex items-center mb-4'>
                <Typography.Title level={4} style={{marginBottom: 0}}>{name}, вы уже авторизованы</Typography.Title>
            </div>
            <div className='mb-4'>
                <Typography.Text type='secondary'>Желаете выйти?</Typography.Text>
            </div>
            <div>
                <Button type='primary' danger onClick={() => logout()}>Выйти</Button>
            </div>
        </>
    );
}

const ContentModal = ({
    handleCancel,
    setMode,
    mode
}: {
    handleCancel: Function
    setMode: (val: 'singin' | 'singout' | 'forgotpass') => void,
    mode: 'singin' | 'singout' | 'forgotpass'
}) => {
    const { error, resetError } = useUser(useShallow(state => ({error: state.error, resetError: state.resetError})));

    const onChangeMode = (val: 'singin' | 'singout' | 'forgotpass') => {
        setMode(val);
        resetError();
    }

    if(mode === 'singin') return <SingInForm errorMessage={error?.response?.data?.message} onToggleForm={onChangeMode}/>
    if(mode === 'singout') return <SingOutForm handleCancel={handleCancel} errorMessage={error?.response?.data?.message} onToggleForm={onChangeMode}/>
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

const SingOutForm = ({
    onToggleForm,
    errorMessage,
    handleCancel
}: {
    onToggleForm: (val: 'singin' | 'singout' | 'forgotpass') => void,
    errorMessage: string,
    handleCancel: Function
}) => {
    const { registration, registrationStatus } = useUser(useShallow((state) => ({registration: state.registration, registrationStatus: state.registrationStatus})));

    const onFinish = (values: {email: string, name: string, pass: string, confirmationPass: string}) => {
        registration(values);
    }

    if(registrationStatus) return (
        <>
            <div className='mb-2'>
                <MailOutlined style={{fontSize: '32px', color: 'var(--ant-success-color)'}}/>
            </div>
            <div className='flex items-center mb-4'>
                <Typography.Title level={4} style={{marginBottom: 0}}>На вашу почту отправлено письмо</Typography.Title>
            </div>
            <div className='mb-4'>
                <Typography.Text type='secondary'>Перейдите по ссылке в письме для подтверждения своего email</Typography.Text>
            </div>
            <div>
                <Button type='primary' onClick={() => handleCancel()}>Продолжить</Button>
            </div>
        </>
    );

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
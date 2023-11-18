'use client';
import { useUser } from "@/entities/user/model";
import { UploadAvatar } from "@/shared/ui/UploadAvatar";
import { Button, Divider, Form, Input, Modal, Typography } from "antd";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const ProfileInfo= () => {
    const { updateProfileInfo, name, email, updateAvatar } = useUser(useShallow((state) => ({
        name: state.instance?.name,
        email: state.instance?.email,
        updateProfileInfo: state.updateProfileInfo,
        updateAvatar: state.updateAvatar
    })));

    const [avatar, setAvatar] = useState<File | null>(null);

    const openSuccessModal = () => {
        Modal.success({
            title: 'Персональные данные изменены',
            okText: 'Продолжить',
        });
    }

    const openErrorModal = () => {
        Modal.error({
            title: 'Произошла какая-то ошибка',
            okText: 'Продолжить',
        });
    }

    const onFinish = ({
        email,
        name
    }: {
        email: string,
        name: string
    }) => {
        updateProfileInfo({
            email,
            name
        }).then(res => {
            if(res) if(avatar) updateAvatar(avatar).then(res => res ? openSuccessModal() : openErrorModal());
            else openErrorModal()
        });
        
    }

    return (
        <div>
            <Typography.Title level={4}>Персональная информация</Typography.Title>

            <Divider />
            
            <Form
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                onFinish={onFinish}
                layout='vertical'
            >

                <Form.Item
                    name="email"
                    label="Почта"
                    initialValue={email}
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        },
                        {
                            type: 'email',
                            message: 'Укажите корректную почту',
                            validateTrigger: 'onBlur'
                        }
                    ]}
                >
                    <Input
                        placeholder='Электронная почта'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                    />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Имя"
                    initialValue={name}
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        }
                    ]}
                >
                    <Input
                        placeholder='Имя'
                        spellCheck='false'
                        autoCorrect='off'
                        autoComplete='off'
                    />
                </Form.Item>

                <Form.Item
                    name="avatar"
                    label="Фотография"
                >
                    <UploadAvatar onChange={(file) => setAvatar(file)}/>
                </Form.Item>

                <Form.Item className='justify-end'>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
'use client';
import { useUser } from "@/entities/user/model";
import { Button, Divider, Modal, Typography } from "antd";
import { useShallow } from "zustand/react/shallow";
import { MailOutlined } from '@ant-design/icons';

export const VerifyMail = () => {
    const { isVerify, sendVerifyMail } = useUser(useShallow((state) => ({
        isVerify: !!state.instance?.email_verified_at,
        sendVerifyMail: state.sendVerifyMail
    })));

    const openSuccessVerifyModal = () => {
        Modal.success({
            title: 'На вашу почту отправлено письмо',
            content: (
                <Typography.Text type='secondary'>Перейдите по ссылке в письме для смены пароля</Typography.Text>
            ),
            okText: 'Продолжить',
            icon: <MailOutlined />
        });
    }

    const openErrorVerifyModal = () => {
        Modal.error({
            title: 'Произошла какая-то ошибка',
            okText: 'Продолжить',
        });
    }

    const onClick = (e: React.SyntheticEvent) =>  {
        sendVerifyMail()
            .then(res => res ? openSuccessVerifyModal() : openErrorVerifyModal())
    }

    return (
        <div>
            <Typography.Title level={4}>Подтверждение почты</Typography.Title>

            <Divider style={{marginBottom: '1rem'}}/>

            <div style={{marginBottom: '1rem'}} >
                {isVerify
                    ? <Typography.Text type="success">Почта подтверждена</Typography.Text>
                    : <Typography.Text type="warning">Почта не подтверждена</Typography.Text>
                }
            </div>

            <Button onClick={onClick} disabled={isVerify} type="primary" htmlType="submit">
                Отправить письмо на почту
            </Button>
        </div>
    );
}
'use client';
import { AuthWrapper } from '@/entities/user/ui/AuthWrapper';
import { Typography, Timeline, Col, Row } from 'antd';

export default function CreateAdLayoutClient({children}: {children: React.ReactNode}) {
    return (
        <AuthWrapper>
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
                    {children}
                </Col>
            </Row>
        </AuthWrapper>
    )
}
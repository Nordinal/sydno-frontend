'use client';
import { Card, Col, Row, Typography, notification } from "antd"
import { useRouter } from 'next/navigation';
import { HistoryOutlined, KeyOutlined } from '@ant-design/icons';


export const CreateAd = () => {
    const router = useRouter();

    return (
        <div>
            <Typography.Title 
                level={2}
                style={{
                    marginTop: '18px',
                    marginBottom: '48px'
                }}
            >
                Создать
            </Typography.Title>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card
                        className='w-full'
                        bordered={false}
                        hoverable
                        onClick={() => router.push('/create/sale')}
                    >
                        <Card.Meta
                            avatar={<KeyOutlined style={{fontSize: 28}}/>}
                            title="Объявление о продаже сунда"
                            description="Тысячи людей увидят объявление о продаже твоего сунда"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        className='w-full'
                        bordered={false}
                        hoverable
                        onClick={() => notification.warning({message: 'Функционал будет доступен позже', placement: 'bottomRight', duration: 3})}
                        style={{ border: '0 solid white' }}
                    >
                        <Card.Meta
                            avatar={<HistoryOutlined style={{fontSize: 28}}/>}
                            title="Объявление об аренде сунда"
                            description="Тысячи людей увидят объявление о аренде твоего сунда"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
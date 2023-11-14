'use client';
import { Col, Row, Avatar, Button, Typography, Divider, Rate, Result } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/entities/user/model';
import { useShallow } from 'zustand/react/shallow';
import { AuthWrapper } from '@/features/AuthWrapper';


export const ProfileLayoutClient = ({children}: {children: React.ReactNode}) => {
    const { name, logout } = useUser(useShallow(state => ({name: state.name, logout: state.logout})));
    const pathname = usePathname();

    return (
        <AuthWrapper>
            <div className='my-8'>
                <Row>
                    <Col span={6}>
                        <div className='mb-4'>
                            <div className='mb-2'>
                                <Avatar size={128} icon={<UserOutlined />} />
                            </div>
                            <Typography.Title level={4}>{name}</Typography.Title>
                            <div>
                                <Rate disabled defaultValue={2.5} allowHalf/>
                                <Divider type='vertical' style={{margin: '0 1rem'}}/>
                                <Button type='link' style={{textAlign: 'start', paddingLeft: 0}}>1000 отзывов</Button>
                            </div>
                        </div>

                        <Divider style={{margin: '1rem 0'}}/>

                        <div className='flex flex-col'>
                            <Link href={'/profile'}>
                                <Button danger={pathname === '/profile'} type='link' style={{textAlign: 'start', paddingLeft: 0}}>
                                    Мои объявления
                                </Button>
                            </Link>
                            <Button type='link' style={{textAlign: 'start', paddingLeft: 0}}>
                                Избранное
                            </Button>
                        </div>

                        <Divider style={{margin: '8px 0'}}/>

                        <div className='flex flex-col'>
                            <Link href={'/profile/settings'}>
                                <Button danger={pathname === '/profile/settings'}  type='link' style={{textAlign: 'start', paddingLeft: 0}}>
                                    Настройки
                                </Button>
                            </Link>
                        </div>

                        <Divider style={{margin: '8px 0'}}/>

                        <div className='flex flex-col'>
                            <Button type='link' style={{textAlign: 'start', paddingLeft: 0}}>
                                Выйти
                            </Button>
                        </div>

                    </Col>
                    <Col span={18}>
                        {children}
                    </Col>
                </Row>
            </div>
        </AuthWrapper>
    );
} 
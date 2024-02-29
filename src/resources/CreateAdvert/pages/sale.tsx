'use client';
import { Button, Col, Result, Row, Steps, Typography } from 'antd';
import { useContext, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { CreateSaleAdvertStepOne } from '../widgets/saleSteps/StepOne';
import { CreateSaleAdvertStepThree } from '../widgets/saleSteps/StepThree';
import { CreateSaleAdvertStepTwo } from '../widgets/saleSteps/StepTwo';
import { onFinishStep } from '../shared/types/basicTypes';
import {
    ICreateAdStepOne,
    ICreateAdStepThree,
    ICreateAdStepTwo,
    IInstanceCreateAd,
    useCreateSaleAdvert
} from '../entitites/createAdvert/model';
import { StaticContext } from 'SydnoHelpers/contexts';
import { sydnoServiceJson } from 'SydnoService/service';
import { LoadingOutlined } from '@ant-design/icons';

export function CreateSaleAdvert({ id }: { id: number }) {
    const { setInstance } = useCreateSaleAdvert(useShallow((state) => ({ setInstance: state.setInstance })));
    const [loading, setLoading] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (id) {
            setLoading(true);
            sydnoServiceJson
                .get<IInstanceCreateAd>(`/api/adverts/${id}/edit`)
                .then((res) => {
                    setInstance(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
        return () => {
            setInstance({});
        };
    }, [id]);

    if (id && loading) return <Result icon={<LoadingOutlined />} status='info' title='Загрузка...' />;
    return (
        <div>
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
                    <CreateSaleAdUI />
                </Col>
            </Row>
        </div>
    );
}

export function CreateSaleAdUI() {
    const { createStepOne, createStepTwo, createStepThree } = useCreateSaleAdvert(
        useShallow((state) => ({
            createStepOne: state.createStepOne,
            createStepTwo: state.createStepTwo,
            createStepThree: state.createStepThree
        }))
    );
    const steps: ['StepOne', 'StepTwo', 'StepThree'] = ['StepOne', 'StepTwo', 'StepThree'];
    const [current, setCurrent] = useState<'StepOne' | 'StepTwo' | 'StepThree'>('StepOne');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const index = steps.indexOf(current);
    const { modal } = useContext(StaticContext);

    const openErrorModal = () => {
        modal?.error({
            title: 'Произошла какая-то ошибка',
            okText: 'Продолжить'
        });
    };

    const onFinishStep: onFinishStep = async ({ type, data }) => {
        let done = false;

        setLoading(true);

        if (type === 'StepOne') {
            done = await createStepOne(data as ICreateAdStepOne);
        }

        if (type === 'StepTwo') {
            done = await createStepTwo(data as ICreateAdStepTwo);
        }

        if (type === 'StepThree') {
            done = await createStepThree(data as ICreateAdStepThree);
        }

        setLoading(false);

        if (!done) {
            openErrorModal();
            return;
        }

        const index = steps.indexOf(type);
        if (index < 2) setCurrent(steps[index + 1]);
        else router.push('/profile');
    };

    const onBack = () => {
        const index = steps.indexOf(current);
        if (index >= 1) setCurrent(steps[index - 1]);
    };

    return (
        <div>
            <Steps
                style={{
                    marginBottom: '48px'
                }}
                current={index}
                items={[
                    {
                        title: 'Основная информация'
                    },
                    {
                        title: 'Юридическая информация'
                    },
                    {
                        title: 'Техническая информация'
                    }
                ]}
            />
            {index === 0 ? (
                <CreateSaleAdvertStepOne onFinish={onFinishStep} />
            ) : index === 1 ? (
                <CreateSaleAdvertStepTwo onFinish={onFinishStep} />
            ) : index === 2 ? (
                <CreateSaleAdvertStepThree onFinish={onFinishStep} />
            ) : null}
            <Row>
                <Col span={6}>
                    <Button
                        loading={loading}
                        disabled={index === 0}
                        onClick={onBack}
                        className='mr-4 w-full'
                        type='default'
                    >
                        Назад
                    </Button>
                </Col>
                <Col offset={1} span={15}>
                    <Button loading={loading} form={current} type='primary' className='mr-4 w-full' htmlType='submit'>
                        {index === 2 ? 'Создать объявление' : 'Перейти к следующему шагу'}
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

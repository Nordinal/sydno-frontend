'use client';
import { Button, Col, Row, Steps } from 'antd';
import CreateAdStepOne from './StepOne/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateAdStepTwo from './StepTwo/ui';
import CreateAdStepThree from './StepThree/ui';

export type onFinishStep = ({
    type,
    data
}: {
    type: 'StepOne' | 'StepTwo' | 'StepThree'
    data: object
}) => void

export default function CreateAd() {
    const [current, setCurrent] = useState(0);
    const router = useRouter();

    const onFinishStep: onFinishStep = ({
        type,
        data
    }) => {
        console.log(data);
        if(current < 2) setCurrent((current) => ++current);
        else router.push('/profile')
    };

    const onBack = () => {
        if(current >= 1) setCurrent((current) => --current);
    }

    return (
        <div>
            <Steps
                style={{
                    marginBottom: '48px'
                }}
                current={current}
                items={[
                    {
                        title: 'Основная информация',
                    },
                    {
                        title: 'Юридическая информация',
                    },
                    {
                        title: 'Техническая информация'
                    },
                ]}
            />
            <div className={current !== 0 ? 'hidden' : ''}><CreateAdStepOne onFinish={onFinishStep}/></div>
            <div className={current !== 1 ? 'hidden' : ''}><CreateAdStepTwo onFinish={onFinishStep}/></div>
            <div className={current !== 2 ? 'hidden' : ''}><CreateAdStepThree onFinish={onFinishStep}/></div>
            <Row>
                <Col span={6}>
                    <Button disabled={current === 0} onClick={onBack} className='mr-4 w-full' type="default">
                        Назад
                    </Button>
                </Col>
                <Col offset={1} span={15}>
                    <Button form='create-ad' type="primary" className='mr-4 w-full' htmlType="submit">
                        {current === 2 ? 'Создать объявление' : 'Перейти к следующему шагу'}
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
'use client';
import { Button, Col, Modal, Row, Steps } from 'antd';
import CreateAdStepOne from './StepOne/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateAdStepTwo from './StepTwo/ui';
import CreateAdStepThree from './StepThree/ui';
import { ICreateAdStepOne, ICreateAdStepThree, ICreateAdStepTwo, useCreateAd } from '@/entities/createAd/model';
import { useShallow } from 'zustand/react/shallow';

export type onFinishStep = ({
    type,
    data
}: {
    type: 'StepOne' | 'StepTwo' | 'StepThree'
    data: object
}) => void

export default function CreateAd() {
    const { createStepOne, createStepTwo, createStepThree } = useCreateAd(useShallow(state => ({createStepOne: state.createStepOne, createStepTwo: state.createStepTwo, createStepThree: state.createStepThree})))
    const steps: ['StepOne', 'StepTwo', 'StepThree'] = ['StepOne', 'StepTwo', 'StepThree']
    const [current, setCurrent] = useState<'StepOne' | 'StepTwo' | 'StepThree'>('StepOne');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const index = steps.indexOf(current);

    const openErrorModal = () => {
        Modal.error({
            title: 'Произошла какая-то ошибка',
            okText: 'Продолжить',
        });
    }

    const onFinishStep: onFinishStep = async ({
        type,
        data
    }) => {
        let done = false;

        setLoading(true);

        if(type === 'StepOne') {
            done = await createStepOne(data as ICreateAdStepOne);
        }

        if(type === 'StepTwo') {
            done = await createStepTwo(data as ICreateAdStepTwo);
        }

        if(type === 'StepThree') {
            done = await createStepThree(data as ICreateAdStepThree);
        }

        setLoading(false);

        if(!done) {
            openErrorModal()
            return;
        }

        const index = steps.indexOf(type);
        if(index < 2) setCurrent(steps[index + 1]);
        else router.push('/profile')
    };

    const onBack = () => {
        const index = steps.indexOf(current);
        if(index >= 1) setCurrent(steps[index - 1]);
    }

    return (
        <div>
            <Steps
                style={{
                    marginBottom: '48px'
                }}
                current={index}
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
            {
                index === 0
                    ? <CreateAdStepOne onFinish={onFinishStep}/>
                    : index === 1
                        ? <CreateAdStepTwo onFinish={onFinishStep}/>
                        : index === 2
                            ? <CreateAdStepThree onFinish={onFinishStep}/>
                            : null
            }
            <Row>
                <Col span={6}>
                    <Button loading={loading} disabled={index === 0} onClick={onBack} className='mr-4 w-full' type="default">
                        Назад
                    </Button>
                </Col>
                <Col offset={1} span={15}>
                    <Button loading={loading} form={current} type="primary" className='mr-4 w-full' htmlType="submit">
                        {index === 2 ? 'Создать объявление' : 'Перейти к следующему шагу'}
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
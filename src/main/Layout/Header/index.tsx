'use client';
import {useState} from 'react';
import { Layout, Button, Typography, Modal, Form, Input, Tabs, Checkbox  } from "antd";
import Link from "next/link";
import { SingButton } from '@/features/SingButton';
import { useUser } from '@/entities/user/model';
import { useShallow } from 'zustand/react/shallow';
import { ProfileButton } from '@/features/ProfileButton';

export const Header = () => {
    const { auth } = useUser(useShallow(state => ({auth: state.auth})));

    return (
        <Layout.Header className="flex justify-between items-center" style={{height: '48px', lineHeight: '48px'}}>
            <Link href={'/'}>
                <Typography.Title
                    style={{
                        color: 'white',
                        margin: 0
                    }}
                    level={4}
                >
                    Судно
                </Typography.Title>
            </Link>
            <div className='flex justify-between items-center'>
                {auth !== null && <div className={auth ? 'mr-4' : ''}>{auth ? <ProfileButton /> : <SingButton /> }</div>}
                <Link href={'/create-ad'}><Button type='primary'>Разместить объявление</Button></Link>
            </div>
        </Layout.Header>
    );
}
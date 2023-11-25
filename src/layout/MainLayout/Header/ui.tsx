'use client';
import { Button, Typography } from "antd";
import Link from "next/link";
import { SingButton } from '@/entities/user/ui/SingButton';
import { useUser } from '@/entities/user/model';
import { useShallow } from 'zustand/react/shallow';
import { ProfileButton } from '@/features/ProfileButton';
import { LoadingOutlined } from '@ant-design/icons';
import Image from 'next/image';
import './styles.css';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const dontShowCreateAdUrls = ['/create-ad'];

export const Header = () => {
    const { auth } = useUser(useShallow(state => ({auth: state.auth})));
    const [showCreateAdButton, setShowCreateAdButton] = useState<boolean>(true);
    const pathname = usePathname();

    useEffect(() => {
        if(dontShowCreateAdUrls.includes(pathname)) setShowCreateAdButton(false);
        else setShowCreateAdButton(true);
    }, [pathname]);

    return (
        <div className="sudno-Header">
            <div className='sudno-container flex justify-between items-center' style={{margin: '0 auto'}}>
                <div>
                    <Link href={'/'}>
                        <div className='flex items-center'>
                            <Image className='mr-2' src={'/min-logo.svg'}  width={28} height={28} alt='Судно логотип'/>
                            <Typography.Title level={4} style={{marginBottom: 0, color: 'white'}}>Sydno</Typography.Title >
                        </div>
                    </Link>
                </div>
                <div className='flex justify-between items-center'>
                    {auth !== null 
                        ? <div className={auth ? 'mr-4' : ''}>{auth ? <ProfileButton /> : <SingButton /> }</div>
                        : <LoadingOutlined className="mr-4" style={{color: '#fff', fontSize: '18px'}}/>
                    }
                    {
                        showCreateAdButton &&
                        <Link href={'/create-ad'}><Button type='primary'>Разместить объявление</Button></Link>
                    }
                </div>
            </div>
        </div>
    );
}
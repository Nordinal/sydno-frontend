import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MouseEvent, useEffect, useState } from 'react';
import { sydnoServiceJson } from 'SydnoService/service';
import { IUserService } from 'Users/shared/types';
import { useRouter } from 'next/navigation';
import s from './_UserButton.module.css';

type TUserButton = {
    id?: number;
    src?: string;
    name?: string;
    advertCount?: number;
};

type TUserButtonProps = TUserButton & {
    className?: string;
};

export const UserButton = ({ id, src, name, advertCount, className }: TUserButtonProps) => {
    const [user, setUser] = useState<TUserButton>({});
    useEffect(() => {
        if (id && !name) {
            sydnoServiceJson.get<IUserService>('/api/user/' + id).then(({ data }) =>
                setUser({
                    advertCount: data.adverts_count,
                    src: data.avatar,
                    name: data.name,
                    id
                })
            );
        }
        return () => {
            setUser({});
        };
    }, [id]);

    return (
        <UserButtonUi
            advertCount={advertCount ?? user.advertCount}
            id={id ?? user.id}
            name={name ?? user.name}
            src={src ?? user.src}
            className={className}
        />
    );
};

const getDeclination = (number: number, one: string, two: string, five: string) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
};

const UserButtonUi = ({ id, src, name, advertCount, className }: TUserButtonProps) => {
    const router = useRouter();

    const advertCountLocale = getDeclination(advertCount || 0, 'объявление', 'объявления', 'объявлений');

    const handleClick = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        event.stopPropagation();
        router.push('/users/' + id);
    };

    if (typeof name !== 'string') return null;

    return (
        <div className={'inline-block' + (` ${className}` || '')}>
            <div
                className={`flex ${name.length >= 26 ? `items-start` : `items-center`} ` + s['user-button__person']}
                onClick={handleClick}
            >
                <div className='mr-2'>
                    <Avatar src={src} icon={<UserOutlined />} />
                </div>
                <div className={`${name.length > 100 ? 'truncate' : ''}`}>
                    <Typography.Text className={s['user-button__name']} title={name}>
                        {name}
                    </Typography.Text>
                </div>
            </div>
            {advertCount && (
                <div className='mt-2'>
                    <Typography.Text>
                        {advertCount} {advertCountLocale}
                    </Typography.Text>
                </div>
            )}
        </div>
    );
};

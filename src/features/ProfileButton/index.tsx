import { useUser } from "@/entities/user/model";
import { Avatar, Dropdown, MenuProps, Typography } from "antd";
import { useShallow } from "zustand/react/shallow";
import { UserOutlined } from '@ant-design/icons';


export const ProfileButton = () => {
    const { name, logout } = useUser(useShallow(state => ({name: state.name, logout: state.logout})));

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Мои объявления'
        },
        {
            key: '2',
            label: 'Что-то другое'
        },
        {
            key: '3',
            label: 'Выйти',
            danger: true,
            onClick: () => {
                logout();
            }
        }
    ];

    return (
        <Dropdown menu={{ items }} className="cursor-pointer">
            <div className="flex items-center">
                <Avatar size="small" icon={<UserOutlined />}/>
                <Typography.Text strong style={{color: 'white'}} className="ml-2">{name}</Typography.Text>
            </div>
        </Dropdown>
    );
}
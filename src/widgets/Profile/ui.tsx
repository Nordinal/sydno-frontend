'use client';
import { Tabs, Typography } from "antd";

export const Profile = () => {
    
    return (
        <div>
            <Typography.Title level={2}>Мои объявления</Typography.Title>
            <Tabs
                defaultActiveKey="1"
                items={[
                {
                    label: 
                        <Typography.Text className="text-xl">
                            Активные <span className="font-bold">0</span>
                        </Typography.Text>,
                    key: '1',
                    children: `Активные`,
                },
                {
                    label:
                        <Typography.Text className="text-xl">
                            Архив <span className="font-bold">0</span>
                        </Typography.Text>,
                    key: '2',
                    children: `Архив`,
                },
                {
                    label:
                        <Typography.Text className="text-xl">
                            Черновики <span className="font-bold">0</span>
                        </Typography.Text>,
                    key: '3',
                    children: `черновики`,
                },
                ]}
            />
        </div>
    )
}
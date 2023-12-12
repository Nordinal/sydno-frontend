'use client';
import { IInfoMyAdverts, useMyAdverts } from "@/entities/myAdverts/model";
import { Tabs, Typography } from "antd";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { MyDrafts } from "./MyAdverts/MyDrafts/ui";

export const Profile = () => {
    const { info, getInfo } = useMyAdverts(useShallow(state => ({info: state.info, getInfo: state.getInfo})));

    const getItems = (info: Partial<IInfoMyAdverts>) => {
        const items = [];
        if(info.active) {
            items.push({
                label: <TabLabel label='Активные' count={info.active}/>,
                key: '1',
                children: `Активные`,
            })
        }
        if(info.moderation) {
            items.push({
                label: <TabLabel label='На проверке' count={info.moderation}/>,
                key: '1',
                children: `Активные`,
            })
        }
        if(info.draft) {
            items.push({
                label: <TabLabel label='Черновики' count={info.draft}/>,
                key: '1',
                children: <MyDrafts />,
            })
        }
        if(info.inactive) {
            items.push({
                label: <TabLabel label='Архив' count={info.inactive}/>,
                key: '1',
                children: `Активные`,
            })
        }
        return items
    }

    useEffect(() => {
        getInfo();
    }, []);

    const items = getItems(info);
    
    return (
        <div>
            <Typography.Title level={2}>Мои объявления</Typography.Title>
            <Tabs
                defaultActiveKey="1"
                items={items}
            />
        </div>
    )
}

const TabLabel = ({label, count}: {label: string, count: number}) => {
    return (
        <Typography.Text className="text-xl">
            {label} <span className="font-bold opacity-30">{count}</span>
        </Typography.Text>
    )
}
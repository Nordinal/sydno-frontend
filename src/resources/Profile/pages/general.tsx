'use client';
import { Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { MyDrafts } from "../widgets/MyAdverts/MyDrafts";
import { MyModeration } from "../widgets/MyAdverts/MyModeration";
import { sydnoServiceJson } from "SydnoService/service";
import { MyActive } from "Profile/widgets/MyAdverts/MyActive";
import { MyInactive } from "Profile/widgets/MyAdverts/MyInactive";

export interface IInfoMyAdverts {
    active: number,
    draft: number,
    inactive: number,
    moderation: number
}

export const Profile = () => {
    const [ info, setInfo ] = useState<Partial<IInfoMyAdverts>>();
    const getItems = (info: Partial<IInfoMyAdverts>) => {
        const items = [];
        if(info.active) {
            items.push({
                label: <TabLabel label='Активные' count={info.active}/>,
                key: '1',
                children: <MyActive />,
            })
        }
        if(info.moderation) {
            items.push({
                label: <TabLabel label='На проверке' count={info.moderation}/>,
                key: '2',
                children: <MyModeration />,
            })
        }
        if(info.draft) {
            items.push({
                label: <TabLabel label='Черновики' count={info.draft}/>,
                key: '3',
                children: <MyDrafts />,
            })
        }
        if(info.inactive) {
            items.push({
                label: <TabLabel label='Архив' count={info.inactive}/>,
                key: '4',
                children: <MyInactive />,
            })
        }
        return items
    }

    useEffect(() => {
        sydnoServiceJson.get('/api/advertsinfo').then(res => setInfo(res.data))
    }, []);
    
    if(!info) return null;
    return (
        <div>
            <Typography.Title level={2}>Мои объявления</Typography.Title>
            <Tabs
                defaultActiveKey="1"
                items={getItems(info)}
            />
        </div>
    )
}

const TabLabel = ({label, count}: {label: string, count: number}) => {
    return (
        <Typography.Text style={{fontSize: 18}}>
            {label} <span className="font-bold opacity-30">{count}</span>
        </Typography.Text>
    )
}
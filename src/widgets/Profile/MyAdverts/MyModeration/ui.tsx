import { AdvertCard } from "@/entities/advert";
import { IAdvertCard } from "@/entities/advert/ui/AdvertCard";
import { useCreateAd } from "@/entities/createAd/model";
import { useMyAdverts } from "@/entities/myAdverts/model";
import { BasicList } from "@/shared/ui/BasicList";
import { Button, Col, List } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";


export const MyModeration = () => {
    const router = useRouter();

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    }

    return (
        <BasicList
            action="/api/myadverts/moderation"
            renderItem={(item: IAdvertCard) => {
                return (
                    <AdvertCard
                        key={item.id}
                        {...item}
                        size="small"
                        onClick={() => onAdvertCardClick(item.id)}
                    />
                );
            }}
        />
    );
}

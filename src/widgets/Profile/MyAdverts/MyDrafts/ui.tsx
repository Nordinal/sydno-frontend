import { useCreateAd } from "@/entities/createAd/model";
import { useMyAdverts } from "@/entities/myAdverts/model";
import { BasicList } from "@/shared/ui/BasicList";
import { Button, List } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";


export const MyDrafts = () => {
    const {setInstance} = useCreateAd(useShallow(state => ({setInstance: state.setInstance})));
    const [page, setPage] = useState(2);
    const router = useRouter();
    
    const continueEditing = (item: object) => {
        setInstance(item);
        router.push('/create-ad');
    }


    return (
        <BasicList
            action="/api/myadverts/draft"
            // filters={{
            //     page
            // }}
            // pagination={{
            //     onChange: (page) => {
            //         setPage(page);
            //     }
            // }}
            renderItem={(item: {id: number, header: string}) => {
                return (
                    <List.Item key={item.id}>
                        {item.header || 'Без названия'}
                        <Button onClick={(e) => continueEditing(item)}>Продолжить создание</Button>
                    </List.Item>
                )
            }}
        />
    );
}

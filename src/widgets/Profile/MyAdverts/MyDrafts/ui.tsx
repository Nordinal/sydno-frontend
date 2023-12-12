import { useCreateAd } from "@/entities/createAd/model";
import { useMyAdverts } from "@/entities/myAdverts/model";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";


export const MyDrafts = () => {
    const {getMyDrafts} = useMyAdverts(useShallow((state) => ({getMyDrafts: state.getMyDrafts})));
    const {setInstance} = useCreateAd(useShallow(state => ({setInstance: state.setInstance})))
    const [data, setData] = useState<object[] | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        getMyDrafts().then(res => setData(res))
    }, []);

    const continueEditing = (item: object) => {
        setInstance(item);
        router.push('/create-ad');
    }


    if(!data) return <div>Загрузка...</div>
    return (
        <div>
            {
                data.data.length && data.data.map((item) => {
                    return (
                        <div key={item.id}>
                            {item.header || 'Без названия'}
                            <Button onClick={(e) => continueEditing(item)}>Продолжить редактирование</Button>
                        </div>
                    )
                })
            }
        </div>
    );
}
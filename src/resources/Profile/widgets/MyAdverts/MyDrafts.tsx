// import { useCreateAd } from "@/entities/createAd/model";
import { BasicList } from "SydnoComponents/lists";
import { Button, List } from "antd";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";


export const MyDrafts = () => {
    // const {setInstance} = useCreateAd(useShallow(state => ({setInstance: state.setInstance})));
    const router = useRouter();
    
    const continueEditing = (item: object) => {
        // setInstance(item);
        router.push('/create');
    }


    return (
        <BasicList
            action="/api/myadverts/draft"
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

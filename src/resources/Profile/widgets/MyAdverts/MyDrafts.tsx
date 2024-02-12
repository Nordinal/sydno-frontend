// import { useCreateAd } from "@/entities/createAd/model";
import { BaseAdvertCard, IAdvertCard } from "Advert/widgets";
import { BasicList } from "SydnoComponents/lists";
import { Button, List } from "antd";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";


export const MyDrafts = () => {
    const router = useRouter();
    
    const continueEditing = (id: number) => {
        router.push(`/create/sale?id=${id}`);
    }

    return (
        <BasicList
            action="/api/myadverts/draft"
            renderItem={(item: IAdvertCard) => {
                return (
                    <BaseAdvertCard
                        key={item.id}
                        {...item}
                        isDraft={true}
                        disableNumberButton={true}
                        onClick={() => continueEditing(item.id)}
                    />
                )
            }}
        />
    );
}

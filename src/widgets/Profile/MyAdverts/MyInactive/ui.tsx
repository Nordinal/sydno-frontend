import { AdvertCard } from "@/entities/advert";
import { IAdvertCard } from "@/entities/advert/ui/AdvertCard";
import { BasicList } from "@/shared/ui/BasicList";
import { useRouter } from "next/navigation";


export const MyInactive = () => {
    const router = useRouter();

    const onAdvertCardClick = (id: number) => {
        router.push('/advert/' + id);
    }

    return (
        <BasicList
            action="/api/myadverts/inactive"
            renderItem={(item: IAdvertCard) => {
                return (
                    <AdvertCard
                        key={item.id}
                        {...item}
                        onClick={() => onAdvertCardClick(item.id)}
                    />
                );
            }}
        />
    );
}

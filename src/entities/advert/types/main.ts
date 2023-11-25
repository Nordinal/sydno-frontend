export interface IAdvertListItem {
    id: number;
    images: string[];
    title: string;
    price: number;
    tags: string[];
    phone: string;
    addres: string;
    isFavorite?: boolean;
}
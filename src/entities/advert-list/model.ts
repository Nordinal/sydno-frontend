import { create } from "zustand";
import { fetchAdvertList, addAdvertToFavorites } from "./api";

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

export interface IAdvertListModel {
    advertList: IAdvertListItem[];
    isLoading: boolean;
    loadError: boolean;
    getAdvertList: () => void;
    addToFavorites: (id: number) => void;
}

export const useAdvertList = create<IAdvertListModel>((set, get) => ({
    advertList: [],
    isLoading: false,
    loadError: false,
    getAdvertList: () => {
        set({
            isLoading: true,
            loadError: false,
        });
        fetchAdvertList().then(data => {
            set({
                advertList: data as IAdvertListItem[],
                isLoading: false,
                loadError: false,
            });
        }).catch(() => {
            set({
                isLoading: false,
                loadError: true,
            });
        });
    },
    addToFavorites: (id: number) => {
        addAdvertToFavorites().then(() => {
            const newAdvertList = get().advertList.map((item) => {
                if (id === item.id) {
                    item.isFavorite = true;
                }
                return item;
            });
            set({
                advertList: newAdvertList as IAdvertListItem[],
            });
        });
    }
}));

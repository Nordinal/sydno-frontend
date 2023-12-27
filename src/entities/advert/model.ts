import { create } from "zustand";
import { IAdvertListItem } from "./types/main";
import { instanceApi } from '@/shared/configs/instanceAxios';

export interface IAdvertModel {
    getAdvert: (id: number | string) => Promise<IAdvertListItem | false>;
    addToFavourite: (id: number | string) => Promise<boolean>;
    deleteFromFavourite: (id: number | string) => Promise<boolean>;
}

export const useAdvert = create<IAdvertModel>(() => ({
    getAdvert: async (id) => {
        try {
            const data = await instanceApi.get('/api/adverts/' + id);
            return data.data;
        } catch {
            return false;
        }
    },
    addToFavourite: async (id) => {
        try {
            const data = await instanceApi.get('/api/add_to_fav/' + id);
            return data.statusText === 'OK'
        } catch {
            return false;
        }
    },
    deleteFromFavourite: async (id) => {
        try {
            const data = await instanceApi.get('/api/delete_from_fav/' + id);
            return data.statusText === 'OK'
        } catch {
            return false;
        }
    }
}));

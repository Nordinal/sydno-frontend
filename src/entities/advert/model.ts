import { create } from "zustand";
import { IAdvertListItem } from "./types/main";
import { instanceApi } from '@/shared/configs/instanceAxios';

export interface IAdvertModel {
    getAdvert: (id: number) => Promise<IAdvertListItem | false>;
}

export const useAdvert = create<IAdvertModel>(() => ({
    getAdvert: async (id: number) => {
        try {
            const data = await instanceApi.get('/api/adverts/' + id);
            return data.data;
        } catch {
            return false;
        }
    }
}));

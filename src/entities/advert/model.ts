import { create } from "zustand";
import { addAdvertToFavorites, getAdvertById } from "./api";
import { TFilterOptions } from "./types/filterTypes";
import { IAdvertListItem } from "./types/main";
import convertObjectToPathname from "@/shared/helpers/convertObjectToPathname";
import { instanceApi } from '@/shared/configs/instanceAxios';

export interface IAdvertModel {
    getAdvertList: (options: TFilterOptions) => Promise<IAdvertListItem[]>;
    addToFavorites: (id: number) => Promise<boolean>;
    getAdvert: (id: number) => Promise<IAdvertListItem | undefined>;
}

export const useAdvert = create<IAdvertModel>(() => ({
    getAdvertList: async (options: TFilterOptions) => {
        try {
            const searchString = convertObjectToPathname(options);
            const res = await instanceApi.get('/api/alladverts?' + searchString);

            return res.data.data as IAdvertListItem[];
        } catch {
            return [];
        }
    },
    addToFavorites: async (id: number): Promise<boolean> => {
        return await addAdvertToFavorites(id);
    },
    getAdvert: async (id: number) => {
        return await getAdvertById(id);
    }
}));

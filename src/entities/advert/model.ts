import { create } from "zustand";
import { fetchAdvertList, addAdvertToFavorites } from "./api";
import { TFilterOptions } from "./types/filterTypes";
import { IAdvertListItem } from "./types/main";

export interface IAdvertModel {
    getAdvertList: (options: TFilterOptions) => Promise<IAdvertListItem[]>;
    addToFavorites: (id: number) => Promise<boolean>;
}

export const useAdvert = create<IAdvertModel>(() => ({
    getAdvertList: (options: TFilterOptions) => {
        return fetchAdvertList(options);
    },
    addToFavorites: (id: number): Promise<boolean> => {
        return addAdvertToFavorites(id);
    }
}));

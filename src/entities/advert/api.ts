import { instanceApi } from '@/shared/configs/instanceAxios';
import { IAdvertListItem } from './types/main';
import { TFilterOptions } from "./types/filterTypes";
import testData from './testData';

export const fetchAdvertList = async (searchString: string): Promise<IAdvertListItem[]> => {
    try {
        const adverts = await instanceApi.get('/api/alladverts?' + searchString);
        return adverts.data as IAdvertListItem[];
    } catch {
        return [];
    }
}

export const addAdvertToFavorites = (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        });
    });
}

export const getAdvertById = (id: number): Promise<IAdvertListItem | undefined> => {
    return new Promise((resolve) => {
        const advert = testData.find(item => item.id === id);
        setTimeout(() => {
            resolve(advert);
        }, 100);
    });
}

// import { instanceApi } from '@/shared/configs/instanceAxios';
import { IAdvertListItem } from './types/main';
import { TFilterOptions } from "./types/filterTypes";
import testData from './testData';

export const fetchAdvertList = (config: TFilterOptions): Promise<IAdvertListItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(testData);
        });
    });
}

export const addAdvertToFavorites = (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        });
    });
}

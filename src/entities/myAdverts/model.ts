import { instanceApi } from '@/shared/configs/instanceAxios';
import { AxiosError } from 'axios';
import { create } from 'zustand';

export interface IInfoMyAdverts {
    active: number,
    draft: number,
    inactive: number,
    moderation: number
}

export interface IMyAdvertsData {
    error: AxiosError | null
    info: Partial<IInfoMyAdverts>
};

export interface IMyAdvertsModel extends IMyAdvertsData {
    getInfo: () => Promise<boolean>;
    getMyDrafts: (page?: number) => Promise<object>;
};

const initState: IMyAdvertsData = {
    error: null,
    info: {}
}

export const useMyAdverts = create<IMyAdvertsModel>((set, get) => ({
    ...initState,
    getInfo: async () => {
        try {
            const res = await instanceApi.get('/api/advertsinfo');
            set({
                info: res.data
            });
            return true;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false;
        }
    },
    getMyDrafts: async (page) => {
        try {
            const res = await instanceApi.get(`/api/myadverts/draft${page ? '?page=' + page : ''}`);
            return res.data;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return {};
        }
    }
}));
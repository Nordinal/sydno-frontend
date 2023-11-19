import { instanceApi, instanceApiFormData } from '@/shared/configs/instanceAxios';
import { Axios, AxiosError } from 'axios';
import { create } from 'zustand';

export interface ICreateAdStepOne {
    header: string;
    price: number;
    description: string;
    registration_number: string;
    phone: string;
    images: File[];
}

export interface ICreateAdData {
    error: AxiosError | null,
    substitution?: {
        email: string;
        phone: string;
    }
};

export interface ICreateAdModel extends ICreateAdData {

};

const initState: ICreateAdData = {
    error: null,
}

export const useUser = create<ICreateAdModel>((set, get) => ({
    ...initState,
    create: async () => {
        try {
            const substitution = await instanceApi.get('/api/adverts/create');
            set({
                substitution: substitution.data
            })
            return true;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false;
        }
    },
    createStepOne: async (payload) => {
        try {

        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false;
        }
    }
}));
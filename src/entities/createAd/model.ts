import { instanceApi, instanceApiFormData } from '@/shared/configs/instanceAxios';
import { UploadFile } from 'antd';
import { Axios, AxiosError } from 'axios';
import { create } from 'zustand';

export interface ICreateAdStepOne {
    header: string;
    price: number;
    description: string;
    registration_number: string;
    phone_number: string;
    images: UploadFile<any>[];
}

export interface IInstanceCreateAd extends Partial<ICreateAdStepOne> {
    id?: number
}

export interface ICreateAdData {
    error: AxiosError | null,
    instance: IInstanceCreateAd
};

export interface ICreateAdModel extends ICreateAdData {
    createStepOne: (payload: ICreateAdStepOne) => Promise<boolean>
};

const initState: ICreateAdData = {
    error: null,
    instance: {}
}

export const useCreateAd = create<ICreateAdModel>((set, get) => ({
    ...initState,
    createStepOne: async (payload) => {
        try {
            const id = get().instance.id;
            const formData = new FormData();
            if(id) {
                formData.append('id', id.toString());
            }
            formData.append('header', payload.header);
            formData.append('description', payload.description);
            formData.append('phone_number', payload.phone_number);
            formData.append('price', payload.price.toString());
            formData.append('registration_number', payload.registration_number);
            payload.images.forEach(image => {
                formData.append('images[]', image.originFileObj as Blob);
            })
            const result = await instanceApiFormData.post('/api/adverts', formData);
            set({
                instance: {
                    ...get().instance,
                    ...result.data
                }
            })
            return true;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false;
        }
    }
}));
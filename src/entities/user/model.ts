import { instanceApi } from '@/shared/configs/instanceAxios';
import { AxiosError } from 'axios';
import { create } from 'zustand';

export interface IUserModel {
    auth: boolean | null;
    name: string;
    error: AxiosError | null;
    fetch: () => void;
    login: (values: {email: string, pass: string, remember: boolean}) => void;
    registration: (values: {email: string, name: string, pass: string, confirmationPass: string}) => void;
    logout: () => void;
    resetError: () => void;
};

export const useUser = create<IUserModel>((set) => ({
    auth: null,
    name: '',
    error: null,
    fetch: async () => {
        try {
            const user = await instanceApi.get<{name: string}>('/api/user');
            set({
                name: user.data.name,
                auth: true
            })
        }
        catch (e) {
            set({
                auth: false
            })
        }
    },
    login: async (values) => {
        try {
            await instanceApi.post('/api/login', {
                email: values.email,
                password: values.pass,
                remember: values.remember
            });
            location.reload();
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
        }
    },
    registration: async (values) => {
        try {
            await instanceApi.post('/api/register', {
                name: values.name,
                email: values.email,
                password: values.pass,
                password_confirmation: values.confirmationPass
            });
            location.reload();
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
        }
    },
    logout: async () => {
        try {
            await instanceApi.post('/api/logout');
            location.reload();
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
        }
    },
    resetError: () => {
        set({
            error: null
        })
    }
}));
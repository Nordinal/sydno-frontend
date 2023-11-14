import { instanceApi } from '@/shared/configs/instanceAxios';
import { AxiosError } from 'axios';
import { create } from 'zustand';

export interface IUserModel {
    auth: boolean | null;
    name: string;
    error: AxiosError | null;
    instance: object;
    registrationStatus: boolean | null;
    fetch: () => void;
    login: (values: {email: string, pass: string, remember: boolean}) => Promise<void>;
    registration: (values: {email: string, name: string, pass: string, confirmationPass: string}) => Promise<void>;
    logout: () => Promise<void>;
    resetError: () => void;
    verify: (payload: {
        id: string;
        hash: string;
        expires: string;
        signature: string;
    }) => Promise<boolean>;
};

export const useUser = create<IUserModel>((set) => ({
    auth: null,
    name: '',
    instance: {},
    error: null,
    registrationStatus: null,
    fetch: async () => {
        try {
            const user = await instanceApi.get<{name: string}>('/api/user');
            set({
                name: user.data.name,
                instance: user.data,
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
            const user = await instanceApi.get<{name: string}>('/api/user');
            set({
                name: user.data.name,
                instance: user.data,
                auth: true,
                registrationStatus: true
            })
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
    verify: async (payload) => {
        try {
            await instanceApi.get(`/api/email/verify/${payload.id}/${payload.hash}?expires=${payload.expires}&signature=${payload.signature}`);
            const user = await instanceApi.get<{name: string}>('/api/user');
            set({
                name: user.data.name,
                instance: user.data,
                auth: true
            })
            return true;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false;
        }
    },
    resetError: () => {
        set({
            error: null
        })
    }
}));
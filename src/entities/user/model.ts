import { instanceApi, instanceApiFormData } from '@/shared/configs/instanceAxios';
import { RcFile } from 'antd/lib/upload';
import { AxiosError } from 'axios';
import { create } from 'zustand';

export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    phone_number: number | string;
    avatar: string;
}

export interface IUserData {
    auth: boolean | null;
    error: AxiosError | null;
    instance: IUser | null;
    registrationStatus: boolean | null;
}

export interface IUserModel extends IUserData {
    hasUser: () => boolean;
    fetch: () => void;
    login: (values: {email: string, pass: string, remember: boolean}) => Promise<void>;
    registration: (values: {email: string, name: string, pass: string, confirmationPass: string}) => Promise<boolean>;
    logout: () => Promise<void>;
    resetError: () => void;
    verify: (payload: {
        id: string;
        hash: string;
        expires: string;
        signature: string;
    }) => Promise<boolean>;
    forgotPassword: (payload: {email: string}) => Promise<boolean>;
    sendVerifyMail: () => Promise<boolean>;
    resetPassword: (payload: {
        email?: string,
        token?: string,
        password: string,
        password_confirmation: string,
        current_password?: string
    }) => Promise<boolean>
    updateProfileInfo: (payload: {
        phone_number: string;
        name: string;
    }) => Promise<boolean>
    updateAvatar: (payload: string | RcFile | Blob) => Promise<boolean>
    deleteAvatar: () => Promise<boolean>
};

const initState: IUserData = {
    auth: null,
    instance: null,
    error: null,
    registrationStatus: null,
}

export const useUser = create<IUserModel>((set, get) => ({
    ...initState,
    fetch: async () => {
        try {
            const user =  await instanceApi.get<IUser>('/api/user');
            set({
                instance: user.data,
                auth: true
            })
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            set({
                auth: false
            });
        }
    },
    hasUser: () => {
        return !!get().instance
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
            set({
                auth: false
            });
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
            const user = await instanceApi.get<IUser>('/api/user');
            set({
                instance: user.data,
                auth: true,
                registrationStatus: true
            });
            return true;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false;
        }
    },
    logout: async () => {
        try {
            await instanceApi.post('/api/logout');

            set(initState, true);
            location.reload();
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
        }
    },
    verify: async (payload) => {
        try {
            await instanceApi.get(`/api/email/verify/${payload.id}/${payload.hash}?expires=${payload.expires}&signature=${payload.signature}`);
            const user = await instanceApi.get<IUser>('/api/user');
            set({
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
    sendVerifyMail: async () => {
        try {
            await instanceApi.post('/api/email/verification-notification');
            return true;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false
        }
    },
    updateProfileInfo: async (payload) => {
        try {
            await instanceApi.put(
                `/api/user/profile-information?phone_number=${payload.phone_number}&name=${payload.name}`
            );
            const user =  await instanceApi.get<IUser>('/api/user');
            set({
                instance: user.data
            })
            return true;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false;
        }
    },
    updateAvatar: async (payload) => {
        try {
            const formData = new FormData();
            formData.append('avatar_image', payload);
            await instanceApiFormData.post('/api/user/avatar', formData);
            const user =  await instanceApi.get<IUser>('/api/user');
            set({
                instance: user.data
            })
            return true;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false;
        }
    },
    deleteAvatar: async () => {
        try {
            await instanceApi.delete('/api/user/avatar');
            const user =  await instanceApi.get<IUser>('/api/user');
            set({
                instance: user.data
            })
            return true;
        }
        catch {
            return false;
        }
    },
    forgotPassword: async (payload) => {
        try {
            await instanceApi.post('/api/forgot-password', {email: payload.email});
            return true;
        }
        catch (e) {
            if(e instanceof AxiosError) set({error: e});
            return false;
        }
    },
    resetPassword: async (payload) => {
        try {
            if(payload.current_password) await instanceApi.put(
                `/api/user/password?current_password=${payload.current_password}&password=${payload.password}&password_confirmation=${payload.password_confirmation}`
            );
            else await instanceApi.post('/api/reset-password', {...payload});
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
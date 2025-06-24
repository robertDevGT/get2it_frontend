import { create } from "zustand";
import { LoginType } from "./types/authTypes";
import { isAxiosError } from "axios";
import api from "./lib/axios";

interface Store {
    authenticate: (formData: LoginType) => Promise<string>;
    logout: () => void;
    logedIn: boolean;
}

export const useStore = create<Store>((set, get) => ({
    logedIn: localStorage.getItem('AUTH_TOKEN') ? true : false,
    authenticate: async (formData) => {
        try {
            const url = '/auth/login';
            const { data } = await api.post<string>(url, formData);

            localStorage.setItem('AUTH_TOKEN', data);
            set(({
                logedIn: true
            }));
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.data?.error) {
                    throw new Error(error.response.data.error);
                } else {
                    throw new Error("Unknown Axios error");
                }
            }
            throw new Error("Unknown error");
        }
    },
    logout: () => {
        localStorage.removeItem('AUTH_TOKEN');
        set(({
            logedIn: false
        }));
    }
}));
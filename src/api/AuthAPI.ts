import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Auth, LoginType, Token } from "types/authTypes";

export async function createAccount(formData: Auth) {
    try {
        const url = '/auth/create-account';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function confirmAccount(token: Token['token']) {
    try {
        const url = '/auth/confirm-account';
        const { data } = await api.post<string>(url, {
            token
        })

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}
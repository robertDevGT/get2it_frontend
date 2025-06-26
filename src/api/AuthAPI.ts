import api from "@/lib/axios";
import { userSchema } from "@/schemas/authSchemas";
import { isAxiosError } from "axios";
import { Auth, Token, User } from "types/authTypes";

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

export async function getUser() {
    try {
        const { data } = await api<User>('/auth/user');
        const response = userSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function changeProfilePic(img: File) {
    try {
        const url = '/auth/user';
        const formData = new FormData();
        formData.append("img", img);

        const { data } = await api.patch(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
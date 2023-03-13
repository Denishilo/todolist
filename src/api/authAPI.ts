import {instance, ResponseType} from "./todolistAPI";
import {AxiosResponse} from "axios";


export const authAPI = {
    login(data: AuthRequestType) {
        return instance.post<AuthRequestType, AxiosResponse<ResponseType<{ id: string }>>>('/auth/login', data)
    },
    authMe() {
        return instance.get<ResponseType<AuthMeResponseType>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
    }
}

//////////// types ////////////////

export type AuthRequestType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
}

type AuthMeResponseType = {
    id: number,
    email: string,
    login: string,
}

export enum ResponseResultCode {
    OK = 0,
    ERROR = 1,
}
import {instance, ResponseType} from "./todolistApi";
import {AxiosResponse} from "axios";

export type authRequestType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
}
type authMeResponseType = {
    id: number,
    email: string,
    login: string,
}
export const authAPI = {
    login(data: authRequestType) {
        return instance.post<authRequestType, AxiosResponse<ResponseType<{ id: string }>>>('/auth/login', data)
    },
    authMe() {
        return instance.get<ResponseType<authMeResponseType>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
    }
}
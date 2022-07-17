import axios from 'axios';
import { ProfileType } from '../types/types';

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '12f1a78a-f3ec-4484-83ce-a3a099252e56'
    }
})

export let usersAPI = {
    requestUsers(currentPage: number, pageSize: number) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
        );
    }
}

export let followAPI = {
    postFollow(userId: number) {
        return (
            instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
        );
    },
    deleteUnfollow(userId: number) {
        return (
            instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
        );
    }
}

export let profileAPI = {
    getProfile(userId: number) {
        return (
            instance.get(`profile/`+ userId)
            .then(response => {
                return response.data;
            })
        );
    },
    getStatus(userId: number) {
        return (
            instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            })
        );
    },
    putStatus(status: string) {
        return (
            instance.put(`profile/status/`, {status})
            .then(response => {
                return response.data;
            })
        );
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return (
            instance.put(`profile/photo`, formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            })
            .then(response => {
                return response.data;
            })
        );
    },
    saveProfile(profile: ProfileType) {
        return (
            instance.put(`profile`, profile)
            .then(response => {
                return response.data;
            })
        );
    }
}

type AuthAPIMeType = {
    data: {
        id: number,
        email: string,
        login: string
    }
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

type AuthAPILoginType = {
    resultCode: ResultCodesEnum,
    messages: Array<string>,
    data: {
        userId: number
    }
}

export let authAPI = {
    getAuthMe() {
        return (
            instance.get<AuthAPIMeType>(`auth/me`)
            .then(response => {
                return response.data;
            })
        );
    },
    postAuthLogin(email: string, password: number, rememberMe = false, captcha: null | string = null) {
        return (
            instance.post<AuthAPILoginType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            })
        );
    },
    deleteAuthLogout() {
        return (
            instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            })
        );
    }
}

export let securityAPI = {
    getCaptchaUrl() {
        return (
            instance.get(`security/get-captcha-url`)
            .then(response => {
                return response.data;
            })
        );
    }
}
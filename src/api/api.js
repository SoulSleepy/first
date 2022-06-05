import * as axios from 'axios';


let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '12f1a78a-f3ec-4484-83ce-a3a099252e56'
    }
})

export let usersAPI = {
    requestUsers(currentPage, pageSize) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
        );
    }
}

export let followAPI = {
    postFollow(userId) {
        return (
            instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
        );
    },
    deleteUnfollow(userId) {
        return (
            instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
        );
    }
}

export let profileAPI = {
    getProfile(userId) {
        return (
            instance.get(`profile/`+ userId)
            .then(response => {
                return response.data;
            })
        );
    },
    getStatus(userId) {
        return (
            instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            })
        );
    },
    putStatus(status) {
        return (
            instance.put(`profile/status/`, {status})
            .then(response => {
                return response.data;
            })
        );
    }
}

export let authAPI = {
    getAuthMe() {
        return (
            instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
        );
    },
    postAuthLogin(email, password, rememberMe = false) {
        return (
            instance.post(`auth/login`, {email, password, rememberMe})
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
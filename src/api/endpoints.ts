import { API_BASE_URL } from '../config/environment';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface REST_API {
    METHOD: HttpMethod;
    URL: any;
}

interface Endpoints {
    AUTH: {
        LOGIN: REST_API;
        LOGOUT: REST_API;
        SEND_JOIN_MAIL: REST_API;
        SEND_PASSWORD_MAIL: REST_API;
        VALIDATE_CODE: REST_API;
        WHO_AM_I: REST_API;
    };

    USER: {
        VALIDATE_NICKNAME: REST_API;
        JOIN: REST_API;
        GET_DETAILS: REST_API;
        UPDATE: REST_API;
        WITHDRAW: REST_API;
        SEARCH: REST_API;
        FOLLOW: REST_API;
        UNFOLLOW: REST_API;
        GET_FOLLOWERS: REST_API;
        GET_FOLLOWINGS: REST_API;
        RESET_PASSWORD: REST_API;
    };

    SINGLE_WORK: {
        WRITE: REST_API;
        GET_DETAILS: REST_API;
        UPDATE: REST_API;
        REMOVE: REST_API;
        SEARCH: REST_API;
        GET_POPULAR: REST_API;
        LIKE: REST_API;
        UNLIKE: REST_API;
        WRITE_COMMENT: REST_API;
        UPDATE_COMMENT: REST_API;
        REMOVE_COMMENT: REST_API;
        GET_COMMENT_PAGE: REST_API;
        GET_LIKE: REST_API;
        GET_MINE: REST_API;
    };

    EXHIBITION: {
        WRITE: REST_API;
        GET_DETAILS: REST_API;
        REMOVE: REST_API;
        SEARCH: REST_API;
        LIKE: REST_API;
        UNLIKE: REST_API;
        BOOKMARK: REST_API;
        UNBOOKMARK: REST_API;
        GET_BOOKMARK: REST_API;
        WRITE_COMMENT: REST_API;
        UPDATE_COMMENT: REST_API;
        REMOVE_COMMENT: REST_API;
        GET_COMMENT_PAGE: REST_API;
        GET_LIKE: REST_API;
        GET_MINE: REST_API;
    }

    CHAT: {
        CONNECTION: REST_API;
        SUB: (id: number) => string;
        PUB: (id: number) => string;
    };

    NOTIFICATION: {
        CONNECTION: (id: number) => string;
        GET_PAGE: REST_API;
        REMOVE: REST_API;
        MARK: REST_API;
        MARK_ALL: REST_API;
        COUNT_UNREAD: REST_API;
    };

}

// API VERSION
const PRERIX = '/api/v1';

// DOMAIN
const AUTH = `${API_BASE_URL}${PRERIX}/auth`;
const USER = `${API_BASE_URL}${PRERIX}/users`;
const SINGLE_WORK = `${API_BASE_URL}${PRERIX}/singleworks`;
const EXHIBITION = `${API_BASE_URL}${PRERIX}/exhibitions`;
const CHAT = `${API_BASE_URL}${PRERIX}/chats/connection`;

// ENDPOINT
const ENDPOINTS: Endpoints = {
    // auth API
    AUTH: {
        LOGIN: {
            METHOD: 'POST',
            URL: (auto: boolean) => `${AUTH}/login?auto=${auto}`
        },
        LOGOUT: {
            METHOD: 'POST',
            URL: `${AUTH}/logout`
        },
        SEND_JOIN_MAIL: {
            METHOD: 'POST',
            URL: `${AUTH}/mail/join`,
        },
        SEND_PASSWORD_MAIL: {
            METHOD: 'POST',
            URL: `${AUTH}/mail/password`,
        },
        VALIDATE_CODE: {
            METHOD: 'POST',
            URL: `${AUTH}/code`,
        },
        WHO_AM_I: {
            METHOD: 'GET',
            URL: `${AUTH}/me`,
        }
    },

    // user API
    USER: {
        VALIDATE_NICKNAME: {
            METHOD: 'GET',
            URL: (nickname: string) => `${USER}/nickname?nickname=${nickname}`,
        },
        JOIN: {
            METHOD: 'POST',
            URL: USER
        },
        GET_DETAILS: {
            METHOD: 'GET',
            URL: (id: number, requestUserId: number) => `${USER}/${id}?requestUserId=${requestUserId}`
        },
        UPDATE: {
            METHOD: 'PATCH',
            URL: (id: number) => `${USER}/${id}`
        },
        WITHDRAW: {
            METHOD: 'DELETE',
            URL: (id: number) => `${USER}/${id}`
        },
        SEARCH: {
            METHOD: 'GET',
            URL: (keyword: string, sort: string, page: number, size: number, userId: number) =>
                `${USER}?keyword=${keyword}&sort=${sort}&page=${page}&size=${size}&userId=${userId}`
        },
        FOLLOW: {
            METHOD: 'POST',
            URL: (id: number) => `${USER}/${id}/follows`
        },
        UNFOLLOW: {
            METHOD: 'DELETE',
            URL: (id: number) => `${USER}/${id}/follows`
        },
        GET_FOLLOWERS: {
            METHOD: 'GET',
            URL: (id: number) => `${USER}/${id}/follower`,
        },
        GET_FOLLOWINGS: {
            METHOD: 'GET',
            URL: (id: number) => `${USER}/${id}/following`,
        },
        RESET_PASSWORD: {
            METHOD: 'PATCH',
            URL: `${USER}/password`,
        }
    },

    // singlework API
    SINGLE_WORK: {
        WRITE: {
            METHOD: 'POST',
            URL: SINGLE_WORK
        },
        GET_DETAILS: {
            METHOD: 'GET',
            URL: (id: number, requestUserId: number) => `${SINGLE_WORK}/${id}?userId=${requestUserId}`,
        },
        UPDATE: {
            METHOD: 'PATCH',
            URL: (id: number) => `${SINGLE_WORK}/${id}`,
        },
        REMOVE: {
            METHOD: 'DELETE',
            URL: (id: number) => `${SINGLE_WORK}/${id}`,
        },
        SEARCH: {
            METHOD: 'GET',
            URL: (target: string, keywords: string, categories: string, sort: string, page: number, size: number, userId: number) =>
                `${SINGLE_WORK}?target=${target}&keywords=${keywords}&categories=${categories}&sort=${sort}&page=${page}&size=${size}&userId=${userId}`
        },
        GET_POPULAR: {
            METHOD: 'GET',
            URL: (id: number) => `${SINGLE_WORK}/popular?userId=${id}`,
        },
        LIKE: {
            METHOD: 'POST',
            URL: (id: number) => `${SINGLE_WORK}/${id}/like`,
        },
        UNLIKE: {
            METHOD: 'DELETE',
            URL: (id: number) => `${SINGLE_WORK}/${id}/like`,
        },
        WRITE_COMMENT: {
            METHOD: 'POST',
            URL: (id: number) => `${SINGLE_WORK}/${id}/comments`,
        },
        UPDATE_COMMENT: {
            METHOD: 'PATCH',
            URL: (id: number, commentId: number) => `${SINGLE_WORK}/${id}/comments/${commentId}`,
        },
        REMOVE_COMMENT: {
            METHOD: 'DELETE',
            URL: (id: number, commentId: number) => `${SINGLE_WORK}/${id}/comments/${commentId}`,
        },
        GET_COMMENT_PAGE: {
            METHOD: 'GET',
            URL: (id: number, sort: string, page: number, size: number) => `${SINGLE_WORK}/${id}/comments?sort=${sort}&page=${page}&size=${size}`,
        },
        GET_LIKE: {
            METHOD: 'GET',
            URL: (userId: number, sort: string, page: number, size: number) =>
                `${SINGLE_WORK}/like?userId=${userId}&sort=${sort}&page=${page}&size=${size}`,
        },
        GET_MINE: {
            METHOD: 'GET',
            URL: (userId: number, sort: string, page: number, size: number) =>
                `${SINGLE_WORK}/me?userId=${userId}&sort=${sort}&page=${page}&size=${size}`,
        },
    },

    // exhibition API
    EXHIBITION: {
        WRITE: {
            METHOD: 'POST',
            URL: EXHIBITION
        },
        GET_DETAILS: {
            METHOD: 'GET',
            URL: (id: number, requestUserId: number) => `${EXHIBITION}/${id}?userId=${requestUserId}`,
        },
        REMOVE: {
            METHOD: 'DELETE',
            URL: (id: number) => `${EXHIBITION}/${id}`,
        },
        SEARCH: {
            METHOD: 'GET',
            URL: (target: string, keywords: string, sort: string, page: number, size: number, userId: number) =>
                `${EXHIBITION}?target=${target}&keywords=${keywords}&sort=${sort}&page=${page}&size=${size}&userId=${userId}`
        },
        LIKE: {
            METHOD: 'POST',
            URL: (id: number) => `${EXHIBITION}/${id}/like`,
        },
        UNLIKE: {
            METHOD: 'DELETE',
            URL: (id: number) => `${EXHIBITION}/${id}/like`,
        },
        BOOKMARK: {
            METHOD: 'POST',
            URL: (id: number) => `${EXHIBITION}/${id}/bookmark`,
        },
        UNBOOKMARK: {
            METHOD: 'DELETE',
            URL: (id: number) => `${EXHIBITION}/${id}/bookmark`,
        },
        GET_BOOKMARK: {
            METHOD: 'GET',
            URL: (userId: number, sort: string, page: number, size: number) =>
                `${EXHIBITION}/bookmark?userId=${userId}&sort=${sort}&page=${page}&size=${size}`,
        },
        WRITE_COMMENT: {
            METHOD: 'POST',
            URL: (id: number) => `${EXHIBITION}/${id}/comments`,
        },
        UPDATE_COMMENT: {
            METHOD: 'PATCH',
            URL: (id: number, commentId: number) => `${EXHIBITION}/${id}/comments/${commentId}`,
        },
        REMOVE_COMMENT: {
            METHOD: 'DELETE',
            URL: (id: number, commentId: number) => `${EXHIBITION}/${id}/comments/${commentId}`,
        },
        GET_COMMENT_PAGE: {
            METHOD: 'GET',
            URL: (id: number, sort: string, page: number, size: number) => `${EXHIBITION}/${id}/comments?sort=${sort}&page=${page}&size=${size}`,
        },
        GET_LIKE: {
            METHOD: 'GET',
            URL: (userId: number, sort: string, page: number, size: number) =>
                `${EXHIBITION}/like?userId=${userId}&sort=${sort}&page=${page}&size=${size}`,
        },
        GET_MINE: {
            METHOD: 'GET',
            URL: (userId: number, sort: string, page: number, size: number) =>
                `${EXHIBITION}/me?userId=${userId}&sort=${sort}&page=${page}&size=${size}`,
        },
    },

    // chat API
    CHAT: {
        CONNECTION: {
            METHOD: 'GET',
            URL: CHAT,
        },
        SUB: (id: number) => `/sub/${id}`,
        PUB: (id: number) => `/pub/${id}`,
    },

    // notification API
    NOTIFICATION: {
        CONNECTION: (id: number) => `${USER}/${id}/notifications/subscribe`,
        GET_PAGE: {
            METHOD: 'GET',
            URL: (id: number, page: number, size: number) => `${USER}/${id}/notifications?page=${page}&size=${size}`,
        },
        REMOVE: {
            METHOD: 'DELETE',
            URL: (id: number, notificationId: number) => `${USER}/${id}/notifications/${notificationId}`,
        },
        MARK: {
            METHOD: 'PATCH',
            URL: (id: number, notificationId: number) => `${USER}/${id}/notifications/${notificationId}`,
        },
        MARK_ALL: {
            METHOD: 'PATCH',
            URL: (id: number) => `${USER}/${id}/notifications`,
        },
        COUNT_UNREAD: {
            METHOD: 'GET',
            URL: (id: number) => `${USER}/${id}/notifications/unread`,
        },
    },
};

export default ENDPOINTS;
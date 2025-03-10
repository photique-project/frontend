interface Endpoints {
    PRERIX: string;
    LIKE: string;
    BOOKMARK: string;
    COMMENT: string;
    AUTH: {
        SEND_MAIL: string;
        VALIDATE_CODE: string;
        LOGIN: string;
        LOGOUT: string;
        GET_USER_ID: string;
    };
    USER: {
        VALIDATE_NICKNAME: string;
        DEFAULT: string;
        FOLLOW: string;
    };
    NOTIFICATION: {
        CONNECTION: string;
    };
    CHAT: {
        CONNECTION: string;
        SUB: string;
        PUB: string;
    };
    SINGLE_WORK: {
        POPULAR: string;
        SEARCH: string;
        LIKE: String;
        COMMENT: string;
    };
    EXHIBITION: {
        DOMAIN: string;
    }
}


const ENDPOINTS: Endpoints = {
    PRERIX: '/api/v1',
    LIKE: '/like',
    BOOKMARK: '/bookmark',
    COMMENT: '/comments',
    AUTH: {
        SEND_MAIL: '/api/v1/auth/mail/join',
        VALIDATE_CODE: '/api/v1/auth/code',
        LOGIN: '/api/v1/auth/login',
        LOGOUT: '/api/v1/auth/logout',
        GET_USER_ID: '/api/v1/auth/me'
    },
    USER: {
        VALIDATE_NICKNAME: '/api/v1/users/nickname',
        DEFAULT: '/api/v1/users',
        FOLLOW: '/follows',
    },
    NOTIFICATION: {
        CONNECTION: '/notifications/subscribe'
    },
    CHAT: {
        CONNECTION: '/api/v1/chats/connection',
        SUB: '/sub',
        PUB: '/pub',
    },
    SINGLE_WORK: {
        POPULAR: '/api/v1/singleworks/popular',
        SEARCH: '/api/v1/singleworks',
        LIKE: '/like',
        COMMENT: '/comments',
    },
    EXHIBITION: {
        DOMAIN: '/exhibitions'
    }
};

export default ENDPOINTS;
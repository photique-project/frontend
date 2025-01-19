interface Endpoints {
    AUTH: {
        SEND_MAIL: string;
        VALIDATE_CODE: string;
        VALIDATE_NICKNAME: string;
        LOGIN: string;
        LOGOUT: string;
    };
    USER: {
        DEFAULT: string;
        GET_USER_ID: string;
    };
}


const ENDPOINTS: Endpoints = {
    AUTH: {
        SEND_MAIL: '/api/v1/auth/mail',
        VALIDATE_CODE: '/api/v1/auth/code',
        VALIDATE_NICKNAME: '/api/v1/auth/nickname',
        LOGIN: '/api/v1/auth/login',
        LOGOUT: '/api/v1/auth/logout',
    },
    USER: {
        DEFAULT: '/api/v1/users',
        GET_USER_ID: '/api/v1/users/id',
    }
};

export default ENDPOINTS;
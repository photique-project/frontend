const ENDPOINTS = {
    AUTH: {
        SEND_MAIL: '/api/v1/auth/mail',
        VALIDATE_CODE: '/api/v1/auth/code',
        VALIDATE_NICKNAME: '/api/v1/auth/nickname',
    },
    USER: {
        DEFAULT: '/api/v1/users',
    }
};

export default ENDPOINTS;
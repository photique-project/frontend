import { createStore } from "zustand";
import { persist } from 'zustand/middleware';
import { API_BASE_URL } from '../config/environment';
import ENDPOINTS from '../api/endpoints';

type AuthStore = {
    isLoggedIn: boolean; // 해당값 조회로 로그인 유지
    login: () => void; // 매 페이지 마다 유저아이디 조회 시도
    logout: () => void; // 저장된 유저아이디 삭제
    userId: number | null;
    isComplete: boolean;
};

const useAuthStore = createStore(
    persist<AuthStore>(
        (set) => ({
            isLoggedIn: false,
            isComplete: false,

            login: async () => {
                const requestOptions: RequestInit = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                };

                await fetch(`${API_BASE_URL}${ENDPOINTS.USER.GET_USER_ID}`, requestOptions)
                    .then(async (response) => {
                        if (response.ok) {
                            const responseData = await response.json()

                            set({
                                isLoggedIn: true,
                                userId: responseData.data.id,
                                isComplete: true
                            })

                            return;
                        }

                        set({
                            isLoggedIn: false,
                            userId: null,
                            isComplete: true
                        })


                    });
            },

            logout: () =>
                set({
                    isLoggedIn: false,
                    userId: null,
                }),
            userId: null,
        }),
        {
            name: "userIdStorage",
        }
    )
);

export default useAuthStore;
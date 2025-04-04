import { createStore } from "zustand";
import { persist } from 'zustand/middleware';
import ENDPOINTS from '../api/endpoints';

interface User {
    id: number | null;
    email: string | null;
    nickname: string | null;
    profileImage: string | null;
    introduction: string | null;
    singleWork: number | null;
    exhibition: number | null;
    follower: number | null;
    following: number | null;
    createdAt: string | null;
}

type AuthStore = {
    isLoggedIn: boolean; // 로그인 상태
    isComplete: boolean; // 로그인 상태 체크 완료 여부
    login: () => void; // 로그인 함수
    logout: () => void; // 로그아웃 함수
    userId: number | null;
    user: User;
};


const useAuthStore = createStore(
    persist<AuthStore>(
        (set, get) => ({
            isLoggedIn: false,
            isComplete: false,
            userId: null,
            user: {
                id: null,
                email: null,
                nickname: null,
                profileImage: null,
                introduction: null,
                singleWork: null,
                exhibition: null,
                follower: null,
                following: null,
                createdAt: null
            },

            login: async () => {
                const method = ENDPOINTS.AUTH.WHO_AM_I.METHOD;
                const url = ENDPOINTS.AUTH.WHO_AM_I.URL;

                const requestOptions: RequestInit = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                };

                try {
                    const response = await fetch(url, requestOptions);

                    if (response.ok) {
                        const responseData = await response.json();

                        set(() => ({
                            userId: responseData.data.id,
                        }));

                        const userResponse = await fetch(ENDPOINTS.USER.GET_DETAILS.URL(responseData.data.id, 0), requestOptions);

                        if (userResponse.ok) {
                            const responseData = await userResponse.json();

                            set(() => ({
                                user: {
                                    id: responseData.data.id,
                                    email: responseData.data.email,
                                    nickname: responseData.data.nickname,
                                    profileImage: responseData.data.profileImage,
                                    introduction: responseData.data.introduction,
                                    singleWork: responseData.data.singleWork,
                                    exhibition: responseData.data.exhibition,
                                    follower: responseData.data.follower,
                                    following: responseData.data.following,
                                    createdAt: responseData.data.createdAt
                                },
                                isComplete: true,
                                isLoggedIn: true,
                            }));

                            return;
                        } else {
                            set(() => ({
                                user: {
                                    id: null,
                                    email: null,
                                    nickname: null,
                                    profileImage: null,
                                    introduction: null,
                                    singleWork: null,
                                    exhibition: null,
                                    follower: null,
                                    following: null,
                                    createdAt: null,
                                },
                                isComplete: true,
                                isLoggedIn: false,
                            }));
                        }

                        return;
                    }

                    set({
                        isLoggedIn: false,
                        isComplete: true,
                        userId: null,
                        user: {
                            id: null,
                            email: null,
                            nickname: null,
                            profileImage: null,
                            introduction: null,
                            singleWork: null,
                            exhibition: null,
                            follower: null,
                            following: null,
                            createdAt: null
                        }
                    });

                } catch (error) {
                    console.error("Login error:", error);
                    set({
                        isLoggedIn: false,
                        isComplete: true,
                        userId: null,
                        user: {
                            id: null,
                            email: null,
                            nickname: null,
                            profileImage: null,
                            introduction: null,
                            singleWork: null,
                            exhibition: null,
                            follower: null,
                            following: null,
                            createdAt: null
                        }
                    });
                }
            },

            logout: () => set({
                isComplete: false,
                isLoggedIn: false,
                userId: null,
                user: {
                    id: null,
                    email: null,
                    nickname: null,
                    profileImage: null,
                    introduction: null,
                    singleWork: null,
                    exhibition: null,
                    follower: null,
                    following: null,
                    createdAt: null
                }
            }),
        }),
        {
            name: "userIdStorage",
        }
    )
);

export default useAuthStore;

import { useState } from 'react';
import { FetchRequestOptions } from '../types/http';

interface UseFetchReturn<T> {
    loading: boolean;
    statusCode: number | null;
    data: T | null;
    fetchRequest: (options: FetchRequestOptions) => Promise<void>;
}

const useFetch = <T = unknown>(): UseFetchReturn<T> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const [data, setData] = useState<T | null>(null);

    const fetchRequest = async (options: FetchRequestOptions) => {
        const { url, method, headers = {}, credentials, contentType, body = null } = options;

        setLoading(true);
        setStatusCode(null);
        setData(null);

        try {
            const requestOptions: RequestInit = {
                method: method,
                headers: {
                    ...headers,
                },
                credentials: credentials,
            };

            if (contentType === 'application/json' && body) {
                requestOptions.body = JSON.stringify(body);
            }

            if (contentType === 'multipart/form-data' && body instanceof FormData) {
                requestOptions.body = body;
            }

            const response = await fetch(url, requestOptions);
            setStatusCode(response.status);

            if (response.ok) {
                const responseData: { data: T } | null = response.status === 200 ? await response.json() : null;
                setData(responseData.data);

            } else {
                const error = await response.json();
                console.log(error.message)
            }

        } catch (err) {
            // console.log((err as Error).message)
        } finally {
            setLoading(false);
        }
    }

    return { loading, statusCode, data, fetchRequest };
};

export default useFetch;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';


export function useApi(baseUrl: string) {
    const request = useCallback(async <T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        const response = await fetch(`${baseUrl}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        if (!response.ok){
            const error = await response.text();
            throw new Error(error || 'API request failed');
        }
        return response.json();
    }, [baseUrl]);

    const get = useCallback(<T>(endpoint: string) => {
        return request<T>(endpoint, { method: "GET" });
    }, [request]);

    const post = useCallback(<T>(endpoint: string, body?: any) => {
        return request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        });
    }, [request]);

    const put = useCallback(<T>(endpoint: string, body?: any) => {
        return request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    }, [request]);

    const del = useCallback(<T>(endpoint: string) => {
        return request<T>(endpoint, { method: "DELETE" });
    }, [request]);
    
    return { request, get, post, put, del };
}
import { useApi } from "../../../hooks/useApi";
import type { UrlListResponse } from "../types/url.types";



export function useUrlList() {
    const baseUrl = import.meta.env.API_URL as string;
    const { get } = useApi(baseUrl);

    return {
        fetchUrls: (page: number, pageSize: number) => 
            get<{ urls: UrlListResponse, total_pages: number }>(`/urls?page=${page}&page_size=${pageSize}`),
    }
}
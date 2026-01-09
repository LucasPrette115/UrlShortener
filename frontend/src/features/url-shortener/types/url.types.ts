



export interface UrlListRequest {
    page: number;
    page_size: number;
}

export interface UrlListResponse {
    urls: Array<UrlItem>;
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
}

export interface UrlItem {
    short_code: string;
    original_url: string;
    created_at: string;
    clicks: number;
}
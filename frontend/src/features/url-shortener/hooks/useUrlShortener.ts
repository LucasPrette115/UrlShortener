import { useApi } from "../../../hooks/useApi";




export function useUrlShortener() {
    const baseUrl = import.meta.env.VITE_API_URL as string;
    const { post } = useApi(baseUrl);

    return {
        shortenUrl: (url: string) => 
            post<{ short: string }>("shorten", { url }),
    }
}
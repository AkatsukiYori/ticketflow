import { useCallback } from "react"
import api from "../api/axios"
import type { AxiosRequestConfig } from "axios";

export const useApi = () => {
    const callApi = useCallback(async (method: string, url: string, data?: any, config?: AxiosRequestConfig) => {
        try {
            const response = await api({ method, url, data, ...config });
            return response.data;
        } catch (error: any) {
            // const message = error.response?.data?.message || "Terjadi kesalahan pada server.";
            // Notifications({ message: message, variantType: "error" });
            throw error;
        }
    }, []);

    return { callApi };
}
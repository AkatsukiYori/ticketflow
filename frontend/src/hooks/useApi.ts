import { useCallback } from "react"
import api from "../api/axios"

export const useApi = () => {
    const callApi = useCallback(async (method: string, url: string, data?: any) => {
        try {
            const response = await api({ method, url, data });
            return response.data;
        } catch (error: any) {
            // const message = error.response?.data?.message || "Terjadi kesalahan pada server.";
            // Notifications({ message: message, variantType: "error" });
            throw error;
        }
    }, []);

    return { callApi };
}
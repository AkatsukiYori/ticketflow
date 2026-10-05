import axios from "axios";

const API = import.meta.env.VITE_API_URL;
export const AdminLogin = async (username: string, password: string) => {
    try {
        return await axios.post(`${API}/auth/login`, {username, password});
    } catch (error: any) {
        if(error.response) {
            return error.response.data;
        }
        return { message: "Koneksi ke server terputus." };
    }
}

import axios from "axios";

const API = "http://localhost:3000/api/auth/login";
export const AdminLogin = async (username: string, password: string) => {
    try {
        return await axios.post(`${API}`, {username, password});
    } catch (error: any) {
        if(error.response) {
            return error.response.data;
        }
        return { message: "Koneksi ke server terputus." };
    }
}

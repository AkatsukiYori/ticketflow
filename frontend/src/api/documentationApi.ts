import axios from "axios";

const API = "http://localhost:3000/api/documentation";

export const getDocumentation = () => {
    return axios.get(`${API}/get-all-documentation`);
}

export const createDocumentation = (data: any) => {
    return axios.post(`${API}/new-documentation`, data);
}

export const updateDocumentation = (id: number, data: any) => {
    return axios.put(`${API}/update-documentation/${id}`, data);
}

export const deleteDocumentation = (id: number) => {
    return axios.delete(`${API}/delete-documentation/${id}`);
}
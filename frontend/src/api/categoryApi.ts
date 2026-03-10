import axios from "axios";

const API = "http://localhost:3000/api/categories";

export const getCategories = () => {
    return axios.get(`${API}/get-all-categories`);
}

export const createCategories = (data: any) => {
    return axios.post(`${API}/new-categories`, data);
}

export const updateCategories = (id: number, data: any) => {
    return axios.put(`${API}/update-categories/${id}`, data);
}

export const deleteCategories = (id: number) => {
    return axios.delete(`${API}/delete-categories/${id}`);
}
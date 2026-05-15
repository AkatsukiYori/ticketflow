import axios from "axios";

const API = "/api/categories";

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
    return axios.put(`${API}/delete-categories/${id}`);
}

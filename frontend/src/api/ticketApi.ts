import axios from "axios";

const API = "http://localhost:3000/api/tickets";

export const getTicketById = (id: number) => {
    return axios.get(`${API}/get-ticket/${id}`);
}

export const getTicket = () => {
    return axios.get(`${API}/get-all-ticket`);
}

export const createTicket = (data: any) => {
    return axios.post(`${API}/new-ticket`, data);
}

export const updateTicket = (id: number, data: any) => {
    return axios.put(`${API}/update-ticket/${id}`, data);
}

export const deleteCategories = (id: number) => {
    return axios.delete(`${API}/delete-ticket/${id}`);
}
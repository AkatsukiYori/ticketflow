import * as DAO from "./dao"
import * as KpiDTO from "../../dtos/kpi/kpi_dto";

export const GetAllKpiServices = async () => {
    const data = await DAO.GetAllKpiDAO();
    return data;
}

export const CheckTicketServices = async (user: number, ticketTitle: string) => {
    const data = await DAO.CheckTicketDAO(user, ticketTitle);
    return data;
}

export const CheckTicketHasKpiServices = async (kpiId: number, ticketTitle: string) => {
    const data = await DAO.CheckTicketHasKpiDAO(kpiId, ticketTitle);
    return data;
}

export const RegisterTicketServices = async (tickets: number[], kpi: number, user: number) => {
    await DAO.RegisterTicketDAO(tickets, kpi, user);
    return ({ message: "Ticket successful registered." });
}

export const UnregisterTicketServices = async (kpi_id: number) => {
    await DAO.UnregisterTicketDAO(kpi_id);
    return ({ message: "Ticket successful unregistered." });
}

export const CreateKpiServices = async (data: KpiDTO.CreateKpiInput) => {
    await DAO.CreateKpiDAO(data);
    return ({ message: "KPI point successful created." });
}

export const UpdateKpiServices = async (id: number, data: KpiDTO.UpdateKpiInput) => {
    await DAO.UpdateKpiDAO(id, data);
    return ({ message: "KPI point successful updated." });
}

export const DeleteKpiServices = async (id: number) => {
    await DAO.DeleteKpiDAO(id);
    return ({ message: "KPI point successful deleted." })
}
import * as LogsDAO from "./dao";

export const GetLogsByTicketServices = async (ticketID: number) => {
    try {
        const data = await LogsDAO.GetLogsByTicketDAO(ticketID);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
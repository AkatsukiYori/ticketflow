import { Request, Response } from "express";
import * as Services from "./services";
import * as KpiDTO from "../../dtos/kpi/kpi_dto";

export const GetAllKpiController =  async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllKpiServices();
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const CheckTicketController = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const { ticketTitle } = req.query;

    try {
        const result = await Services.CheckTicketServices(userId, ticketTitle as string);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const CheckTicketHasKpiController = async (req: Request, res: Response) => {
    const kpiId = Number(req.params.kpiId);
    const { ticketTitle } = req.query;
     
    try {
        const result = await Services.CheckTicketHasKpiServices(kpiId, ticketTitle as string)
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const RegisterTicketController = async (req: Request, res: Response) => {
    const { tickets, userId } = req.body;
    const kpi = Number(req.params.kpiId);

    try {
        const result = await Services.RegisterTicketServices(tickets, kpi, userId);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const UnregisterTicketController = async (req: Request, res: Response) => {
    const kpi_id = Number(req.params.kpi_id);
    
    try {
        const result = await Services.UnregisterTicketServices(kpi_id);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const CreateKpiController = async (req: Request, res: Response) => {
    const data = req.body as KpiDTO.CreateKpiInput;

    try {
        const result = await Services.CreateKpiServices(data);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const UpdateKpiController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body as KpiDTO.UpdateKpiInput;

    try {
        const result = await Services.UpdateKpiServices(id, data);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const DeleteKpiController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    
    try {
        const result = await Services.DeleteKpiServices(id);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: "Terjadi kesalahan : " + error.message
        });
    }
}
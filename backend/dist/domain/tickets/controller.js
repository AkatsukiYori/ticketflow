"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignProgrammerController = exports.UpdateStatusPointController = exports.RatingController = exports.ReOpenTicketController = exports.ClosedTicketController = exports.TicketFeedbackController = exports.RejectTicketController = exports.AssignTicketController = exports.DeleteTicketController = exports.UpdateTicketController = exports.CreateTicketController = exports.GetAllIKBTicketController = exports.GetAllTicketLogs = exports.FilterTicketController = exports.GetFeedbackTicketController = exports.GetAllTicketController = exports.GetTicketByIdController = void 0;
const TicketServices = __importStar(require("./services"));
const GetTicketByIdController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await TicketServices.getTicketById(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
};
exports.GetTicketByIdController = GetTicketByIdController;
const GetAllTicketController = async (req, res) => {
    const filter = req.query;
    try {
        const result = await TicketServices.GetAllTicketServices(filter);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
};
exports.GetAllTicketController = GetAllTicketController;
const GetFeedbackTicketController = async (req, res) => {
    const ticketNo = String(req.params.ticket_no);
    try {
        const result = await TicketServices.GetFeecbackTicketServices(ticketNo);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
};
exports.GetFeedbackTicketController = GetFeedbackTicketController;
const FilterTicketController = async (req, res) => {
    const filterData = req.query;
    try {
        const result = await TicketServices.FilterTicketServices(filterData);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong : " + error.message });
    }
};
exports.FilterTicketController = FilterTicketController;
const GetAllTicketLogs = async (req, res) => {
    try {
        const result = await TicketServices.GetAllTicketLogs();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
exports.GetAllTicketLogs = GetAllTicketLogs;
const GetAllIKBTicketController = async (req, res) => {
    try {
        const result = await TicketServices.GetAllIKBTicketServices();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
exports.GetAllIKBTicketController = GetAllIKBTicketController;
const CreateTicketController = async (req, res) => {
    const { attachment, ...datas } = req.body;
    try {
        const { message, ticketNo } = await TicketServices.CreateTicketServices(datas, Number(attachment));
        res.status(201).json({ message, ticketNo });
    }
    catch (error) {
        console.log(error);
        // if(file) {
        //     try {
        //         await unlinkFile(`uploads/tickets/${file.filename}`);
        //     } catch (unlinkError: any) {
        //         res.status(500).json({ message: "Gagal menghapus file : " + unlinkError.message });
        //     }
        // }
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
};
exports.CreateTicketController = CreateTicketController;
const UpdateTicketController = async (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    const file = req.file;
    try {
        const result = await TicketServices.UpdateTicketServices(id, data, file);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
};
exports.UpdateTicketController = UpdateTicketController;
const DeleteTicketController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await TicketServices.DeleteTicketServices(id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
};
exports.DeleteTicketController = DeleteTicketController;
const AssignTicketController = async (req, res) => {
    try {
        const ticketNo = req.params.ticket_no;
        const { user_id, priority, estimate, point_status } = req.body;
        const result = await TicketServices.AssignTicketServices(ticketNo, Number(user_id), priority, estimate, point_status);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong : " + error.messaeg });
    }
};
exports.AssignTicketController = AssignTicketController;
const RejectTicketController = async (req, res) => {
    try {
        const ticketNo = req.params.ticket_no;
        const reason = req.body.reason;
        const result = await TicketServices.RejectTicketServices(ticketNo, reason);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong : " + error.message });
    }
};
exports.RejectTicketController = RejectTicketController;
const TicketFeedbackController = async (req, res) => {
    try {
        const ticketNo = req.params.ticket_no;
        const { role, reason, user_id, make_doc } = req.body;
        const result = await TicketServices.TicketFeedbackServices(ticketNo, reason, role, make_doc, user_id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong : " + error.message });
    }
};
exports.TicketFeedbackController = TicketFeedbackController;
const ClosedTicketController = async (req, res) => {
    try {
        const ticketNo = req.params.ticket_no;
        const result = await TicketServices.ClosedTicketServices(ticketNo);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
};
exports.ClosedTicketController = ClosedTicketController;
const ReOpenTicketController = async (req, res) => {
    try {
        const ticket_no = req.params.ticket_no;
        const result = await TicketServices.ReOpenTicketServices(ticket_no);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
};
exports.ReOpenTicketController = ReOpenTicketController;
const RatingController = async (req, res) => {
    try {
        const ticket_no = req.params.ticket_no;
        const raw_data = req.body;
        const data = { ticket_no: ticket_no, ...raw_data };
        const result = await TicketServices.RatingServices(data);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan : " + error.message });
    }
};
exports.RatingController = RatingController;
const UpdateStatusPointController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const statusPoint = req.body.status_point;
        const result = await TicketServices.UpdateStatusPointServices(id, statusPoint);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong : " + error.message });
    }
};
exports.UpdateStatusPointController = UpdateStatusPointController;
const AssignProgrammerController = async (req, res) => {
    try {
        const ticketNo = req.params.ticket_no;
        const { user_id, programmer } = req.body;
        const result = await TicketServices.AssignProgrammerServices(ticketNo, Number(user_id), programmer);
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong : " + error.message
        });
    }
};
exports.AssignProgrammerController = AssignProgrammerController;
//# sourceMappingURL=controller.js.map
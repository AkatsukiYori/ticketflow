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
exports.AssignProgrammerServices = exports.UpdateStatusPointServices = exports.RatingServices = exports.ReOpenTicketServices = exports.ClosedTicketServices = exports.TicketFeedbackServices = exports.RejectTicketServices = exports.AssignTicketServices = exports.DeleteTicketServices = exports.UpdateTicketServices = exports.CreateTicketServices = exports.GetAllTicketLogs = exports.FilterTicketServices = exports.GetFeecbackTicketServices = exports.GetAllIKBTicketServices = exports.GetAllTicketServices = exports.getTicketById = void 0;
const TicketDAO = __importStar(require("./dao"));
const getTicketById = async (id) => {
    try {
        const data = await TicketDAO.GetTicketById(id);
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getTicketById = getTicketById;
const GetAllTicketServices = async (filter) => {
    try {
        const data = await TicketDAO.GetAllTicketDAO(filter);
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllTicketServices = GetAllTicketServices;
const GetAllIKBTicketServices = async () => {
    try {
        const data = await TicketDAO.GetAllIKBTicketDAO();
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllIKBTicketServices = GetAllIKBTicketServices;
const GetFeecbackTicketServices = async (ticketNo) => {
    try {
        const data = await TicketDAO.GetFeedbackTicketDAO(ticketNo);
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetFeecbackTicketServices = GetFeecbackTicketServices;
const FilterTicketServices = async (filterData) => {
    try {
        const data = await TicketDAO.FilterTicketDAO(filterData);
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.FilterTicketServices = FilterTicketServices;
const GetAllTicketLogs = async () => {
    try {
        return await TicketDAO.GetAllTicketLogs();
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllTicketLogs = GetAllTicketLogs;
const CreateTicketServices = async (data, attachment) => {
    try {
        const res = await TicketDAO.CreateTicketDAO(data, attachment);
        return ({ message: "Ticket berhasil dibuat : ", ticketNo: res.ticketNo, logStat: res.logStatus });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.CreateTicketServices = CreateTicketServices;
const UpdateTicketServices = async (id, data, file) => {
    try {
        const fileData = file ? {
            filename: file.filename,
            file_path: file.path,
            file_size: file.size,
            file_types: file.mimetype
        } : null;
        await TicketDAO.UpdateTicketDAO(data, id, fileData);
        return ({ messange: "Ticket berhasil diubah." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.UpdateTicketServices = UpdateTicketServices;
const DeleteTicketServices = async (id) => {
    try {
        await TicketDAO.DeleteTicketDAO(id);
        return ({ message: "Ticket Successful Removed." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.DeleteTicketServices = DeleteTicketServices;
const AssignTicketServices = async (ticketNo, userId, priority, estimate, point_status) => {
    try {
        await TicketDAO.AssignTicketDAO(ticketNo, userId, priority, point_status, estimate);
        return ({ message: "Ticket Successful Assigned." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.AssignTicketServices = AssignTicketServices;
const RejectTicketServices = async (ticketNo, reason) => {
    try {
        await TicketDAO.RejectTicketDAO(ticketNo, reason);
        return ({ message: "Ticket Successful Rejected." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.RejectTicketServices = RejectTicketServices;
const TicketFeedbackServices = async (ticketNo, reason, role, make_doc, userId) => {
    try {
        await TicketDAO.TicketFeedbackDAO(ticketNo, reason, role, make_doc, userId);
        return ({ message: "Feedback Successful Sent." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.TicketFeedbackServices = TicketFeedbackServices;
const ClosedTicketServices = async (ticketNo) => {
    try {
        await TicketDAO.ClosedTicketDAO(ticketNo);
        return ({ message: "Tiket berhasil ditutup." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.ClosedTicketServices = ClosedTicketServices;
const ReOpenTicketServices = async (ticketNo) => {
    try {
        await TicketDAO.ReOpenTicketDAO(ticketNo);
        return ({ message: "Tiket berhasil dibuka." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.ReOpenTicketServices = ReOpenTicketServices;
const RatingServices = async (data) => {
    try {
        await TicketDAO.RatingDAO(data);
        return ({ message: "Terima kasih atas penilaian anda!" });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.RatingServices = RatingServices;
const UpdateStatusPointServices = async (id, statusPoint) => {
    try {
        await TicketDAO.UpdateStatusPointDAO(id, statusPoint);
        return ({ message: "Ticket Successfully updated." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.UpdateStatusPointServices = UpdateStatusPointServices;
const AssignProgrammerServices = async (ticketNo, userId, programmer) => {
    await TicketDAO.AssignProgrammerDAO(ticketNo, userId, programmer);
    return ({ message: "Programmer Successful Assigned." });
};
exports.AssignProgrammerServices = AssignProgrammerServices;
//# sourceMappingURL=services.js.map
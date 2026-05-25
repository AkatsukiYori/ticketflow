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
exports.DeleteMemberController = exports.UpdateMemberController = exports.CreateMemberController = exports.GetAllMembersController = void 0;
const Services = __importStar(require("./services"));
const GetAllMembersController = async (req, res) => {
    try {
        const result = await Services.GetAllMembersServices();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
};
exports.GetAllMembersController = GetAllMembersController;
const CreateMemberController = async (req, res) => {
    try {
        const data = req.body;
        const result = await Services.CreateMembersServices(data);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
exports.CreateMemberController = CreateMemberController;
const UpdateMemberController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const result = await Services.UpdateMembersServices(data, id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
exports.UpdateMemberController = UpdateMemberController;
const DeleteMemberController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await Services.DeleteMembersServices(id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
exports.DeleteMemberController = DeleteMemberController;
//# sourceMappingURL=controller.js.map
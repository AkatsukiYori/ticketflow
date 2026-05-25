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
exports.DeleteDocumentationController = exports.UpdateDocumentationController = exports.CreateDocumentationController = exports.GetAllDocumentationController = exports.GetDocumentationByIDController = void 0;
const Services = __importStar(require("./services"));
const GetDocumentationByIDController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await Services.GetDocumentationByIdServices(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Somthing went wrong." });
    }
};
exports.GetDocumentationByIDController = GetDocumentationByIDController;
const GetAllDocumentationController = async (req, res) => {
    try {
        const result = await Services.GetAllDocumentationServices();
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Somthing went wrong." });
    }
};
exports.GetAllDocumentationController = GetAllDocumentationController;
const CreateDocumentationController = async (req, res) => {
    const { attachment, ...datas } = req.body;
    const convertAttachment = Number(attachment);
    try {
        const result = await Services.CreateDocumentationServices(datas, convertAttachment);
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        // if(file) {
        //     try {
        //         await unlinkFile(`uploads/documentation/${file.filename}`);
        //     } catch (unlinkError: any) {
        //         res.status(500).json({ message: "Something went wrong while uploading." });
        //     }
        // }
        res.status(500).json({ message: "Something went wrong." });
    }
};
exports.CreateDocumentationController = CreateDocumentationController;
const UpdateDocumentationController = async (req, res) => {
    const id = Number(req.params.id);
    const { attachment, ...datas } = req.body;
    try {
        const result = await Services.UpdateDocumentationServices(id, datas, Number(attachment));
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        // if(file) {
        //     try {
        //         await unlinkFile(`uploads/documentation/${file.filename}`);
        //     } catch (unlinkError: any) {
        //         res.status(500).json({ message: "Something went wrong while uploading." })
        //     }
        // }
        res.status(500).json({ message: "Something went wrong." });
    }
};
exports.UpdateDocumentationController = UpdateDocumentationController;
const DeleteDocumentationController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await Services.DeleteDocumentationServices(id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
exports.DeleteDocumentationController = DeleteDocumentationController;
//# sourceMappingURL=controller.js.map
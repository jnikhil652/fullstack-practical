"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../utils/index");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const employeeRoutes_1 = __importDefault(require("./employeeRoutes"));
const departmentRoutes_1 = __importDefault(require("./departmentRoutes"));
const router = express_1.default.Router();
router.use("/auth", authRoutes_1.default);
router.use("/employee", index_1.middleWare, employeeRoutes_1.default);
router.use("/department", index_1.middleWare, index_1.managerMiddleWare, departmentRoutes_1.default);
exports.default = router;

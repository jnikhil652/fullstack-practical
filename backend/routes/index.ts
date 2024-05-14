import express from "express";
import { managerMiddleWare, middleWare } from "../utils/index";
import authRoutes from "./authRoutes";
import employeeRoutes from "./employeeRoutes";
import departmentRoutes from "./departmentRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/employee", middleWare, employeeRoutes);
router.use("/department", middleWare, managerMiddleWare, departmentRoutes);

export default router;

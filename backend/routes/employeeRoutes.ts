import express from "express";
import EmployeeController from "../controller/employeeController";

const router = express.Router();

router.get("/:id", EmployeeController.get);
router.get("/", EmployeeController.getAll);
router.post("/assign-department", EmployeeController.assign);

export default router;

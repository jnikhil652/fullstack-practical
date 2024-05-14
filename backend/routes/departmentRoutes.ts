import express from "express";
import DepartmentController from "../controller/departmentController";

const router = express.Router();

router.post("/", DepartmentController.add);
router.put("/:id", DepartmentController.edit);
router.delete("/:id", DepartmentController.remove);
router.get("/:id", DepartmentController.get);
router.get("/", DepartmentController.getAll);

// router.us;

export default router;

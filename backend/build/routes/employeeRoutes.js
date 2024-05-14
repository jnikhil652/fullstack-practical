"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = __importDefault(require("../controller/employeeController"));
const router = express_1.default.Router();
router.get("/:id", employeeController_1.default.get);
router.get("/", employeeController_1.default.getAll);
router.post("/assign-department", employeeController_1.default.assign);
exports.default = router;

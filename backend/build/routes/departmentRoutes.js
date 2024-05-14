"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentController_1 = __importDefault(require("../controller/departmentController"));
const router = express_1.default.Router();
router.post("/", departmentController_1.default.add);
router.put("/:id", departmentController_1.default.edit);
router.delete("/:id", departmentController_1.default.remove);
router.get("/:id", departmentController_1.default.get);
router.get("/", departmentController_1.default.getAll);
// router.us;
exports.default = router;

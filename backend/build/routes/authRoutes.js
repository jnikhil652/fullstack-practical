"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controller/authController"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.post("/login", authController_1.default.login);
router.post("/signup", authController_1.default.signup); //
router.get("/me", utils_1.middleWare, authController_1.default.me); //
router.post("/make-manager", utils_1.middleWare, authController_1.default.manager); //
//
exports.default = router;

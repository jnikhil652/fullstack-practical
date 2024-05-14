import express from "express";
import AuthController from "../controller/authController";
import { middleWare } from "../utils";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup); //
router.get("/me", middleWare, AuthController.me); //
router.post("/make-manager", middleWare, AuthController.manager); //
//
export default router;

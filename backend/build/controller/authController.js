"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const md5_1 = __importDefault(require("md5"));
const db_1 = __importDefault(require("../utils/db"));
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield db_1.default.user.findFirst({
                    where: { email, is_delete: 0 },
                });
                if ((0, lodash_1.isEmpty)(user)) {
                    return res.status(401).send({ msg: "User not found" });
                }
                if (user.password !== (0, md5_1.default)(password)) {
                    return res.status(401).send({ msg: "Password or Username incorrect" });
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
                return res.send({ msg: "login successful", token });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log({ body: req.body });
                const { email, password, name } = req.body;
                let newPassword = (0, md5_1.default)(password);
                const user = yield db_1.default.user.create({
                    data: {
                        email,
                        password: newPassword,
                        name,
                    },
                });
                const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET);
                return res.send({ msg: "signup successful", token });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
    static me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const data = yield db_1.default.user.findFirst({
                    where: {
                        id: user.id,
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        type: true,
                        departmentId: true,
                        is_delete: true,
                        department: true,
                    },
                });
                return res.json({ msg: "request successful", data });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
    static manager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const data = yield db_1.default.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        type: "MANAGER",
                    },
                });
                return res.json({ msg: "type changed successfully", data });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
}
exports.default = AuthController;

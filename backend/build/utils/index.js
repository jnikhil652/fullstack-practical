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
exports.managerMiddleWare = exports.middleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("./db"));
const lodash_1 = require("lodash");
const middleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            const data = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = data === null || data === void 0 ? void 0 : data.id;
            next();
        }
        else {
            return res.status(401).send("Unauthorised access");
        }
    }
    catch (error) {
        return res.status(401).send("Unauthorised access");
    }
});
exports.middleWare = middleWare;
const managerMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = req.user;
        const user = yield db_1.default.user.findFirst({
            where: {
                id: userPayload.id,
            },
        });
        if ((0, lodash_1.isEmpty)(user) || user.type !== "MANAGER") {
            return res.status(403).send("Unauthorised access");
        }
        next();
    }
    catch (error) {
        return res.status(403).send("Unauthorised access");
    }
});
exports.managerMiddleWare = managerMiddleWare;

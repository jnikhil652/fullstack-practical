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
const db_1 = __importDefault(require("../utils/db"));
class EmployeeController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield db_1.default.user.findFirst({
                    where: { id: parseInt(id), is_delete: 0 },
                });
                return res.send({ msg: "data retrieved successfully", data: user });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = "0", to = "100", sortBy = "name", order = "asc", } = req.query;
                const users = yield db_1.default.user.findMany({
                    where: { is_delete: 0, type: "EMPLOYEE" },
                    skip: parseInt(limit),
                    take: parseInt(to),
                    orderBy: {
                        [sortBy]: order,
                    },
                });
                return res.send({
                    msg: "all employees retrieved successfully",
                    data: users,
                });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
    static assign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { departmentId, id } = req.body;
                yield db_1.default.user.update({
                    where: { id },
                    data: {
                        departmentId: parseInt(departmentId),
                    },
                });
                return res.send({
                    msg: "department assigned successfully",
                });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
}
exports.default = EmployeeController;

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
class DepartmentController {
    static add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                yield db_1.default.department.create({ data: { name } });
                return res.send({ msg: "department added successfully" });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
    static edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield db_1.default.department.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: req.body,
                });
                return res.send({ msg: "department updated successfully" });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
    static remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield db_1.default.department.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: { is_delete: 1 },
                });
                return res.send({ msg: "department updated successfully" });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let data = db_1.default.department.findFirst({
                    where: { id: parseInt(id), is_delete: 0 },
                });
                return res.send({ msg: "department fetched successfully", data });
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
                let data = yield db_1.default.department.findMany({
                    where: {
                        is_delete: 0,
                    },
                    skip: parseInt(limit),
                    take: parseInt(to),
                    orderBy: {
                        [sortBy]: order,
                    },
                });
                return res.send({ msg: "department updated successfully", data });
            }
            catch (error) {
                console.log("ERROR : ", req.originalUrl, " => ", error);
                return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
            }
        });
    }
}
exports.default = DepartmentController;

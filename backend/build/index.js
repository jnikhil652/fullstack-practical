"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./utils/constants");
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    try {
        return res.send({ msg: "SERVER STARTED" });
    }
    catch (error) {
        console.log("ERROR : ", req.originalUrl, " => ", error);
        return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
});
app.use(constants_1.API_BASE, index_1.default);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Server Started"));

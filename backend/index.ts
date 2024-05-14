import express from "express";
import cors from "cors";
import { API_BASE } from "./utils/constants";
import routes from "./routes/index";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  try {
    return res.send({ msg: "SERVER STARTED" });
  } catch (error) {
    console.log("ERROR : ", req.originalUrl, " => ", error);
    return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
  }
});

app.use(API_BASE, routes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Server Started"));

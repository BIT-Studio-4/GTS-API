import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/api/index.js";

const app = express();

app.use(cors());
app.use(urlencoded({ "extended": false }));
app.use(json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Welcome to the GTS homepage!");
});

app.use("/api", apiRoutes);

app.listen(3000, () => {
    console.log("Server is listening on port 3000.");
});

export default app;
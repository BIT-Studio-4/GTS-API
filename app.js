import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/api/index.js";

const setXContentTypeOptions = (req, res, next) => {
    res.set("x-content-type-options", "nosniff");
    next();
};

const setXFrameOptions = (req, res, next) => {
    res.set("x-frame-options", "deny");
    next();
};
const setContentSecurityPolicy = (req, res, next) => {
    res.set("content-security-policy", "default-src 'none'");
    next();
};

const app = express();

app.use(cors());
app.use(setXContentTypeOptions);
app.use(setXFrameOptions);
app.use(setContentSecurityPolicy);
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
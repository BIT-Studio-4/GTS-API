import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/index.js";
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

app.use(cors()); // Allows non-same URLs to access the API.
app.use(setXContentTypeOptions); // Forces the browser receiving a response to accept the provided type instead of trying to guess the type. E.g., 'application/json'.
app.use(setXFrameOptions); // Prevents browsers from displaying the API in a frame of another site.
app.use(setContentSecurityPolicy); // Prevents the browser from loading resources obtained by untrusted sources.
app.use(urlencoded({ "extended": false })); // Allows info sent in the URL to be read by the API.
app.use(json()); // Allows the API to parse requests as JSON.
app.use(cookieParser()); // Allows cookies to be controlled by the API. Good for Authorization.

app.get("/", (req, res) => {
    res.send("Welcome to the GTS homepage!");
});

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// Starts the API on port 3000. E.g., http://localhost:3000.
app.listen(3000, () => {
    console.log("Server is listening on port 3000.");
});

export default app;
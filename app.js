import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(json());
app.use(urlencoded({ "extended": false }));
app.use(cookieParser());

export default app;
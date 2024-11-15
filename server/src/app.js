import express from "express";
import cors from "cors";
import productRouter from "./routers/product";
import { connectDB } from "./configs/db";
import authRouter from "./routers/auth";
import bidsRouter from "./routers/bids";
import categoriesRouter from "./routers/categories";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", bidsRouter);
app.use("/api", categoriesRouter);
connectDB();
export const viteNodeApp = app;

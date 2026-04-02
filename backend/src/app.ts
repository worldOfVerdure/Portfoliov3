import cors from "cors";
import express from "express";

import { contactRouter } from "./routes/contact.js";
import { healthRouter } from "./routes/health.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/contact", contactRouter);

export { app };

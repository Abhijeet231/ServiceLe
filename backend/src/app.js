import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

// Auth Routes
import authRouter from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRouter)

// User Routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users/me", userRouter);

// Category Routes
import categoryRouter from "./routes/categories.routes.js";
app.use("/api/v1/categories", categoryRouter);

// Service Routes
import serviceRouter from "./routes/services.routes.js";
app.use("/api/v1", serviceRouter);

// Admin Routes
import adminRouter from "./routes/admin.routes.js";
app.use("/api/v1/admin", adminRouter);

// Service Provider Routes
import providerRouter from "./routes/providers.routes.js";
app.use("/api/v1/providers", providerRouter);

export default app;
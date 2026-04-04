import express from "express";
import { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./common/config/env.js";

const createApp = (): Express => {

    const app = express();
    
    app.use(cors(
        {
            origin: env.CORS_ORIGIN,
            credentials: true,
            methods: ['GET','POST','PUT','DELETE'],
            allowedHeaders: ['Content-Type', "Authorization"],
        }
    ))
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(cookieParser())
    // Add a Global Error Handler



    return app;
};

export default createApp;
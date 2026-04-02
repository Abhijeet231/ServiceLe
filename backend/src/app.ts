import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const createApp = () => {

    const app = express();
    
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(cookieParser())



    return app;
};

export default createApp;
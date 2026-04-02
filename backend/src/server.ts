import createApp from "./app.js";
import http from "node:http";
import dotenv from "dotenv/config";
import dbConnect from "./common/config/db.js";

const PORT = process.env.PORT || 3000;


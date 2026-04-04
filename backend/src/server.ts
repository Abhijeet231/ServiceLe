import "dotenv/config";
import createApp from "./app.js";
import http from "node:http";
import dbConnect from "./common/config/db.js";
import { env } from "./common/config/env.js";


const start = async ():Promise<void> => {
    try {
        await dbConnect();

        const app = createApp();
        const server = http.createServer(app);

        server.listen(env.PORT ?? 3000, () => {
            console.log(`Server is running on ${env.PORT}`)
        })
    } catch (error) {
        console.error("Error While creating Server!", error)
        process.exit(1);
    }
}


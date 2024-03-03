import Express from "express";
import http from "http";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = Express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

const server = http.createServer(app);

server.listen(PORT, () => console.log("Server listening on PORT " + PORT));

export default app;

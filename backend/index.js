import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { TodoApi } from "./config/api.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

app.use(TodoApi.baseUrl, todoRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

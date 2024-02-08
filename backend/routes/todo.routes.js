import express from "express";
import { TodoApi } from "../config/api.js";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", fetchTodos);

router.post("/", addTodo);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;

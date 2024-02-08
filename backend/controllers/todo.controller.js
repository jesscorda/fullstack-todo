import { v4 as uuid } from "uuid";

let todos = [];

export const fetchTodos = (req, res) => {
  res.json({
    success: true,
    data: todos,
  });
};

export const addTodo = (req, res) => {
  const { name, description, priority } = req.body;
  if (!name || !description || !priority) {
    res.json({
      success: false,
      message: "Request body is invalid",
    });
  }
  todos.push({ name, description, priority, id: uuid() });
  res.json({ success: true, message: "Todo added successfully" });
};

export const updateTodo = (req, res) => {
  const { name, description, priority } = req.body;
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return res.sendStatus(404);

  const todoToBeUpdated = todos[index];
  if (name) todoToBeUpdated.name = name;
  if (description) todoToBeUpdated.description = description;
  if (priority) todoToBeUpdated.priority = priority;
  todos.splice(index, 1, todoToBeUpdated);
  res.json({
    success: true,
    message: "Todo updated successfully",
  });
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ success: true, message: "Todo deleted successfully" });
};

import { BASE_URL, TODOS_URL } from "../utils/apiUrl";

export const fetchTodos = () => {
  return fetch(`${BASE_URL}${TODOS_URL}`).then((response) => response.json());
};

export const addTodo = ({ name, description, priority }) => {
  return fetch(`${BASE_URL}${TODOS_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      priority,
    }),
  }).then((response) => response.json());
};

export const onUpdateTodo = ({ name, description, priority, id }) => {
  return fetch(`${BASE_URL}${TODOS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      priority,
    }),
  }).then((response) => response.json());
};

export const deleteTodo = (id) => {
  fetch(`${BASE_URL}${TODOS_URL}/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

import { useEffect, useState } from "react";
import { TodoList, Toolbar, AddTodo } from "../components";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  onUpdateTodo,
} from "../services/todo.service";
import { priorities } from "../utils/priorities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [todos, setTodos] = useState([]);

  const [todo, setTodo] = useState(null);

  const [isAddTodoModalOpen, setAddTodoModalOpen] = useState(false);

  useEffect(() => {
    fetchAllTodos();
  }, [isAddTodoModalOpen]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const fetchAllTodos = async () => {
    const response = await fetchTodos();
    setTodos(
      sortDescPriority(response.data).map((todo) => {
        return {
          ...todo,
          priority: priorities.find(
            (p) =>
              p.value === todo.priority || p.value === Number(todo.priority)
          )?.label,
        };
      })
    );
  };

  const sortDescPriority = (data) =>
    data.sort((a, b) => {
      if (Number(a.priority) > Number(b.priority)) return -1;
      if (Number(a.priority) < Number(b.priority)) return 1;
      return 0;
    });

  const onTodoChecked = async (id) => {
    await deleteTodo(id);
    toast.success("Todo deleted successfully", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
    fetchAllTodos();
  };

  const handleAddTodoClick = () => {
    setAddTodoModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddTodoModalOpen(false);
  };

  const createOrUpdateTodo = async (data) => {
    let response = {};
    if (data.id) {
      response = await onUpdateTodo(data);
    } else {
      response = await addTodo(data);
    }
    toast.success(response.message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
    setAddTodoModalOpen(false);
  };

  const onEditTodo = (data) => {
    setAddTodoModalOpen(true);
    setTodo(data);
  };

  return (
    <div className="max-w-[80%] m-auto">
      <Toolbar onSearch={handleSearch} onAddTodoClick={handleAddTodoClick} />
      <TodoList
        todos={todos}
        searchTerm={searchTerm}
        todoChecked={onTodoChecked}
        editTodo={onEditTodo}
      />
      <AddTodo
        isOpen={isAddTodoModalOpen}
        onClose={handleCloseModal}
        onCreateOrUpdateTodo={createOrUpdateTodo}
        todo={todo}
      />
      <ToastContainer />
    </div>
  );
};

export default Todos;

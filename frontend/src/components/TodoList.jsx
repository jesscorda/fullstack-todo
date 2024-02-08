import { priorities } from "../utils/priorities";
import { PencilIcon } from "@heroicons/react/24/solid";

const TodoList = ({ todos, searchTerm, todoChecked, editTodo }) => {
  const filteredTodos = todos.filter((todo) => {
    if (!searchTerm) return todo;

    return (
      todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      {filteredTodos.length === 0 ? (
        <p className="flex justify-center items-center">Todo list is empty</p>
      ) : (
        filteredTodos.map((todo, index) => (
          <div
            className="flex justify-between items-center rounded-sm p-2 mt-2 bg-gradient-to-r from-cyan-50 to-blue-50"
            key={index}
          >
            <div className="flex gap-2">
              <input type="checkbox" onChange={() => todoChecked(todo.id)} />
              <div className="flex flex-col">
                <p className="font-bold">{todo.name}</p>
                <p>{todo.description}</p>
                <p className="text-slate-400 text-sm">{todo.priority}</p>
              </div>
            </div>
            <button
              className="rounded-lg p-3 text-blue-800"
              onClick={() =>
                editTodo({
                  ...todo,
                  priority: priorities.find((p) => p.label === todo.priority)
                    .value,
                })
              }
            >
              <PencilIcon className="h-6 w-6 text-blue-500" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;

import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Toolbar = ({ onSearch, onAddTodoClick }) => {

  const searchTodos = (searchTerm) => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-end gap-4 p-4">
      <input
        className="border-2 rounded-md w-full"
        type="text"
        onChange={(e) => searchTodos(e.target.value)}
      />
      <MagnifyingGlassIcon className="h-6 w-6 text-slate-300 relative -left-14 top-3" />
      <button
        className="rounded-lg p-3 text-blue-800"
        onClick={onAddTodoClick}
      >
        <PlusIcon className="h-6 w-6 text-blue-500" />
      </button>
    </div>
  );
};

export default Toolbar;

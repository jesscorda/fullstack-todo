import { useEffect } from "react";
import { priorities } from "../utils/priorities";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/solid";

const AddTodo = ({ isOpen, onClose, onCreateOrUpdateTodo, todo }) => {
  const { handleSubmit, register, setValue, reset } = useForm();

  useEffect(() => {
    if (isOpen && todo) {
      setValue("name", todo.name);
      setValue("description", todo.description);
      setValue("priority", todo.priority);
    }
  }, [isOpen, todo, setValue]);

  const onFormSubmit = (data) => {
    onCreateOrUpdateTodo({ ...data, id: todo?.id });
    reset();
    onClose();
  };

  return (
    isOpen && (
      <div className={`modal fixed inset-0 flex items-center justify-center`}>
        <div className="bg-white p-4 w-[30rem] rounded shadow-lg">
          <button className="flex justify-end w-full" onClick={() => onClose()}>
            <XMarkIcon className="h-6 w-6 text-blue-500" />
          </button>
          <form
            className="flex flex-col p-4 mt-4 gap-4"
            action=""
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <label className="flex flex-col text-slate-500" htmlFor="name">
              Name
              <input
                className="p-2 border-b-2 outline-none"
                type="text"
                name="name"
                id="name"
                {...register("name")}
              />
            </label>
            <label
              className="flex flex-col text-slate-500"
              htmlFor="description"
            >
              Description
              <input
                className="p-2 border-b-2 outline-none"
                type="text"
                name="description"
                id="description"
                {...register("description")}
              />
            </label>
            <label className="flex flex-col text-slate-500" htmlFor="priority">
              Priority
              <select
                className="p-2 border-b-2 outline-none"
                {...register("priority")}
              >
                {priorities.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <button className="p-2 rounded-lg bg-blue-300 mt-5" type="submit">
              Submit
            </button>
          </form>{" "}
        </div>
      </div>
    )
  );
};

export default AddTodo;

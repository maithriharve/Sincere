import { useTodos } from '@/hooks/useTodos';
import { useState } from 'react';
import { requestDeleteTodo, requestUpdateTodo, requestCreateTodo, Todo } from '@/lib/todos-lib';
import { HiCheckCircle, HiXMark } from "react-icons/hi2";
import { RiCheckboxBlankCircleLine } from "react-icons/ri"; // I'm sorry this isn't from the Heroicons 2 library — I couldn't find an appropriate empty circle within there! 
import { TodoItem } from './TodoItem';


export const NewTodoForm = () => {
  const { todos, mutate } = useTodos();
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isErrorVisible, setIsVisible] = useState(error != null);

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { error } = await requestCreateTodo({ title: newTask });

    setError(error ? "Unable to set to-do, please try again!" : null);
    setIsVisible(!!error);

    if (!error) {
      mutate(todos);
      setNewTask('');
    }

  };

  const handleTodoUpdate = async (todo: Todo, isCompleted: boolean) => {
    todo.completed = isCompleted;
    await requestUpdateTodo(todo);
    mutate(todos);
  };

  const handleTodoDelete = async (id: string) => {
    await requestDeleteTodo(id);
    mutate(todos);
  };

  const handleErrorClose = () => {
    setIsVisible(false);
  }

  const showError = error && isErrorVisible;

  return (
    <>
      {showError && <div className="flow-root text-red-600 font-medium rounded-xl border border-red-600 bg-red-50 p-4 sm:flex-row sm:space-x-2 sm:space-y-0">{error}
        <HiXMark onClick={handleErrorClose} className="float-right text-2xl" />
      </div>
      }
      <form className="flex flex-col space-y-2 rounded-xl border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:space-x-2 sm:space-y-0">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Add a task"
            value={newTask}
            onChange={
              (event) => {
                setNewTask(event.target.value);
              }}
            className="w-full rounded border border-stone-200 bg-white px-4 py-3 text-base transition-opacity focus:border-red-300 focus:ring-1 focus:ring-red-300 focus-visible:outline-none disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          onClick={
            handleSubmit
          }
          disabled={!newTask}
          className="min-w-[128px] rounded border border-red-600 bg-red-500 px-2 text-base font-medium leading-10 text-white hover:bg-red-600 focus-visible:outline-2  focus-visible:outline-offset-4 focus-visible:outline-blue-300 disabled:border-transparent disabled:bg-gray-200"
        >
          Add
        </button>

      </form>
      {incompleteTodos.length > 0 && (
        <div className="flex items-center font-sans text-2xl font-medium">Incomplete 
        <div className="m-2 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg">{incompleteTodos.length}</div>
        </div>
      )}
      {incompleteTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodoUpdate={handleTodoUpdate}
          onTodoDelete={handleTodoDelete}
          Icon={RiCheckboxBlankCircleLine}
        />
      ))}
      {completedTodos.length > 0 && (
        <div className="flex items-center font-sans text-2xl font-medium">Completed 
        <div className="m-2 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg">{completedTodos.length}</div></div>
      )}
      {completedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodoUpdate={handleTodoUpdate}
          onTodoDelete={handleTodoDelete}
          Icon={HiCheckCircle}
        />
      ))}
    </>
  );
};

export default NewTodoForm;

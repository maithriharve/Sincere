import { useTodos } from '@/hooks/useTodos';
import { useState } from 'react';
import { requestDeleteTodo, requestUpdateTodo, Todo } from '@/lib/todos-lib';
import { requestCreateTodo } from '@/lib/todos-lib';
import {HiTrash, HiCheckCircle} from "react-icons/hi2";
import {RiCheckboxBlankCircleLine} from "react-icons/ri"; // I'm sorry this isn't from the hi2 library! I couldn't find an appropriate empty circle



export const NewTodoForm = () => {
  const { todos, isLoading, isError, error, mutate } = useTodos();
  const [newTask, setNewTask] = useState('');

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  /**
   *   
   * This is also an alternate way to filter out complete vs incomplete tasks, but I chose the above since the types are already declared 
   * & I wouldn't have to typecast multiple times as evidenced with the three `as Todo[]`s below. Hope that is ok! 
   * I believe that the performance difference between the two functions are miniscule.
   * 
   * 
   * const [completedTodos, incompleteTodos] = todos.reduce(
      (result, todo) => {
       (result[todo.completed ? 0 : 1] as Todo[]).push(todo);
        return result;
     },
      [[] as Todo[], [] as Todo[]]
     );
   */

  return (
    <>
      <form className="flex flex-col space-y-2 rounded-xl border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:space-x-2 sm:space-y-0">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Add a task"
            onChange={(event) => {
              setNewTask(event.target.value)
            }}
            className="w-full rounded border border-stone-200 bg-white px-4 py-3 text-base transition-opacity focus:border-red-300 focus:ring-1 focus:ring-red-300 focus-visible:outline-none disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          onClick={
            async () => {
              await requestCreateTodo({ title: newTask });
              mutate(todos);
            }
          }
          disabled={!newTask}
          className="min-w-[128px] rounded border border-red-600 bg-red-500 px-2 text-base font-medium leading-10 text-white hover:bg-red-600 focus-visible:outline-2  focus-visible:outline-offset-4 focus-visible:outline-blue-300 disabled:border-transparent disabled:bg-gray-200"
        >
          Add
        </button>

      </form>
      {incompleteTodos && <div className="font-sans text-2xl font-medium">Incomplete {incompleteTodos.length}</div>}
      {incompleteTodos.map((todo) => (
        <div className="relative w-full">
          <button type="submit"
            className="group flow-root w-full rounded border border-stone-200 bg-white px-4 py-3 text-base transition-opacity text-left hover:bg-gray-100 focus-visible:outline-none disabled:opacity-50"
            onClick={
              async () => {
                todo.completed = true;
                await requestUpdateTodo(todo);
                mutate(todos);
              }
            }
          >
            <RiCheckboxBlankCircleLine className="inline"/> {todo.title}
            <button type="submit" className="float-right hidden group-hover:block"
              onClick={
                async () => {
                  await requestDeleteTodo(todo.id);
                  mutate(todos);
                }
              }>
              <HiTrash/>
            </button>
          </button>
        </div>
      ))}
      {completedTodos && <div className="font-sans text-2xl font-medium">Completed {completedTodos.length}</div>}
      {completedTodos.map((todo) => (

        <div className="relative w-full">
          <button type="submit"
            className="group w-full rounded border border-stone-200 bg-white px-4 py-3 text-base transition-opacity text-left hover:bg-gray-100 focus-visible:outline-none disabled:opacity-50"
            onClick={
              async () => {
                todo.completed = false;
                await requestUpdateTodo(todo);
                mutate(todos);
              }
            }
          >
            <HiCheckCircle className="inline fill-green-800"/> {todo.title}
            <button type="submit" className="float-right hidden group-hover:block"
              onClick={
                async () => {
                  await requestDeleteTodo(todo.id);
                  mutate(todos);
                }
              }>
              <HiTrash/>
            </button>
          </button>
        </div>
      ))}
    </>
  );
};

export default NewTodoForm;

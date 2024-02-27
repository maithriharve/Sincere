/**
 * Component for rendering a TodoItem and associated functions with a to-do list item — updating and deleting todos.
 */
import React from 'react';
import { requestDeleteTodo, requestUpdateTodo, Todo } from '@/lib/todos-lib';
import { useTodos } from '@/hooks/useTodos';
import { HiOutlineTrash } from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi2";

interface TodoItemProps {
    todo: Todo;
    Icon: React.ElementType;
}

export const TodoItem = ({ todo, Icon }: TodoItemProps) => {

    const { todos, mutate } = useTodos();

    const handleTodoUpdate = async (todo: Todo, isCompleted: boolean) => {
        todo.completed = isCompleted;
        await requestUpdateTodo(todo);
        mutate(todos);
    };
    const handleTodoDelete = async (id: string, event: React.FormEvent) => {
        // Making sure that calling handleTodoDelete doesn't also call handleTodoUpdate, which occurs the divs are nested below.
        // Calling handleTodoUpdate when handleTodoDelete is called causes a console error, which I'm trying to avoid! 
        // Normally I would steer away from using event functions and dig deeper to render the divs differently, 
        // but for time purposes, I hope this will work for now!
        event.stopPropagation();

        await requestDeleteTodo(id);
        mutate(todos);
    };

    return (
        <button
            type="submit"
            className="group flow-root w-full !mt-auto transition-opacity hover:bg-gray-50 rounded flex items-center px-3 py-2 text-lg font-medium text-left"
            onClick={() => handleTodoUpdate(todo, !todo.completed)}
        >
            <Icon className={`mr-2 text-4xl inline ${Icon === HiCheckCircle ? 'fill-green-600' : 'text-gray-400 group-hover:text-gray-500'}`} /> {todo.title}
            <div className="ml-auto float-right hidden group-hover:block hover:text-red-600 text-2xl" onClick={(event) => handleTodoDelete(todo.id, event)}> 
                <HiOutlineTrash  />
            </div>
        </button>
    )
};

export default TodoItem;
import { requestDeleteTodo, requestUpdateTodo, Todo } from '@/lib/todos-lib';
import { useTodos } from '@/hooks/useTodos';
import { HiCheckCircle } from "react-icons/hi2";
import { RiCheckboxBlankCircleLine } from "react-icons/ri"; // I'm sorry this isn't from the Heroicons 2 library — I couldn't find an appropriate empty circle within there! 
import { TodoItem } from './TodoItem';


interface ToDoListProps {
    todos: Todo[],
    isComplete: boolean,
}

export const ToDoList = ({ todos, isComplete }: ToDoListProps) => {

    const { mutate } = useTodos();


    const handleTodoUpdate = async (todo: Todo, isCompleted: boolean) => {
        todo.completed = isCompleted;
        await requestUpdateTodo(todo);
        mutate(todos);
      };
    
      const handleTodoDelete = async (id: string) => {
        await requestDeleteTodo(id);
        mutate(todos);
      };
    

    return (
        <>
            {todos.length > 0 && (
                <div className="flex items-center font-sans text-2xl font-medium">{isComplete ? 'Completed' : 'Incomplete'}
                    <div className="m-2 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg">{todos.length}</div>
                </div>
            )}
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onTodoUpdate={handleTodoUpdate}
                    onTodoDelete={handleTodoDelete}
                    Icon={isComplete ? HiCheckCircle : RiCheckboxBlankCircleLine}
                />
            ))}
        </>

    )

}
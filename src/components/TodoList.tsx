/**
 * Component for rendering a list of TodoItems
 */
import { requestDeleteTodo, requestUpdateTodo, Todo } from '@/lib/todos-lib';
import { useTodos } from '@/hooks/useTodos';
import { HiCheckCircle } from "react-icons/hi2";
import { RiCheckboxBlankCircleLine } from "react-icons/ri"; // I'm sorry this isn't from the Heroicons 2 library — I couldn't find an appropriate empty circle within there! 
import TodoItem from './TodoItem';


export const ToDoList = () => {

    const { todos, mutate } = useTodos();
    const completedTodos = todos.filter((todo) => todo.completed);
    const incompleteTodos = todos.filter((todo) => !todo.completed);

    const handleTodoUpdate = async (todo: Todo, isCompleted: boolean) => {
        todo.completed = isCompleted;
        await requestUpdateTodo(todo);
        mutate(todos);
    };
    const handleTodoDelete = async (id: string) => {
        await requestDeleteTodo(id);
        mutate(todos);
    };

    const Header = ({ title, counter }: { title: string, counter: number }) => {
        return (
            <div className="flex items-center font-sans text-2xl font-medium">
                {title}
                <div className="m-2 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg">
                    {counter}
                </div>
            </div>
        );
    };

    // Figure there may be a better way to optimize rendering the incomplete + complete todo lists without duplicating code, 
    // perhaps by creating a TodoListSection component. Decided against this *for now* to reduce overcomplication; prop-drilling can occur, 
    // and I would still be rendering two separate components for incomplete + complete lists if I stuck with my current approach! 
    return (
        <>
            {incompleteTodos.length > 0 && (
                <Header title="Incomplete" counter={incompleteTodos.length} />
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
                <Header title="Completed" counter={completedTodos.length} />
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

    )

};

export default ToDoList;
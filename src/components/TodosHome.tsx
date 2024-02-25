import { HiOutlineClipboardDocumentCheck as Icon } from "react-icons/hi2";
import NewTodoForm from "./NewTodoForm";
import ToDoList from "./TodoList";

const Header = () => (
  <header className="flex flex-row items-center space-x-2">
    <Icon className="h-10 w-10" />
    <h1 className="font-serif text-3xl font-medium">To-Do List</h1>
  </header>
);

export const TodosHome = () => {
  return (
    <div className="space-y-6">
      <Header />
      <NewTodoForm />
      <ToDoList />
    </div>
  );
};

export default TodosHome;

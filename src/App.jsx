import { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

const App = () => {
  // the todos is all the todos not the single todo 
  const [todos, setTodos] = useState([]);

  // * To give the functionlity to a todo we have to create a method with the same name of import methods like this and we will pass also the values that we pass in the context
  const addTodo = (todo) => {
    setTodos((prev) => {
      return [{ id: Date.now(), ...todo }, ...prev];
    });
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)),
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id != id));
  };
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo,
      ),
    );
  };

  // As the application load may be we addded some todo so for that to load the those todo we use the hook to query the local storage , and for setting the items in localStorage we have to give a proper key value pair and for getting the items we have to just get the items by passing the key name
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;

// Confusion solution ---->
// 1. ---> { id: Date.now(), ...todo } we pass the todo like this cause todo is itself and object in todos array and we have to give 3 values to it so that's why we add our todo object in todos array like this

// 2. --->  const updatedTodo = (id, todo) => {setTodos((prev) =>prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)),);};  to update a todo we need id and todo which is message and we call our old array which is prev and loop on it cause it is array to find the todo who match with the id and if it match then we will pass the updated one and if not then we will pass the oldtodo which is prevTodo ,, anothor way is      prev.map((eachVal)=>{ if(eachVal.id === id) { todo }else{ eachVal } })

// 3. --->  const deleteTodo = (id) => { setTodos((prev) => prev.filter((todo) => todo.id != id)); };  this method means who match with id dont keep it in new array and who didnot match with the id keep it in filter array

// 4. --->   const toggleComplete = (id) => { setTodos((prev) => prev.map((prevTodo) => prevTodo === id? { ...prevTodo, completed: !prevTodo.completed } : prevTodo, ), ); }; ,, this means that loop on all todo and then match the prevTodo with the id if they match then we will spread that paticular todo and inside it we will change just the completed properity else if id not match then they will stay same

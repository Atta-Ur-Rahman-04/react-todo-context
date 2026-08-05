import { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
  // we will define the state for indiviual todo
  const [todo, setTodo] = useState("");

  // 1. this is form for adding todo but we define the functionlity in the app.jsx but as we wan the functionlity here so we will use useTodo(which is a hook that we have created in context) ,,,  now the addTodo func was defined in app.jsx but as addTodo work on object to spread and add that object in our all todos so for that we will create a method
  const { addTodo } = useTodo();
  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    // 2. we didnot pass the id with date.now cause we already give that in app.jsx and if the field value both are same then just we can write todo
    addTodo({ todo: todo, completed: false });
    setTodo(""); // we make our field empty so that ready for new todo
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;

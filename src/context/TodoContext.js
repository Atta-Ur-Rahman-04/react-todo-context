import { createContext, useContext } from "react";
// context.
export const TodoContext = createContext({
  // todos array and inside array every object is an indiviual todo/task and we just add one todo cause to remember the format

  // ----> the given is properites
  todos: [
    {
      id: 1,
      todo: "Todo message",
      completed: false,
    },
  ],

  // ---> The given is functionality varibales and the functionlity were be written in separate file
  // todo means the message
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});
// Hook
export const useTodo = () => {
  return useContext(TodoContext);
};
// provider
export const TodoProvider = TodoContext.Provider;

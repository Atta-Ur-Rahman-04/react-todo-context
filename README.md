# React Todo App

A simple and clean Todo application built with **React** and **Context API** for state management. Todos are persisted in the browser using **localStorage**, so your tasks stay saved even after refreshing or closing the page.


## Features

- Add new todos
- Edit existing todos
- Delete todos
- Mark todos as complete / incomplete
- Persistent storage using **localStorage** (no backend/database needed)
- Styled with Tailwind CSS

## Tech Stack

- **React** (Functional Components + Hooks)
- **Context API** for global state management
- **Tailwind CSS** for styling
- **localStorage** for data persistence

## 📂 Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx      # Form to add new todos
│   ├── TodoItem.jsx      # Individual todo item (edit, delete, toggle)
│   └── index.js          # Barrel export for components
├── context/
│   ├── TodoContext.js    # Context, Provider, and useTodo hook
│   └── index.js          # Barrel export for context
├── App.jsx               # Main app logic (state + localStorage sync)
└── main.jsx
```

## How It Works

### State Management

All todo-related state (`todos`) and functions (`addTodo`, `updateTodo`, `deleteTodo`, `toggleComplete`) live in `App.jsx` and are shared across components using React's **Context API**, avoiding prop drilling.

### localStorage Persistence

The app reads from and writes to `localStorage` using two `useEffect` hooks in `App.jsx`:

**1. Loading todos on initial render:**

```js
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos && todos.length > 0) {
    setTodos(todos);
  }
}, []);
```

This runs once when the app mounts, checks if there are any todos saved in `localStorage` under the key `"todos"`, parses them from a JSON string back into an array, and loads them into state.

**2. Saving todos whenever they change:**

```js
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

This runs every time the `todos` state changes (add, edit, delete, toggle), converts the array into a JSON string, and saves it back to `localStorage` under the same `"todos"` key — keeping the browser storage always in sync with the app's state.

This means todos persist across page refreshes and browser sessions, entirely on the client side with no backend required.

## Getting Started

### Prerequisites

- Node.js installed

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project
cd <project-folder>

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

## What You can Learned

- Using Context API to avoid prop drilling and manage global state cleanly
- Syncing React state with browser `localStorage` using `useEffect`
- Building reusable, controlled components (`TodoForm`, `TodoItem`)
- Implementing full CRUD functionality (Create, Read, Update, Delete) in a single-page app
- Structuring a React project with barrel exports (`index.js`) for cleaner imports


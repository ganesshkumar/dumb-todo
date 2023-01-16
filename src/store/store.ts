import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';
import { Todo } from "../models/todo";
import { v4 as uuidv4 } from 'uuid';

export interface TodoState {
  todos: Todo[];
  addTodo: (title: string, project: string) => void;
  toggleCompletion: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set, get) => ({
        todos: [] as Todo[],
        addTodo: (title: string, project: string) => {
          const todo: Todo = {
            id: uuidv4(),
            title,
            project,
            createdAt: new Date(),
            completedAt: undefined,
          };
          set((state) => ({ todos: [...state.todos, todo] }));
        },
        toggleCompletion: (id: string) => {
          console.log('toggle completion')
          const todos = get().todos;
          const todo = todos.find((todo) => todo.id === id);
          if (!todo) {
            console.error("todo not found");
            return;
          }
          if (!todo?.completedAt) {
            todo.completedAt = new Date();
          } else {
            todo.completedAt = undefined;
          }
          console.log(get().todos)
          set(() => ({ todos }));
        }
      }),
      {
        name: 'todos',
      }
    )
  )
);

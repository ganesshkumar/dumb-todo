import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';
import { Task } from "../models/task";
import { v4 as uuidv4 } from 'uuid';
import { List } from "../models/list";

export interface TaskState {
  tasks: Task[];
  lists: List[];
  activeListId: string;
  setActiveListId: (id: string) => void;
  addTask: (title: string, listId?: string) => void;
  addList: (title: string) => void;
  toggleCompletion: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      (set, get) => ({
        lists: [],
        activeListId: '',
        tasks: [],
        setActiveListId: (id: string) => {
          set(_ => ({ activeListId: id }))
        },
        addList: (title: string) => {
          const list: List = {
            id: uuidv4(),
            title,
            createdAt: Date.now(),
          };
          if (get().lists.length === 0) {
            set(() => ({ activeListId: list.id, lists: [list] }));
          } else {
            set((state) => ({ lists: [...state.lists, list] }));
          }
        },
        addTask: (title: string, listId?: string) => {
          const todo: Task = {
            id: uuidv4(),
            title,
            listId: listId || get().activeListId,
            createdAt: Date.now(),
            completedAt: undefined,
          };
          set((state) => ({ tasks: [...state.tasks, todo] }));
        },
        toggleCompletion: (id: string) => {
          const tasks = get().tasks;
          const todo = tasks.find((todo) => todo.id === id);
          if (!todo) {
            return;
          }
          if (!todo?.completedAt) {
            todo.completedAt = Date.now();
          } else {
            todo.completedAt = undefined;
          }
          set(() => ({ tasks }));
        }
      }),
      {
        name: 'tasks',
      }
    )
  )
);

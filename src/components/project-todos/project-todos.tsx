import * as React from 'react';
import { Todo } from '../../models/todo';
import { useTodoStore } from '../../store/store';
import { TodoComponent } from '../todo';

interface ProjectTodosProps {
  project?: string
}

export const ProjectTodos = (props: ProjectTodosProps) => {
  const todos = useTodoStore((state) => state.todos.filter((todo) => todo.project === props.project));
  return (
    <div>
      {todos.map((todo: Todo) => <TodoComponent key={todo.id} todo={todo} />)}
    </div>
  )
}

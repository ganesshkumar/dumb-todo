import * as React from 'react';
import './App.css';
import { ProjectTodos } from './components/project-todos';
import { AddTodo } from './components/todo';

function App() {
  return (
    <div>
      <AddTodo />
      <ProjectTodos project='' />
    </div>
  );
}

export default App;

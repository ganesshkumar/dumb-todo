import * as React from 'react';
import { Task } from '../../models/task';
import { useTaskStore } from '../../store/store';
import { AddTask, TodoComponent } from '../task';
import { makeStyles, shorthands, Text } from '@fluentui/react-components';

interface ListTasksProps {
  list?: string
}

const getTaskLists = (tasks: Task[]) => {
  // const now = new Date();
  // now.setHours(0);
  // now.setMinutes(0);
  // now.setSeconds(0);
  // now.setMilliseconds(0);
  // const startOfDay = now.getTime();
  return [
    tasks.filter((task) => !task.completedAt),
    tasks.filter((task) => task.completedAt),
  ];
}

const isOverDue = (task: Task) => {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  const startOfDay = now.getTime();
  return task.createdAt < startOfDay;
}

const useClasses = makeStyles({
  section: {
    ...shorthands.padding('10pt', '0'),
  }
});

export const ListTasks = (props: ListTasksProps) => {
  const tasks = useTaskStore((state) => state.tasks.filter((task) => task.listId === state.activeListId));
  const tasksIncomplete = tasks
    .filter((task) => !task.completedAt)
    .sort();
  const tasksCompletedByDate = tasks
    .filter((task) => task.completedAt)
    .sort((a, b) => b.completedAt! - a.completedAt!)
    .reduce((acc: Record<string, Task[]>, task) => {
      const completed = new Date(task.completedAt!).toLocaleDateString();
      if (!acc[completed]) {
        acc[completed] = [task];
      } else {
        acc[completed].push(task);
      }
      return acc;
    }, {} as Record<string, Task[]>);

  const classes = useClasses();
  return (
    <div>
      <div className={classes.section}>
        <div>
          <AddTask />
        </div>
        {tasksIncomplete.map((task: Task) => <TodoComponent key={task.id} task={task} isOverDue={isOverDue(task)} />)}
      </div>
      <div className={classes.section}>
        <Text size={500} weight='semibold'>Completed</Text>
        {Object.keys(tasksCompletedByDate).map((date) => {
          return (
            <div key={date}>
              <Text size={400} weight='semibold'>{date}</Text>
              {tasksCompletedByDate[date].map((task: Task) => <TodoComponent key={task.id} task={task} />)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

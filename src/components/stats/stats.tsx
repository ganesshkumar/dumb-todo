import * as React from 'react';
import { Text } from '@fluentui/react-components';
import { Task } from '../../models/task';
import { useTaskStore } from '../../store/store';

const getStartOfDayInEpoch = () => {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now.getTime();
}

const getOverdueTasks = (tasks: Task[]) => {
  const startOfDay = getStartOfDayInEpoch();
  return tasks.filter((task) => task.createdAt < startOfDay && !task.completedAt);
};

const getTodayIncompleteTasks = (tasks: Task[]) => {
  const startOfDay = getStartOfDayInEpoch();
  return tasks.filter((task) => task.createdAt > startOfDay && !task.completedAt);
};

const getTodayCompletedTasks = (tasks: Task[]) => {
  const startOfDay = getStartOfDayInEpoch();
  return tasks.filter((task) => task.createdAt > startOfDay && !!task.completedAt);
};

export const Stats = () => {
  const tasks = useTaskStore((state) => state.tasks);
  return (
    <div>
      <Text>Overdue: {getOverdueTasks(tasks).length}</Text>
      <Text>planned: {getTodayIncompleteTasks(tasks).length}</Text>
      <Text>Completed: {getTodayCompletedTasks(tasks).length}</Text>
    </div>
  );
};
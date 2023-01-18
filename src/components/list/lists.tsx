import * as React from 'react';
import { shorthands, makeStyles, TabList, Tab, SelectTabEvent, SelectTabData, CounterBadge, Tooltip } from '@fluentui/react-components';
import { useTaskStore } from '../../store/store';
import { Task } from '../../models/task';
import { List } from '../../models/list';

const useStyles = makeStyles({
  list: {
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding('0', '8pt'),
    cursor: 'pointer',
  },
});

const getStartOfDayInEpoch = () => {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now.getTime();
}

export const Lists = () => {
  const classes = useStyles();
  const {
    lists,
    tasks,
    activeListId,
    setActiveListId,
  } = useTaskStore((state) => ({
    lists: state.lists,
    tasks: state.tasks,
    activeListId: state.activeListId,
    setActiveListId: state.setActiveListId,
  }));
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setActiveListId(data.value as string);
  };

  return (
    <div>
      <TabList selectedValue={activeListId} onTabSelect={onTabSelect} vertical as="div" reserveSelectedTabSpace={false}>
        {lists.map((list) =>
          <Tab className={classes.list} key={list.id} value={list.id} icon={<Indicator list={list} tasks={tasks} />}>
            {list.title}
          </Tab>
        )}
      </TabList>
    </div>
  );
}

const Indicator = ({ list, tasks }: { list: List, tasks: Task[] }) => {
  const startOfDay = getStartOfDayInEpoch();
  const hasOverdueTasks = tasks.some((task) => task.listId === list.id && task.createdAt < startOfDay && !task.completedAt);
  const hasTodayTasks = tasks.some((task) => task.listId === list.id && task.createdAt >= startOfDay && !task.completedAt);
  if (hasOverdueTasks) {
    return (
      <Tooltip content="Has Overdue Tasks" relationship="label">
        <CounterBadge color='danger' count={0} dot />
      </Tooltip>
    );
  } else if (hasTodayTasks) {
    return (
      <Tooltip content="Has Planned Tasks" relationship="label">
        <CounterBadge color='brand' count={0} dot />
      </Tooltip>
    );
  } else {
    return <></>;
  }
}
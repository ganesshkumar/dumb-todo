import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Checkbox, CounterBadge } from '@fluentui/react-components';
import { Task } from '../../models/task';
import { useTaskStore } from '../../store/store';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  taskTitle: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  indicator: {
    ...shorthands.margin('0', '4pt', '0', '0'),
  }
});

interface TaskProps {
  task: Task
  isOverDue?: boolean
}

export const TodoComponent = (props: TaskProps) => {
  const classes = useStyles();
  const { task } = props;
  const { toggleCompletion } = useTaskStore();

  const title = props.isOverDue ?
    <div className={classes.taskTitle}> <CounterBadge className={classes.indicator} count={0} dot color="danger" /> {task.title} </div> :
    task.title;

  return (
    <div className={classes.root}>
      <Checkbox checked={!!task.completedAt} onChange={(_ev, _data) => toggleCompletion(task.id)} label={title} />
    </div>
  )
}

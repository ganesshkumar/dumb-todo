import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';
import { Todo } from '../../models/todo';
import { useTodoStore } from '../../store/store';

const useStyles = makeStyles({
  root: { display: 'flux' },
});

interface TodoProps {
  todo: Todo
}

export const TodoComponent = (props: TodoProps) => {
  const classes = useStyles();
  const { todo } = props;
  const { toggleCompletion } = useTodoStore();
  return (
    <div className={classes.root}>
      <Checkbox checked={!!todo.completedAt} onChange={(_ev, _data) => toggleCompletion(todo.id)} label={props.todo.title} />
    </div>
  )
}

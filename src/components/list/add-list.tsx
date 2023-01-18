import * as React from 'react';
import { useTaskStore } from '../../store/store';
import { Input, InputOnChangeData, makeStyles, shorthands } from '@fluentui/react-components';
import { Add16Regular as Add } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    ...shorthands.margin('0', '8pt'),
    ...shorthands.padding('0', '8pt'),
  }
});

export const AddList = () => {
  const classes = useStyles();
  const addList = useTaskStore((state) => state.addList);
  const [title, setTitle] = React.useState<string>('');

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setTitle(data.value);
  }

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addListHandle(title);
    }
  }

  const addListHandle = (title: string) => {
    if (!title) {
      return;
    }
    addList(title);
    setTitle('');
  }

  return (
    <Input
      style={{ border: 0 }}
      className={classes.root}
      placeholder="Create a list"
      value={title}
      onChange={onChange}
      onKeyDown={onKeyPress}
      contentBefore={<Add onClick={() => addListHandle(title)} />}
    />
  );
}

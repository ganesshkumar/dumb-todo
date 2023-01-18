import * as React from 'react';
import { useTaskStore } from '../../store/store';
import { Input, InputOnChangeData } from '@fluentui/react-components';
import { Add16Regular as Checkbox } from '@fluentui/react-icons';

export const AddTask = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = React.useState<string>('');

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setTitle(data.value);
  }

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask(title);
      setTitle('');
    }
  }
  return (
    <Input
      style={{ border: 0 }}
      contentBefore={< Checkbox />}
      appearance='underline'
      placeholder="Add a task" value={title}
      onChange={onChange}
      onKeyDown={onKeyPress}
    />
  );
}

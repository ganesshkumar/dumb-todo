import * as React from 'react';
import { useTodoStore } from '../../store/store';
import { Input, InputOnChangeData } from '@fluentui/react-components';

export const AddTodo = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [title, setTitle] = React.useState<string>('');

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setTitle(data.value);
  }

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo(title, '');
      setTitle('');
    }
  }
  return (
    <Input placeholder="Add a task" value={title} onChange={onChange} onKeyDown={onKeyPress} />
  );
}

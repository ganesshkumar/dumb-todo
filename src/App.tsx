import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import './App.css';
import { AddList, Lists, ListTasks } from './components/list';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  headerSlot: {
    display: 'flex',
  },
  mainStage: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftSlot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.headerSlot}>
        {/* <Stats /> */}
      </div>
      <div className={classes.mainStage}>
        <div className={classes.leftSlot}>
          <Lists />
          <AddList />
        </div>
        <div>
          <ListTasks list='' />
        </div>
      </div>
    </div>
  );
}

export default App;

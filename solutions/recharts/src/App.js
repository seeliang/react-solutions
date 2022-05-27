import './App.css';
import Double  from './Double';

import Number from './SingleNumber'

import OneRow from './OneRow'

import SingleFloat from './SingleFloat'
import TableHead from './Header'


function App() {
  return (
    <div className="App">
      <TableHead />
      <SingleFloat />
    <Double />
    <Number />
    <OneRow />
    </div>
  );
}

export default App;

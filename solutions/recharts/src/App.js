import logo from './logo.svg';
import './App.css';
import Double, {TableHead} from './Double';

import Number from './SingleNumber'

import OneRow from './OneRow'

import SingleFloat from './SingleFloat'


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

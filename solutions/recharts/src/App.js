import './App.css';
import Double  from './Double';

import Number from './SingleNumber'

import OneRow from './OneRow'

import SingleFloat from './SingleFloat'
import TableHead from './Header'
import Split from './Split'
import Stacked from './Stacked' 


function App() {
  return (
    <div className="App">
      <TableHead />
      <SingleFloat />
      <Stacked />
      <Split />
    <Double />
    <Number />
    <OneRow />
    </div>
  );
}

export default App;

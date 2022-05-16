import logo from './logo.svg';
import './App.css';
import Double, {TableHead} from './Double';

import Number from './SingleNumber'

import OneRow from './OneRow'


function App() {
  return (
    <div className="App">
      <TableHead />
    <Double />
    <Number />
    <OneRow />
    </div>
  );
}

export default App;

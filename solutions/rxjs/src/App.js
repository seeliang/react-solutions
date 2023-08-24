import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [list, setList] = useState([])
  const handleAddNewItem = () => {
    setList([1, ...list])
  }
  const handleLoadMoreItem = () => {
    setList([...list, 10])
  }
  return (
    <div className="App">
      <div>
        <button onClick={handleAddNewItem}>add new item</button>
        <button onClick={handleLoadMoreItem}>load 10 more items</button>
      </div>
      <p>happy path: there is not race condition</p>
      <p>{JSON.stringify(list)}</p>
    </div>
  );
}

export default App;

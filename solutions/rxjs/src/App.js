
import './App.css';
import { useState, useEffect } from 'react';

import { debounceTime } from 'rxjs/operators'
import { Subject } from 'rxjs'

const useDebounce = (time, initialValue) => {
  const [value, setValue] = useState(initialValue)
  const [values] = useState(() => new Subject())
  useEffect(() => {
    const sub = values.pipe(debounceTime(time)).subscribe(setValue)
    return () => sub.unsubscribe()
  }, [time, values])
  return [value, (v) => values.next(v)]
}


// const useBuffer = (time, initialValue) => {
//   const [value, setValue] = useState(initialValue)
//   const [values] = useState(() => new Subject())
//   useEffect(() => {
//     console.log(value)
//     const sub = values.pipe(
//       buffer(values.pipe(throttleTime(time)))).subscribe(setValue)
//     return () => sub.unsubscribe()

//   }, [time, values])
//   return [value, (v) => values.next(v)]
// }

function App() {
  const [list, setList] = useDebounce(1000, [])
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
      <p>debounce: only accept last one click in a min</p>
      <p>{JSON.stringify(list)}</p>
    </div>
  );
}

export default App;

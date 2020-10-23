import React, {useEffect, useState} from 'react';

function App() {
  const {store} = window;
  const [count, setCount] = useState('0')
  const update = () => {
    const count = store.getState().counter.count.toString();
    setCount(() => count )
  }
  useEffect(() => {
    store.subscribe(update)
  },[store])
  return (
    <div className="App">
      <h2> react app </h2>
      <h4>sub count</h4>
      <p> result: {count} </p>
      <h4>pub message</h4>
    </div>
  );
}

export default App;

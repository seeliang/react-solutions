import React, {useEffect, useState} from 'react';

function App() {
  const {store} = window;
  const [count, setCount] = useState('0')
  const [text, setText] = useState('')
  const update = () => {
    const count = store.getState().counter.count.toString();
    setCount(() => count )
  }
  useEffect(() => {
    store.subscribe(update)
  },[store])

  const send = (e) => {
    e.preventDefault();
    store.dispatch({ type: "MESSAGE_UPDATE", text})
  }
  const typing = (e) => {
    const text = e.target.value;
    setText(text)
  }
  return (
    <div className="App">
      <h2> react app </h2>
      <h4>sub count</h4>
      <p> result: {count} </p>
      <h4>pub message</h4>
      <form>
        <input value={text} onChange={typing}></input>
        <button onClick={send}>send</button>
      </form>
    </div>
  );
}

export default App;

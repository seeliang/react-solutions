import React from 'react';
import { Part } from './part';

const App : React.FC = () => {
  const list = [1,2,3,4,5,6,7,71,8,82]
  return(
    <div className="App">
    <Part list={list}/>
  </div>
  );
}



export default App;

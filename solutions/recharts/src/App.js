import logo from './logo.svg';
import './App.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
const data = [
  {
    name: "Page A",
    uv: 4000,

  },
  {
    name: "Page B",
    uv: 3000,
  
  },
  {
    name: "Page C",
    uv: 2000,
   
  },
  {
    name: "Page D",
    uv: 2780,
    
  },
  {
    name: "Page E",
    uv: 1890,
   
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  }
];


function App() {
  return (
    <div className="App">
  
      <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
  </LineChart>
    </div>
  );
}

export default App;

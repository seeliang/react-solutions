import logo from './logo.svg';
import './App.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
const data = [
  {
    name: "",
    uv: 100,

  },
  {
    name: "",
    uv: 100,
  
  },
  {
    name: "",
    uv: 100,
   
  },
  {
    name: "",
    uv: 90,
    
  },
  {
    name: "",
    uv: 70,
   
  },
  {
    name: "",
    uv: 110,
  },
  {
    name: "Page G",
    uv: 140,
  }
];


function App() {
  return (
    <div className="App">
  
      <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="name"/>
    <YAxis domain={[40, 200]}/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
  </LineChart>
    </div>
  );
}

export default App;

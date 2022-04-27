import logo from './logo.svg';
import './App.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea } from 'recharts';
const data = [
  {
    name: "12:00",
    uv: 100,

  },
  {
    name: "12:15",
    uv: 100,
  
  },
  {
    name: "12:30",
    uv: 100,
   
  },
  {
    name: "12:45",
    uv: 90,
    
  },
  {
    name: "13:00",
    uv: 70,
   
  },
  {
    name: "13:15",
    uv: 110,
  },
  {
    name: "13:30",
    uv: 140,
  }
];


function App() {
  return (
    <div className="App">
  
      <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="name" orientation='top' scale="band"/>
    <YAxis domain={[60, 160]}/>
    <CartesianGrid stroke="#ddd" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke='black' dot={{ stroke: 'black', strokeWidth: 4 }}  />
    <ReferenceArea  y1={110} y2={120} fill="orange" strokeOpacity={0.5} />
    <ReferenceArea  y1={120} y2={150} fill="red" strokeOpacity={0.5} />
  </LineChart>
    </div>
  );
}

export default App;

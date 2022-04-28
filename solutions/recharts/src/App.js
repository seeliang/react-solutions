import logo from './logo.svg';
import './App.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea } from 'recharts';
const data = [
  {
    name: "21/07 12:00",
    uv: 100,
    kk: 89,
  },
  {
    name: "21/07 12:15",
    uv: 100,
    kk: 67
  },
  {
    name: "21/07 12:30",
    uv: 100,
    kk: 90
  },
  {
    name: "21/07 12:45",
    uv: 90,
    kk: 86
  },
  {
    name: "21/07 13:00",
    uv: 70,
    kk: 64
  },
  {
    name: "21/07 13:15",
    uv: 110,
    kk: 85
  },
  {
    name: "21/07 13:30",
    uv: 140,
    kk: 110
  }
];

const Sample = ({showTitle}) => (
  <div className="table">
  <span className="cell title">Heart Beat Rate</span>
  <span className="cell">
    <LineChart width={700} height={300} data={data}>
  <XAxis dataKey={"name"} hide={!showTitle} orientation='top' scale="band" angle="-8"/>
  <YAxis domain={[60, 160]} tickCount="10"/>
  <CartesianGrid stroke="#ddd" strokeDasharray="5 5"/>
  <Line type="monotone" dataKey="uv" stroke='black' dot={{ stroke: 'black', strokeWidth: 8 }}  />
  <Line type="monotone" dataKey="kk" stroke='green' dot={{ stroke: 'green', strokeWidth: 8 }}  />
  <ReferenceArea  y1={110} y2={120} fill="orange" strokeOpacity={0.5} />
  <ReferenceArea  y1={120} y2={150} fill="red" strokeOpacity={0.5} />
  <ReferenceArea  y1={60} y2={65} fill="blue" strokeOpacity={0.5} />
</LineChart>
</span>
</div>
);


function App() {
  return (
    <div className="App">
  
    <Sample showTitle={true}/>
    <Sample/>
    <Sample/>
    <Sample/>
    <Sample/>
    </div>
  );
}

export default App;

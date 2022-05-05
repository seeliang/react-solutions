import logo from './logo.svg';
import './App.css';
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea, Tooltip } from 'recharts';
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
    uv: 208,
    kk: 110
  },
  {
    name: "21/07 14:00",
    uv: 100,
    kk: 89,
  },
  {
    name: "21/07 14:15",
    uv: 100,
    kk: 67
  },
  {
    name: "21/07 14:30",
    uv: 100,
    kk: 90
  },
  {
    name: "21/07 14:45",
    uv: 90,
    kk: 86
  },
  {
    name: "21/07 15:00",
    uv: 70,
    kk: 64
  },
  {
    name: "21/07 15:15",
    uv: 110,
    kk: 85
  },
  {
    name: "21/07 15:30",
    uv: 140,
    kk: 110
  }
];

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, value } = this.props;

    return (
      <text x={x} y={y} dy={5} fontSize={14} fill={"white"} textAnchor="middle">
        {value}
      </text>
    );
  }
}


const Sample = ({showTitle}) => (
  <div className="table">
    <span className="sticky cell table">
  <span className=" title">Heart Beat Rate</span>
  <span className="cell" >
    <LineChart width={70} height={300} data={data}>
      <YAxis domain={[65, 240]} tickCount="10" />
    </LineChart>
</span>
</span>
  <span className="cell">
    <LineChart width={1700} height={300} data={data}>
  <XAxis dataKey={"name"} hide={!showTitle} orientation='top' scale="band" angle="-8"/>
  <CartesianGrid stroke="#ddd" strokeDasharray="5 5"/>
  <Tooltip />
  <YAxis domain={[65, 240]} tickCount="10" hide={true}/>
  <Line type="monotone" dataKey="max" stroke='black' dot={{ stroke: 'black', strokeWidth: 25 }}  label={<CustomizedLabel />}  />
  <Line type="monotone" dataKey="min" stroke='green' dot={{ stroke: 'green', strokeWidth: 8 }}  />
  <ReferenceArea  y1={110} y2={120} fill="orange" strokeOpacity={0.5} />
  <ReferenceArea  y1={120} y2={240} fill="red" strokeOpacity={0.5} />
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

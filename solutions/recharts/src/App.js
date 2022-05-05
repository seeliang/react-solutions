import logo from './logo.svg';
import './App.css';
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea, Tooltip } from 'recharts';
const data = [
  {
    name: "21/07 12:00",
    max: 100,
    min: 89,
  },
  {
    name: "21/07 12:15",
    max: 100,
    min: 67
  },
  {
    name: "21/07 12:30",
    max: 100,
    min: 90
  },
  {
    name: "21/07 12:45",
    max: 90,
    min: 86
  },
  {
    name: "21/07 13:00",
    max: 70,
    min: 64
  },
  {
    name: "21/07 13:15",
    max: 110,
    min: 85
  },
  {
    name: "21/07 13:30",
    max: 208,
    min: 110
  },
  {
    name: "21/07 14:00",
    max: 100,
    min: 89,
  },
  {
    name: "21/07 14:15",
    max: 100,
    min: 67
  },
  {
    name: "21/07 14:30",
    max: 100,
    min: 90
  },
  {
    name: "21/07 14:45",
    max: 90,
    min: 86
  },
  {
    name: "21/07 15:00",
    max: 70,
    min: 64
  },
  {
    name: "21/07 15:15",
    max: 110,
    min: 85
  },
  {
    name: "21/07 15:30",
    max: 140,
    min: 110
  }
];

function formatYAxis(value) {
  if(value > 200) return "Over 200"
  if(value < 80) return "Under-80"
  return value
}

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

const TableHead = () => (
  <div className="table">
    <span className="sticky cell table">
  <span className=" title"></span>
  <span className="cell" >
  
  </span>
  </span>
  <span className="cell">
  <LineChart width={1700} height={40} data={data}>
  <XAxis dataKey={"name"} orientation='top' scale="band" angle="-8"/>
  </LineChart>
  </span>
  </div>
)

const Sample = () => (
  <div className="table">
  <span className="sticky cell table">
    <span className=" title">Heart Beat Rate</span>
    <span className="cell" >
      <LineChart width={120} height={300} data={data}>
        <YAxis domain={[50, 220]} width={110} tickFormatter={formatYAxis} tickCount="10" />
      </LineChart>
    </span>
  </span>
  <span className="cell">
    <LineChart width={1700} height={300} data={data}>
  <XAxis dataKey={"name"} hide={true} orientation='top' scale="band" angle="-8"/>
  <CartesianGrid stroke="#ddd" strokeDasharray="5 5"/>
  <Tooltip />
  <YAxis domain={[50, 220]} tickCount="10" hide={true}/>
  <Line type="monotone" dataKey="max" stroke='black' dot={{ stroke: 'black', strokeWidth: 25 }}  label={<CustomizedLabel />}  />
  <Line type="monotone" dataKey="min" stroke='green' dot={{ stroke: 'green', strokeWidth: 8 }}  />
  <ReferenceArea  y1={110} y2={180} fill="orange" strokeOpacity={0.5} />
  <ReferenceArea  y1={180} y2={220} fill="red" strokeOpacity={0.5} />
  <ReferenceArea  y1={50} y2={65} fill="blue" strokeOpacity={0.5} />
</LineChart>
</span>
</div>
);


function App() {
  return (
    <div className="App">
      <TableHead />
    <Sample />
    <Sample/>
    <Sample/>
    <Sample/>
    <Sample/>
    </div>
  );
}

export default App;

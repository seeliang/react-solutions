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
    max: 77,
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

function round5 (x) {
  return Math.ceil(x/10)*10 - 5
}

function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    max: i.max > YDomain[1] ? 225 : round5(i.max - YDomain[0]), 
    min: i.min < YDomain[0] ? 65 : round5(i.min - YDomain[0]) 
    } 
  }) )
}

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, index, data, displayKey } = this.props;

    const content = displayKey? displayKey : "max"

    return (
      <text x={x} y={y} dy={5} fontSize={14} fill={"white"} textAnchor="middle">
        {data[index][content]}
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
  <LineChart width={1700} height={40} data={addDisplayToData(data)}>
  <XAxis dataKey={"name"} orientation='top' scale="band" angle="-8"/>
  </LineChart>
  </span>
  </div>
)

const ModifyTooltip = (props) => {
  const {payload} = props;
  const render = payload.map(i => i.payload);
  if(!render[0]) {
    return;
  }
  const {name, max, min} = render[0];

  return(
    <span className='tooltip'>
       <p> time: {name} </p>
      <p> max: {max} </p>
      <p> min: {min} </p>
    </span>
  )
  }
  const YDomain = [60,220];

  const safeRange = [80,180]



  function formatYAxis(value) {

    const start = 0;
    const end = YDomain[1] - YDomain[0]

    if(value === end ) return "Over " + YDomain[1]
    if (value < end && value > start) return value + YDomain[0]
    if(value === start) return "Under " + YDomain[0] 
    return ""
  }

const tickCount = (Math.ceil((safeRange[1] - safeRange[0])/10) ).toString(10);

console.log(tickCount);

const ConditionLabel = (props) => {
  const {value, x, y} = props;

  if (value < safeRange[1] - YDomain[0] && value > safeRange[0]- YDomain[0]) {
    return <circle r="7" fill="green" cx={x} cy={y}/>;
  };
  return (<>
    <circle r="15" fill="green" cx={x} cy={y}/>;
    <CustomizedLabel {...props} displayKey="min" />
  </>)
}

const YAxisSharedProps = {
  tickCount,
  // domain: YDomain,
}

const Sample = () => (
  <div className="table">
  <span className="sticky cell table">
    <span className=" title">Heart Beat Rate</span>
    <span className="cell" >
      <LineChart width={120} height={300} data={addDisplayToData(data)}>
        <YAxis {...YAxisSharedProps} width={110} tickFormatter={formatYAxis} />
      </LineChart>
    </span>
  </span>
  <span className="cell">
    <LineChart width={1700} height={300} data={addDisplayToData(data)}>
      <ReferenceArea  y1={150} y2={safeRange[1]} fill="orange" strokeOpacity={0.5} />
      <ReferenceArea  y1={safeRange[1]} y2={YDomain[1]} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={YDomain[0]} y2={safeRange[0]} fill="blue" strokeOpacity={0.5} />
      <XAxis dataKey={"name"} hide={true} orientation='top' scale="band" angle="-8"/>
      <CartesianGrid stroke="#ddd"/>
      <Tooltip content={ModifyTooltip}/>
      <YAxis {...YAxisSharedProps} tickFormatter={formatYAxis}/>
      <Line type="monotone" dataKey="display.max" stroke='black' dot={{ stroke: 'black', strokeWidth: 25 }}  label={<CustomizedLabel data={data} />}  />
      <Line type="monotone" dataKey="display.min" stroke='green' label={<ConditionLabel data={data} />} />
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

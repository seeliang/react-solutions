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
    min: 35
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
    max: 308,
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

const displayReset = (value) => value - YDomain[0];

function round5 (x) {
  return Math.ceil(x/10)*10 - 5
}

function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    max: i.max > YDomain[1] ? displayReset(YDomain[1] - 5) : round5(displayReset(i.max)), 
    min: i.min < YDomain[0] ? displayReset(YDomain[0] + 5) : round5(displayReset(i.min)) 
    } 
  }) )
}

export class CustomizedLabel extends PureComponent {
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

export const TableHead = () => (
  <div className="table sticky-header">
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

    const start = 10;
    const end = displayReset(YDomain[1] - 10);

    if(value === end ) return "Over " + (YDomain[1] - 10)
    if (value < end && value > start) return value + YDomain[0]
    if(value === start) return "Under " + (YDomain[0] + 10 )
    return ""
  }

const tickCount = (Math.ceil(displayReset(YDomain[1])/10) + 2).toString(10);

console.log(tickCount);

const ConditionLabel = (props) => {
  const {value, x, y, displayKey} = props;

  const text = displayKey ? displayKey : "min"

  if (value < displayReset(safeRange[1])&& value > displayReset(safeRange[0])) {
    return <circle r="7" fill="green" cx={x} cy={y}/>;
  };

  console.log(text);
  return (<>
    <circle r="15" fill="green" cx={x} cy={y}/>;
    <CustomizedLabel {...props} displayKey={text} />
  </>)
}

const YAxisSharedProps = {
  tickCount,
  domain:[0,displayReset(YDomain[1])]
}

const LineChartProps = {
  height: 400,
  data: addDisplayToData(data)
}

 const Sample = () => (
  <div className="table">
  <span className="sticky cell table">
    <span className=" title">Heart Beat Rate</span>
    <span className="cell" >
      <LineChart width={120} {...LineChartProps}>
        <YAxis {...YAxisSharedProps} width={110} tickFormatter={formatYAxis} />
      </LineChart>
    </span>
  </span>
  <span className="cell">
    <LineChart width={1700} {...LineChartProps}>
      <ReferenceArea  y1={displayReset(150)} y2={displayReset(safeRange[1])} fill="orange" strokeOpacity={0.5} />
      <ReferenceArea  y1={displayReset(safeRange[1])} y2={displayReset(YDomain[1])} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={displayReset(safeRange[1])} y2={displayReset(safeRange[1] + 2)} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={0} y2={displayReset(safeRange[0])} fill="blue" strokeOpacity={0.5} />
      <XAxis dataKey={"name"} hide={true} orientation='top' scale="band" angle="-8"/>
      <CartesianGrid stroke="#ddd" />
      <Tooltip content={ModifyTooltip}/>
      <YAxis {...YAxisSharedProps} tickFormatter={formatYAxis} hide={true}/>
      <Line type="monotone" dataKey="display.max" stroke='green' label={<ConditionLabel data={data} displayKey="max" />}  />
      <Line type="monotone" dataKey="display.min" stroke='green' label={<ConditionLabel data={data}  />} />
  </LineChart>
</span>
</div>
);

export default Sample
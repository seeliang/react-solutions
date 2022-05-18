import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea, Tooltip } from 'recharts';
import {XAxisJustifiedProps, timeToNum, XDisplayReset} from './SingleFloat';

const data = [
  {
    name: "12:00",
    max: 100,
    min: 89,
  },
  {
    name: "12:15",
    max: 100,
    min: 35
  },
  {
    name: "12:30",
    max: 100,
    min: 90
  },
  {
    name: "12:45",
    max: 90,
    min: 86
  },
  {
    name: "13:00",
    max: 77,
    min: 64
  },
  {
    name: "13:15",
    max: 110,
    min: 85
  },
  {
    name: "13:30",
    max: 308,
    min: 110
  },
  {
    name: "14:00",
    max: 100,
    min: 89,
  },
  {
    name: "14:15",
    max: 100,
    min: 67
  },
  {
    name: "14:30",
    max: 100,
    min: 90
  },
  {
    name: "14:45",
    max: 90,
    min: 86
  },
  {
    name: "15:00",
    max: 70,
    min: 64
  },
  {
    name: "15:15",
    max: 110,
    min: 85
  },
  {
    name: "15:30",
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
    time: XDisplayReset(timeToNum(i.name)),
    max: i.max > YDomain[1] ? displayReset(YDomain[1] - 5) : round5(displayReset(i.max)), 
    min: i.min < YDomain[0] ? displayReset(YDomain[0] + 5) : round5(displayReset(i.min)) 
    } 
  }) )
}

export class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, index, data, displayKey } = this.props;

    const content = displayKey? displayKey : "max"

    const word = data[index][content];

    const incorrect = word < 40 

    return (
      <text x={x} y={y} dy={5} fontSize={14} fill={incorrect? "red" : "white"} textAnchor="middle" textDecoration={incorrect ? "line-through" : ""}>
        {word}
      </text>
    );
  }
}

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


const ConditionLabel = (props) => {
  const {value, x, y, displayKey, color} = props;

  const text = displayKey ? displayKey : "min"

  const fill = color ? color : "green"

  if (value < displayReset(safeRange[1])&& value > displayReset(safeRange[0])) {
    return <circle r="7" fill={fill} cx={x} cy={y}/>;
  };

  return (<>
    <circle r="15" fill={fill} cx={x} cy={y}/>;
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
      <XAxis {...XAxisJustifiedProps}/>
      <CartesianGrid stroke="#ddd" />
      <Tooltip content={ModifyTooltip}/>
      <YAxis {...YAxisSharedProps} tickFormatter={formatYAxis} hide={true}/>
      <Line dataKey="display.max" stroke='blue' label={<ConditionLabel data={data} displayKey="max" color ="indigo"/>}  />
      <Line dataKey="display.min" stroke='green' label={<ConditionLabel data={data}  />} />
  </LineChart>
</span>
</div>
);

export default Sample
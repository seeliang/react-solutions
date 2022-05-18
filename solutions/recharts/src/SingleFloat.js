import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea, Tooltip } from 'recharts';

const data = [
  {
    name: "12:00",
    min: 39.5,
  },
  {
    name: "12:15",
    min: 45.3
  },
  {
    name: "12:30",
    min: 39.0
  },
  {
    name: "12:38",
    min: 36.0
  },
  {
    name: "13:00",
    min: 44.0
  },
  {
    name: "13:15",
    min: 35.2
  },
  {
    name: "13:30",
    min: 41.0
  },
  {
    name: "14:00",
    min: 38.9,
  },
  {
    name: "14:15",
    min: 36.7
  },
  {
    name: "14:30",
    min: 39.0
  },
  {
    name: "14:38",
    min: 38.6
  },
  {
    name: "15:00",
    min: 46.4
  },
  {
    name: "15:15",
    min: 38.5
  },
  {
    name: "15:30",
    min: 41.1
  }
];

const YDisplayReset = (value) => value - YDomain[0];

export const XDisplayReset = (value) => {
  return value - timeToNum(data[0].name); 
}

function roundToHalf (x) {
  return Math.ceil(x/gap)*gap - gap / 2
}

function formatData (value)  {
  if (value < YDomain[0]) {
    return gap / 2
  }
  if (value > YDomain[1]) {
    return YDisplayReset(YDomain[1]) - gap / 2;
  }

  return roundToHalf(YDisplayReset(value))
}

function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    min: formatData(i.min),
    time: XDisplayReset(timeToNum(i.name))
    } 
  }) )
}


export class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, index, data, displayKey } = this.props;

    const content = displayKey? displayKey : "min"

    return (<>
      <circle r="8" fill="green" cx={x} cy={y}/>
      {/* <text x={x} y={y} dy={5} fontSize={14} fill={"white"} textAnchor="middle">
        {data[index][content]}
      </text> */}
      </>

    );
  }
}

export const TableHead = () => (
  <div className="table sticky-header">
    <span className="sticky cell table">
  <span className=" title"> From 21/07</span>
  <span className="cell" >
  
  </span>
  </span>
  <span className="cell">
  <LineChart width={1700} height={40} data={addDisplayToData(data)}>
      <XAxis  {...XAxisProps}/>
  </LineChart>
  </span>
  </div>
)

  const YDomain = [34,42];
  const gap = 0.4
  const safeRange = [36.0,38.0]

  function formatYAxis(value) {


    const start = gap;
    const end = parseFloat(YDisplayReset(YDomain[1] - gap).toFixed(1));

    if(value === end ) return "Over " + (YDomain[1] - gap)
    if (value < end && value > start) return value + YDomain[0]
    if(value === start) return "Under " + (YDomain[0] + gap )
    return ""
  }

  function formatXAxis(value) {
    const m = value % 60;
    const h = Math.floor(value / 60) + 12;
    const word = `${h} : ${m}`
    return m === 0 ? `${word}0` : word
  }

  const ModifyTooltip = (props) => {
    const {payload} = props;
    const render = payload.map(i => i.payload);
    if(!render[0]) {
      return;
    }
    const {name, min } = render[0];
  
    return(
      <span className='tooltip'>
         <p> time: {name} </p>
        <p> min: {min} </p>
      </span>
    )
    }

export const timeToNum = (string) => {
  const raw = string.split(":");
  const result = parseInt(raw[0]) * 60 + parseInt(raw[1]) 
  return result;
}

const YTickCount = (Math.ceil(YDisplayReset(YDomain[1])/gap) + 2).toString(10);

const YAxisSharedProps = {
  tickCount: YTickCount,
  domain:[0,YDisplayReset(YDomain[1])],
  tickFormatter: formatYAxis
}

const XAxisProps = {
  dataKey:"display.time",
   type:"number",
   orientation:'top',
    tickCount:"17",
     tickFormatter:formatXAxis,
      padding: {left: 40},
}

export const ErrorInputProps = {
  x1:13,
  x2:17,
  fill: "red",
  strokeOpacity:"0.5" 
}

export const XAxisJustifiedProps =  {...XAxisProps, hide: true}

const LineChartProps = {
  height: 500,
  data: addDisplayToData(data),
}

 const Sample = () => (
  <div className="table">
  <span className="sticky cell table">
    <span className=" title">Heart Beat Rate</span>
    <span className="cell" >
      <LineChart width={120} {...LineChartProps}>
        <YAxis {...YAxisSharedProps} width={110} />
      </LineChart>
    </span>
  </span>
  <span className="cell">
    <LineChart width={1700} {...LineChartProps}>
      <ReferenceArea  y1={YDisplayReset(safeRange[1])} y2={YDisplayReset(YDomain[1])} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={YDisplayReset(safeRange[1])} y2={YDisplayReset(safeRange[1] + gap / 2)} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={0} y2={YDisplayReset(safeRange[0])} fill="blue" strokeOpacity={0.5} />
      <XAxis {...XAxisJustifiedProps}/>
      <Tooltip content={ModifyTooltip}/>
      <CartesianGrid stroke="#ddd"/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Line dataKey="display.min" stroke='green' label={<CustomizedLabel data={data}/>}  />
      <ReferenceArea  {...ErrorInputProps} />
  </LineChart>
</span>
</div>
);

export default Sample
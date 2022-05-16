import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea, Tooltip } from 'recharts';

const data = [
  {
    name: "21/07 12:00",
    min: 39.5,
  },
  {
    name: "21/07 12:15",
    min: 45.3
  },
  {
    name: "21/07 12:30",
    min: 39.0
  },
  {
    name: "21/07 12:45",
    min: 36.0
  },
  {
    name: "21/07 13:00",
    min: 44.0
  },
  {
    name: "21/07 13:15",
    min: 35.2
  },
  {
    name: "21/07 13:30",
    min: 41.0
  },
  {
    name: "21/07 14:00",
    min: 38.9,
  },
  {
    name: "21/07 14:15",
    min: 36.7
  },
  {
    name: "21/07 14:30",
    min: 39.0
  },
  {
    name: "21/07 14:45",
    min: 38.6
  },
  {
    name: "21/07 15:00",
    min: 46.4
  },
  {
    name: "21/07 15:15",
    min: 38.5
  },
  {
    name: "21/07 15:30",
    min: 41.1
  }
];

const displayReset = (value) => value - YDomain[0];

function roundToHalf (x) {
  return Math.ceil(x/gap)*gap - gap / 2
}

function formatData (value)  {
  if (value < YDomain[0]) {
    return gap / 2
  }
  if (value > YDomain[1]) {
    return displayReset(YDomain[1]) - gap / 2;
  }

  return roundToHalf(displayReset(value))
}

function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    min: formatData(i.min) 
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

  const YDomain = [34,42];
  const gap = 0.4
  const safeRange = [36.0,38.0]

  function formatYAxis(value) {


    const start = gap;
    const end = parseFloat(displayReset(YDomain[1] - gap).toFixed(1));

    if(value === end ) return "Over " + (YDomain[1] - gap)
    if (value < end && value > start) return value + YDomain[0]
    if(value === start) return "Under " + (YDomain[0] + gap )
    return ""
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

const tickCount = (Math.ceil(displayReset(YDomain[1])/gap) + 2).toString(10);

const YAxisSharedProps = {
  tickCount,
  domain:[0,displayReset(YDomain[1])],
  tickFormatter: formatYAxis
}

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
      <ReferenceArea  y1={displayReset(safeRange[1])} y2={displayReset(YDomain[1])} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={displayReset(safeRange[1])} y2={displayReset(safeRange[1] + gap / 2)} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={0} y2={displayReset(safeRange[0])} fill="blue" strokeOpacity={0.5} />
      <XAxis dataKey={"name"} hide={true} orientation='top' scale="band" angle="-8"/>
      <Tooltip content={ModifyTooltip}/>
      <CartesianGrid stroke="#ddd"/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Line dataKey="display.min" stroke='green' label={<CustomizedLabel data={data}/>}  />
  </LineChart>
</span>
</div>
);

export default Sample
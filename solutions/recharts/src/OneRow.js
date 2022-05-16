import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis,  } from 'recharts';

const data = [
  {
    name: "21/07 12:00",

    min: 8,
  },
  {
    name: "21/07 12:15",
    min: 3
  },
  {
    name: "21/07 12:30",

    min: 9
  },
  {
    name: "21/07 12:45",

    min: 8
  },
  {
    name: "21/07 13:00",
    min: 6
  },
  {
    name: "21/07 13:15",

    min: 8
  },
  {
    name: "21/07 13:30",

    min: 1
  },
  {
    name: "21/07 14:00",

    min: 8,
  },
  {
    name: "21/07 14:15",

    min: 6
  },
  {
    name: "21/07 14:30",

    min: 9
  },
  {
    name: "21/07 14:45",
 
    min: 8
  },
  {
    name: "21/07 15:00",

    min: 6
  },
  {
    name: "21/07 15:15",

    min: 8
  },
  {
    name: "21/07 15:30",

    min: 1
  }
];


function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    min: 5
    } 
  }) )
}

export class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, index, data, displayKey } = this.props;

    const content = displayKey? displayKey : "min"

    return (<>
      <circle r="15" fill="green" cx={x} cy={y}/>
      <text x={x} y={y} dy={5} fontSize={14} fill={"white"} textAnchor="middle">
        {data[index][content]}
      </text>
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

  const YDomain = [0,10];



const tickCount = "2"
const YAxisSharedProps = {
  tickCount,
  domain:YDomain
}

const LineChartProps = {
  height: 80,
  data: addDisplayToData(data)
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

      <XAxis dataKey={"name"} hide={true} orientation='top' scale="band" angle="-8"/>

      <YAxis {...YAxisSharedProps}  hide={true}/>
      <Line dataKey="display.min" strokeWidth="0" label={<CustomizedLabel data={data}/>}  />
  </LineChart>
</span>
</div>
);

export default Sample
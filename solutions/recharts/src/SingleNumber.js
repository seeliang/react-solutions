import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea, ReferenceLine } from 'recharts';
import {XAxisJustifiedProps, timeToNum, XDisplayReset, ErrorInputProps} from './XAxisFunc';
import { data } from './data';

const displayReset = (value) => value - YDomain[0];

function round5 (x) {
  return Math.ceil(x/10)*10 - 5
}

function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    max: i.number.max > YDomain[1] ? displayReset(YDomain[1] - 5) : round5(displayReset(i.number.max)), 
    time: XDisplayReset(timeToNum(i.name))
    } 
  }) )
}

export class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, index, data, displayKey } = this.props;

    const content = displayKey? displayKey : "max"

    return (<>
      <circle r="15" fill="green" cx={x} cy={y}/>
      <text x={x} y={y} dy={5} fontSize={14} fill={"white"} textAnchor="middle">
        {data[index].number[content]}
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

  const YDomain = [60,140];

  const safeRange = [80,120]



  function formatYAxis(value) {

    const start = 10;
    const end = displayReset(YDomain[1] - 10);

    if(value === end ) return "Over " + (YDomain[1] - 10)
    if (value < end && value > start) return value + YDomain[0]
    if(value === start) return "Under " + (YDomain[0] + 10 )
    return ""
  }

const tickCount = (Math.ceil(displayReset(YDomain[1])/10) + 1).toString(10);

const YAxisSharedProps = {
  tickCount,
  domain:[0,displayReset(YDomain[1])]
}

const LineChartProps = {
  height: 300,
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
      <ReferenceArea  y1={displayReset(110)} y2={displayReset(safeRange[1])} fill="orange" strokeOpacity={0.5} />
      <ReferenceArea  y1={displayReset(safeRange[1])} y2={displayReset(YDomain[1])} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={displayReset(safeRange[1])} y2={displayReset(safeRange[1] + 2)} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={0} y2={displayReset(safeRange[0])} fill="blue" strokeOpacity={0.5} />
      <XAxis {...XAxisJustifiedProps}/>
      <CartesianGrid stroke="#ddd" />
      <YAxis {...YAxisSharedProps} tickFormatter={formatYAxis} hide={true}/>
      <Line dataKey="display.max" stroke='green' label={<CustomizedLabel data={data}/>}  />
      <ReferenceLine  {...ErrorInputProps} />
  </LineChart>
</span>
</div>
);

export default Sample
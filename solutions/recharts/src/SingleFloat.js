import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea, Tooltip, ReferenceLine } from 'recharts';
import {XAxisJustifiedProps, ErrorInputProps, getResetTime} from './XAxisFunc';

import { data } from './data';

const YDisplayReset = (value) => value - YDomain[0];


function roundToHalf (x) {
  return Math.ceil(x/YGap)*YGap - YGap / 2
}

function formatData (value)  {
  if (value < YDomain[0]) {
    return YGap / 2
  }
  if (value > YDomain[1]) {
    return YDisplayReset(YDomain[1]) - YGap / 2;
  }

  return roundToHalf(YDisplayReset(value))
}

function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    min: formatData(i.float.min),
    time: getResetTime(i.name)
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

  const YDomain = [34,42];
  const YGap = 0.5
  const safeRange = [36.0,38.0]

  function formatYAxis(value) {


    const start = YGap;
    const end = parseFloat(YDisplayReset(YDomain[1] - YGap).toFixed(1));

    if(value === end ) return "Over " + (YDomain[1] - YGap)
    if (value < end && value > start) return value + YDomain[0]
    if(value === start) return "Under " + (YDomain[0] + YGap )
    return ""
  }

  const ModifyTooltip = (props) => {
    const {payload} = props;
    const render = payload.map(i => i.payload);
    if(!render[0]) {
      return;
    }
    const {name, float } = render[0];
  
    return(
      <span className='tooltip'>
         <p> time: {name} </p>
        <p> min: {float.min} </p>
      </span>
    )
    }


const YTickCount = (Math.ceil(YDisplayReset(YDomain[1])/YGap) + 2).toString(10);

const YAxisSharedProps = {
  tickCount: YTickCount,
  domain:[0,YDisplayReset(YDomain[1])],
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
      <ReferenceArea  y1={YDisplayReset(safeRange[1])} y2={YDisplayReset(YDomain[1])} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={YDisplayReset(safeRange[1])} y2={YDisplayReset(safeRange[1] + YGap / 2)} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={0} y2={YDisplayReset(safeRange[0])} fill="blue" strokeOpacity={0.5} />
      <XAxis {...XAxisJustifiedProps}/>
      <Tooltip content={ModifyTooltip}/>
      <CartesianGrid stroke="#ddd"/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Line dataKey="display.min" stroke='green' label={<CustomizedLabel data={data}/>}  />
      <ReferenceLine {...ErrorInputProps} />
  </LineChart>
</span>
</div>
);

export default Sample
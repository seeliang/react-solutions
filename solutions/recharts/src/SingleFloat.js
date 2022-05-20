import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea, Tooltip, ReferenceLine } from 'recharts';
import {XAxisJustifiedProps, ErrorInputProps, getResetTime,XWidth} from './XAxisFunc';
import {DotLabel} from './Label';
import { data } from './data';
import ModifyTooltip from './Tooltip'

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

  const CustomizedTooltip = ({payload}) => {
    const render = payload.map(i => i.payload);
    if(!render[0]) {
      return;
    }
    const {name, float } = render[0];
    const passing = {
      time: name, min: float.min
    }
    return(
      <ModifyTooltip data={passing}/>
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
    <LineChart width={XWidth} {...LineChartProps}>
      <ReferenceArea  y1={YDisplayReset(safeRange[1])} y2={YDisplayReset(YDomain[1])} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={YDisplayReset(safeRange[1])} y2={YDisplayReset(safeRange[1] + YGap / 2)} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={0} y2={YDisplayReset(safeRange[0])} fill="blue" strokeOpacity={0.5} />
      <XAxis {...XAxisJustifiedProps}/>
      <Tooltip content={CustomizedTooltip}/>
      <CartesianGrid stroke="#ddd"/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Line dataKey="display.min" stroke='green' label={<DotLabel data={data}/>}  />
      <ReferenceLine {...ErrorInputProps} />
  </LineChart>
</span>
</div>
);

export default Sample
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {XAxisJustifiedProps, getResetTime,XWidth} from './XAxisFunc';
import {DotLabel} from './Label';
import { data } from './data';
import ModifyTooltip from './Tooltip';
import {getYAxisSharedProps, formatData, getYAxisHeight} from './YAxisFunc';
import backgroundFill from './backgroundFill';

const YDomain = [34,42];
const YGap = 0.5
const safeRange = [36.0,38.0]
const backgroundSections = [{y1:safeRange[1], y2: YDomain[1]},{y1:safeRange[1], y2: (safeRange[1] + YGap / 2)},{y1:YDomain[0], y2: safeRange[0], fill: "blue"}]

const addDisplayToData = (data) => data.filter(i => !i.isError ).map(i => 
    ({...i, 
    display: {
    min: formatData({domain:YDomain, gap: YGap, value:i.float.min}),
    time: getResetTime(i.name)
    } 
  }))


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

const YAxisSharedProps = getYAxisSharedProps({gap: YGap, domain: YDomain})

const LineChartProps = {
  height: getYAxisHeight({domain: YDomain, gap: YGap}),
  data: addDisplayToData(data),
}

 const Sample = () => (
  <div className="table">
  <span className="sticky cell table">
    <span className=" title">Data range</span>
    <span className="cell" >
      <LineChart width={120} {...LineChartProps}>
        <YAxis {...YAxisSharedProps} width={110} />
      </LineChart>
    </span>
  </span>
  <span className="cell">
    <LineChart width={XWidth} {...LineChartProps}>
      {backgroundFill({array: backgroundSections, domain: YDomain})}
      <XAxis {...XAxisJustifiedProps}/>
      <Tooltip content={CustomizedTooltip}/>
      <CartesianGrid stroke="#ddd"/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Line dataKey="display.min" stroke='black' label={<DotLabel data={data} fill="black"/>}  />
  </LineChart>
</span>
</div>
);

export default Sample
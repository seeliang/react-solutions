import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import {XAxisJustifiedProps, ErrorInputProps, getResetTime, XWidth} from './XAxisFunc';
import {ConditionLabel} from './Label';
import { data } from './data'
import { getYAxisHeight, getYAxisSharedProps, formatData} from './YAxisFunc'
import ModifyTooltip from './Tooltip';
import backgroundFill from './backgroundFill';

const YDomain = [60,220];
const safeRange = [80,180]
const YGap = 10
const backgroundSections= [{y1: 150, y2: safeRange[1], fill: "orange"},{y1: safeRange[1], y2: YDomain[1] },
{y1: safeRange[1], y2: safeRange[1] + 2},{y1: YDomain[0], y2: safeRange[0], fill: "blue"} ]

function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    time: getResetTime(i.name),
    max: formatData({domain: YDomain, gap: YGap, value: i.double.max}), 
    min: formatData({domain: YDomain, gap: YGap, value: i.double.min}), 
    } 
  }) )
}

const CustomizedTooltip = ({payload}) => {
  const render = payload.map(i => i.payload);
  if(!render[0]) {
    return;
  }
  const {name, double} = render[0];
  const {min, max} = double;

  const passing = {
    time: name, max, min
  }

  return(
    <ModifyTooltip data={passing} />
  )
}


const YAxisSharedProps = getYAxisSharedProps({domain: YDomain, gap: YGap})

const LineChartProps = {
  height: getYAxisHeight({domain: YDomain, gap: YGap}),
  data: addDisplayToData(data)
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
      <CartesianGrid stroke="#ddd" />
      <Tooltip content={CustomizedTooltip}/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Line dataKey="display.max" stroke='blue' label={<ConditionLabel section="double" data={data} displayKey="max" color ="indigo" domain={YDomain} safeRange={safeRange}/>}  />
      <Line dataKey="display.min" stroke='green' label={<ConditionLabel section="double" data={data} domain={YDomain} safeRange={safeRange} />} />
      <ReferenceLine  {...ErrorInputProps} />
  </LineChart>
</span>
</div>
);

export default Sample
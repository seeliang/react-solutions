import { ComposedChart, LineChart, Line, XAxis, YAxis, CartesianGrid , Scatter, Tooltip} from 'recharts';
import {XAxisGraphProps,  timeToNum, XWidth,CartesianGridProps} from './XAxisFunc';
import { data } from './data';
import TextLabel, {EmptyShape} from './Label';
import ModifyTooltip from './Tooltip';
import {getYAxisSharedProps, formatData, getYAxisHeight} from './YAxisFunc';
import backgroundFill from './backgroundFill';

// need to increase Domain or reduce gap to fix gap position
const YDomain = [60,160]; 
const YGap = 10;
const safeRange = [80,120]
const backgroundSections = [{y1:safeRange[1], y2: YDomain[1]},{y1:safeRange[1], y2: (safeRange[1] + 2)},
{y1:YDomain[0], y2: safeRange[0], fill: "blue"},{y1:safeRange[1] - YGap, y2: safeRange[1], fill: "orange"}]


const addDisplayToData = (data) =>  data.map(i => i.isError ? 
  {...i, 
    display: {
      error: formatData({domain:YDomain, gap: YGap, value:i.number.max}),
      time: timeToNum(i.name)
    } 
  } : ({...i, 
    display: {
      max: formatData({domain:YDomain, gap: YGap, value:i.number.max}),
      time: timeToNum(i.name)
    } 
  }) )

const YAxisSharedProps = getYAxisSharedProps({domain: YDomain,gap: YGap});

const CustomizedTooltip = ({payload}) => {
  const render = payload.map(i => i.payload);
  if(!render[0] || !render[0].isError) {
    return;
  }
  const {name, number } = render[0];
  const passing = {
    time: name, max: number.max
  }
  return(
    <ModifyTooltip data={passing}/>
  )
}

const LineChartProps = {
  height: getYAxisHeight({domain: YDomain, gap: YGap}),
  data: addDisplayToData(data),
}

 const Sample = () => (
  <div className="table">
  <span className="sticky cell table">
    <span className=" title">Heart Beat Rate</span>
    <span className="cell" >
      <LineChart width={120} {...LineChartProps}>
        <YAxis {...YAxisSharedProps} width={110}  />
      </LineChart>
    </span>
  </span>
  <span className="cell">
    <ComposedChart width={XWidth} {...LineChartProps}>
      {backgroundFill({array: backgroundSections, domain: YDomain})}
      <XAxis {...XAxisGraphProps}/>
      <Tooltip dataKey="display.error" content={CustomizedTooltip}/>
      <CartesianGrid {...CartesianGridProps} />
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Scatter dataKey="display.error" fill="grey"  shape={<EmptyShape data={data}/>} />
      <Line dataKey="display.max" stroke='green' connectNulls label={<TextLabel data={data} section="number"/>}  />
  </ComposedChart>
</span>
</div>
);

export default Sample
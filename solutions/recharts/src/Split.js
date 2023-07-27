import { ComposedChart, LineChart, Line, XAxis, YAxis, CartesianGrid , Scatter, Tooltip} from 'recharts';
import {XAxisGraphProps,  timeToNum, XWidth, CartesianGridProps} from './XAxisFunc';
import { data } from './data';
import TextLabel,{EmptyShape} from './Label';
import ModifyTooltip from './Tooltip';
import { formatYData, getYAxisHeight, getYAxisProps} from './YAxisFunc';
import {backgroundYFill} from './backgroundFill';

// need to increase Domain or reduce gap to fix gap
const YDomain = [-100,150]; 
const YGap = 10;
const backgroundSections = [{y1:-0.5, y2: 0.5, }]

const addDisplayToData = (data) =>  data.map(i => i.isError ? 
  {...i, 
    display: {
      error: formatYData({domain:YDomain, gap: YGap, value:i.split.min}),
      time: timeToNum(i.name)
    } 
  } : ({...i, 
    display: {
      min: formatYData({domain:YDomain, gap: YGap, value:i.split.min}),
      time: timeToNum(i.name)
    } 
  }) )

const YAxisSharedProps = getYAxisProps({domain: YDomain,gap: YGap});

const CustomizedTooltip = ({payload}) => {
  const render = payload.map(i => i.payload);
  if(!render[0] || !render[0].isError) {
    return;
  }
  const {name, split } = render[0];
  const passing = {
    time: name, min: split.min
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
    {backgroundYFill({array: backgroundSections, domain: YDomain})}
      <XAxis {...XAxisGraphProps}/>
      <Tooltip dataKey="display.error" content={CustomizedTooltip}/>
      <CartesianGrid {...CartesianGridProps} />
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Scatter dataKey="display.error" fill="grey" shape={<EmptyShape data={data}/>} />
      <Line dataKey="display.min" stroke='black' connectNulls label={<TextLabel data={data} section="split" displayKey="min" fill="black"/>}  />
  </ComposedChart>
</span>
</div>
);

export default Sample
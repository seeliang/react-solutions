import { Bar, ComposedChart, Scatter, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {XAxisGraphProps, timeToNum, XWidth, CartesianGridProps} from './XAxisFunc';
import { data } from './data'
import { formatYData, getYAxisHeight, getYAxisProps} from './YAxisFunc';
import { EmptyShape } from './Label';
import ModifyTooltip from './Tooltip';
const YDomain = [0,310];
const YGap = 10

function addDisplayToData (data) {
  return data.map(i => i.isError ? 
    ({...i,
      display: {
      time: timeToNum(i.name),
      error:  formatYData({domain: YDomain, gap: YGap, value: i.double.min}) ,
      } 
    })
    :
    ({...i,
    display: {
    time: timeToNum(i.name),
    max: formatYData({domain: YDomain, gap: YGap, value: i.double.max}) + YGap / 2,
    min: formatYData({domain: YDomain, gap: YGap, value: i.double.min}),
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

const YAxisSharedProps = getYAxisProps({domain: YDomain, gap: YGap, isStartFromZero: true})

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
    <ComposedChart width={XWidth} {...LineChartProps}>
      <XAxis {...XAxisGraphProps}/>
      <CartesianGrid {...CartesianGridProps} />
      <Tooltip content={CustomizedTooltip}/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Scatter dataKey="display.error" fill="grey" shape={<EmptyShape data={data}/>} />
  
      <Bar dataKey="display.min" stackId="join" fill="indigo" />
      <Bar dataKey="display.max" stackId="join" fill="aquamarine"/>
  </ComposedChart>
</span>
</div>
);

export default Sample
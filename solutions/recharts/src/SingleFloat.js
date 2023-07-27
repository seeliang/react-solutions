import {LineChart, Scatter, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {XAxisGraphProps, timeToNum,XWidth, CartesianGridProps} from './XAxisFunc';
import {ConditionLabel, getShouldShowLine, getShouldShowText, EmptyShape} from './Label';
import { data } from './data';
import ModifyTooltip from './Tooltip';
import { formatYData, getYAxisHeight, getYAxisProps} from './YAxisFunc';
import {backgroundYFill} from './backgroundFill';

const YDomain = [34,42];
const YGap = 0.5
const safeRange = [36.0,38.0]
const backgroundSections = [{y1:safeRange[1], y2: YDomain[1]},{y1:safeRange[1], y2: (safeRange[1] + YGap / 2)},{y1:YDomain[0], y2: safeRange[0], fill: "blue"}]

const addDisplayToData = (data) => data.map(i => i.isError ? ({...i, 
  display: {
    error: formatYData({domain:YDomain, gap: YGap, value:i.float.min}),
    time: timeToNum(i.name)
    } 
  }) :
    ({...i, 
    display: {
    min: formatYData({domain:YDomain, gap: YGap, value:i.float.min}),
    time: timeToNum(i.name)
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




const CustomizedLabel = (props) => {
  const { index, data} = props
  const shouldShowText = getShouldShowText(props);
  const isTextOnLeft = index === data.length - 2;
  const shouldShowLine = getShouldShowLine(props)

  return <ConditionLabel {...props} shouldShowText={shouldShowText} isTextOnLeft={isTextOnLeft} color="black" shouldShowLine={shouldShowLine}/>
}

const YAxisSharedProps = getYAxisProps({gap: YGap, domain: YDomain})

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
    <ComposedChart width={XWidth} {...LineChartProps}>
      {backgroundYFill({array: backgroundSections, domain: YDomain})}
      <XAxis {...XAxisGraphProps}/>
      <Tooltip content={CustomizedTooltip}/>
      <CartesianGrid {...CartesianGridProps}/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Scatter dataKey="display.error" fill="grey" shape={<EmptyShape data={data}/>} />
      <Line dataKey="display.min" connectNulls stroke='black' label={<CustomizedLabel data={data} section="float" fill="black"/>}  />
  </ComposedChart>
</span>
</div>
);

export default Sample
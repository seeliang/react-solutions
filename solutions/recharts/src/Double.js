import { Bar, ComposedChart, Scatter, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {XAxisGraphProps, timeToNum, XWidth, CartesianGridProps} from './XAxisFunc';
import { data } from './data'
import ModifyTooltip from './Tooltip';
import { ConditionLabel, getShouldShowLine, getShouldShowText, EmptyShape} from './Label';
import { formatYData, getYAxisHeight, getYAxisProps} from './YAxisFunc';
import {backgroundYFill} from './backgroundFill';
 
const YDomain = [60,220];
const safeRange = [80,180]
const YGap = 10
const backgroundSections= [{y1: 150, y2: safeRange[1], fill: "orange"},{y1: safeRange[1], y2: YDomain[1] },
{y1: safeRange[1], y2: safeRange[1] + 2},{y1: YDomain[0], y2: safeRange[0], fill: "blue"} ]

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
    double: [formatYData({domain: YDomain, gap: YGap, value: i.double.max}), formatYData({domain: YDomain, gap: YGap, value: i.double.min})] ,
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

const Line = ({x,y, gap}) => {
  const strokeWidth = 3;
  const capWidth = 7;
  const XCorrected = x + capWidth + strokeWidth / 2;
  const YTop = y;
  const YBottom = y + gap;
  return <>
    <line stroke='black' strokeWidth={strokeWidth} x1={XCorrected - capWidth} y1={YTop} x2={XCorrected + capWidth} y2={YTop}/>
    <line stroke='black' strokeWidth={strokeWidth} x1={XCorrected} y1={YBottom} x2={XCorrected} y2={YTop}/>
    <line stroke='black' strokeWidth={strokeWidth} x1={XCorrected - capWidth } y1={YBottom} x2={XCorrected + capWidth} y2={YBottom}/>
  </>
}

const BarShape = (props) => {
  const {x,y, height, isError, index} = props
  if(isError) {
    return
  }
  const shouldShowText = getShouldShowText(props);
  const isTextOnLeft = index === data.length - 2;
  const shouldShowLine = getShouldShowLine(props);
  if(shouldShowLine) {
    return <ConditionLabel {...props} shouldShowText={shouldShowText} isTextOnLeft={isTextOnLeft} color="black" shouldShowLine={shouldShowLine}/>
  }
  return (<>
    <Line  x={x} y={y} gap={height} />
  </>)
}

const YAxisSharedProps = getYAxisProps({domain: YDomain, gap: YGap})

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
      {backgroundYFill({array: backgroundSections, domain: YDomain})}
      <XAxis {...XAxisGraphProps}/>
      <CartesianGrid {...CartesianGridProps}/>
      <Tooltip content={CustomizedTooltip}/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Scatter dataKey="display.error" fill="grey" shape={<EmptyShape data={data}/>}  />
      <Bar dataKey="display.double"  shape={<BarShape displayKey="double" section="double" data={data}/>} />
  </ComposedChart>
</span>
</div>
);

export default Sample
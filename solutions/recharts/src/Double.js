import { Bar, BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {XAxisJustifiedProps, getResetTime, XWidth} from './XAxisFunc';
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
    middle: [formatData({domain: YDomain, gap: YGap, value: i.double.max}), formatData({domain: YDomain, gap: YGap, value: i.double.min})] ,
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

const Line = ({x,y, gap}) => {
  const strokeWidth = 2;
  const capWith = 6;
  const XCorrected = x + 4;
  const YTop = y + gap;
  const YBottom = y - gap;
  return <>
    <line stroke='black' strokeWidth={strokeWidth} x1={XCorrected - capWith} y1={YTop} x2={XCorrected + capWith} y2={YTop}/>
    <line stroke='black' strokeWidth={strokeWidth} x1={XCorrected} y1={YBottom} x2={XCorrected} y2={YTop}/>
    <line stroke='black' strokeWidth={strokeWidth} x1={XCorrected - capWith } y1={YBottom} x2={XCorrected + capWith} y2={YBottom}/>
  </>
}


const BarShape = (props) => {
  const {x,y, payload} = props
  const {max, min} = payload.display;
  const gap = max - min 

  return (<>
    <Line  x={x} y={y} gap={gap}/>
  </>)
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
    <BarChart width={XWidth} {...LineChartProps}>
      {backgroundFill({array: backgroundSections, domain: YDomain})}
      <XAxis {...XAxisJustifiedProps}/>
      <CartesianGrid stroke="#ddd" />
      <Tooltip content={CustomizedTooltip}/>
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Bar dataKey="display.middle" stroke='green' />
  </BarChart>
</span>
</div>
);

export default Sample
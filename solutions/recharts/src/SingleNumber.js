import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import {XAxisJustifiedProps, errorIndicators, getResetTime, XWidth} from './XAxisFunc';
import { data } from './data';
import TextLabel from './Label';
import {getYAxisSharedProps, formatData, getYAxisHeight} from './YAxisFunc';
import backgroundFill from './backgroundFill';

// need to increase Domain or reduce gap to fix gap
const YDomain = [60,160]; 
const YGap = 10;
const safeRange = [80,120]
const backgroundSections = [{y1:safeRange[1], y2: YDomain[1]},{y1:safeRange[1], y2: (safeRange[1] + 2)},
{y1:YDomain[0], y2: safeRange[0], fill: "blue"},{y1:safeRange[1] - YGap, y2: safeRange[1], fill: "orange"}]


function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    max: formatData({domain:YDomain, gap: YGap, value:i.number.max}),
    time: getResetTime(i.name)
    } 
  }) )
}

const YAxisSharedProps = getYAxisSharedProps({domain: YDomain,gap: YGap});


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
    <LineChart width={XWidth} {...LineChartProps}>
      {backgroundFill({array: backgroundSections, domain: YDomain})}
      <XAxis {...XAxisJustifiedProps}/>
      <CartesianGrid stroke="#ddd" />
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Line dataKey="display.max" stroke='green' label={<TextLabel data={data} section="number"/>}  />
      {errorIndicators()}
  </LineChart>
</span>
</div>
);

export default Sample
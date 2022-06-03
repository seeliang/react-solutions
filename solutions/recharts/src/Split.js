import { ComposedChart, LineChart, Line, XAxis, YAxis, CartesianGrid , Scatter, Tooltip} from 'recharts';
import {XAxisJustifiedProps,  getResetTime, XWidth} from './XAxisFunc';
import { data } from './data';
import TextLabel from './Label';
import ModifyTooltip from './Tooltip';
import {getYAxisSharedProps, formatData, getYAxisHeight} from './YAxisFunc';
import backgroundFill from './backgroundFill';

// need to increase Domain or reduce gap to fix gap
const YDomain = [-100,150]; 
const YGap = 10;
const backgroundSections = [{y1:-1, y2: 1}]

const addDisplayToData = (data) =>  data.map(i => i.isError ? 
  {...i, 
    display: {
      error: formatData({domain:YDomain, gap: YGap, value:i.split.min}),
      time: getResetTime(i.name)
    } 
  } : ({...i, 
    display: {
      min: formatData({domain:YDomain, gap: YGap, value:i.split.min}),
      time: getResetTime(i.name)
    } 
  }) )

const YAxisSharedProps = getYAxisSharedProps({domain: YDomain,gap: YGap});

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
    {backgroundFill({array: backgroundSections, domain: YDomain})}
      <XAxis {...XAxisJustifiedProps}/>
      <Tooltip dataKey="display.error" content={CustomizedTooltip}/>
      <CartesianGrid stroke="#ddd" />
      <YAxis {...YAxisSharedProps} hide={true}/>
      <Scatter dataKey="display.error" fill="red" shape="star" />
      <Line dataKey="display.min" stroke='green' connectNulls label={<TextLabel data={data} section="split" displayKey="min"/>}  />
  </ComposedChart>
</span>
</div>
);

export default Sample
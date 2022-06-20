
import { ComposedChart,LineChart, Line, XAxis, YAxis, Tooltip, Scatter} from 'recharts';
import TextLabel, {EmptyShape} from './Label';
import {XAxisJustifiedProps,  getResetTime, XWidth} from './XAxisFunc';
import ModifyTooltip from './Tooltip';
import { data } from './data';

const addDisplayToData = (data) => 
  data.map(i => i.isError ?
    ({...i, 
      display: {
      error: 5,
      time: getResetTime(i.name)
      } 
    }) : ({...i, 
    display: {
    min: 5,
    time: getResetTime(i.name)
    } 
  }) )

const YDomain = [0,10];

const tickCount = "2"
const YAxisSharedProps = {
  tickCount,
  domain:YDomain
}

const CustomizedTooltip = ({payload}) => {
  const render = payload.map(i => i.payload);
  if(!render[0] || !render[0].isError) {
    return;
  }
  const {name, one } = render[0];
  const passing = {
    time: name, min: one.min
  }
  return(
    <ModifyTooltip data={passing}/>
  )
}
const LineChartProps = {
  height: 110,
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
      <XAxis {...XAxisJustifiedProps}/>
      <YAxis {...YAxisSharedProps}  hide={true}/>
      <Tooltip dataKey="display.error"  cursor={false}  content={CustomizedTooltip}/>
      <Scatter dataKey="display.error" fill="grey" shape={<EmptyShape data={data}/>}  />
      <Line dataKey="display.min" activeDot={false}strokeWidth="0" label={<TextLabel data={data} section="one" displayKey="min"/>}  />
  </ComposedChart>
</span>
</div>
);

export default Sample
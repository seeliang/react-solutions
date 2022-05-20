import { LineChart, Line, XAxis, YAxis, CartesianGrid,ReferenceArea, ReferenceLine, Tooltip } from 'recharts';
import {XAxisJustifiedProps, ErrorInputProps, getResetTime, XWidth} from './XAxisFunc';
import {ConditionLabel} from './Label';
import { data } from './data'


const displayReset = (value) => value - YDomain[0];

function round5 (x) {
  return Math.ceil(x/10)*10 - 5
}

function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    time: getResetTime(i.name),
    max: i.double.max > YDomain[1] ? displayReset(YDomain[1] - 5) : round5(displayReset(i.double.max)), 
    min: i.double.min < YDomain[0] ? displayReset(YDomain[0] + 5) : round5(displayReset(i.double.min)) 
    } 
  }) )
}

const ModifyTooltip = (props) => {
  const {payload} = props;
  const render = payload.map(i => i.payload);
  if(!render[0]) {
    return;
  }
  const {name, double} = render[0];
  const {min, max} = double;

  return(
    <span className='tooltip'>
       <p> time: {name} </p>
      <p> max: {max} </p>
      <p> min: {min} </p>
    </span>
  )
  }
  const YDomain = [60,220];

  const safeRange = [80,180]



  function formatYAxis(value) {

    const start = 10;
    const end = displayReset(YDomain[1] - 10);

    if(value === end ) return "Over " + (YDomain[1] - 10)
    if (value < end && value > start) return value + YDomain[0]
    if(value === start) return "Under " + (YDomain[0] + 10 )
    return ""
  }

const tickCount = (Math.ceil(displayReset(YDomain[1])/10) + 2).toString(10);

const YAxisSharedProps = {
  tickCount,
  domain:[0,displayReset(YDomain[1])]
}

const LineChartProps = {
  height: 400,
  data: addDisplayToData(data)
}

 const Sample = () => (
  <div className="table">
  <span className="sticky cell table">
    <span className=" title">Heart Beat Rate</span>
    <span className="cell" >
      <LineChart width={120} {...LineChartProps}>
        <YAxis {...YAxisSharedProps} width={110} tickFormatter={formatYAxis} />
      </LineChart>
    </span>
  </span>
  <span className="cell">
    <LineChart width={XWidth} {...LineChartProps}>
      <ReferenceArea  y1={displayReset(150)} y2={displayReset(safeRange[1])} fill="orange" strokeOpacity={0.5} />
      <ReferenceArea  y1={displayReset(safeRange[1])} y2={displayReset(YDomain[1])} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={displayReset(safeRange[1])} y2={displayReset(safeRange[1] + 2)} fill="red" strokeOpacity={0.5} />
      <ReferenceArea  y1={0} y2={displayReset(safeRange[0])} fill="blue" strokeOpacity={0.5} />
      <XAxis {...XAxisJustifiedProps}/>
      <CartesianGrid stroke="#ddd" />
      <Tooltip content={ModifyTooltip}/>
      <YAxis {...YAxisSharedProps} tickFormatter={formatYAxis} hide={true}/>
      <Line dataKey="display.max" stroke='blue' label={<ConditionLabel data={data} displayKey="max" color ="indigo" displayReset={displayReset} safeRange={safeRange}/>}  />
      <Line dataKey="display.min" stroke='green' label={<ConditionLabel data={data} displayReset={displayReset} safeRange={safeRange} />} />
      <ReferenceLine  {...ErrorInputProps} />
  </LineChart>
</span>
</div>
);

export default Sample
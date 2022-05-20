
import { LineChart, Line, XAxis, YAxis,  ReferenceLine} from 'recharts';
import TextLabel, {dotStokeWidth} from './Label';
import {XAxisJustifiedProps, ErrorInputProps, getResetTime, XWidth} from './XAxisFunc';
import { data } from './data'


function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    min: 5,
    time: getResetTime(i.name)
    } 
  }) )
}


  const YDomain = [0,10];



const tickCount = "2"
const YAxisSharedProps = {
  tickCount,
  domain:YDomain
}

const LineChartProps = {
  height: 80,
  data: addDisplayToData(data)
}

 const Sample = () => (
  <div className="table">
  <span className="sticky cell table">
    <span className=" title">Heart Beat Rate</span>
    <span className="cell" >
      <LineChart width={120} {...LineChartProps}>
        <YAxis {...YAxisSharedProps} width={110} />
      </LineChart>
    </span>
  </span>
  <span className="cell">
    <LineChart width={XWidth} {...LineChartProps}>

      <XAxis {...XAxisJustifiedProps}/>

      <YAxis {...YAxisSharedProps}  hide={true}/>
      
      <Line dataKey="display.min" strokeWidth="0" dot={{ stroke: 'green', strokeWidth: dotStokeWidth }} label={<TextLabel data={data} section="one" displayKey="min"/>}  />
      <ReferenceLine  {...ErrorInputProps} />
  </LineChart>
</span>
</div>
);

export default Sample
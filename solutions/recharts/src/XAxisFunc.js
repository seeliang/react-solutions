import { ReferenceLine } from 'recharts';
import { data } from './data';

const XGap = 900000; // 15min with ms
const regexGetDigits = /\D/g;

const timeToNum = (string) => {
  const raw = string.split(regexGetDigits).map( i => parseInt(i));
  const mark = new Date( raw[2],raw[1] - 1 ,raw[0],raw[3],raw[4]);
  return  Date.parse(mark)
}

const XDisplayReset = (value) => {
  return value - timeToNum(data[0].name) + XGap; 
}

const addLeadZero = (value) => value < 10 ? `0${value}` : value

function formatXAxis(modifiedValue) {
  const dateNumber = modifiedValue + timeToNum(data[0].name);
  const date = new Date(dateNumber);
  const isNewDate = date.getHours() + date.getMinutes() === 0;
  const dateDisplay = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `;
  return `${isNewDate? dateDisplay: '' }${addLeadZero(date.getHours())}:${addLeadZero(date.getMinutes())}`
}

export const getResetTime = (time) => XDisplayReset(timeToNum(time));

const lastCheckTime = data[data.length - 1].name;

const XTickCount = (Math.ceil(getResetTime(lastCheckTime) / XGap) + 3).toString(10)

export const XWidth = (XTickCount) * 150;

export const XAxisProps = {
  dataKey:"display.time",
  domain: [0, getResetTime(lastCheckTime) + 2 * XGap ],
   type:"number",
   orientation:'top',
    tickCount: XTickCount,
     tickFormatter:formatXAxis,
}

const ErrorInputProps = {
  stroke:"red",
  strokeWidth: 4,
  strokeDasharray: "6 6"
}

export const XAxisJustifiedProps =  {...XAxisProps, hide: true}
const errorPoints = data.filter(input => input.isError === true ).map(i => getResetTime(i.name));
export const errorIndicators = () => errorPoints.map( i => <ReferenceLine key={i} {...ErrorInputProps} x={i}/>)
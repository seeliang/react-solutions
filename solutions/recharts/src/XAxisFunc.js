import { data } from './data';

const is15min = false

const hour = 1000 * 60 * 60
const XGap = is15min ? hour / 4 : hour

const regexGetDigits = /\D/g;

export const timeToNum = (string) => {
  const raw = string.split(regexGetDigits).map( i => parseInt(i));
  const mark = new Date( raw[2],raw[1] - 1 ,raw[0],raw[3],raw[4]);
  return  Date.parse(mark)
}

const addLeadZero = (value) => value < 10 ? `0${value}` : value
const weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const formatXAxis = (tickValue) => {
  const date = new Date(tickValue);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const isNewDate = hour + minute === 0;
 
  if (isNewDate) {
    const dateDisplay = `${weekday[date.getDay()]} ${addLeadZero(date.getDate())}/${date.toLocaleString('default', { month: 'short' })} `;
    return `${dateDisplay}`
  }
  if (is15min && minute !== 0 ) {
    return ''
  }
  if(!is15min && hour % 4 !== 2) {
    return ''
  }
  return `${addLeadZero(hour)}:${addLeadZero(minute)}`
}

const lastCheckTime = data[data.length - 1].name;
const start = (Math.floor(timeToNum(data[0].name)/XGap) - 1) * XGap
const end = (Math.ceil(timeToNum(lastCheckTime)/XGap) + 1) * XGap
const cells = (end - start) / XGap
const ticks = cells + 1
export const XWidth = cells * 55;

export const getXAxisForXGap  = () => {
  let marker = start;
  let result = []
  while (marker < end) {
    marker = marker + XGap
    result.push({timeGap: marker})
  }
  return result
}
 
export const XAxisTimeProps = {
  scale: "utc",
  domain: [start, end ],
  type:"number",
  tickFormatter:formatXAxis,
  tickCount: ticks
}

export const XAxisGraphProps = {...XAxisTimeProps,  dataKey: "display.time", hide: true }

export const CartesianGridProps = {
  stroke:"#ddd",
  vertical: false
}
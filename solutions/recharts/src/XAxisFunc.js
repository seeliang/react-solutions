import { data } from './data';

const XGap = 1000 * 60 * 120; // 15min with ms

const regexGetDigits = /\D/g;

export const timeToNum = (string) => {
  const raw = string.split(regexGetDigits).map( i => parseInt(i));
  const mark = new Date( raw[2],raw[1] - 1 ,raw[0],raw[3],raw[4]);
  return  Date.parse(mark)
}

const addLeadZero = (value) => value < 10 ? `0${value}` : value

function formatXAxis(tickValue) {
  const date = new Date(tickValue);
  const isNewDate = date.getHours() + date.getMinutes() === 0;
  const dateDisplay = `${addLeadZero(date.getDate())}/${addLeadZero(date.getMonth() + 1)}/${date.getFullYear()} `;
  return `${isNewDate? dateDisplay: '' }${addLeadZero(date.getHours())}:${addLeadZero(date.getMinutes())}`
}

const lastCheckTime = data[data.length - 1].name;
const start = (Math.floor(timeToNum(data[0].name)/XGap) - 1) * XGap
const end = (Math.ceil(timeToNum(lastCheckTime)/XGap) + 1) * XGap
const cells = (end - start) / XGap
const ticks = cells + 1
export const XWidth = cells * 200;

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
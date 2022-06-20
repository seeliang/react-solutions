import { data } from './data';

const XGap = 900000; // 15min with ms
const regexGetDigits = /\D/g;

const timeToNum = (string) => {
  const raw = string.split(regexGetDigits).map( i => parseInt(i));
  const mark = new Date( raw[2],raw[1] - 1 ,raw[0],raw[3],raw[4]);
  return  Date.parse(mark)
}

const XDisplayReset = (value) => {
  return value - timeToNum(data[0].name); 
}

const addLeadZero = (value) => value < 10 ? `0${value}` : value

function formatXAxis(modifiedValue) {
  const dateNumber = modifiedValue + timeToNum(data[0].name);
  const date = new Date(dateNumber);
  const isNewDate = date.getHours() + date.getMinutes() === 0;
  const dateDisplay = `${addLeadZero(date.getDate())}/${addLeadZero(date.getMonth() + 1)}/${date.getFullYear()} `;
  return `${isNewDate? dateDisplay: '' }${addLeadZero(date.getHours())}:${addLeadZero(date.getMinutes())}`
}

export const getResetTime = (time) => XDisplayReset(timeToNum(time));

const lastCheckTime = data[data.length - 1].name;

const XTickCells = Math.ceil(getResetTime(lastCheckTime) / XGap)

export const XWidth = XTickCells * 200;

export const XAxisProps = {
  dataKey:"display.time",
  domain: [0, XTickCells * XGap ],
   type:"number",
   orientation:'top',
    tickCount: XTickCells + 1,
     tickFormatter:formatXAxis,
}

export const XAxisJustifiedProps =  {...XAxisProps, hide: true}
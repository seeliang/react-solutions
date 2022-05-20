
import { data } from './data';

export const timeToNum = (string) => {
  const raw = string.split(":");
  const result = parseInt(raw[0]) * 60 + parseInt(raw[1]) 
  return result;
}

export const XDisplayReset = (value) => {
  return value - timeToNum(data[0].name) + XGap; 
}

const XGap = 15;

function formatXAxis(modifiedValue) {

  const value = modifiedValue - XGap;
  const m = value % 60;
  const h = Math.floor(value / 60) + 12;
  const word = `${h} : ${m}`
  return m === 0 ? `${word}0` : word
}

const lastCheckTime = data[data.length - 1].name;

const XTickCount = (Math.ceil(XDisplayReset(timeToNum(lastCheckTime)) / XGap) + 2).toString(10)

export const XAxisProps = {
  dataKey:"display.time",
   type:"number",
   orientation:'top',
    tickCount: XTickCount,
     tickFormatter:formatXAxis,
}

const errorPoint = 53

export const ErrorInputProps = {
  x:errorPoint,
   stroke:"red",
    strokeWidth: 4,
     strokeDasharray: "6 6"
}

export const XAxisJustifiedProps =  {...XAxisProps, hide: true}
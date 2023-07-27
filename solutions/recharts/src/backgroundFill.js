
import {ReferenceArea  } from 'recharts';

export const backgroundYFill = ({array}) => array.map( i => {
  const {y1, y2, fill, opacity} = i;
  return (<ReferenceArea key={y2 + y1} y1={y1} y2={y2} fill={fill? fill: "red"} strokeOpacity={opacity? opacity: 0.5}/> )
}) 
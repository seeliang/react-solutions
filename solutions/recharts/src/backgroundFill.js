
import {ReferenceArea  } from 'recharts';

import {YDisplayReset} from './YAxisFunc'

 const backgroundFill = ({array,domain}) => array.map( i => {
  const {y1, y2, fill, opacity} = i;
  const resetY1 = YDisplayReset({domain, value: y1});
  const resetY2 = YDisplayReset({domain, value: y2});
  return (<ReferenceArea key={y2 + y1} y1={resetY1} y2={resetY2} fill={fill? fill: "red"} strokeOpacity={opacity? opacity: 0.5}/> )
}) 

export default backgroundFill;
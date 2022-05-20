
import { LineChart, XAxis} from 'recharts';
import { timeToNum, XDisplayReset, XAxisProps} from './XAxisFunc';

import { data } from './data';

function addDisplayToData (data) {
  return data.map(i => ({...i, 
    display: {
    time: XDisplayReset(timeToNum(i.name))
    } 
  }) )
}

const TableHead = () => (
  <div className="table sticky-header">
    <span className="sticky cell table">
  <span className=" title"> From 21/07</span>
  <span className="cell" >
  
  </span>
  </span>
  <span className="cell">
  <LineChart width={1700} height={40} data={addDisplayToData(data)}>
      <XAxis  {...XAxisProps}/>
  </LineChart>
  </span>
  </div>
)

export default TableHead;
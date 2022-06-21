
import { LineChart, XAxis} from 'recharts';
import { XAxisTimeProps,XWidth} from './XAxisFunc';

import { data } from './data';

const TableHead = () => (
  <div className="table sticky-header">
    <span className="sticky cell table">
  <span className=" title"> From 21/07</span>
  <span className="cell" >
  
  </span>
  </span>
  <span className="cell">
  <LineChart width={XWidth} height={40} data={data}>
      <XAxis  {...XAxisTimeProps}/>
  </LineChart>
  </span>
  </div>
)

export default TableHead;
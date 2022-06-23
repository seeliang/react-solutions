
import { LineChart, XAxis} from 'recharts';
import { XAxisTimeProps, XWidth, getXAxisForXGap} from './XAxisFunc';

const XAxisProps = {
  ...XAxisTimeProps,
  orientation: "top",
  dataKey: "timeGap",
}

const TableHead = () => (
  <div className="table sticky-header">
    <span className="sticky cell table">
  <span className=" title"> From 21/07</span>
  <span className="cell" >
  </span>
  </span>
  <span className="cell">
  <LineChart width={XWidth} height={40} data={getXAxisForXGap()}>
      <XAxis  {...XAxisProps}/>
  </LineChart>
  </span>
  </div>
)

export default TableHead;
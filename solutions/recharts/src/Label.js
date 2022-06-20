import { getResetTime} from './XAxisFunc';
const TextLabel = ({ x, y, index, data, displayKey, section, fill,}) => {
  const content = displayKey? displayKey : "max"
  const word = data[index][section][content];
  if (data?.[index].isError) { // hide error in data line
    return
  }
  return (
    <>
    <circle r="17" fill={fill ? fill : "green"} cx={x} cy={y}/>;
    <text x={x} y={y} dy={5} fontSize={14} fill="white" textAnchor="middle" >
      {word}
    </text>
    </>
  );
}

const getYCenter = ({y, lineLength, fontSize}) => {
  const minSpaceForText = lineLength / 2 + fontSize 
  if(minSpaceForText > y / 2 ) {
    return y + fontSize * 0.9
  }
  return y
}

export const LineLabel = (props) => {
  const {x,y, displayKey, section, data, index, isTextOnLeft = false, shouldShowText = false, height} = props
  if( !y || !section || !data) {
    return
  }

  const lineLength = 35;
  const strokeWidth = 3;
  const fontSize = 14;
  const YCenter = getYCenter({y, lineLength, fontSize})


  const textWithGap = isTextOnLeft ? x - 10 : x + 10; 
  const textAnchor = isTextOnLeft ? "end" : "start";
  const textData = data[index][section];
  let y1;
  let y2
  let words = [];

  if(displayKey === "double") {
    Object.keys(textData).forEach(i => words = [...words, textData[i]]);
    y1 = y;
    y2 = y + height
  }

  if(words.length === 0 && shouldShowText){
    words[0] = shouldShowText ? textData[displayKey] : ''
  }

  if(!y1){
    y1 = YCenter + lineLength / 2;
    y2 = YCenter - lineLength / 2;
  }
  return <>
  {shouldShowText && <text x={textWithGap} y={y2} textAnchor={textAnchor} fontSize={fontSize} width={150} >{words[0]}</text>}
  <line stroke='black' strokeWidth={strokeWidth} x1={x} y1={y1} x2={x} y2={y2}/>
  {(shouldShowText && words[1]) && 
  <text x={textWithGap} y={y1} textAnchor={textAnchor} fontSize={fontSize} width={150} >{words[1]}</text>}
  </>
}

export const DotLabel  = ( props) => {
  const { x, y, fill, data, index} = props
  if (data?.[index].isError) {
    return
  }
  return (
    <circle r="8" fill={fill? fill : "green"} cx={x} cy={y}/>
  );
}

export const ConditionLabel = (props) => {
  const {x, y, displayKey, color, section, shouldShowText, index, data, shouldShowLine} = props;

  const textKey = displayKey ? displayKey : "min"

  const fill = color ? color : "green"

  if (shouldShowLine) {
    return <LineLabel {...props} displayKey={textKey} section={section} />
  }
  if (shouldShowText) {
  return <TextLabel {...props} displayKey={textKey} section={section} fill={fill}/>
  }

  return <DotLabel fill={fill} x={x} y={y} index={index} data={data}/>;
}

export const getShouldShowText = (props) => props.index >= props.data.length - 2; // show last 2

export const getShouldShowLine = (props) => {
  const intensiveGap = 1000 * 60 * 4
  const {index,data} = props;
  const currentDataTimeStamp = getResetTime(data[index].name);
  if(index < data.length - 1) {
    const nextDataTimeStamp = getResetTime(data[index + 1].name);
    if((currentDataTimeStamp + intensiveGap) > nextDataTimeStamp) {
      return true
    }
  }
  if(index > 1) {
   const prevDataTimeStamp = getResetTime(data[index - 1].name);
   if((prevDataTimeStamp + intensiveGap) > currentDataTimeStamp) {
    return true
    }
  }
  return false
}

export default TextLabel
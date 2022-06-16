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
  const {x,y, displayKey, section, data, index, isTextOnLeft = false, shouldShowText = false} = props
  if( !y || !section || !data) {
    return
  }
  const lineLength = 35;
  const strokeWidth = 3;
  const fontSize = 14;
  const YCenter = getYCenter({y, lineLength, fontSize})
  const y1 = YCenter + lineLength / 2;
  const y2 = YCenter - lineLength /2;
  const word = shouldShowText ? data[index][section][displayKey] : ''
  const textWithGap = isTextOnLeft ? x - 10 : x + 10; 
  const textAnchor = isTextOnLeft ? "end" : "start";

  return <>
  {shouldShowText && <text x={textWithGap} y={y2} textAnchor={textAnchor} fontSize={fontSize} width={150} >{word}</text>}
  <line stroke='black' strokeWidth={strokeWidth} x1={x} y1={y1} x2={x} y2={y2}/>
  {(shouldShowText && word.length > 0) && 
  <text x={textWithGap} y={y1} textAnchor={textAnchor} fontSize={fontSize} width={150} >{word}</text>}
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

  const text = displayKey ? displayKey : "min"

  const fill = color ? color : "green"

  if (shouldShowLine) {
    return <LineLabel {...props} displayKey={text} section={section} />
  }
  if (shouldShowText) {
  return <TextLabel {...props} displayKey={text} section={section} fill={fill}/>
  }

  return <DotLabel fill={fill} x={x} y={y} index={index} data={data}/>;
}

export default TextLabel
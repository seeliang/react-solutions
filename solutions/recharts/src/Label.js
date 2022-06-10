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

export const LineLabel = (props) => {
  const {x,y, displayKey, section, data, index, viewBox} = props
  if( !y || !section || !data) {
    return
  }
  console.log(viewBox)
  const word = data[index][section][displayKey]
  const length = 70;
  const strokeWidth = 3;
  const y1 = y + length / 2;
  const y2 = y - length /2;
  const fontSize = 16
  return <>
  <line stroke='black' strokeWidth={strokeWidth} x1={x} y1={y1} x2={x} y2={y2}/>
  <text x={x - fontSize * 0.75} y={y1 + fontSize * 1.5} fontSize={fontSize}>{word}</text>
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
  const {x, y, displayKey, color, section, shouldShowText} = props;

  const text = displayKey ? displayKey : "min"

  const fill = color ? color : "green"

  if (shouldShowText) {
  return (<>
    <LineLabel {...props} displayKey={text} section={section}/>
    <TextLabel {...props} displayKey={text} section={section} fill={fill}/>
    </>
  )
  }

  return <DotLabel fill={fill} x={x} y={y}/>;
}

export default TextLabel
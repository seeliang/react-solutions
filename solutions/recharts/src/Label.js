const TextLabel = ({ x, y, index, data, displayKey, section, fill}) => {
  const content = displayKey? displayKey : "max"
  const word = data[index][section][content];
  return (
    <>
    <circle r="15" fill={fill ? fill : "green"} cx={x} cy={y}/>;
    <text x={x} y={y} dy={5} fontSize={14} fill="white" textAnchor="middle" >
      {word}
    </text>
    </>
  );
}

export const DotLabel  = ( { x, y, fill }) => {
  return (<>
    <circle r="8" fill={fill? fill : "green"} cx={x} cy={y}/>
    </>

  );
}

export const ConditionLabel = (props) => {
  const {value, x, y, displayKey, color, displayReset, safeRange, section} = props;

  const text = displayKey ? displayKey : "min"

  const fill = color ? color : "green"

  if (value < displayReset(safeRange[1])&& value > displayReset(safeRange[0])) {
    return <DotLabel fill={fill} x={x} y={y}/>;
  };

  return (
    <TextLabel {...props} displayKey={text} section={section} fill={fill}/>
  )
}

export default TextLabel
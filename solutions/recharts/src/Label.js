const CustomizedLabel = ({ x, y, index, data, displayKey, section}) => {
  const content = displayKey? displayKey : "max"
  const word = data[index][section][content];
  return (
    <text x={x} y={y} dy={5} fontSize={14} fill="white" textAnchor="middle" >
      {word}
    </text>
  );
}

export const ConditionLabel = (props) => {
  const {value, x, y, displayKey, color, displayReset, safeRange} = props;

  const text = displayKey ? displayKey : "min"

  const fill = color ? color : "green"

  if (value < displayReset(safeRange[1])&& value > displayReset(safeRange[0])) {
    return <circle r="7" fill={fill} cx={x} cy={y}/>;
  };

  return (<>
    <circle r="15" fill={fill} cx={x} cy={y}/>;
    <CustomizedLabel {...props} displayKey={text} section="double"/>
  </>)
}

export const dotStokeWidth = 24

export default CustomizedLabel
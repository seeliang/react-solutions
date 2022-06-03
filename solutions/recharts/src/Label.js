import {YDisplayReset} from './YAxisFunc';

const TextLabel = ({ x, y, index, data, displayKey, section, fill,}) => {
  const content = displayKey? displayKey : "max"
  const word = data[index][section][content];
  if (data?.[index].isError) { // hide error in data line
    return
  }
  return (
    <>
    <circle r="15" fill={fill ? fill : "green"} cx={x} cy={y}/>;
    <text x={x} y={y} dy={5} fontSize={14} fill="white" textAnchor="middle" >
      {word}
    </text>
    </>
  );
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
  const {value, x, y, displayKey, color, domain, safeRange, section} = props;

  const text = displayKey ? displayKey : "min"

  const fill = color ? color : "green"

  if (value < YDisplayReset({value: safeRange[1], domain}) 
  && value > YDisplayReset({value:safeRange[0],domain})) {
    return <DotLabel fill={fill} x={x} y={y}/>;
  };

  return (
    <TextLabel {...props} displayKey={text} section={section} fill={fill}/>
  )
}

export default TextLabel
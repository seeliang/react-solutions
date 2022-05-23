export const YAxisWidth = 120;

export const YDisplayReset = ({value, domain}) => {
  return value - domain[0]};

export const getYTickCount = ({domain, gap}) => Math.ceil(YDisplayReset({value: domain[1], domain})/gap + 2).toString(10);

export const roundToHalf = ({value, gap}) =>  {
  
  return Math.ceil(value/gap)*gap - gap / 2;
}

export const formatData = ({domain, gap,value}) => {

  if (value < domain[0]) {
    return gap / 2
  }
  if (value > domain[1]) {
    return YDisplayReset({value: domain[1],domain}) - gap / 2;
  }
  return roundToHalf({value: YDisplayReset({value, domain}), gap})
}

export const formatYAxis = ({ domain, gap }) => (value) => {
  const start = gap;
  const end = parseFloat(YDisplayReset({value: domain[1] - gap, domain}).toFixed(1));
  if(value === end ) return "Over " + (domain[1] - gap)
  if (value < end && value > start) return value + domain[0]
  if(value === start) return "Under " + (domain[0] + gap )
  return ""
}

export const getYAxisHeight = ({domain, gap}) => getYTickCount({domain,gap}) * 35;

export const getYAxisSharedProps = ({gap, domain}) => {
  return {
  tickCount: getYTickCount({gap, domain}),
  domain: [0, YDisplayReset({value:domain[1],domain})],
  tickFormatter: formatYAxis({domain,gap})
}}
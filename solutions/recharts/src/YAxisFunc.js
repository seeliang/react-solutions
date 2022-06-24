export const YAxisWidth = 120;

export const YDisplayReset = ({value, domain}) => {
  return value - domain[0]};

export const getYTickCount = ({domain, gap}) => (Math.ceil(YDisplayReset({value: domain[1], domain})/gap) + 2).toString(10);

export const roundToHalf = ({value, gap}) =>  Math.ceil(value/gap)*gap - gap / 2;

export const formatData = ({domain, gap,value}) => {

  if (value < domain[0]) {
    return gap / 2
  }
  if (value > domain[1]) {
    return YDisplayReset({value: domain[1],domain}) - gap / 2;
  }
  return roundToHalf({value: YDisplayReset({value, domain}), gap})
}

const formatYAxis = ({ domain, gap, isStartFromZero}) => (value) => {
  const start = gap;
  const end = parseFloat(YDisplayReset({value: domain[1] - gap, domain}).toFixed(1));
  if(value === end ) return "Over " + (domain[1] - gap)
  if (value < end && value > start ) return value + domain[0]
  if(isStartFromZero && value <= start) return value + domain[0]
  if(value === start) return "Under " + (domain[0] + gap )
  return ""
}

export const getYAxisHeight = ({domain, gap}) => getYTickCount({domain,gap}) * 35;

export const getYAxisSharedProps = ({gap, domain, isStartFromZero = false}) => {
  return {
  tickCount: getYTickCount({gap, domain}),
  domain: [0, YDisplayReset({value:domain[1],domain})],
  tickFormatter: formatYAxis({domain,gap, isStartFromZero})
}}

export const getYAxisProps = ({gap, domain, isStartFromZero = false}) => {
  return {
  tickCount: getTickCount({gap, domain}),
  domain: getDomain({domain, gap}),
  tickFormatter: formatAxis({domain,gap, isStartFromZero})
}}

const getDomain = ({domain, gap}) => {
  const start = Math.floor(domain[0]/gap) * gap
  const end = Math.ceil(domain[1]/gap) * gap
  return [start, end]
}

const getTickCount = ({domain, gap}) => {
  const [start, end] = getDomain({domain, gap});
  return (end - start) / gap + 2
}

const formatAxis = ({domain,gap}) => (value) => {
  const [start, end] = getDomain({domain, gap});
  const displayStart = start + gap ;
  const displayEnd = end - gap ;
  if(value === displayEnd) return "Over " + displayEnd
  if (value < displayEnd && value > displayStart ) return value
  if(value === displayStart) return "Under " + displayStart
  return ""
}

export const formatYData = ({domain, gap,value}) => {
  const [start, end] = getDomain({domain, gap});
  if (value < start) {
    return gap / 2
  }
  if (value > end) {
    return roundToHalf({value: end, gap});
  }
  return roundToHalf({value, gap})
}
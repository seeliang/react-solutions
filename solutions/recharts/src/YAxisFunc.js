export const YAxisWidth = 120;

export const roundToHalf = ({value, gap}) =>  Math.ceil(value/gap)*gap - gap / 2;

export const getYAxisHeight = ({domain, gap}) => getTickCount({domain,gap}) * 35;

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

export const formatYData = ({domain, gap, value}) => {
  const [start, end] = getDomain({domain, gap});
  if (value < start) {
    return roundToHalf({value: start, gap}) + gap
  }
  if (value > end) {
    return roundToHalf({value: end, gap});
  }
  return roundToHalf({value, gap})
}
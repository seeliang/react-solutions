const ModifyTooltip = ({data}) => (
  <span className='tooltip'>
    {Object.keys(data).map(i => <p key={i}> {`${i} : ${data[i]}`}</p>)}
  </span>
)

export default ModifyTooltip
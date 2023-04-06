
export default function Input({
  type, name,
  placeHolder, 
  inputName, 
  value, className, 
  handleValue, required, min, max
}) {
  return (
    <>
    
      <input type={type} name={name} required={required} placeholder={placeHolder} value={value} onChange={handleValue }className={className} min={min} max={max}/>
    
    </>
  )
}

export function TextArea({
  name, placeHolder, 
  value, className, 
  handleValue, required = false
}) {
 return(<>
    <textarea name={name} placeholder={placeHolder} value={value} className={className} required={required}></textarea>
  </>)
}

export function Select({
  name, options, defaultValue, required = false
}) {
  const option = [];
  for( let key in options ) {
    option.push(<option value={key}>{options[key]}</option>)
  }
  return (
    <>
      <select name={name} defaultValue={defaultValue}>
        {option}
      </select>
    </>
  )
}
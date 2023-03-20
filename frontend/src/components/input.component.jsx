
export default function Input({
  type, name,
  placeHolder, 
  inputName, 
  value, className, 
  handleValue, required
}) {
  return (
    <>
    
      <input type={type} name={name} required={required} placeholder={placeHolder} value={value} onChange={handleValue }className={className}/>
    
    </>
  )
}
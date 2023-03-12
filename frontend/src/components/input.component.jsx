
export default function Input({
  type, name,
  placeHolder, 
  inputName, 
  value, className, 
  handleValue, required
}) {
  return (
    <>
    <label for={name}>{inputName}
      <input type={type} name={name} required={required} placeholder={placeHolder} value={value} onChange={handleValue }className={className}/>
    </label>
    </>
  )
}
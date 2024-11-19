
const MultiInputBox = (props) => {
    const {name,label,context}={...props}
  return (
    <div className="flex flex-col p-2 gap-1">
    <label htmlFor={name}>{label??name}</label>
        <textarea name={name} id={name}   rows="4">{context}</textarea>
      
    </div>
  )
}

export default MultiInputBox

 
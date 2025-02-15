import useDebouncedFormik from "@/hooks/useDebouncedFormik";

const MultiInputBox = (props) => {
  const { formik, name, label, extClass, placeholder } = { ...props }
  const debouncedFormik = useDebouncedFormik(formik, 1000);
  return (
    <div className="flex flex-col p-2 gap-1">
    <label htmlFor={name}>{label??name}</label>
      <textarea name={name} id={name} rows="4" placeholder={placeholder ?? `Enter ${label}`}
        onChange={debouncedFormik.handleChange}
        onBlur={formik.handleBlur} value={formik.values[name]}></textarea>
      
    </div>
  )
}

export default MultiInputBox

 
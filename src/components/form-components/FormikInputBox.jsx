import useDebouncedFormik from "../../hooks/useDebouncedFormik";
export const FormikInputBox = (
    { formik,   label, name, placeholder, type,extClass, ...props }
) => {
    const debouncedFormik = useDebouncedFormik(formik,1000);
    return (
        <>
            <label htmlFor={name} className={extClass}>{label}</label>
            <input
                id={name}
                name={name}
                type={type ?? 'text'}
                placeholder={placeholder ?? `Enter ${label}`}
                onChange={debouncedFormik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className={`  input mb-0 input-bordered input-primary    ${formik.errors[name]? 'input-error' : ''}`}
            />
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </>

    )
}
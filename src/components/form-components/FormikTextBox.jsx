import useDebouncedFormik from "../../hooks/useDebouncedFormik";
export const FormikTextBox = (
    { formik,   label, name, placeholder, type, ...props }
) => {
    const debouncedFormik = useDebouncedFormik(formik,1000);
    return (
        <>

            <p><label htmlFor={name}>{label}</label></p>
            <textarea
                id={name}
                name={name}
                cols="30" rows="4"
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

export const FormikInputBoxNDB = (
    { formik,   label, name, placeholder, type, ...props }
) => {

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type ?? 'text'}
                placeholder={placeholder ?? `Enter ${label}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values[name]}
                className={`  input mb-0 input-bordered input-primary    ${formik.errors[name]? 'input-error' : ''}`}
            />
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </>

    )
}
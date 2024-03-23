
export const CustomSelect = (
    { formik, label, name, placeholder, type, ...props }
) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className={`select  w-full ${formik.errors[name] ? 'select-error' : 'select-primary'}`}
            >
                <option value=''>-- please select</option>
                {props.options}
            </select>
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </>

    )
}



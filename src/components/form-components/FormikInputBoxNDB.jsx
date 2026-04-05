
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
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 ${formik.errors[name] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-600'}`}
            />
            {formik.touched[name] && formik.errors[name] ? <div className='text-red-500 text-sm pl-2'>{formik.errors[name]}</div> : null}
        </>

    )
}
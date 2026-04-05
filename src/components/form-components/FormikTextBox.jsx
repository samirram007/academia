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
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 min-h-24 ${formik.errors[name] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-600'}`}
            />
            {formik.touched[name] && formik.errors[name] ? <div className='text-red-500 text-sm pl-2'>{formik.errors[name]}</div> : null}
        </>

    )
}
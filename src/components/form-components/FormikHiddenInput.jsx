import React from 'react'

export const FormikHiddenInput = (
    { formik,     name,  ...props }
) => {
    console.log(name)
    return (
        <>
            <input
                id={name}
                name={name}
                type={'text'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}

            />
        </>

    )
}
export default FormikHiddenInput

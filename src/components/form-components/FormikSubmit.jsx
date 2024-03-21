export const FormikSubmit = (
    { formik, label }
) => {
    return (
        <>
             <button type="submit" className='btn btn-primary btn-wide'>
                        {label}
                        {formik.isSubmitting && (
                            <span
                                className='spinner-border spinner-border-sm ms-2'
                                role='status'
                                aria-hidden='true'
                            ></span>
                        )}
                    </button>
        </>

    )
}
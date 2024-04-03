export const FormikSubmit = (
    { formik, label }
) => {
    //console.log(formik.isSubmitting);
    return (
        <>
             <button type="submit" className='btn btn-primary '>
             {formik.isSubmitting && (
                             <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-slate-800"></span>
                        )}
                {formik.isSubmitting? 'Submitting...' : label}


                    </button>
        </>

    )
}
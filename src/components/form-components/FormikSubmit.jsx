export const FormikSubmit = (
    { formik, label,btnColor=`btn-primary` }
) => {

    return (
        <>
            <button type="submit"
            className={`btn  ${formik.isSubmitting?'btn-error':btnColor} flex flex-row flex-nowrap text-nowrap`}>
                {formik.isSubmitting && (
                    <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-slate-800"></span>
                )}
                {formik.isSubmitting ? 'Submitting...' : label}


            </button>
        </>

    )
}
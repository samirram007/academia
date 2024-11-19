export const FormikSubmit = (
    { formik, label, btnColor = `btn-primary` }
) => {

    return (
        <>
            <button type="submit"
                className={`btn cursor-pointer  ${btnColor} flex flex-row flex-nowrap text-nowrap`}>

                {label}


            </button>
        </>

    )
}
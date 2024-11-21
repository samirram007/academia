export const FormikSubmit = (
    { formik, label, btnColor = `btn-primary`, ...props }
) => {

    return (
        <>
            <button type="submit"
                className={` cursor-pointer  ${btnColor} flex flex-row flex-nowrap text-nowrap ${props.className} btn`}>

                {label}


            </button>
        </>

    )
}
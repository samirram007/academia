export const FormikSubmit = (
    { formik, label, btnColor = `bg-blue-600 hover:bg-blue-700 text-white`, ...props }
) => {

    return (
        <>
            <button type="submit"
                className={`inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${btnColor} ${props.className}`}>

                {label}


            </button>
        </>

    )
}
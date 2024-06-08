

const LoadingSelect = () =>  (
    {   label, name }
) => {
    return (
        <>
            <div >{label}</div>
            <div className={`select  w-full select-primary`}>
                <div value=''>Loading....</div>
            </div>
        </>

    )
}

export default LoadingSelect


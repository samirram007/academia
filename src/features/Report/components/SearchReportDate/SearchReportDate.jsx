




const SearchReportDate = ({reportDate,setReportDate,labelName}) => {
    return(
        <>
            <label htmlFor="">{labelName}</label>
            <input type="date" value={reportDate} onChange={(e)=>setReportDate(e.target.value)}  />
        </>
    )
}



export default SearchReportDate;
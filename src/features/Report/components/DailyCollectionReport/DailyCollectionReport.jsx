import DataTable from "./DataTable/DataTable";


const DailyCollectionReport = () => {




    return (
        <>
             <div className="flex flex-col w-full px-2   justify-stretch max-h-full h-full">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-2xl overflow-hidden">
                <DataTable/>
                </div>
            </div>

        </>
    )
}



export default DailyCollectionReport;
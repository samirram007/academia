import DataTable from "./DataTable/DataTable";


const DailyCollectionReport = () => {




    return (
        <>
             <div className="flex flex-col w-full px-2   justify-stretch max-h-full h-full">
                <div className="card animated fadeInDown bg-zinc-600/20 max-h-full h-full">
                <DataTable/>
                </div>
            </div>

        </>
    )
}



export default DailyCollectionReport;
import React from 'react'
import FeeTemplateTable from './DataTable'
 const DataList = () => {
    return (
        <>
            <div className="flex justify-stretch flex-col w-full overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <FeeTemplateTable />
                </div>
            </div>
        </>
    )
}
export default DataList
import React from 'react'
import DataTable from './DataTable'
import { useDocumentTitle } from '../../../hooks'
 const DataList = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <DataTable />
                </div>
            </div>
        </>
    )
}
export default DataList
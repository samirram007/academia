import React from 'react'
import DataTable from './DataTable'
import { useDocumentTitle } from '../../../hooks'
 const DataList = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full max-h-full h-full">
                <div className="card  animated fadeInDown bg-zinc-600/20 max-h-full h-full">
                    <DataTable />
                </div>
            </div>
        </>
    )
}
export default DataList
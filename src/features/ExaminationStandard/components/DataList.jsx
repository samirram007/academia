import React from 'react'
import { useDocumentTitle } from '../../../hooks'
import DataTable from './DataTable'


 const DataList = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-2 md:px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <DataTable />
                </div>
            </div>
        </>
    )
}
export default DataList
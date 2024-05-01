import React from 'react'
import DataTable from './DataTable'
<<<<<<< HEAD
import { useDocumentTitle } from '../../../hooks'


 const DataList = () => {
    useDocumentTitle()
=======


 const DataList = () => {

>>>>>>> 38fe76ea24ea4a688945fbee42d4c859bab31c8f
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
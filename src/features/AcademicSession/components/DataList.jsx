import React from 'react'
<<<<<<< HEAD:src/features/AcademicSession/components/DataList.jsx
import DataTable from './DataTable'
import { useDocumentTitle } from '../../../hooks'
=======
import AcademicSessionTable from './DataTable'
>>>>>>> 38fe76ea24ea4a688945fbee42d4c859bab31c8f:src/features/AcademicSession/components/AcademicSessions.jsx


 const DataList = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-2 md:px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20 ">
                    <DataTable />
                </div>
            </div>
        </>
    )
}
export default DataList
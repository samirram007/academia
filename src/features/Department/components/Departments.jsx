import React from 'react'
import DepartmentTable from './DepartmentTable'
import { useDocumentTitle } from '../../../hooks'


 const Departments = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-2xl overflow-hidden">
                    <DepartmentTable />
                </div>
            </div>
        </>
    )
}
export default Departments
import React from 'react'
import SchoolTypeTable from './SchoolTypeTable'
import { useDocumentTitle } from '../../../hooks'


 const SchoolTypes = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-2xl overflow-hidden">
                    <SchoolTypeTable />
                </div>
            </div>
        </>
    )
}
export default SchoolTypes
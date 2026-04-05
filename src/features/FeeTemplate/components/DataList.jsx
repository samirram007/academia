import React from 'react'
import FeeTemplateTable from './DataTable'
import { useDocumentTitle } from '../../../hooks'
 const DataList = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex flex-col w-full overflow-y-auto">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-2xl overflow-hidden">
                    <FeeTemplateTable />
                </div>
            </div>
        </>
    )
}
export default DataList
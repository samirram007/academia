import React from 'react'

import SchoolTable from './SchoolTable'
import { useDocumentTitle } from '../../../hooks'

 const Schools = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex flex-col w-full overflow-y-auto">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-2xl overflow-hidden">
                    <SchoolTable />
                </div>
            </div>
        </>
    )
}
export default Schools
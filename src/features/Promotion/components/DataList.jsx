import React from 'react'
import DataTable from './DataTable'
import { useDocumentTitle } from '../../../hooks'
import { PromotionProvider } from '../context/usePromotionContext'


const DataList = () => {
    useDocumentTitle()


    return (
        <>

            <div className="flex flex-col w-full">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-2xl overflow-hidden">
                    <PromotionProvider>
                        <DataTable />
                    </PromotionProvider>
                </div>
            </div>
        </>
    )
}
export default DataList
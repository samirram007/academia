import React from 'react'
import FeeTemplateItem from './FeeTemplateItem'
import { useDocumentTitle } from '../../../hooks'

 const DataList = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <FeeTemplateItem  />
                </div>
            </div>
        </>
    )
}
export default DataList
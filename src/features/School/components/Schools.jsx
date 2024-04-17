import React from 'react'

import SchoolTable from './SchoolTable'
import { useDocumentTitle } from '../../../hooks'

 const Schools = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <SchoolTable />
                </div>
            </div>
        </>
    )
}
export default Schools
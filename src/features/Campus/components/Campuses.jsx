import React from 'react'

import CampusTable from './CampusTable'
import { useDocumentTitle } from '../../../hooks'

 const Campuses = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <CampusTable />
                </div>
            </div>
        </>
    )
}
export default Campuses


import React from 'react'
import DesignationTable from './DesignationTable'
import { useDocumentTitle } from '../../../hooks'


 const Designations = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-2 md:px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <DesignationTable />
                </div>
            </div>
        </>
    )
}
export default Designations
import React from 'react'
import FeeTemplateTable from './FeeTemplateTable'
 const FeeTemplates = () => {
    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <FeeTemplateTable />
                </div>
            </div>
        </>
    )
}
export default FeeTemplates
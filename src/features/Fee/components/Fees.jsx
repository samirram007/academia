import React from 'react'

import FeeTable from './FeeTable'

 const Fees = () => {

    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20 dark:bg-zinc-200/20">
                    <FeeTable />
                </div>
            </div>
        </>
    )
}
export default Fees
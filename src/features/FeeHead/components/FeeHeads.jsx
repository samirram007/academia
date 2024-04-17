import React from 'react'

import FeeHeadTable from './DataTable'

 const FeeHeads = () => {

    return (
        <>
            <div className="flex justify-stretch flex-col w-full overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <FeeHeadTable />
                </div>
            </div>
        </>
    )
}
export default FeeHeads
import React from 'react'

import FloorTable from './FloorTable'

 const Floors = () => {

    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <FloorTable />
                </div>
            </div>
        </>
    )
}
export default Floors
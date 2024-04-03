import React from 'react'

import DepartmentTable from './DepartmentTable'

 const Departments = () => {

    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <DepartmentTable />
                </div>
            </div>
        </>
    )
}
export default Departments
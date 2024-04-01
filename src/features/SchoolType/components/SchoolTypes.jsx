import React from 'react'
import SchoolTypeTable from './SchoolTypeTable'


 const SchoolTypes = () => {

    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-2 md:px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20 dark:bg-zinc-200/20">
                    <SchoolTypeTable />
                </div>
            </div>
        </>
    )
}
export default SchoolTypes
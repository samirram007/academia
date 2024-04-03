import React from 'react'
import AcademicClassTable from './AcademicClassTable'

 const AcademicClasses = () => {

    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-2 md:px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <AcademicClassTable />
                </div>
            </div>
        </>
    )
}
export default AcademicClasses
import React from 'react'
import AcademicSessionTable from './AcademicSessionTable'


 const AcademicSessions = () => {

    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-2 md:px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20 ">
                    <AcademicSessionTable />
                </div>
            </div>
        </>
    )
}
export default AcademicSessions
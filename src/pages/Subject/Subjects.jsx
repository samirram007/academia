import React from 'react'
import SubjectTable from './SubjectTable'

 const Subjects = () => {

    return (
        <>
            <div className="flex justify-stretch flex-col w-full px-2 md:px-4 overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20 dark:bg-zinc-200/20">
                    <SubjectTable />
                </div>
            </div>
        </>
    )
}
export default Subjects
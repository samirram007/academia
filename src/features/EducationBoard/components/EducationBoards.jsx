import React from 'react'

import EducationBoardTable from './EducationBoardTable'
import { useDocumentTitle } from '../../../hooks'

 const EducationBoards = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <EducationBoardTable />
                </div>
            </div>
        </>
    )
}
export default EducationBoards
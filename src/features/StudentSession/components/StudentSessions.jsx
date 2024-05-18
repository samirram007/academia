import React from 'react'
import { useStudentSessions } from '../hooks/queries'

const StudentSessions = (student_id) => {
    const fetchedData = useStudentSessions(student_id)
    if(fetchedData.isPending){
        return <div>Loading</div>
    }

    if(fetchedData.isFetched){
      //  console.log("fetched",fetchedData.data.data);
       // return
        // return <div>{fetchedData.data}</div>
    }
  return (
    <div className='flex flex-row border-2 border-blue-500/20 p-2 rounded-lg'>
        {fetchedData.data.data && fetchedData.data.data.map((session,index)=>(
            <div key={index}>{session.academic_session.session}</div>
        ))}

    </div>
  )
}

export default StudentSessions

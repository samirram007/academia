import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react'

import Profile from './Profile';
import StudentSession from './StudentSession';
import ProfileImage from './ProfileImage';
import { useAcademicSessions } from '../../../AcademicSession/hooks/quaries';
import { ErrorBoundary } from 'react-error-boundary';
import { FeeProcess } from './FeeProcess';



const ProfileHeader = ({ data, fetchedAcademicSessions }) => {
  const [academicSessions, setAcademicSessions] = useState([])
  const [studentSessions, setStudentSessions] = useState(data?.student_sessions ?? [])

  const [selectedSession, setSelectedSession] = useState(
    studentSessions.length > 0
      ? (studentSessions.find(x => x.academic_session.is_current == 1).academic_session ?? studentSessions[0].academic_session)
      : null
  )
  const [selectedStudentSession, setSelectedStudentSession] = useState(null)
  const [activeView, setActiveView] = useState('fee')
  // const selectedStudentSession = useMemo(() => {
  //   return studentSessions.find(x => x.academic_session_id === selectedSession.id)
  // }, [selectedSession])
  useEffect(() => {
    setSelectedStudentSession(prev => data?.student_sessions.find(x => x.academic_session_id === selectedSession.id))
  }, [data, selectedSession])



  // console.log('xxx',selectedStudentSession);

  return (
    <>

      <div className='h-42 w-full bg-gradient-to-r  from-blue-500 to-cyan-500 rounded-md p-4 text-slate-800'>

        <div className='flex justify-between items-center'>
          <div >
            <div className='text-xl pl-1 mb-2'>
              Name: {data.name}
            </div>
            <StudentSession data={data}
              fetchedAcademicSessions={fetchedAcademicSessions}
              academicSessions={academicSessions}
              setAcademicSessions={setAcademicSessions}
              studentSessions={studentSessions}
              setStudentSessions={setStudentSessions}
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
              selectedStudentSession={selectedStudentSession}
            />
          </div>
          <ProfileImage data={data} />

        </div>

      </div>

      <div className='h-42 w-full bg-gradient-to-r  from-blue-500 to-cyan-500 rounded-md p-4 text-slate-800 mt-2'>
        <ul className='flex flex-row gap-4 cursor-pointer text-sm'>
          <li className={`${activeView === 'profile' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('profile')}>Profile</li>
          <li className={`${activeView === 'address' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('address')}>Address</li>
          <li className={`${activeView === 'guardian' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('guardian')}>Guardian</li>
          <li className={`${activeView === 'fee' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('fee')}>Fee</li>
          <li className={`${activeView === 'class_work' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('class_work')}>Class Work</li>
          <li className={`${activeView === 'activity' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('activity')}>Activity</li>
          <li className={`${activeView === 'achievement' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('achievement')}>Achievement</li>
        </ul>
      </div>
      {activeView === 'profile' && <Profile data={data} />}
      {activeView === 'address' && <Address data={data.addresses} />}
      {activeView === 'guardian' && <Guardian data={data.guardians} />}
      {activeView === 'fee' && selectedSession &&
        selectedStudentSession ?
        <FeeProcess
          data={data}
          academicSessions={academicSessions}
          selectedSession={selectedSession}
          selectedStudentSession={selectedStudentSession}
        />
        : <div className='p-4 flex justify-center items-center text-2xl bg-slate-600 mt-4 rounded-lg h-40'>
          {'Student Session Not Initialize'}
        </div>
      }
      {activeView === 'class_work' && <ClassWork data={data} />}
      {activeView === 'activity' && <Activity data={data} />}
      {activeView === 'achievement' && <Achievement data={data} />}


    </>
  )
}

export default ProfileHeader





export const Address = ({ data }) => {
  return (
    <>
      <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
        <div className=' pl-1 mb-2'>
          {
            data.map((address, index) => (
              <div key={index}>{address.address_type}: {address.display}</div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export const Guardian = ({ data }) => {
  return (
    <>
      <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
        <div>Guardian</div>
        <div className=' pl-1 mb-2'>
          {
            data.map((guardian, index) => (
              <div key={index}>{guardian.guardian_type}: {guardian.name}</div>
            ))
          }
        </div>
      </div>
    </>
  )
}





export const ClassWork = (data) => {
  return (
    <>
      Class Work
    </>
  )
}
export const Activity = (data) => {
  return (
    <>
      Activity
    </>
  )
}
export const Achievement = (data) => {
  return (
    <>
      Achievement
    </>
  )
}

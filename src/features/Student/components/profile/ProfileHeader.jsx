import { lazy, useEffect, useState } from 'react';


import { upperCase } from '@/utils/removeEmptyStrings';
// import   FeeProcess  from '../../../Fee/FeeProcess/FeeProcess';
// import Profile from './Profile';
// import StudentSession from './StudentSession';
// import ProfileImage from './ProfileImage';
const Profile =lazy(()=>import('./Profile'))
const StudentSession =lazy(()=>import('./StudentSession'))
const ProfileImage =lazy(()=>import('./ProfileImage'))
const FeeProcess =lazy(()=>import('../../../Fee/FeeProcess/FeeProcess'))



const ProfileHeader = ({ data, fetchedAcademicSessions }) => {
  const activeTab = ` bg-gradient-to-t from-slate-800 to-slate-50/5 px-8 p-1 rounded-md
shadow-lg border-b-[1px] border-slate-50/20 text-red-300 font-bold -mb-2  `
  const [academicSessions, setAcademicSessions] = useState([])
  const [studentSessions, setStudentSessions] = useState(data?.student_sessions ?? [])

  const [selectedSession, setSelectedSession] = useState(
    studentSessions.length > 0
      ? (
        studentSessions.find(x => x.academic_session.is_current == 1)
          ?.academic_session
        ?? studentSessions[0].academic_session
      )
      : null
  )

  const [selectedStudentSession, setSelectedStudentSession] = useState(null)
  const [activeView, setActiveView] = useState('fee')

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

      <div className='w-full bg-gradient-to-r  from-blue-500 to-cyan-500 
      rounded-md px-4 pt-2 pb-2 text-slate-800 -mt-2'>
        <ul className='flex flex-row gap-4 cursor-pointer text-sm'>
          <li className={`${activeView === 'profile' ? activeTab : ''}`} onClick={() => setActiveView('profile')}>Profile</li>
          <li className={`${activeView === 'address' ? activeTab : ''}`} onClick={() => setActiveView('address')}>Address</li>
          <li className={`${activeView === 'guardian' ? activeTab : ''}`} onClick={() => setActiveView('guardian')}>Guardian</li>
          <li className={`${activeView === 'fee' ? activeTab : ''}`} onClick={() => setActiveView('fee')}>Fee</li>
          <li className={`${activeView === 'class_work' ? activeTab : ''}`} onClick={() => setActiveView('class_work')}>Class Work</li>
          <li className={`${activeView === 'activity' ? activeTab : ''}`} onClick={() => setActiveView('activity')}>Activity</li>
          <li className={`${activeView === 'achievement' ? activeTab : ''}`} onClick={() => setActiveView('achievement')}>Achievement</li>
        </ul>
        <ProfileHeaderWrapper data={data} activeView={activeView} academicSessions={academicSessions} selectedSession={selectedSession} selectedStudentSession={selectedStudentSession} />
      </div>

    </>
  )
}
const ProfileHeaderWrapper = ({ data, activeView, academicSessions, selectedSession, selectedStudentSession }) => {
  return (
    <div className="overflow-y-scroll bg-red-500   
    bg-gradient-to-r  from-slate-800 to-slate-700 
    scroll rounded-lg  
    max-h-[40vh] 
    md:min-h-[48vh] lg:min-h-[48vh] xl:min-h-[58vh] 2xl:min-h-[60vh] 
     max-h-[40vh] 
    md:max-h-[48vh] lg:max-h-[48vh] xl:max-h-[58vh] 2xl:max-h-[60vh]  ">
      {activeView === 'profile' && <Profile data={data} />}
      {activeView === 'address' && <Address data={data.addresses} />}
      {activeView === 'guardian' && <Guardian data={data.guardians} />}
      {activeView === 'fee'
        && selectedSession &&
        (
          selectedStudentSession ?
            (<FeeProcess
              data={data}
              academicSessions={academicSessions}
              selectedSession={selectedSession}
              selectedStudentSession={selectedStudentSession}
            />)
            :
            (!selectedStudentSession && <div className='p-4 flex justify-center items-center text-2xl bg-slate-600 mt-4 rounded-lg h-40'>
              {'Student Session Not Initialize...'}
            </div>)
        )

      }
      {activeView === 'class_work' && <ClassWork data={data} />}
      {activeView === 'activity' && <Activity data={data} />}
      {activeView === 'achievement' && <Achievement data={data} />}

    </div>)
}

export default ProfileHeader





export const Address = ({ data }) => {
  return (
    <>
      <div className='w-full h-[40dvh] bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md  text-slate-300  '>
        <div className=' pl-4 mb-2 pt-4'>
          {
            data.map((address, index) => (
              <div key={index}>
                <span className='p-2 bg-blue-600 rounded-md mr-2'> {upperCase(address.address_type)}:</span>
                {address.display}
              </div>
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
      <div className=' w-full   p-4 text-slate-300 mt-2'>
        <div className='text-xl font-bold text-orange-400 mb-2'>Guardian</div>
        <div className=' pl-1 mb-2 flex flex-col gap-4'>
          {
            data.map((guardian, index) => (
              <div key={index}>
                <span className='w-[20px] px-2 py-1 bg-blue-600 rounded-2xl mr-2'>

                  {upperCase(guardian.guardian_type)}
                </span>
                {guardian.name}</div>
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

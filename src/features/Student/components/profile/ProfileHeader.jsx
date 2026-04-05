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
  const activeTab = `bg-white/95 text-blue-700 shadow-sm ring-1 ring-blue-200/70 dark:bg-slate-800 dark:text-blue-200 dark:ring-slate-600`
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
    if (!selectedSession) {
      setSelectedStudentSession(null)
      return
    }
    setSelectedStudentSession(data?.student_sessions.find(x => x.academic_session_id === selectedSession.id) ?? null)
  }, [data, selectedSession])



  // console.log('xxx',selectedStudentSession);

  return (
    <>

      <div className='w-full rounded-xl border border-blue-200/60 bg-gradient-to-r from-sky-100 via-blue-50 to-cyan-100 p-4 text-slate-800 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700 dark:text-slate-100'>

        <div className='flex justify-between items-center'>
          <div>
            <div className='text-xl font-semibold tracking-tight pl-1 mb-3'>
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

      <div className='mt-3 w-full rounded-xl border border-blue-200/60 bg-gradient-to-r from-sky-50 via-white to-blue-50 px-4 pt-3 pb-3 text-slate-800 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100'>
        <ul className='flex flex-wrap gap-2 cursor-pointer text-sm font-medium'>
          <li className={`px-3 py-1.5 rounded-lg transition ${activeView === 'profile' ? activeTab : 'hover:bg-white/70 hover:text-blue-700 dark:hover:bg-slate-800/70 dark:hover:text-blue-200'}`} onClick={() => setActiveView('profile')}>Profile</li>
          <li className={`px-3 py-1.5 rounded-lg transition ${activeView === 'address' ? activeTab : 'hover:bg-white/70 hover:text-blue-700 dark:hover:bg-slate-800/70 dark:hover:text-blue-200'}`} onClick={() => setActiveView('address')}>Address</li>
          <li className={`px-3 py-1.5 rounded-lg transition ${activeView === 'guardian' ? activeTab : 'hover:bg-white/70 hover:text-blue-700 dark:hover:bg-slate-800/70 dark:hover:text-blue-200'}`} onClick={() => setActiveView('guardian')}>Guardian</li>
          <li className={`px-3 py-1.5 rounded-lg transition ${activeView === 'fee' ? activeTab : 'hover:bg-white/70 hover:text-blue-700 dark:hover:bg-slate-800/70 dark:hover:text-blue-200'}`} onClick={() => setActiveView('fee')}>Fee</li>
          <li className={`px-3 py-1.5 rounded-lg transition ${activeView === 'class_work' ? activeTab : 'hover:bg-white/70 hover:text-blue-700 dark:hover:bg-slate-800/70 dark:hover:text-blue-200'}`} onClick={() => setActiveView('class_work')}>Class Work</li>
          <li className={`px-3 py-1.5 rounded-lg transition ${activeView === 'activity' ? activeTab : 'hover:bg-white/70 hover:text-blue-700 dark:hover:bg-slate-800/70 dark:hover:text-blue-200'}`} onClick={() => setActiveView('activity')}>Activity</li>
          <li className={`px-3 py-1.5 rounded-lg transition ${activeView === 'achievement' ? activeTab : 'hover:bg-white/70 hover:text-blue-700 dark:hover:bg-slate-800/70 dark:hover:text-blue-200'}`} onClick={() => setActiveView('achievement')}>Achievement</li>
        </ul>
        <ProfileHeaderWrapper data={data} activeView={activeView} academicSessions={academicSessions} selectedSession={selectedSession} selectedStudentSession={selectedStudentSession} />
      </div>

    </>
  )
}
const ProfileHeaderWrapper = ({ data, activeView, academicSessions, selectedSession, selectedStudentSession }) => {
  return (
    <div className="mt-3 overflow-y-auto rounded-xl border border-blue-200/60 bg-white/90 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 max-h-[40vh] md:min-h-[48vh] lg:min-h-[48vh] xl:min-h-[58vh] 2xl:min-h-[60vh] md:max-h-[48vh] lg:max-h-[48vh] xl:max-h-[58vh] 2xl:max-h-[60vh]">
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
          (!selectedStudentSession && <div className='m-4 flex h-40 items-center justify-center rounded-xl border border-amber-300/40 bg-amber-50 text-lg font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200'>
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
      <div className='w-full min-h-[40dvh] p-4 text-slate-700 dark:text-slate-200'>
        <div className='space-y-3'>
          {
            data.map((address, index) => (
              <div key={index} className='rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70'>
                <span className='mr-2 inline-flex rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-200'> {upperCase(address.address_type)}:</span>
                <span className='text-sm'>{address.display}</span>
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
      <div className='w-full p-4 text-slate-700 dark:text-slate-200'>
        <div className='mb-3 text-xl font-semibold text-slate-800 dark:text-slate-100'>Guardian</div>
        <div className='pl-1 mb-2 flex flex-col gap-3'>
          {
            data.map((guardian, index) => (
              <div key={index} className='rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70'>
                <span className='mr-2 inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-200'>

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

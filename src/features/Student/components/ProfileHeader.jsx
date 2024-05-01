import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md'

const ProfileHeader = (data) => {
  const [activeView, setActiveView] = useState('profile')

  return (
    <>

      <div className='h-42 w-full bg-gradient-to-r  from-blue-500 to-cyan-500 rounded-md p-4 text-slate-800'>

        <div className='flex justify-between items-center'>
          <div >
            <div className='text-xl pl-1 mb-2'>
              Name: {data.data.name}
            </div>
            <div className='flex flex-row'>
              <div className='bg-blue-800/30 px-2 rounded-2xl shadow-md border-2 border-white/20'>
                Class: {'' + data.data.class} | Section: {'' + data.data.section} | Roll No: {'' + data.data.roll_no}
              </div>
              {/* Edit Icon */}
              <div className='flex justify-between items-center rounded-full  ml-2'>
                <MdOutlineModeEditOutline className='text-orange-600 text-xl  ' />
              </div>
            </div>
          </div>
          <div className='w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full overflow-hidden shadow-lg'>
            <img src={data.data.profile_document.path} className='w-full h-full' />
          </div>

        </div>

      </div>
      <div className='h-42 w-full bg-gradient-to-r  from-blue-500 to-cyan-500 rounded-md p-4 text-slate-800 mt-2'>
        Session
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
      {activeView === 'address' && <Address data={data} />}
      {activeView === 'guardian' && <Guardian data={data} />}
      {activeView === 'fee' && <Fee data={data} />}
      {activeView === 'class_work' && <ClassWork data={data} />}
      {activeView === 'activity' && <Activity data={data} />}
      {activeView === 'achievement' && <Achievement data={data} />}


    </>
  )
}

export default ProfileHeader

export const Profile = ({ data }) => {

  return (
    <>
      <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
        <div className='text-lg underline flex'>
          <span className='font-bold'>Full Profile </span>
          <span className='flex justify-between items-center rounded-full  ml-2 cursor-pointer'>
            <MdOutlineModeEditOutline className='text-orange-600 text-xl  ' />
          </span>
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Id:</div>  {data.data.id}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Name:</div>  {data.data.name}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Username:</div>  {data.data.username}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Code:</div>  {data.data.code}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Dob: </div>{DateTime.fromISO(data.data.dob).toLocaleString(DateTime.DATE_MED)}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Gender: </div>{data.data.gender}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Birth Mark:</div> {data.data.birth_mark}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Aadhaar Number:</div> {data.data.aadhaar_no}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Nationality: </div>{data.data.nationality}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Language: </div>{data.data.language}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Religion: </div>{data.data.religion}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Caste: </div>{data.data.caste}
        </div>
      </div>

    </>
  )
}
export const Address = ({ data }) => {

  return (
    <>
      <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
        <div className=' pl-1 mb-2'>
          {
            data.data.addresses.map((address, index) => (
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
            data.data.guardians.map((guardian, index) => (
              <div key={index}>{guardian.guardian_type}: {guardian.name}</div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export const Fee = (data) => {
  return (
    <>
      <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
        <div>Fee</div>
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

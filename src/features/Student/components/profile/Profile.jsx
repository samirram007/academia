import { DateTime } from "luxon"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { useNavigate } from 'react-router'

export const Profile = ({ data }) => {
const navigate=useNavigate()

  const profileRows = [
    ['Id', data.id],
    ['Name', data.name],
    ['Username', data.username],
    ['Code', data.code],
    ['Dob', data.dob ? DateTime.fromISO(data.dob).toLocaleString(DateTime.DATE_MED) : '-'],
    ['Gender', data.gender],
    ['Birth Mark', data.birth_mark],
    ['Contact No.', data.contact_no],
    ['Email', data.email],
    ['Aadhaar Number', data.aadhaar_no],
    ['Nationality', data.nationality],
    ['Language', data.language],
    ['Religion', data.religion],
    ['Caste', data.caste],
  ]

  return (
    <>
      <div className='w-full rounded-md p-4 text-slate-700 dark:text-slate-200'>
        <div className='mb-4 flex items-center text-lg'>
          <span className='font-semibold tracking-tight text-slate-900 dark:text-slate-100'>Full Profile</span>
          <span onClick={() => navigate(`/students/edit/${data.id}`)} className='ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-blue-700 transition hover:bg-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:hover:bg-blue-500/25'>
            <MdOutlineModeEditOutline className='text-base' />
          </span>
        </div>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
          {profileRows.map(([label, value]) => (
            <div key={label} className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800/70'>
              <div className='w-32 text-slate-500 dark:text-slate-400'>{label}:</div>
              <div className='font-medium text-slate-800 dark:text-slate-100'>{value || '-'}</div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}
  export default Profile
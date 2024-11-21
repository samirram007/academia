import { DateTime } from "luxon"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export const Profile = ({ data }) => {
const navigate=useNavigate()
  return (
    <>
      <div className='h-42 w-full rounded-md p-4 text-slate-300 mt-2'>
        <div className='text-lg underline flex'>
          <span className='font-bold'>Full Profile </span>
          <span onClick={()=>navigate(`/students/edit/${data.id}`)} className='flex justify-between items-center rounded-full  ml-2 cursor-pointer'>
            <MdOutlineModeEditOutline className='text-orange-600 text-xl  ' />
          </span>
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Id:</div>  {data.id}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Name:</div>  {data.name}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Username:</div>  {data.username}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Code:</div>  {data.code}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Dob: </div>{DateTime.fromISO(data.dob).toLocaleString(DateTime.DATE_MED)}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Gender: </div>{data.gender}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Birth Mark:</div> {data.birth_mark}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Contact No.:</div> {data.contact_no}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>email:</div> {data.email}
        </div>

        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Aadhaar Number:</div> {data.aadhaar_no}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Nationality: </div>{data.nationality}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Language: </div>{data.language}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Religion: </div>{data.religion}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Caste: </div>{data.caste}
        </div>
      </div>

    </>
  )
}
  export default Profile
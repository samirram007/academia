import React from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const ProfileImage = ({ data }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className='relative'>
                <span onClick={() => navigate(`/students/edit/${data.id}`)}
                    className='bg-slate-100/20 hover:bg-slate-100/50 hover:shadow-lg absolute right-2 top-2 flex justify-between items-center rounded-full  ml-2 cursor-pointer'>
                    <MdOutlineModeEditOutline className='text-orange-600 text-xl  ' />
                </span>
                <div className=' w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full overflow-hidden shadow-lg'>

                    {
                        data.profile_document ?
                            <img src={data.profile_document.path} className='w-full h-full' /> :
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/documents/student.png`} className='w-full h-full' alt="" />

                    }
                </div>
            </div>



        </>
    )
}

export default ProfileImage

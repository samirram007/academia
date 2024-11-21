import { useState } from 'react';
import { useGuardianType } from '../../../hooks/queries';

import { AiOutlineEdit } from "react-icons/ai";

import { upperCase } from '@/utils/removeEmptyStrings';
import { IoMdAddCircle } from 'react-icons/io';
import GuardianForm from './GuardianForm';


// const GuardianForm = lazy(() => import('./GuardianForm'))

const Guardians = ({ formik }) => {

    const [isModalOpen, setModalOpen] = useState(false)
    const [mode, setMode] = useState('list');
    const student_id = formik.values.id;
    const initialValue = {
        user_type: 'guardian',
        guardian_type: 'father',
        guardian_id: null,
        student_id: student_id,
        name: '',
        email: '',
        contact_no: '',
        occupation: '',
        education: '',
        earnings: '',
    }
    const handleOnClick = () => {
        setMode('add')
        setModalOpen(true)
    }
    const handleReset = () => {
        setMode('list')
        setModalOpen(false)
    }
    // console.log(formik.values.guardians);

    return (
        <div className='grid gap-1 grid-cols-6 
        border-t-2 border-blue-300/30 pt-1  mt-4'>
            <div className='col-span-6 '>
                <div className='flex justify-between items-center'>

                    <div className='text-xl font-bold text-orange-400' onClick={handleReset}>Guardian</div>
                    <div>  
                        <span
                            onClick={handleOnClick}
                            className=" bg-slate-50 text-orange-500 cursor-pointer
                         hover:text-yellow-500 active:text-orange-600 active:touch-pinch-zoom ">
                            <IoMdAddCircle className='text-3xl active:scale-90 transition delay-75 ease-in-out ' />
                        </span>
                        {/* {mode == 'add' && <div className=''>Add</div>} */}
                        {
                            mode == 'add' && <GuardianForm
                                mode='add'
                                setMode={setMode}
                                guardian={initialValue}
                                student_id={student_id}
                                isModalOpen={isModalOpen}
                                setModalOpen={setModalOpen}
                            />
                        }
                    </div>
                </div>
            </div>
            {
                <div className='  col-span-6 '>
                    {
                        formik.values.guardians && formik.values.guardians.length > 0 ?
                            <>
                                <div className='col-span-6 flex flex-row p-1   bg-slate-800/80   flex-nowrap  items-center justify-between   font-bold   text-xs border-y-2   border-blue-200/50'>
                                    <div className='flex flex-nowrap  justify-start flex-1  '>

                                        <div className='text-left w-32'>Type</div>
                                        <div>Name</div>
                                    </div>
                                    <div className=''>Action</div>
                                </div>

                                {
                                    formik.values.guardians.map((guardian, index) => {
                                        return <GuardianView
                                            key={index}
                                            guardian={guardian}
                                            student_id={student_id} />

                                    })
                                }

                            </>
                            : <div> No Guardian Data Found  </div>

                    }


                </div>

            }


        </div>
    )
}

export default Guardians



export const GuardianView = ({ guardian, student_id }) => {
    const [mode, setMode] = useState('list');
    const [isModalOpen, setModalOpen] = useState(false)
    const guardianTypeData = useGuardianType()
    if (guardianTypeData.isPending) return '<div>Loading..</div>'
    if (guardianTypeData.isError) {
        return <div>{guardianTypeData.error.message}</div>
    }

    const handleOnClick = () => {
        setMode('edit')
        setModalOpen(true)
    }
    const handleReset = () => {
        setMode('list')
        setModalOpen(false)
    }


    return (
        <div className='col-span-6 flex flex-row items-center justify-between border-b-[1px] 
      border-violet-200/20 py-2'>
            <div className='flex flex-row justify-start tracking-tighter'>
                <div className='text-left w-32'>
                    {upperCase(guardianTypeData.data.data[guardian.guardian_type])} </div>
                <div> {guardian.name}</div>
            </div>
            <AiOutlineEdit onClick={handleOnClick} className='badge text-violet-400 cursor-pointer border-2 border-violet-300/30
            hover:border-violet-300
            active:bg-blue-700/30
            active:border-blue-400/30
            active:scale-90  transition delay-75 ease-in-out' />
            {mode == 'edit' && <GuardianForm mode='edit'
                guardian={{ ...guardian, student_id: student_id }}
                student_id={student_id}
                setMode={setMode}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen} />}
        </div>
    )

}

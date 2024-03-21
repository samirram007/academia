import React, { useState } from 'react'
import { useGuardianType } from '../../../hooks/queries'
import { FormikInputBox, FormikSelect } from '../../../components/form-components'
import { useFormik } from 'formik'

import { AiOutlineEdit } from "react-icons/ai";

import { IoMdAddCircle } from 'react-icons/io'
import { useStoreStudentGuardianMutation, useUpdateStudentGuardianMutation } from '../hooks/mutations';
import { createPortal } from 'react-dom';
import GuardianForm from './GuardianForm';
import FormikFormModal from '../../../components/form-components/FormikFormModal';

const Guardians = ({ formik }) => {

    const student_id = formik.values.id;
    const [mode, setMode] = useState('list');
    const initialValue = {
        user_type: 'guardian',
        guardian_type_id: 'father',
        guardian_id: 1,
        student_id: student_id,
        name: '',
        email: '',
        contact_no: ''
    }


    return (
        <div className='grid gap-4 grid-cols-6 border-t-2 border-blue-300/30 pt-2  mt-10'>
            <div className='col-span-6 '>
                <div className='flex justify-between items-center'>

                    <div>Guardian</div>
                    <div>
                        <span
                            onClick={() => setMode('add')}
                            className=" bg-slate-50 text-orange-500 cursor-pointer
                         hover:text-yellow-500 active:text-orange-600 active:touch-pinch-zoom ">
                            <IoMdAddCircle className='text-3xl active:scale-90 transition delay-75 ease-in-out ' />
                        </span>

                        {mode == 'add' && <GuardianForm
                            mode='add'
                            guardian={initialValue}
                            student_id={student_id}
                            setMode={setMode} />}
                    </div>
                </div>
            </div>
            {
                <div className='  col-span-6 '>
                    {
                        formik.values.guardians && formik.values.guardians.length > 0 ?
                            <>
                                <div className='col-span-6 flex flex-row p-1
                            bg-slate-800/80
                            flex-nowrap  items-center justify-between
                            font-bold
                            text-xs border-y-2 rounded-2xl border-blue-200/50'>
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
    const guardianTypeData = useGuardianType()
    if (guardianTypeData.isPending) return '<div>Loading..</div>'
    if (guardianTypeData.isError) {
        return <div>{guardianTypeData.error.message}</div>
    }

    //console.log(guardian);

    return (
        <div className='col-span-6 flex flex-row items-center justify-between border-b-[1px] border-violet-200/20'>
            <div className='flex flex-row justify-start tracking-tighter'>
                <div className='text-left w-32'>
                    {guardianTypeData.data.data[guardian.guardian_type]}</div>
                <div> {guardian.name}</div>
            </div>
            <AiOutlineEdit onClick={() => setMode('edit')} className='badge text-violet-400 cursor-pointer border-2 border-violet-300/30
            hover:border-violet-300
            active:bg-blue-700/30
            active:border-blue-400/30
            active:scale-90  transition delay-75 ease-in-out' />
            {mode == 'edit' && <GuardianForm mode='edit'
                guardian={guardian}
                student_id={student_id}
                setMode={setMode} />}
        </div>
    )

}

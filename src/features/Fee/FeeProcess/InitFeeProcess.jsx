import React, { lazy } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useFormModal } from '../../../contexts/FormModalProvider'
import { useEffect } from 'react'

const FormikFormModal = lazy(() => import('../../../components/form-components/FormikFormModal'))
const CreateFees = lazy(() => import('./CreateFees'))
const FeeGrid = lazy(() => import('./FeeGrid'))

const InitFeeProcess = ({
    userData ,
    academicSessions,
    selectedStudentSession,
   studentSessionFeesData }) => {
    const { isOpen, setOpen } = useFormModal()


    return (
        <>

            <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
                <div className='flex flex-row justify-between items-center pr-8'>
                    <div className='font-bold text-xl text-red-300'>
                        Fees for Session {academicSessions.find(x => x.id === selectedStudentSession.academic_session_id)?.session}
                    </div>
                    <button onClick={() => setOpen(true)} title='Create new'
                        className="btn btn-primary btn-sm text-xl
                                  btn-rounded-symbol border-blue-300/10">
                        <IoMdAdd />
                    </button>
                </div>

                {
                    isOpen &&
                    <>
                        <FormikFormModal label={'Fees'}>
                            <CreateFees userData={userData} selectedStudentSession={selectedStudentSession} />
                        </FormikFormModal>
                    </>
                }
                <div className='grid grid-cols-9 font-semibold text-primary  items-center border-b-2 border-violet-500  '>
                    <div className='col-span-1 '>
                        <div className='text-center border-r-[1px] border-violet-500'>Receipt No.</div>
                    </div>
                    <div className="col-span-8 grid grid-cols-8 grid-flow-col">


                        <div className='pl-2'>Date</div>
                        <div className='col-span-2'>Particulars</div>
                        <div className='text-right pr-2'>Amount</div>
                        <div className='text-center'>Mode</div>
                        <div className='text-center'>Status</div>
                        <div className='col-span-2 text-center'>Action</div>
                    </div>

                </div>
                <div>
                    {
                        !studentSessionFeesData ?
                            <div className='grid grid-cols-9 items-center py-1 border-b-2 border-violet-400/20 '>

                                <div className='col-span-9 text-center'>{'-- No Data Found --'}</div>
                            </div>
                            :
                            <div className='grid grid-cols-9 '>
                                <div className='col-span-9'>
                                    {studentSessionFeesData.sort((a, b) => new Date(b.fee_date)-new Date(a.fee_date))
                                    .map((fees, index) => (
                                        <FeeGrid key={index} userData={userData} fees={fees} selectedStudentSession={selectedStudentSession}  />
                                    ))}
                                </div>
                                <div className='col-span-9 grid grid-cols-9 bg-red-900 py-2 mt-2 font-bold rounded-md'>
                                    <div className='col-span-4 flex flex-row justify-end  '>Total: </div>
                                    <div className='col-span-1 flex flex-row justify-end   pr-2'>
                                        {
                                            studentSessionFeesData.reduce((total, index) => (total + parseFloat(index.total_amount)), 0).toFixed(2)
                                        }</div>
                                    <div className='col-span-4 flex flex-row justify-end '> </div>
                                </div>
                            </div>

                    }
                </div>
            </div>
        </>
    )
}

export default InitFeeProcess


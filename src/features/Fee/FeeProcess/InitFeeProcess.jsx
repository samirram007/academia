import { lazy } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useFormModal } from '../../../contexts/FormModalProvider'

const FormikFormModal = lazy(() => import('@/components/form-components/FormikFormModal'))
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

            <div className='w-full text-slate-700 dark:text-slate-200 relative'>
                <div className='sticky top-0 z-10 flex flex-row justify-between items-center rounded-t-xl border-b border-slate-200 bg-slate-100/95 px-3 py-2 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95'>
                    <div className='font-semibold text-lg text-slate-800 dark:text-slate-100'>
                        Fees for Session {academicSessions.find(x => x.id === selectedStudentSession.academic_session_id)?.session}
                    </div>
                    <button onClick={() => setOpen(true)} title='Create new'
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700">
                        <IoMdAdd />
                    </button>
                </div>

                {
                    isOpen &&
                    <>
                        <FormikFormModal label={'Fees'}>
                            <CreateFees userData={userData}
                                selectedStudentSession={selectedStudentSession} />
                        </FormikFormModal>
                    </>
                }
                <div className='sticky top-12 z-[9] grid grid-cols-9 items-center border-b border-slate-200 bg-slate-50 font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'>
                    <div className='col-span-1 '>
                        <div className='border-r border-slate-200 py-2 text-center dark:border-slate-700'>Receipt No.</div>
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
                <div className='overflow-y-auto'>
                    {
                        !studentSessionFeesData ?
                            <div className='grid grid-cols-9 items-center border-b border-slate-200 py-2 dark:border-slate-700'>

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
                                <div className='col-span-9 mt-3 grid grid-cols-9 rounded-lg bg-red-600 py-2 font-bold text-white dark:bg-red-700/90'>
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


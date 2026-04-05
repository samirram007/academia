import { lazy, useState } from 'react'


import { DateTime } from 'luxon'
import { Capitalize } from '../../../libs/utils'
import DeleteFees from './DeleteFees'

const EditFees = lazy(() => import('./EditFees'))
const PrintToPdf = lazy(() => import('./print/PrintToPdf'))
const FormikEditFormModal = lazy(() => import('@/components/form-components/FormikEditFormModal'))
const FeeGrid = ({ userData, fees, selectedStudentSession, session_id }) => {

    return (
        <>
            <div className='grid grid-cols-9 items-center border-b border-slate-200 text-xs dark:border-slate-700'>
                <div className="col-span-1">

                    <div className='flex items-center justify-center border-r border-slate-200 py-2 text-center font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200'>
                        {fees.fee_no}- {fees.id}
                    </div>
                </div>
                <div className="col-span-8 grid grid-cols-8">
                    <div className='pl-2 text-slate-600 dark:text-slate-300' >  {DateTime.fromISO(fees.fee_date).toLocaleString(DateTime.DATE_MED)}</div>
                    <div className='col-span-2 flex flex-row gap-2 items-end'>
                        <span className='font-semibold text-emerald-600 dark:text-emerald-300'>

                            {Capitalize(fees.fee_template.name)}
                        </span>
                        <span className='ml-2 flex flex-row gap-2 '>

                            {fees.fee_items.find(x => x.fee_item_months).fee_item_months.map((x, i) => (
                                <span key={i} className='border-b border-emerald-500/60 text-[9px] text-slate-500 dark:text-slate-300'>{x.month.short_name}</span>
                            ))}
                        </span>

                    </div>

                    <div className='text-right pr-2 font-bold text-emerald-600 dark:text-emerald-300'>{fees.paid_amount}</div>
                    <div className='text-center text-slate-600 dark:text-slate-300'>{Capitalize(fees.payment_mode)}</div>
                    <div className='text-center text-slate-700 dark:text-slate-200'>{fees.balance_amount > 0 ? 'Due' : 'Paid'}</div>
                    <div className='flex flex-row justify-center gap-2 col-span-2'>

                        {
                            fees && fees.fee_items.length > 0 &&

                            <>
                                <FeeItems userData={userData} fees={fees} selectedStudentSession={selectedStudentSession} />
                                <PrintToPdf userData={userData} fees={fees} selectedStudentSession={selectedStudentSession} session_id={session_id} />
                                <DeleteFeeItem userData={userData} fees={fees} selectedStudentSession={selectedStudentSession}   />
                            </>
                        }


                    </div>
                </div>
            </div>

        </>
    )
}

export const FeeItems = ({ userData, fees, selectedStudentSession }) => {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <button onClick={() => setOpen(true)} className='inline-flex items-center rounded-full border border-blue-300 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-400/40 dark:bg-blue-500/10 dark:text-blue-200 dark:hover:bg-blue-500/20'>{'Details'}</button>
            {
                isOpen &&
                <>
                    <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label={`Edit Fee No. ${fees.fee_no}`}>
                        <EditFees
                            userData={userData}
                            fees={fees}
                            isOpen={isOpen}
                            setOpen={setOpen}
                            selectedStudentSession={selectedStudentSession}
                        />
                    </FormikEditFormModal>
                </>
            }
        </>
    )
}
export const DeleteFeeItem=({ userData, fees, selectedStudentSession })=>{

    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <button onClick={() => setOpen(true)} className='inline-flex items-center rounded-full border border-red-300 bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-400/40 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20'>{'Cancel'}</button>
            {
                isOpen &&
                <>
                    <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label={`Delete Fee No. ${fees.fee_no}`}>
                        <DeleteFees
                            userData={userData}
                            fees={fees}
                            isOpen={isOpen}
                            setOpen={setOpen}
                            selectedStudentSession={selectedStudentSession}
                        />
                    </FormikEditFormModal>
                </>
            }
        </>
    )
}
export default FeeGrid
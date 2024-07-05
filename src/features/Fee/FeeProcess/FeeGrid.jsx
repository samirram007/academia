import React, { lazy, useState } from 'react'


import { DateTime } from 'luxon'
import { Capitalize } from '../../../libs/utils'
import DeleteFees from './DeleteFees'

const EditFees = lazy(() => import('./EditFees'))
const PrintToPdf = lazy(() => import('./print/PrintToPdf'))
const FormikEditFormModal = lazy(() => import('../../../components/form-components/FormikEditFormModal'))
const FeeGrid = ({ userData, fees, selectedStudentSession, session_id }) => {


    return (
        <>
            <div className='grid grid-cols-9 items-center  text-xs border-b-2 border-violet-400/20 '>
                <div className="col-span-1">

                    <div className='flex items-center justify-center  text-center   border-r-[1px] border-violet-500 py-2'>{fees.fee_no}</div>
                </div>
                <div className="col-span-8 grid grid-cols-8">
                    <div className='pl-2' >  {DateTime.fromISO(fees.fee_date).toLocaleString(DateTime.DATE_MED)}</div>
                    <div className='col-span-2 flex flex-row gap-2 items-end'>
                        <span className='text-green-600 font-bold'>

                            {Capitalize(fees.fee_template.name)}
                        </span>
                        <span className='ml-2 flex flex-row gap-2 '>

                            {fees.fee_items.find(x => x.fee_item_months).fee_item_months.map((x, i) => (
                                <span key={i} className='border-b-2 border-green-700 !text-[8px]'>{x.month.short_name}</span>
                            ))}
                        </span>

                    </div>

                    <div className='text-right pr-2 font-bold text-green-400'>{fees.paid_amount}</div>
                    <div className='text-center'>{Capitalize(fees.payment_mode)}</div>
                    <div className='text-center'>{fees.balance_amount > 0 ? 'Due' : 'Paid'}</div>
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
            <button onClick={() => setOpen(true)} className='badge btn-outline badge-primary
             bg-blue-500 text-blue-900 text-xs     py-0 hover:bg-blue-400 '>{'Details'}</button>
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
            <button onClick={() => setOpen(true)} className='badge btn-outline badge-error
               text-red-400 text-xs     py-0 hover:bg-red-400 '>{'Cancel'}</button>
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
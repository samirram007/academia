import React, { lazy, useEffect, useMemo, useRef, useState } from 'react'
import { useStudentSessionFees } from '../../StudentSession/hooks/queries'

import { TbCalendarMonth, TbCheck } from 'react-icons/tb'


import { useMonths } from '../../Common/hooks/quaries'

const InitFeeProcess = lazy(() => import('./InitFeeProcess'))
const MonthModal = lazy(() => import('../../Student/components/profile/MonthModal'))


const FeeProcess = ({
    data:userData,
    academicSessions,
    selectedSession:selectedAcademicSession,
    selectedStudentSession }) => {
    const fetchedSessionFeesData = useStudentSessionFees({ student_session_id: selectedStudentSession.id })

    if (fetchedSessionFeesData.isPending) return <div>Loading</div>

    const mData = fetchedSessionFeesData.data?.data ?? [];
    const studentSessionFeesData = mData//useMemo(() => [...mData], [mData]);


    if (!selectedStudentSession) {
        return (
            <div className='p-4 flex justify-center items-center text-2xl bg-slate-600 mt-4 rounded-lg h-40'>
                {'Student Session Not Initialize.....'}
            </div>
        )
    }
    return (
        <>
            <InitFeeProcess userData={userData}
                academicSessions={academicSessions}
                selectedStudentSession={selectedStudentSession}
                studentSessionFeesData={studentSessionFeesData} />
        </>
    )

}
export default FeeProcess


export const FeeEntryRows = ({ feeData, setChanges, selectedStudentSession, mode }) => {

    return (
        <div>
            <div>

                {
                    feeData.fee_items && feeData.fee_items.map((feeTemplateItem, index) => (

                        <FeeEntryRow key={index} index={index}
                            feeTemplateItem={feeTemplateItem}
                            selectedStudentSession={selectedStudentSession}
                            setChanges={setChanges}
                            mode={mode}
                        />


                    ))}
            </div>
            <div>
                <div className="total"></div>
            </div>
        </div>
    )
}


export const FeeEntryRow = ({ feeTemplateItem, index, setChanges, selectedStudentSession, mode }) => {
    // console.log("EachRows", feeTemplateItem)
    const quantityRef = useRef()
    const amountRef = useRef()
    const [currentQuantity, setCurrentQuantity] = useState(feeTemplateItem.quantity)

    const feeTemplateItemData = useMemo(() => {
        return { ...feeTemplateItem }
    }, [JSON.stringify(feeTemplateItem)])
    const handleChange = (e) => {
        // setFeeTemplateItem({...feeTemplateItem,
        //     amount:isNaN(amountRef.current.value)?0:amountRef.current.value,
        //     total_amount :isNaN(feeTemplateItem.amount)?0:feeTemplateItem.amount * feeTemplateItem.quantity
        // })

        setTimeout(() => {
            feeTemplateItem.amount = isNaN(amountRef.current.value) ? 0 : amountRef.current.value

            // feeTemplateItem.quantity = quantityRef.current.value
            //feeTemplateItem.total_amount = parseInt(quantityRef.current.value) * parseFloat(amountRef.current.value)
            feeTemplateItem.total_amount = isNaN(feeTemplateItem.amount) ? 0 : feeTemplateItem.amount * feeTemplateItem.quantity
            setChanges(true)
        }, 700);
    }



    return (
        <>

            <div className={`${feeTemplateItemData.is_active ? '' : 'bg-slate-800/20 text-slate-700'} flex flex-row  items-center gap-2 border-b-2 border-violet-400/10 pb-2`}>
                <div className='w-1/12'>{index + 1}.</div>
                <div className='w-6/12 flex flex-row items-center gap-2'>
                    {feeTemplateItemData.fee_head.name}
                    {feeTemplateItemData.keep_periodic_details
                        ? <MonthPanel selectedStudentSession={selectedStudentSession}
                            currentQuantity={currentQuantity}
                            setCurrentQuantity={setCurrentQuantity}
                            feeTemplateItem={feeTemplateItem}
                            setChanges={setChanges}
                            mode={mode}
                        />
                        : ''}
                </div>
                <div className='w-1/12 text-center'>

                    <input ref={quantityRef} onChange={handleChange}
                        className={`${feeTemplateItemData.is_customizable ? '' : ''} ${feeTemplateItemData.quantity == 0 ? 'opacity-20' : ''} input w-12 text-center mb-0 border-violet-400/30 active:input-bordered input-primary py-0 px-1 h-6`}
                        disabled
                        type="text" name="quantity[]" value={feeTemplateItemData.quantity} />
                </div>
                <div className='w-1/12 text-right'></div>
                <div className='w-1/12   flex flex-row justify-end'>
                    <input ref={amountRef}
                        disabled={!feeTemplateItemData.is_customizable}
                        className={`${feeTemplateItemData.is_customizable ? '' : ''} ${feeTemplateItemData.amount == 0 ? 'opacity-20' : ''} input w-28 text-right mb-0 border-slate-200/80 active:input-bordered input-primary py-0 px-1 h-6`}
                        onChange={handleChange}
                        type="text" name="amount[]" defaultValue={feeTemplateItemData.amount} />
                </div>
                <div className='w-1/12 text-right'>:</div>
                <div className='w-1/12 text-right'>{Number(parseFloat(feeTemplateItemData.total_amount)).toFixed(2)}</div>
            </div>
        </>
    )
}
export const MonthPanel = ({ selectedStudentSession, feeTemplateItem, currentQuantity, setCurrentQuantity, setChanges, mode }) => {

    const fetchMonths = useMonths()
    const mData = fetchMonths.data?.data ?? [];
    const months = useMemo(() => [...mData], [mData]);
    if (fetchMonths.isFetching) return <div>Loading</div>

    return (
        <>
            {

                <LoadMonthPanel months={months}
                    selectedStudentSession={selectedStudentSession}
                    feeTemplateItem={feeTemplateItem}
                    currentQuantity={currentQuantity}
                    setCurrentQuantity={setCurrentQuantity}
                    setChanges={setChanges}
                    mode={mode}
                />
            }


        </>
    )
}

export const LoadMonthPanel = ({ months, selectedStudentSession, feeTemplateItem, currentQuantity,
    setCurrentQuantity, setChanges, mode }) => {
    // console.log('sss', selectedStudentSession);
    const [isOpen, setOpen] = useState(false);
    const [existingMonths, setExistingMonths] = useState([]);
    const [currentMonths, setCurrentMonths] = useState([]);
    //const currentMonths=[1]
    //console.log('sel',selectedStudentSession);

    useEffect(() => {

        if (selectedStudentSession.fee_item_months.length == 0) {
            setExistingMonths(prev => selectedStudentSession.fee_item_months.map(x => x.month_id))
            setCurrentMonths(prev => [1])
            setChanges(prev => true)
        }
        else if (feeTemplateItem.quantity == 0) {
            setExistingMonths(prev => selectedStudentSession.fee_item_months.map(x => x.month_id))
            setCurrentMonths(prev => [selectedStudentSession.fee_item_months.length + 1])
            setChanges(prev => true)
        }
        else if (feeTemplateItem.quantity > 0) {


            if (mode == 'create') {
                setExistingMonths(prev => selectedStudentSession.fee_item_months.map(x => x.month_id))
                setCurrentMonths(prev => [...Array(feeTemplateItem.quantity)]
                    .map((_, index) => (selectedStudentSession.fee_item_months.length + 1) + index))
            }
            else if (mode == 'edit') {

                if (feeTemplateItem.amount != 0) {
                    setExistingMonths(prev => selectedStudentSession.fee_item_months.map(x => x.month_id).filter(x => !feeTemplateItem.fee_item_months.map(a => a.month_id).includes(x)))
                    setCurrentMonths(feeTemplateItem.fee_item_months.map(a => a.month_id))
                }
            }

            setChanges(prev => true)
        }
    }, []);


    return (
        <>
            <button onClick={() => setOpen(true)} className='cursor-pointer'><TbCalendarMonth /></button>

            {currentMonths.length > 0 && months.filter(x => currentMonths.includes(x.id))
                .map((x, index) => {
                    return <div key={index} className='border-2 px-2 rounded-xl border-blue-400/50'>{x.short_name}</div>
                }
                )}

            {isOpen &&
                <CallMonthModal monthData={months}
                    selectedStudentSession={selectedStudentSession}
                    existingMonths={existingMonths}
                    currentMonths={currentMonths}
                    setCurrentMonths={setCurrentMonths}
                    feeTemplateItem={feeTemplateItem}
                    isOpen={isOpen} setOpen={setOpen}
                    currentQuantity={currentQuantity}
                    setCurrentQuantity={setCurrentQuantity}
                    setChanges={setChanges}
                />
            }
        </>
    )
}

export const CallMonthModal = (
    {
        monthData,
        isOpen,
        setOpen,
        selectedStudentSession,
        existingMonths,
        currentMonths,
        feeTemplateItem,
        setCurrentMonths,
        currentQuantity, setCurrentQuantity,
        setChanges
    }) => {
    const handleClick = (selectedMonth) => {
        //  console.log(selectedMonth,currentMonths[currentMonths.length - 1])
        //console.log(selectedMonth,currentMonths[currentMonths.length-1])
        if (selectedMonth === currentMonths[currentMonths.length - 1] + 1) {
            setChanges(prev => true)
            setCurrentMonths(prev => [...prev, selectedMonth])
            return
        }
        else if (selectedMonth === currentMonths[currentMonths.length - 1] && currentMonths.length > 1) {
            setChanges(prev => true)
            setCurrentMonths(prev => prev.filter(x => x != selectedMonth))
            return
        }

    }
    useEffect(() => {
        setCurrentQuantity(prev => currentMonths.length)
        feeTemplateItem.quantity = currentMonths.length
        feeTemplateItem.total_amount = parseFloat(feeTemplateItem.amount) * currentMonths.length
    }, [currentMonths])

    return (
        <MonthModal isOpen={isOpen} setOpen={setOpen} label={`Session: ${selectedStudentSession.academic_session.session}`}>
            <div className='flex flex-row bg-slate-800/60 rounded-md shadow-inner w-[20dvw] max-w-full   h-[50dvh] max-h-full pb-[2px]'>
                <div className={`relative flex flex-row justify-center items-center flex-wrap min-w-full gap-2 p-2 bg-slate-800  text-slate-700'`}>

                    {
                        monthData && monthData.map((month, index) => (

                            month.id > 0 &&
                                existingMonths.includes(month.id)
                                ?
                                <div key={index} className=' cursor-pointer w-16 h-16 border-2
                                bg-slate-400
                         text-slate-800 rounded-lg flex flex-col justify-start items-center font-bold shadow-lg'>
                                    <div className=' text-blue-800'> {month.short_name}</div>
                                    <div>
                                        {/* <span className='flex text-xs justify-center items-center'>PAID<TbCheck size={20}/></span> */}
                                        {existingMonths.includes(month.id) &&
                                            <TbCheck className='text-green-800 drop-shadow-2xl text-4xl ' size={20} />}
                                    </div>
                                </div>
                                :

                                (

                                    currentMonths.includes(month.id) ?

                                        <div key={index} className=' cursor-pointer w-16 h-16 border-2 bg-blue-400
                                     rounded-lg flex flex-col gap-0 justify-start items-center text-sky-800 font-semibold
                                     active:bg-blue-600 active:translate-x-1 transition-colors select-none

                                     '
                                            onClick={() => { handleClick(month.id) }}
                                        >
                                            <div className='text-[16px]'> {month.short_name}</div>
                                            <div>{currentMonths.includes(month.id) &&
                                                <TbCheck size={30} className='text-sky-800 drop-shadow-2xl text-2xl ' />}</div>
                                        </div>
                                        :
                                        <div key={index} className=' cursor-pointer w-16 h-16 border-2 bg-slate-100
                                text-slate-800 rounded-lg flex flex-col justify-start items-center'
                                            onClick={() => handleClick(month.id)}
                                        >
                                            <div> {month.short_name}</div>
                                            <div>{existingMonths.includes(month.id) && <TbCheck size={20} />}</div>
                                        </div>


                                )



                        ))
                    }
                </div>
            </div>
        </MonthModal>
    )

}


